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
};

export default nextConfig;
