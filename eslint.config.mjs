// Configuracion de ESLint de la web (6/10/2026). Hasta ese dia no habia ninguna: `next lint`
// abria el asistente interactivo y salia con error, asi que la puerta 3 del DoD no se podia
// pasar. Este fichero es un fichero de calidad PROTEGIDO por las normas de la boveda: no se
// relajan reglas ni se excluyen ficheros para que el lint pase; se corrige el codigo.
//
// Las reglas son las de Next.js (core-web-vitals + TypeScript), en formato plano de ESLint 9.
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Los plugins se buscan desde eslint-config-next: npm instalo eslint-plugin-react-hooks
// anidado dentro de el (node_modules/eslint-config-next/node_modules), y buscado desde la
// raiz no se encuentra.
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: join(__dirname, 'node_modules', 'eslint-config-next'),
});

export default [
  // Solo lo que se compila y se genera, nunca codigo propio.
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];
