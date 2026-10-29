import { describe, expect, test } from 'bun:test';
import { PDFDocument } from 'pdf-lib';
import ejemplo from '../../../scripts/propuesta.ejemplo.json';
import { construirInstantanea, validarContenido } from './instantanea';
import { CONDICIONES, LENGUAS } from './condiciones';
import { aWinAnsi, generarPdf } from './pdf';
import { textoAcuse } from './aviso';
import type { Identidad, Justificante } from './aceptar';

const instantanea = construirInstantanea(validarContenido(structuredClone(ejemplo)), { referencia: 'P-2026-001', version: 1, fecha: '2026-10-06' });
const j: Justificante = { referencia: 'P-2026-001', version: 1, offer_hash: 'f'.repeat(64), accepted_at: '2026-10-08T09:15:00.000Z' };
const sociedad: Identidad = {
  nombre: 'Persona de Prueba', dni: '12345678Z', correo: 'prueba@example.com', tipo: 'sociedad',
  razon_social: 'Ejemplo, S.L.', nif_sociedad: 'B12345674', domicilio: 'Carrer de Prova 1, 17310 Lloret de Mar', cargo: 'Administradora',
};

describe('el PDF del cliente (ADR-117)', () => {
  test('todo el texto de las condiciones se puede escribir con Helvetica sin cambiar nada', () => {
    for (const l of LENGUAS) {
      const todo = JSON.stringify(CONDICIONES.texto[l]);
      expect(aWinAnsi(todo)).toBe(todo);
    }
  });

  for (const l of LENGUAS) {
    test(`${l}: se genera, con metadatos de Teselar y sin rastro de la librería`, async () => {
      const bytes = await generarPdf({ instantanea: { ...instantanea, idioma: l }, justificante: j, quien: sociedad, lengua: l, domicilioProveedor: 'Lloret de Mar (Girona)' });
      expect(new TextDecoder().decode(bytes.slice(0, 5))).toBe('%PDF-');
      const doc = await PDFDocument.load(bytes, { updateMetadata: false });
      expect(doc.getProducer()).toBe('Teselar Software');
      expect(doc.getCreator()).toBe('Teselar Software');
      expect(doc.getAuthor()).toBe('Teselar Software');
      expect(doc.getPageCount()).toBeGreaterThan(2);
      expect(new TextDecoder('latin1').decode(bytes)).not.toMatch(/pdf-lib|Claude|Anthropic/i);
    });
  }
});

describe('el correo del acuse', () => {
  test('castellano: «Un saludo,» sin nombre debajo en el texto; la firma lo pone', () => {
    const a = textoAcuse(j, sociedad, 'es', 'neondb');
    expect(a.asunto).toBe('Propuesta P-2026-001 aceptada: tu copia y el justificante');
    expect(a.texto).toContain('Hola, Persona:');
    expect(a.texto).toContain('he recibido tu aceptación el 8 de octubre de 2026 a las 11:15.');
    expect(a.texto).not.toContain('Lloret');
    expect(a.texto).toMatch(/Un saludo,\n\n-- \nRubén Reyes · Teselar Software/);
    expect(a.html).toContain('<p>Un saludo,</p></div><table');
    expect(a.nombrePdf).toBe('Propuesta-P-2026-001-v1.pdf');
  });

  test('catalán, y las pruebas lo dicen en el asunto', () => {
    const a = textoAcuse(j, sociedad, 'ca', 'propuestas_pruebas');
    expect(a.asunto).toBe('[PRUEBAS] Proposta P-2026-001 acceptada: la teva còpia i el justificant');
    expect(a.texto).toContain('Gràcies per acceptar la proposta P-2026-001');
    expect(a.texto).toContain('el 8 d’octubre del 2026 a les 11:15.');
    expect(a.html).toContain('Solucions de desenvolupament a mida');
  });

  test('lo que escribe el cliente no se cuela como HTML', () => {
    expect(textoAcuse(j, { ...sociedad, nombre: '<b>Hola</b> x' }, 'es', 'neondb').html).toContain('&lt;b&gt;Hola&lt;/b&gt;');
  });
});
