// Comprobar la sesion del panel desde paginas y acciones de servidor. Cada pagina y cada accion lo llama: no hay
// middleware que lo haga por ellas, para que ninguna se quede abierta por un fallo de configuracion.
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE, sesionValida } from './sesion';

export async function haySesion(): Promise<boolean> {
  const c = await cookies();
  return sesionValida(c.get(COOKIE)?.value, process.env.PANEL_SECRETO);
}

/** Sin sesion, a la entrada. */
export async function exigirSesion(): Promise<void> {
  if (!(await haySesion())) redirect('/panel/entrar');
}
