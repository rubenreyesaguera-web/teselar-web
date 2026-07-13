'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';

interface Msg {
  sender: 'bot' | 'user';
  text: string;
}

const TEXTOS: Record<string, { titulo: string; badge: string; saludo: string; placeholder: string; error: string; teaser: string }> = {
  es: {
    titulo: 'Asistente Teselar',
    badge: 'IA en vivo — esto es lo que construimos',
    saludo: '¡Hola! Soy el asistente de Teselar 🤖 Y sí, soy una demo en vivo de lo que hacemos: asistentes como yo desde 800€. ¿Qué necesita tu negocio? ¿Una web, una automatización, un sistema a medida?',
    placeholder: 'Escribe tu mensaje...',
    error: 'Algo ha fallado. Prueba de nuevo o escríbenos por WhatsApp: +34 653 232 735.',
    teaser: '¿Tienes 1 minuto? Pregúntame precios o cuéntame tu proyecto — soy la IA de Teselar 🤖'
  },
  ca: {
    titulo: 'Assistent Teselar',
    badge: 'IA en viu — això és el que construïm',
    saludo: 'Hola! Sóc l\'assistent de Teselar 🤖 I sí, sóc una demo en viu del que fem: assistents com jo des de 800€. Què necessita el teu negoci? Una web, una automatització, un sistema a mida?',
    placeholder: 'Escriu el teu missatge...',
    error: 'Alguna cosa ha fallat. Torna-ho a provar o escriu-nos per WhatsApp: +34 653 232 735.',
    teaser: 'Tens 1 minut? Pregunta\'m preus o explica\'m el teu projecte — sóc la IA de Teselar 🤖'
  },
  en: {
    titulo: 'Teselar Assistant',
    badge: 'Live AI — this is what we build',
    saludo: 'Hi! I\'m the Teselar assistant 🤖 And yes, I\'m a live demo of what we build: assistants like me from 800€. What does your business need? A website, an automation, a custom system?',
    placeholder: 'Type your message...',
    error: 'Something went wrong. Try again or message us on WhatsApp: +34 653 232 735.',
    teaser: 'Got 1 minute? Ask me about pricing or tell me about your project — I\'m Teselar\'s AI 🤖'
  }
};

export function ChatWidget({ lng }: { lng: string }) {
  const t = TEXTOS[lng] || TEXTOS.es;
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Msg[]>([{ sender: 'bot', text: t.saludo }]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (abierto) finRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, cargando, abierto]);

  // Invitación automática: aparece a los 5s, una vez por sesión, sin abrir el panel
  useEffect(() => {
    if (sessionStorage.getItem('chat_teaser_visto')) return;
    const t = setTimeout(() => setTeaser(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const cerrarTeaser = () => {
    setTeaser(false);
    sessionStorage.setItem('chat_teaser_visto', '1');
  };

  const abrirChat = () => {
    cerrarTeaser();
    setAbierto(v => !v);
  };

  const enviar = async () => {
    const texto = input.trim();
    if (!texto || cargando) return;
    const historial = mensajes;
    setMensajes(prev => [...prev, { sender: 'user', text: texto }]);
    setInput('');
    setCargando(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historial, newMsgText: texto, leadCaptured, lng })
      });
      const data = await res.json();
      if (!res.ok || !data.response) throw new Error('sin respuesta');
      if (data.leadClosed) setLeadCaptured(true);
      setMensajes(prev => [...prev, { sender: 'bot', text: data.response }]);
    } catch {
      setMensajes(prev => [...prev, { sender: 'bot', text: t.error }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* Burbuja de invitación */}
      {teaser && !abierto && (
        <div className="fixed bottom-24 right-5 z-[99998] max-w-[280px] bg-teselar-dark border border-innovacion/40 rounded-2xl rounded-br-md shadow-[0_8px_30px_rgba(0,191,165,0.25)] p-4 animate-[fadeIn_.4s_ease]">
          <button onClick={cerrarTeaser} aria-label="Cerrar" className="absolute top-2 right-2 text-claridad/40 hover:text-claridad cursor-pointer">
            <X size={14} />
          </button>
          <p onClick={abrirChat} className="text-claridad/90 text-[13px] leading-relaxed pr-4 cursor-pointer">{t.teaser}</p>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={abrirChat}
        aria-label={t.titulo}
        className="fixed bottom-5 right-5 z-[99998] w-16 h-16 rounded-full bg-innovacion text-teselar-dark shadow-[0_0_30px_rgba(0,191,165,0.55)] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
      >
        {!abierto && <span className="absolute inset-0 rounded-full bg-innovacion/50 animate-ping" style={{ animationDuration: '2.5s' }} />}
        <span className="relative">{abierto ? <X size={26} /> : <Bot size={30} />}</span>
      </button>

      {/* Panel */}
      {abierto && (
        <div className="fixed bottom-24 right-5 z-[99998] w-[92vw] max-w-sm h-[480px] max-h-[70vh] rounded-3xl border border-innovacion/25 bg-teselar-dark/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Cabecera */}
          <div className="px-5 py-4 border-b border-claridad/10 bg-innovacion/5">
            <div className="flex items-center gap-2 text-claridad font-bold text-sm">
              <Bot size={18} className="text-innovacion" /> {t.titulo}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-innovacion/80 mt-1 uppercase tracking-wider">
              <Sparkles size={11} /> {t.badge}
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {mensajes.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-innovacion text-teselar-dark rounded-br-md font-medium'
                    : 'bg-claridad/8 text-claridad/90 rounded-bl-md border border-claridad/10'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {cargando && (
              <div className="flex justify-start">
                <div className="bg-claridad/8 border border-claridad/10 px-4 py-2.5 rounded-2xl rounded-bl-md text-claridad/60 text-[13px] animate-pulse">
                  ●●●
                </div>
              </div>
            )}
            <div ref={finRef} />
          </div>

          {/* Entrada */}
          <div className="p-3 border-t border-claridad/10 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') enviar(); }}
              placeholder={t.placeholder}
              className="flex-1 bg-claridad/5 border border-claridad/15 rounded-xl px-4 py-2.5 text-[13px] text-claridad placeholder:text-claridad/35 focus:outline-none focus:border-innovacion/50"
            />
            <button
              onClick={enviar}
              disabled={cargando || !input.trim()}
              aria-label="Enviar"
              className="w-11 h-11 rounded-xl bg-innovacion text-teselar-dark flex items-center justify-center disabled:opacity-40 hover:brightness-110 transition cursor-pointer"
            >
              <Send size={17} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
