// DNI, NIE y NIF de sociedades: forma y digito de control oficiales. Pilla erratas; NO verifica que el documento
// sea de quien lo escribe (la identidad sigue siendo autodeclarada, ADR-091).

const LETRAS_DNI = 'TRWAGMYFPDXBNJZSQVHLCKE';

/** Quita espacios, guiones y puntos y pasa a mayusculas: «12.345.678-z» → «12345678Z». */
export function normalizarDocumento(s: string): string {
  return s.toUpperCase().replace(/[\s.-]/g, '');
}

/** DNI (8 cifras + letra) o NIE (X/Y/Z + 7 cifras + letra), con su letra de control. */
export function dniValido(s: string): boolean {
  const d = normalizarDocumento(s);
  const m = /^([XYZ]?)(\d{7,8})([A-Z])$/.exec(d);
  if (!m) return false;
  const [, prefijo, cifras, letra] = m;
  if (prefijo ? cifras.length !== 7 : cifras.length !== 8) return false;
  const numero = Number(`${prefijo ? 'XYZ'.indexOf(prefijo) : ''}${cifras}`);
  return LETRAS_DNI[numero % 23] === letra;
}

/**
 * NIF de una persona juridica (el antiguo CIF): letra de tipo + 7 cifras + control. El control es una cifra o una
 * letra segun el tipo de entidad: S.A. y S.L. (A, B), comunidades de bienes (E) y de propietarios (H) llevan cifra;
 * los organismos y entidades extranjeras (N, P, Q, R, S, W), letra; el resto, cualquiera de las dos.
 */
export function nifSociedadValido(s: string): boolean {
  const d = normalizarDocumento(s);
  const m = /^([ABCDEFGHJNPQRSUVW])(\d{7})([0-9A-J])$/.exec(d);
  if (!m) return false;
  const [, tipo, cifras, control] = m;
  let suma = 0;
  for (let i = 0; i < 7; i++) {
    const n = Number(cifras[i]);
    if (i % 2 === 0) {
      const doble = n * 2;
      suma += Math.floor(doble / 10) + (doble % 10);
    } else {
      suma += n;
    }
  }
  const digito = (10 - (suma % 10)) % 10;
  const letra = 'JABCDEFGHI'[digito];
  if ('ABEH'.includes(tipo)) return control === String(digito);
  if ('NPQRSW'.includes(tipo)) return control === letra;
  return control === String(digito) || control === letra;
}
