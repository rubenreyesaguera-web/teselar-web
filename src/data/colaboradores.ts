// Colaboradores que presentan a Ruben (ADR-113, punto 7; fase 4 del doc 31 de la boveda). Cada uno tiene su enlace,
// /[es|ca]/c/[slug], con lo que ve el cliente al escanear, y /[es|ca]/c/[slug]/tarjeta, lo que ensena el colaborador.
//
// Del colaborador no se guarda ningun contacto: todo lo que entra por su enlace llega a Ruben. Para anadir uno: su
// entrada aqui, su foto en public/colaboradores/ (cuadrada, sin metadatos) y su permiso para salir en una pagina
// publica, aunque no se indexe.

export interface Colaborador {
  /** Como sale escrito. */
  nombre: string;
  foto: string;
  /** Idiomas en los que tiene pagina. */
  idiomas: ('es' | 'ca')[];
  /** Mujer u hombre, solo para «Colaboradora»/«Colaborador» y «te presenta». */
  genero: 'f' | 'm';
}

// Gis: amiga de Ruben, lo hace como favor y sin comision (decidido el 22/10). Con su permiso para la foto y el nombre.
export const COLABORADORES: Record<string, Colaborador> = {
  gis: { nombre: 'Gis', foto: '/colaboradores/gis.jpg', idiomas: ['es', 'ca'], genero: 'f' },
};
