'use server';
// Las acciones del panel. Todas comprueban la sesion antes de hacer nada (salvo entrar, que la crea).
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { exigirSesion } from '@/lib/panel/acceso';
import { actualizarContacto, apuntarCobro, crearContacto, guardarAcceso, leerAcceso, marcarHito, saldarComision } from '@/lib/panel/datos';
import { validarContacto, validarSaldo } from '@/lib/panel/resumen';
import { bloqueado, claveValida, COOKIE, nuevaSesion, tras } from '@/lib/panel/sesion';

export interface Estado {
  ok?: boolean;
  mensaje?: string;
}

const hora = (d: Date) => new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit' }).format(d);

export async function entrar(_: Estado, form: FormData): Promise<Estado> {
  const cifrada = process.env.PANEL_CLAVE_HASH;
  const secreto = process.env.PANEL_SECRETO;
  if (!cifrada || !secreto || secreto.length < 32) return { mensaje: 'El panel aún no tiene contraseña configurada.' };
  const acceso = await leerAcceso();
  if (bloqueado(acceso)) {
    return { mensaje: `Demasiados intentos fallidos. Vuelve a probar a partir de las ${hora(acceso.bloqueado_hasta as Date)}.` };
  }
  const clave = form.get('clave');
  const acierto = typeof clave === 'string' && clave.length > 0 && claveValida(clave, cifrada);
  const despues = tras(acceso, acierto);
  await guardarAcceso(despues);
  if (!acierto) {
    if (despues.bloqueado_hasta) return { mensaje: `Contraseña incorrecta. Entrada bloqueada hasta las ${hora(despues.bloqueado_hasta)}.` };
    const quedan = 5 - despues.fallos_seguidos;
    return { mensaje: `Contraseña incorrecta. ${quedan === 1 ? 'Queda 1 intento' : `Quedan ${quedan} intentos`} antes de bloquear 15 minutos.` };
  }
  const { valor, vence } = nuevaSesion(secreto);
  (await cookies()).set(COOKIE, valor, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: vence,
  });
  redirect('/panel');
}

export async function salir(): Promise<void> {
  (await cookies()).delete(COOKIE);
  redirect('/panel/entrar');
}

export async function guardarContacto(_: Estado, form: FormData): Promise<Estado> {
  await exigirSesion();
  const campos = validarContacto(Object.fromEntries(form));
  if (typeof campos === 'string') return { mensaje: campos };
  const id = Number(form.get('id'));
  if (form.get('id')) {
    if (!(await actualizarContacto(id, campos))) return { mensaje: 'Ese contacto ya no existe.' };
  } else {
    await crearContacto(campos);
  }
  revalidatePath('/panel', 'layout');
  redirect('/panel/contactos');
}

function hitoDe(form: FormData): { ref: string; n: number } {
  return { ref: String(form.get('ref') ?? ''), n: Number(form.get('n')) };
}

export async function cambiarHito(_: Estado, form: FormData): Promise<Estado> {
  await exigirSesion();
  const { ref, n } = hitoDe(form);
  const r = await marcarHito(ref, n, form.get('deshacer') === '1');
  revalidatePath('/panel', 'layout');
  return r.ok ? { ok: true, mensaje: r.texto } : { mensaje: r.error };
}

export async function cambiarCobro(_: Estado, form: FormData): Promise<Estado> {
  await exigirSesion();
  const { ref, n } = hitoDe(form);
  const fecha = form.get('deshacer') === '1' ? null : String(form.get('fecha') ?? '');
  const r = await apuntarCobro(ref, n, fecha);
  revalidatePath('/panel', 'layout');
  return r.ok ? { ok: true, mensaje: r.texto } : { mensaje: r.error };
}

/** «Saldado el…» de la comision de un contacto (fase 2), con deshacer. Solo lo ve Ruben; es un apunte, no una factura. */
export async function cambiarSaldo(_: Estado, form: FormData): Promise<Estado> {
  await exigirSesion();
  const id = Number(form.get('id'));
  if (form.get('deshacer') === '1') {
    if (!(await saldarComision(id, null))) return { mensaje: 'Ese contacto ya no existe.' };
    revalidatePath('/panel', 'layout');
    return { ok: true, mensaje: 'Pago deshecho.' };
  }
  const saldo = validarSaldo(Object.fromEntries(form));
  if (typeof saldo === 'string') return { mensaje: saldo };
  if (!(await saldarComision(id, saldo))) return { mensaje: 'Ese contacto ya no existe o no tiene comisión.' };
  revalidatePath('/panel', 'layout');
  return { ok: true, mensaje: 'Pago apuntado.' };
}
