'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { useRouter, notFound } from 'next/navigation';
import { Background3D } from '../../../../../components/Background3D';
import { getRecurso } from '../../../../../data/recursos';
import { CheckCircle, ArrowLeft, MailWarning } from 'lucide-react';

interface PageProps {
  params: Promise<{ lng: string; slug: string }>;
}

export default function RecursoGraciasPage({ params }: PageProps) {
  const { lng, slug } = use(params);
  const router = useRouter();
  const recurso = getRecurso(slug);

  if (!recurso) {
    notFound();
  }

  const handleBack = () => {
    router.push(`/${lng}`);
  };

  return (
    <div className="min-h-screen relative text-claridad font-sans antialiased flex flex-col justify-between selection:bg-innovacion selection:text-teselar-dark">
      <Background3D />

      <div className="flex-grow flex items-center justify-center px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl w-full glass-card p-10 rounded-3xl text-center shadow-2xl border border-innovacion/25 relative overflow-hidden"
        >
          <div className="absolute top-[-50px] left-[50%] -translate-x-1/2 w-48 h-48 rounded-full bg-innovacion/10 blur-2xl pointer-events-none" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 mx-auto bg-innovacion/10 border border-innovacion/45 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-innovacion/10"
          >
            <CheckCircle className="text-innovacion w-10 h-10" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight text-glow-cyan text-innovacion"
          >
            ¡Listo!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg font-light text-claridad/90 mb-8 leading-relaxed"
          >
            Te hemos enviado <strong>{recurso!.titulo}</strong> a tu email.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-start gap-2.5 text-left text-xs md:text-sm text-claridad/60 bg-teselar-dark/40 border border-claridad/10 rounded-xl p-4 mb-8"
          >
            <MailWarning className="w-4 h-4 flex-shrink-0 mt-0.5 text-innovacion/80" />
            <span>
              Revisa tu bandeja de entrada en los próximos minutos. Si no lo ves, echa un vistazo a
              la carpeta de <strong>spam / no deseado</strong>, por si acaso.
            </span>
          </motion.div>

          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 glass-panel text-claridad px-8 py-3 rounded-full font-black text-sm tracking-wider hover:bg-innovacion hover:text-teselar-dark transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft size={16} />
            {lng === 'es' ? 'Volver al Inicio' : lng === 'ca' ? "Tornar a l'Inici" : 'Back to Home'}
          </motion.button>
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
