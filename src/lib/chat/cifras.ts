// TesS no inventa cifras (ADR-122; pendiente del 30/11 para P8). En la batería del 12/11, al taller que dijo «me llaman unas
// 10 veces a la semana», le contestó «10 llamadas a la semana son más de 40 clientes al mes que puedes estar perdiendo»: el 40
// no lo había dicho nadie. El servidor mira cada cifra de la respuesta y de qué es:
//  - de clientes, citas, llamadas, reservas, ventas, pedidos o visitas: solo vale si la ha dicho el usuario;
//  - de euros, céntimos, horas o porcentajes: vale si está en el catálogo (el prompt) con esa misma unidad o la ha dicho el usuario.
// Una cifra sin unidad cerca (un teléfono, «paso 1») no se mira. Lo que haya dicho antes TesS no cuenta como fuente: también
// pudo inventarlo.
const plano = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const CUENTAS = /^(clientes?|citas?|llamadas?|reservas?|ventas?|pedidos?|visitas?|pacientes?|clients?|cites?|trucades?|vendes?|comandes?|visites?|appointments?|calls?|bookings?|sales|orders?|customers?|patients?)$/;
const DINERO = /^(€|eur|euros?|centimos?|cents?|centims?)$/;
const HORAS = /^(h|horas?|hores|hours?|hrs?)$/;
const PORCENTAJE = /^(%|por|per|percent)$/;

const PALABRAS: Record<string, number> = {
  dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12, quince: 15,
  veinte: 20, treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90, cien: 100,
  cent: 100, deu: 10, vint: 20, trenta: 30, quaranta: 40, cinquanta: 50, seixanta: 60,
  ten: 10, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, hundred: 100,
};

// «1.490» y «10.915» son miles; «1,7» y «34,99», decimales; «1,490» (en inglés) también puede ser miles: se dan las dos lecturas.
function lecturas(n: string): number[] {
  if (/^\d{1,3}(\.\d{3})+$/.test(n)) return [Number(n.replace(/\./g, ''))];
  if (/^\d{1,3}(,\d{3})+$/.test(n)) return [Number(n.replace(/,/g, '')), Number(n.replace(',', '.'))];
  if (/^\d+,\d+$/.test(n)) return [Number(n.replace(',', '.'))];
  return [Number(n)];
}

const fichas = (t: string) => plano(t).replace(/(\d)\s*([€%])/g, '$1 $2').replace(/([€])(\d)/g, '$1 $2').match(/\d+(?:[.,]\d+)*|[a-z]+|[€%]/g) ?? [];

function numeros(texto: string): Set<number> {
  const s = new Set<number>();
  for (const f of fichas(texto)) {
    if (/^\d/.test(f)) lecturas(f).forEach(n => s.add(n));
    else if (f in PALABRAS) s.add(PALABRAS[f]);
  }
  return s;
}

type Tipo = 'cuenta' | 'dinero' | 'horas' | 'porcentaje';

// De qué es cada cifra: la unidad que la sigue (hasta dos palabras: «40 clientes», «más de 40 nuevos clientes», «29 €/mes»),
// el símbolo de euro delante («€990») o, si no hay nada detrás, una palabra de cuentas justo antes («clientes, unos 40»).
function cifrasConTipo(texto: string): { valor: number[]; tipo: Tipo; tal: string }[] {
  const f = fichas(texto);
  const out: { valor: number[]; tipo: Tipo; tal: string }[] = [];
  f.forEach((x, i) => {
    const valor = /^\d/.test(x) ? lecturas(x) : x in PALABRAS ? [PALABRAS[x]] : null;
    if (!valor) return;
    const detras = f.slice(i + 1, i + 4);
    let tipo: Tipo | null = null;
    for (const d of detras) {
      if (/^\d/.test(d) || d in PALABRAS) break;
      if (DINERO.test(d)) { tipo = 'dinero'; break; }
      if (PORCENTAJE.test(d) && (d === '%' || detras.includes('ciento') || detras.includes('cent') || d === 'percent')) { tipo = 'porcentaje'; break; }
      if (HORAS.test(d)) { tipo = 'horas'; break; }
      if (CUENTAS.test(d)) { tipo = 'cuenta'; break; }
    }
    if (!tipo && f[i - 1] === '€') tipo = 'dinero';
    if (!tipo && f.slice(Math.max(0, i - 4), i).some(d => CUENTAS.test(d))) tipo = 'cuenta';
    // Las palabras («dos», «diez») solo cuentan si van pegadas a su unidad: «las dos versiones» no es una cifra
    if (!tipo || (!/^\d/.test(x) && !detras.slice(0, 2).some(d => CUENTAS.test(d) || DINERO.test(d)))) return;
    out.push({ valor, tipo, tal: x });
  });
  return out;
}

// Las cifras inventadas de la respuesta, tal como salen escritas (vacío si no hay ninguna).
// Del catálogo vale cada cifra con su misma unidad: «30 minutos» no da por bueno un «30 %» ni «30 €».
export function cifrasInventadas(respuesta: string, catalogo: string, delUsuario: string[]): string[] {
  const usuario = numeros(delUsuario.join(' \n '));
  const delCatalogo: Record<Tipo, Set<number>> = { cuenta: new Set(), dinero: new Set(), horas: new Set(), porcentaje: new Set() };
  for (const c of cifrasConTipo(catalogo)) if (c.tipo !== 'cuenta') c.valor.forEach(v => delCatalogo[c.tipo].add(v));
  return cifrasConTipo(respuesta)
    .filter(({ valor, tipo }) => !valor.some(v => usuario.has(v) || delCatalogo[tipo].has(v)))
    .map(c => c.tal);
}
