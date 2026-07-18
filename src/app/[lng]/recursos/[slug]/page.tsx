'use client';

import React, { use, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, notFound } from 'next/navigation';
import { Background3D } from '../../../../components/Background3D';
import { getRecurso } from '../../../../data/recursos';
import { CheckCircle2, Mail, Loader2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ lng: string; slug: string }>;
}

export default function RecursoLandingPage({ params }: PageProps) {
  const { lng, slug } = use(params);
  const router = useRouter();
  const recurso = getRecurso(slug);

  const [email, setEmail] = useState('');
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!recurso) {
    notFound();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!gdprAccepted) {
      setError('Debes aceptar la política de privacidad para continuar.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    if (formData.get('botcheck')) {
      // honeypot: bot detectado, no enviar
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          slug: recurso!.slug,
          titulo: recurso!.titulo,
          consentimiento: gdprAccepted,
          origen: 'landing-recursos',
        }),
      });

      if (!response.ok) {
        throw new Error('request-failed');
      }

      router.push(`/${lng}/recursos/${recurso!.slug}/gracias`);
    } catch {
      setError('No se pudo enviar el formulario. Inténtalo de nuevo en unos segundos.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative text-claridad font-sans antialiased flex flex-col justify-between selection:bg-innovacion selection:text-teselar-dark">
      <Background3D />

      <div className="flex-grow flex items-center justify-center px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl w-full glass-card p-8 md:p-10 rounded-3xl shadow-2xl border border-innovacion/25 relative overflow-hidden"
        >
          <div className="absolute top-[-50px] left-[50%] -translate-x-1/2 w-48 h-48 rounded-full bg-innovacion/10 blur-2xl pointer-events-none" />

          <span className="inline-block text-xs font-black uppercase tracking-widest text-innovacion mb-4">
            {recurso!.formato} · Gratis
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-glow-cyan text-claridad">
            {recurso!.titulo}
          </h1>

          <p className="text-base md:text-lg font-light text-claridad/85 mb-8 leading-relaxed">
            {recurso!.subtitulo}
          </p>

          <ul className="space-y-3 mb-10">
            {recurso!.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-claridad/80">
                <CheckCircle2 className="text-innovacion w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-black tracking-wider uppercase text-claridad/80 pl-1.5">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="gdpr"
                name="gdpr"
                checked={gdprAccepted}
                onChange={(e) => setGdprAccepted(e.target.checked)}
                required
                className="mt-1 w-5.5 h-5.5 rounded border-claridad/25 text-innovacion focus:ring-innovacion bg-teselar-dark cursor-pointer flex-shrink-0"
              />
              <label htmlFor="gdpr" className="text-xs md:text-sm leading-relaxed text-claridad/80 cursor-pointer font-light">
                Acepto la{' '}
                <a
                  href={`/${lng}/legal/privacidad`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-innovacion underline hover:text-claridad"
                >
                  política de privacidad
                </a>{' '}
                y quiero recibir este recurso por email.
              </label>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting || !gdprAccepted}
              className="w-full bg-innovacion text-teselar-dark font-black tracking-wider uppercase py-4 md:py-5 rounded-2xl shadow-xl shadow-innovacion/15 hover:bg-claridad hover:text-teselar-dark hover:scale-[1.01] transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Mail size={18} />
                  Recibir por Email
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <footer className="py-6 border-t border-claridad/10 bg-teselar-dark/80 relative z-20 text-xs font-light text-claridad/40 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Teselar Software. All rights reserved.</span>
          <div className="flex gap-4 text-claridad/60 font-semibold">
            <span>info@teselarsoftware.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
