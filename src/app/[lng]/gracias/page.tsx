'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Background3D } from '../../../components/Background3D';
import { dictionaries } from '../../../i18n/dictionaries';
import { CheckCircle, ArrowLeft, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

interface PageProps {
  params: Promise<{ lng: string }>;
}

export default function GraciasPage({ params }: PageProps) {
  const { lng } = use(params);
  const t = dictionaries[lng as 'es' | 'ca' | 'en'] || dictionaries.en;
  const router = useRouter();

  const handleBack = () => {
    router.push(`/${lng}`);
  };

  return (
    <div className="min-h-screen relative text-claridad font-sans antialiased flex flex-col justify-between selection:bg-innovacion selection:text-teselar-dark">
      
      {/* 3D background */}
      <Background3D />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl w-full glass-card p-10 rounded-3xl text-center shadow-2xl border border-innovacion/25 relative overflow-hidden"
        >
          {/* Glowing neon sphere background behind the check icon */}
          <div className="absolute top-[-50px] left-[50%] -translate-x-1/2 w-48 h-48 rounded-full bg-innovacion/10 blur-2xl pointer-events-none" />

          {/* Large Check Circle Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 mx-auto bg-innovacion/10 border border-innovacion/45 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-innovacion/10"
          >
            <CheckCircle className="text-innovacion w-10 h-10" />
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight text-glow-cyan text-innovacion"
          >
            {lng === 'es' ? '¡Muchas Gracias!' : lng === 'ca' ? 'Moltes Gràcies!' : 'Thank You!'}
          </motion.h1>

          {/* Subheading/Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg font-light text-claridad/90 mb-10 leading-relaxed"
          >
            {t.contact.success}
          </motion.p>

          {/* Back home button */}
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-innovacion text-teselar-dark px-8 py-3.5 rounded-full font-black text-sm tracking-wider hover:bg-claridad hover:text-teselar-dark transition-all duration-300 shadow-xl shadow-innovacion/20 cursor-pointer"
          >
            <ArrowLeft size={16} />
            {lng === 'es' ? 'Volver al Inicio' : lng === 'ca' ? 'Tornar a l\'Inici' : 'Back to Home'}
          </motion.button>
        </motion.div>
      </main>

      {/* Mini Footer */}
      <footer className="py-6 border-t border-claridad/10 bg-teselar-dark/80 relative z-20 text-xs font-light text-claridad/70 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Teselar Software. All rights reserved.</span>
          <div className="flex gap-4 text-claridad/60 font-semibold">
            <span>info@teselarsoftware.com</span>
            <span>|</span>
            <span>+34 653 232 735</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
