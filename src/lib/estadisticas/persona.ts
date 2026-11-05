// Contar solo cuando hay alguien delante (5/11, antes de la campana de Meta del 16/11). Los robots que se presentan como
// un movil normal, como el comprobador de enlaces de Meta, pasan el filtro del navegador de /api/visita: cargan la
// pagina y se van. Una pagina vista se cuenta cuando hay un gesto de verdad (tocar, rueda, tecla o clic) o cuando lleva
// SEGUNDOS_A_LA_VISTA a la vista; si el navegador avisa de que lo maneja un programa (navigator.webdriver), nunca. Todo
// pasa en el navegador: no se manda ni se guarda nada mas.

/** Gestos que un script no puede imitar (llegan con isTrusted) y que el scroll programado no dispara. */
const GESTOS = ['pointerdown', 'touchstart', 'wheel', 'keydown'] as const;

export const SEGUNDOS_A_LA_VISTA = 15;

interface Documento extends EventTarget {
  visibilityState: string;
}

/**
 * Se resuelve con la primera señal de persona; con navigator.webdriver, nunca. El tiempo solo corre con la pestaña a la
 * vista. `esReal` existe para las pruebas: fuera de ellas, un evento lanzado por un script no cuenta.
 */
export function esperarPersona(
  ventana: EventTarget,
  doc: Documento,
  nav: { webdriver?: boolean },
  ms = SEGUNDOS_A_LA_VISTA * 1000,
  esReal: (e: Event) => boolean = (e) => e.isTrusted,
): Promise<void> {
  if (nav.webdriver) return new Promise(() => {});
  return new Promise((resolve) => {
    let quedan = ms;
    let desde = 0;
    let reloj: ReturnType<typeof setTimeout> | undefined;
    const arrancar = () => {
      if (reloj !== undefined) return;
      desde = Date.now();
      reloj = setTimeout(listo, quedan);
    };
    const parar = () => {
      if (reloj === undefined) return;
      clearTimeout(reloj);
      reloj = undefined;
      quedan -= Date.now() - desde;
    };
    const cambio = () => (doc.visibilityState === 'visible' ? arrancar() : parar());
    const gesto = (e: Event) => {
      if (esReal(e)) listo();
    };
    function listo() {
      parar();
      for (const g of GESTOS) ventana.removeEventListener(g, gesto, true);
      doc.removeEventListener('visibilitychange', cambio);
      resolve();
    }
    for (const g of GESTOS) ventana.addEventListener(g, gesto, { capture: true, passive: true });
    doc.addEventListener('visibilitychange', cambio);
    if (doc.visibilityState === 'visible') arrancar();
  });
}

let persona: Promise<void> | null = null;

/** Una sola espera por pagina cargada: con la primera señal, las paginas siguientes cuentan al momento. */
export function hayPersona(): Promise<void> {
  persona ??= esperarPersona(window, document, navigator);
  return persona;
}
