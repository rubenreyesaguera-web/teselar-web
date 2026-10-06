import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
  reactStrictMode: true,
  // Desde 2026-07-18 el repo raíz de TESELAR (padre de este directorio) también tiene su propio
  // package-lock.json (ADR-002). Next detecta ambos lockfiles y a veces infiere mal la raíz del
  // workspace, lo que rompe el bundling de vendor-chunks en `next start`. Fijamos la raíz aquí
  // explícitamente para que siempre sea este directorio.
  outputFileTracingRoot: __dirname,
  // Las propuestas (ADR-091): nunca indexadas ni archivadas, sin enviar la URL a otros sitios y sin que
  // nadie pueda meterlas en un marco. Va en cabecera ademas de en la meta, porque la cabecera tambien
  // cubre el 404 y cualquier respuesta que no sea HTML.
  async headers() {
    return [
      {
        source: '/p/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
    ];
  },
};

export default nextConfig;
