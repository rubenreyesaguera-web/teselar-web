// Como se escriben en la pagina los importes y las fechas de una propuesta.

const EUROS_ENTEROS = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0 });
const EUROS_CON_CENTIMOS = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });

/** 76500 → «765 €»; 76550 → «765,50 €». Siempre desde centimos enteros. */
export function euros(centimos: number): string {
  // Intl separa los miles con espacio duro (U+00A0) y, en es-ES, no los separa por debajo de 10.000.
  return (centimos % 100 === 0 ? EUROS_ENTEROS.format(centimos / 100) : EUROS_CON_CENTIMOS.format(centimos / 100));
}

const FECHA_LARGA = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** «2026-10-06» → «6 de octubre de 2026». */
export function fechaLarga(aaaammdd: string): string {
  return FECHA_LARGA.format(new Date(`${aaaammdd}T00:00:00Z`));
}

const MOMENTO = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid',
});

/** Un instante de la base, en hora de Lloret: «6 de octubre de 2026 a las 21:30». */
export function momento(d: Date): string {
  return MOMENTO.format(d);
}
