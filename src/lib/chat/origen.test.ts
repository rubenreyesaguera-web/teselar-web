import { describe, expect, test } from 'bun:test';
import { origenDelLead } from './origen';

describe('origen del lead del chat', () => {
  test('sin etiqueta, o con una que no vale, sigue siendo tess', () => {
    expect(origenDelLead(undefined)).toBe('tess');
    expect(origenDelLead(null)).toBe('tess');
    expect(origenDelLead('')).toBe('tess');
    expect(origenDelLead(42)).toBe('tess');
    expect(origenDelLead('=HYPERLINK("http://x")')).toBe('tess');
    expect(origenDelLead('a'.repeat(31))).toBe('tess');
  });

  test('con etiqueta, tess y la etiqueta limpia', () => {
    expect(origenDelLead('meta-tess')).toBe('tess · meta-tess');
    expect(origenDelLead(' Meta-TesS ')).toBe('tess · meta-tess');
  });
});
