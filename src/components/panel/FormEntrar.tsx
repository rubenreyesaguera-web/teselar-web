'use client';
import { useActionState } from 'react';
import { entrar, type Estado } from '@/app/panel/acciones';

export default function FormEntrar() {
  const [estado, accion, enviando] = useActionState<Estado, FormData>(entrar, {});
  return (
    <form className="formulario" action={accion}>
      <h1>Panel de Teselar</h1>
      <label className="campo">
        Contraseña
        <input name="clave" type="password" autoComplete="current-password" required autoFocus />
      </label>
      {estado.mensaje && (
        <p className="mensaje error" role="alert">
          {estado.mensaje}
        </p>
      )}
      <div className="botones">
        <button className="boton boton-principal" type="submit" disabled={enviando}>
          {enviando ? 'Comprobando…' : 'Entrar'}
        </button>
      </div>
    </form>
  );
}
