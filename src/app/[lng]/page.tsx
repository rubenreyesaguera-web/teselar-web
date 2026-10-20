'use client';

import React, { useState, useEffect, use, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ChatWidget } from '../../components/ChatWidget';
import { dictionaries } from '../../i18n/dictionaries';
import {
  Search, Zap, Laptop, Brain, Briefcase, ShoppingCart, Languages, Monitor, Building2,
  ArrowRight, CheckCircle2, AlertCircle, Info, Menu, X, Mail, Phone, MapPin,
  CreditCard, ChevronRight, ChevronDown, Calendar, Sparkles,
  Gift, Send, MessageCircle, Linkedin, Instagram, CalendarCheck
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lng: string }>;
}

// First step of the ladder: the free 30-minute diagnosis. The 150€ audit is the second one.
const CALENDLY_URL = 'https://calendly.com/teselarsoftware-info/diagnostico30min';
const WHATSAPP_NUM = '34653232735';

// Tres acciones para tres momentos, y solo tres (2026-09-10): TesS para quien mira y
// tiene una duda, WhatsApp para quien ya sabe y quiere una persona, y el Calendly de
// 30 minutos como puerta de la escalera de ADR-021. El formulario deja de ser un boton
// suelto en cada seccion y vuelve a ser el sitio donde se cuenta el caso con calma.
// El mensaje previo dice de que seccion viene, para saberlo sin preguntarlo.
// Preguntas frecuentes que se ven sin pulsar «ver todas» (20/10).
const PREGUNTAS_VISIBLES = 5;

const waLink = (mensaje: string) => `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(mensaje)}`;

export default function Page({ params }: PageProps) {
  const { lng: urlLng } = use(params);
  const [currentLng, setCurrentLng] = useState(urlLng);
  const lng = currentLng;
  const t = dictionaries[currentLng as 'es' | 'ca' | 'en'] || dictionaries.en;
  
  // Keep local language state synchronized if URL is directly navigated
  useEffect(() => {
    setCurrentLng(urlLng);
  }, [urlLng]);

  // El titular empieza por IA y no por "Webs" desde el 6/10/2026, alineado con el titulo de
  // la pagina (ADR-084). Antes se construia palabra a palabra con el scroll; desde el 20/10
  // se sirve entero.
  const TITULARES: Record<string, string> = {
    es: 'IA, automatizaciones y software a medida',
    ca: 'IA, automatitzacions i programari a mida',
    en: 'AI, automations and custom software',
  };
  const heroTitulo = TITULARES[currentLng] ?? TITULARES.en;

  // Los numeros del simulador se formateaban con toLocaleString() SIN idioma, asi que
  // cada lado usaba el suyo: el servidor de Vercel escribia "20,784" y el navegador
  // espanol "20.784". Eso rompia la hidratacion de React (error #418) en produccion,
  // y no se veia en local porque alli servidor y navegador comparten idioma.
  const LOCALES: Record<string, string> = { es: 'es-ES', ca: 'ca-ES', en: 'en-US' };
  const fmt = (n: number) => n.toLocaleString(LOCALES[currentLng] ?? 'es-ES');
  
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setSelectedService] = useState<string | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactReason, setContactReason] = useState('info'); // default to requesting info
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'automation' | 'systems'>('all');
  // El servicio del catalogo que tiene desplegado "lo que incluye" (uno a la vez).
  const [servicioAbierto, setServicioAbierto] = useState<string | null>(null);
  // Lo mismo para los planes de mantenimiento y las cuotas, y para las preguntas y el simulador.
  const [planAbierto, setPlanAbierto] = useState<string | null>(null);
  const [todasLasPreguntas, setTodasLasPreguntas] = useState(false);
  const [simuladorAbierto, setSimuladorAbierto] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'aviso' | 'privacidad' | 'cookies' | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);


  // States for interactive financial ROI simulator (Option 1)
  const [wastedHours, setWastedHours] = useState(10);
  const [employeeCount, setEmployeeCount] = useState(2);
  const [hourlyCost, setHourlyCost] = useState(20);
  const [showSimulatorNotif, setShowSimulatorNotif] = useState(false);

  // Lead Capture System states
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);
  const [showScrollToast, setShowScrollToast] = useState(false);
  const [scrollToastShown, setScrollToastShown] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [exitFormSubmitting, setExitFormSubmitting] = useState(false);
  const [exitFormSuccess, setExitFormSuccess] = useState(false);
  const contactSectionRef = useRef<HTMLElement>(null);

  // La cabecera se ve desde el principio (20/10). Antes esperaba a que el rotulo central
  // saliera de pantalla, y en la portada no habia navegacion.

  // Lead Capture: Exit-Intent Detection (Desktop only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Check if exit popup was already shown this session
    if (sessionStorage.getItem('teselar_exit_shown') === 'true') {
      setExitPopupShown(true);
    }
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitPopupShown && sessionStorage.getItem('teselar_exit_shown') !== 'true') {
        setShowExitPopup(true);
        setExitPopupShown(true);
        sessionStorage.setItem('teselar_exit_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitPopupShown]);

  // Lead Capture: Scroll Progress Tracking (Sticky Bar + Toast)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if scroll toast was already shown this session
    if (sessionStorage.getItem('teselar_toast_shown') === 'true') {
      setScrollToastShown(true);
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Show sticky bar after scrolling past hero (> 500px)
      if (scrollTop > 500) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }

      // Show scroll toast at 60% scroll depth (once per session)
      if (scrollPercent > 60 && !scrollToastShown && sessionStorage.getItem('teselar_toast_shown') !== 'true') {
        setShowScrollToast(true);
        setScrollToastShown(true);
        sessionStorage.setItem('teselar_toast_shown', 'true');
        // Auto-hide after 8 seconds
        setTimeout(() => setShowScrollToast(false), 8000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollToastShown]);

  // Lead Capture: Hide sticky bar when contact section is visible
  useEffect(() => {
    const el = contactSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowStickyBar(false);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Exit-intent mini form handler
  const handleExitFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExitFormSubmitting(true);

    // Mismo destino que los demas leads. Iba a Web3Forms, que no entrega desde
    // servidor y aqui respondia success sin dejar rastro en ninguna parte (ADR-050).
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origen: 'exit-intent',
          nombre: String(formData.get('name') ?? '').trim(),
          email: String(formData.get('email') ?? '').trim(),
          telefono: String(formData.get('phone') ?? '').trim(),
          quePedia: 'salio por el popup de salida',
          consentimiento: 'si',
        })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.error === undefined) {
        setExitFormSuccess(true);
        setTimeout(() => {
          setShowExitPopup(false);
          setExitFormSuccess(false);
        }, 3000);
      }
    } catch {
      // If there's an error, just close the popup
      setShowExitPopup(false);
    }
    setExitFormSubmitting(false);
  };

  const handleLanguageChange = (newLng: string) => {
    setCurrentLng(newLng);
    
    // Silently update browser URL address bar in-place without triggering a full page reload or scroll-reset
    const segments = pathname.split('/');
    if (segments.length > 1 && ['es', 'ca', 'en'].includes(segments[1])) {
      segments[1] = newLng;
      const newPath = segments.join('/');
      window.history.pushState(null, '', `${newPath}${window.location.search}${window.location.hash}`);
    } else {
      window.history.pushState(null, '', `/${newLng}${window.location.search}${window.location.hash}`);
    }
    
    setIsMenuOpen(false);
  };

  const handleInterest = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setContactReason('quote'); // Preselect quote request/meeting option
    
    const text = currentLng === 'es' 
      ? `Hola Teselar Software, estoy interesado en recibir más información sobre el servicio: "${serviceTitle}".`
      : currentLng === 'ca'
        ? `Hola Teselar Software, estic interessat a rebre més informació sobre el servei: "${serviceTitle}".`
        : `Hello Teselar Software, I am interested in receiving more information about the service: "${serviceTitle}".`;
    
    setContactMessage(text);
    
    // Smooth scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = (reasonType: string) => {
    setContactReason(reasonType);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!gdprAccepted) {
      setSubmitError(currentLng === 'es' ? 'Debe aceptar la política de privacidad para enviar el formulario.' : 'Debe aceptar la política de privacidad.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Va al mismo sitio que los demas leads: /api/lead -> webhook de Make -> hoja.
    // Antes iba a Web3Forms, que respondia success y el correo no llegaba nunca, sin
    // dejar rastro en ninguna parte. Registrar primero, avisar despues (ADR-050).
    const formData = new FormData(e.currentTarget);
    const campo = (k: string) => String(formData.get(k) ?? '').trim();

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origen: 'formulario',
          nombre: campo('name'),
          email: campo('email'),
          telefono: campo('phone'),
          negocio: campo('company'),
          quePedia: [contactReason, campo('budget'), campo('urgency'), campo('message')]
            .filter(Boolean).join(' · '),
          consentimiento: 'si',
        })
      });

      const data = await response.json().catch(() => ({ success: response.ok }));
      if (response.ok && data.error === undefined) {
        window.location.href = `/${currentLng}/gracias`;
      } else {
        setSubmitError(t.contact.error);
        setIsSubmitting(false);
      }
    } catch {
      setSubmitError(t.contact.error);
      setIsSubmitting(false);
    }
  };

  // Build the list of 9 services mapping to dictionary entries
  const servicesList = [
    {
      id: 's1',
      category: 'systems',
      title: t.services.s1.title,
      ideal: t.services.s1.ideal,
      price: t.services.s1.price,
      tag: t.services.s1.tag,
      icon: Search,
      features: [t.services.s1.f1, t.services.s1.f2, t.services.s1.f3, t.services.s1.f4, t.services.s1.f5, t.services.s1.f6, t.services.s1.f7]
    },
    {
      id: 's2',
      category: 'automation',
      title: t.services.s2.title,
      ideal: t.services.s2.ideal,
      price: t.services.s2.price,
      tag: t.services.s2.tag,
      icon: Zap,
      features: [t.services.s2.f1, t.services.s2.f2, t.services.s2.f3, t.services.s2.f4, t.services.s2.f5, t.services.s2.f6, t.services.s2.f7, t.services.s2.f8]
    },
    {
      id: 's9',
      category: 'automation',
      title: t.services.s9.title,
      ideal: t.services.s9.ideal,
      price: t.services.s9.price,
      tag: t.services.s9.tag,
      icon: Calendar,
      features: [t.services.s9.f1, t.services.s9.f2, t.services.s9.f3, t.services.s9.f4, t.services.s9.f5, t.services.s9.f6, t.services.s9.f7, t.services.s9.f8]
    },
    {
      id: 's3',
      category: 'web',
      title: t.services.s3.title,
      ideal: t.services.s3.ideal,
      price: t.services.s3.price,
      tag: t.services.s3.tag,
      icon: Laptop,
      features: [t.services.s3.f1, t.services.s3.f2, t.services.s3.f3, t.services.s3.f4, t.services.s3.f5, t.services.s3.f6, t.services.s3.f7]
    },
    {
      id: 's4',
      category: 'automation',
      title: t.services.s4.title,
      ideal: t.services.s4.ideal,
      price: t.services.s4.price,
      tag: t.services.s4.tag,
      icon: Brain,
      features: [t.services.s4.f1, t.services.s4.f2, t.services.s4.f3, t.services.s4.f4, t.services.s4.f5, t.services.s4.f6, t.services.s4.f7]
    },
    {
      id: 's5',
      category: 'web',
      title: t.services.s5.title,
      ideal: t.services.s5.ideal,
      price: t.services.s5.price,
      tag: t.services.s5.tag,
      icon: Briefcase,
      features: [t.services.s5.hereda, t.services.s5.f1, t.services.s5.f2, t.services.s5.f3, t.services.s5.f4, t.services.s5.f5, t.services.s5.f6, t.services.s5.f7]
    },
    {
      id: 's6',
      category: 'web',
      title: t.services.s6.title,
      ideal: t.services.s6.ideal,
      price: t.services.s6.price,
      tag: t.services.s6.tag,
      icon: ShoppingCart,
      features: [t.services.s6.hereda, t.services.s6.f1, t.services.s6.f2, t.services.s6.f3, t.services.s6.f4, t.services.s6.f5, t.services.s6.f6, t.services.s6.f7, t.services.s6.f8]
    },
    {
      id: 's7',
      category: 'web',
      title: t.services.s7.title,
      ideal: t.services.s7.ideal,
      price: t.services.s7.price,
      tag: t.services.s7.tag,
      icon: Building2,
      features: [t.services.s7.f1, t.services.s7.f2, t.services.s7.f3, t.services.s7.f4, t.services.s7.f5, t.services.s7.f6, t.services.s7.f7]
    },
    {
      id: 's8',
      category: 'systems',
      title: t.services.s8.title,
      ideal: t.services.s8.ideal,
      price: t.services.s8.price,
      tag: t.services.s8.tag,
      icon: Monitor,
      features: [t.services.s8.f1, t.services.s8.f9, t.services.s8.f2, t.services.s8.f3, t.services.s8.f4, t.services.s8.f5, t.services.s8.f6, t.services.s8.f7, t.services.s8.f8]
    }
  ];

  const filteredServices = activeCategory === 'all'
    ? servicesList
    : servicesList.filter(s => s.category === activeCategory);

  // Build the list of FAQ entries mapping to dictionary entries (used for the visible
  // accordion AND to feed the FAQPage JSON-LD generated in the layout)
  const faqList = [
    t.faq.q1, t.faq.q2, t.faq.q3, t.faq.q4, t.faq.q5, t.faq.q6, t.faq.q7, t.faq.q8, t.faq.q9, t.faq.q10, t.faq.q11, t.faq.q12, t.faq.q13
  ];

  return (
    <div className="relative min-h-screen">
      {/* Floating Modern Header / Navbar — one-shot spring reveal, zero per-frame JS after trigger */}
      <header className="fixed top-0 inset-x-0 z-50 px-4 py-4 md:px-8">
        <nav className="max-w-7xl mx-auto glass-panel px-6 py-3.5 rounded-full flex justify-between items-center shadow-lg shadow-teselar-dark/20">
          {/* Logo & Brand name */}
          <a href="#" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
            <img src="/logo.jpeg" alt="Teselar Logo" className="w-10 h-10 rounded-full border border-innovacion/35 object-cover" />
            <span className="font-extrabold text-xl md:text-2xl tracking-tight hidden sm:inline-block">
              TESELAR <span className="text-innovacion font-black">Software</span>
            </span>
          </a>

          {/* Nav links (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-claridad/80">
            <a href="#values" className="hover:text-innovacion transition-colors">{t.nav.values}</a>
            <a href="#services" className="hover:text-innovacion transition-colors">{t.nav.services}</a>
            <a href="#pricing" className="hover:text-innovacion transition-colors">{t.nav.pricing}</a>
            <a href="#process" className="hover:text-innovacion transition-colors">{t.nav.process}</a>
            <a href="#faq" className="hover:text-innovacion transition-colors">{t.nav.faq}</a>
          </div>

          {/* Navigation right controls (CTAs and Selector) */}
          <div className="flex items-center gap-4">
            {/* Quick Language Selector */}
            <div className="relative group">
              <button aria-label={t.a11y.cambiar_idioma} aria-haspopup="menu" className="glass-panel text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 hover:border-innovacion hover:text-innovacion transition-all duration-300">
                <Languages size={13} aria-hidden="true" />
                <span className="uppercase">{currentLng}</span>
              </button>
              <div className="absolute right-0 mt-2 w-28 glass-panel rounded-2xl p-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all duration-300 shadow-xl border border-claridad/10 backdrop-blur-md">
                <button onClick={() => handleLanguageChange('es')} className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-colors ${currentLng === 'es' ? 'bg-innovacion/25 text-innovacion font-black' : 'hover:bg-claridad/10'}`}>Castellano</button>
                <button onClick={() => handleLanguageChange('ca')} className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-colors ${currentLng === 'ca' ? 'bg-innovacion/25 text-innovacion font-black' : 'hover:bg-claridad/10'}`}>Català</button>
                <button onClick={() => handleLanguageChange('en')} className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-colors ${currentLng === 'en' ? 'bg-innovacion/25 text-innovacion font-black' : 'hover:bg-claridad/10'}`}>English</button>
              </div>
            </div>

            {/* Aggressive visible CTA Button */}
            <button 
              onClick={() => handleScrollToContact('meeting')}
              className="bg-innovacion text-teselar-dark font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full hover:bg-claridad active:scale-[0.97] transition-all duration-300 cursor-pointer hidden xs:inline-block"
            >
              {t.nav.contact}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t.a11y.cerrar_menu : t.a11y.abrir_menu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-overlay"
              className="md:hidden p-1 text-claridad hover:text-innovacion transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Responsive Navigation overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            id="mobile-nav-overlay"
            className="fixed inset-0 z-40 bg-teselar-dark/95 backdrop-blur-xl pt-28 px-8 flex flex-col gap-6 md:hidden"
          >
            <div className="flex flex-col gap-5 text-xl font-bold text-claridad/90 border-b border-claridad/10 pb-8">
              <a href="#values" onClick={() => setIsMenuOpen(false)} className="hover:text-innovacion transition-colors">{t.nav.values}</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-innovacion transition-colors">{t.nav.services}</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-innovacion transition-colors">{t.nav.pricing}</a>
              <a href="#process" onClick={() => setIsMenuOpen(false)} className="hover:text-innovacion transition-colors">{t.nav.process}</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="hover:text-innovacion transition-colors">{t.nav.faq}</a>
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-innovacion text-teselar-dark text-center font-extrabold py-3.5 rounded-full hover:bg-claridad"
              >
                {t.hero.cta_alt}
              </a>
              <button 
                onClick={() => handleScrollToContact('info')}
                className="w-full glass-panel text-center font-bold py-3.5 rounded-full border border-claridad/10 hover:border-innovacion hover:text-innovacion"
              >
                {t.hero.cta}
              </button>
            </div>
            
            <div className="flex justify-center gap-6 mt-8 border-t border-claridad/10 pt-8">
              <button onClick={() => handleLanguageChange('es')} className={`text-xs font-bold px-3 py-1.5 rounded-full ${currentLng === 'es' ? 'bg-innovacion text-teselar-dark' : 'glass-panel text-claridad/65'}`}>ES</button>
              <button onClick={() => handleLanguageChange('ca')} className={`text-xs font-bold px-3 py-1.5 rounded-full ${currentLng === 'ca' ? 'bg-innovacion text-teselar-dark' : 'glass-panel text-claridad/65'}`}>CA</button>
              <button onClick={() => handleLanguageChange('en')} className={`text-xs font-bold px-3 py-1.5 rounded-full ${currentLng === 'en' ? 'bg-innovacion text-teselar-dark' : 'glass-panel text-claridad/65'}`}>EN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
      {/* 1. PORTADA (20/10, skills del video: Taste, Impeccable y Emil Kowalski). La idea sale de
          la propia marca, la teselacion: un bloque de Azul Teselar con el titular y, al lado, las
          piezas de un negocio encajadas, con la de Teselar en el hueco. Sin animacion atada al
          scroll: el texto se sirve legible desde el primer pintado, en movil y en escritorio. */}
      <section className="relative z-10 px-4 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 lg:min-h-[620px]">
          <div className="lg:col-span-7 bg-teselar rounded-lg px-6 py-10 sm:px-10 md:px-14 md:py-14 flex flex-col justify-between gap-10">
            <h1 className="text-[2rem] min-[420px]:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-claridad [text-wrap:balance]">
              {heroTitulo}
            </h1>
            <p className="text-lg md:text-xl text-claridad/90 leading-relaxed max-w-2xl [text-wrap:pretty]">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-innovacion text-teselar-dark text-center font-bold text-base px-8 py-4 rounded-md hover:bg-[#2fd4bc] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar size={18} aria-hidden="true" />
                  {t.hero.cta_alt}
                </a>
                <a
                  href={waLink(t.leads.wa_generico)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center font-semibold text-base text-claridad px-4 py-4 underline underline-offset-[6px] decoration-claridad/50 hover:decoration-claridad transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  {t.leads.cta_whatsapp}
                </a>
              </div>
              {/* pr-20 en movil: el boton flotante de TesS se comia el final de esta frase. */}
              <p className="text-base text-claridad/80 leading-relaxed max-w-xl pr-20 sm:pr-0 [text-wrap:pretty]">
                {t.hero.cta_note}
              </p>
            </div>
          </div>

          {/* La teselacion se monta al cargar (Emil Kowalski: el movimiento explica la marca): las
              piezas encajan una tras otra y la de Teselar, la cian, llega la ultima al hueco. Va en
              CSS para no esperar a React; con "reducir movimiento" no se anima. Al pasar el raton,
              cada pieza dice en una linea que se hace con ella. */}
          <div role="img" aria-label={t.hero.piezas_alt} className="lg:col-span-5 grid grid-cols-4 grid-rows-4 gap-2 min-h-[340px] sm:min-h-[420px]">
            {[
              { i: 0, clase: 'col-span-2 bg-teselar-light' },
              { i: 1, clase: 'bg-[#0a3147]' },
              { i: 2, clase: 'row-span-3 bg-teselar-light' },
              { i: 3, clase: 'bg-[#0a3147]' },
              { i: -1, clase: '' },
              { i: 4, clase: 'bg-teselar-light' },
              { i: 5, clase: 'col-span-3 bg-[#0a3147]' },
            ].map(({ i, clase }, orden) => i === -1 ? (
              <div key="teselar" className="pieza-teselar col-span-2 row-span-2 bg-innovacion rounded-md p-5 text-teselar-dark flex flex-col justify-between">
                <span className="text-sm sm:text-base font-semibold">{t.concept.title}</span>
                <span className="text-xl sm:text-2xl font-bold leading-tight [text-wrap:balance]">{t.hero.pieza_texto}</span>
              </div>
            ) : (
              <div key={i} style={{ '--d': `${orden * 55}ms` } as React.CSSProperties} className={`pieza pieza-entra ${clase} rounded-md p-3 sm:p-4 text-claridad/85 flex flex-col justify-end gap-1`}>
                <span className="pieza-desc text-sm leading-snug text-claridad/80 [text-wrap:balance]">{t.hero.piezas_desc[i]}</span>
                <span className="text-sm sm:text-base">{t.hero.piezas[i]}</span>
              </div>
            ))}
            <div style={{ '--d': '330ms' } as React.CSSProperties} className="pieza pieza-entra bg-teselar-light rounded-md" />
          </div>
        </div>
      </section>

      {/* 2. EL CONCEPTO: LA PIEZA QUE ENCAJA. Titulo a un lado y texto al otro (20/10); sin las
          tarjetas que entraban girando con destello. */}
      <section className="relative py-24 md:py-32 px-4 md:px-8 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Titular de manifiesto (20/10): el salto de escala hace que no todas las secciones
              pesen igual al bajar. */}
          <h2 className="lg:col-span-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-claridad [text-wrap:balance]">
            {t.concept.title}
          </h2>
          <div className="lg:col-start-8 lg:col-span-5 flex flex-col gap-6 text-lg md:text-xl text-claridad/85 leading-relaxed lg:self-end">
            <p className="[text-wrap:pretty]">{t.concept.text1}</p>
            <p className="[text-wrap:pretty]">{t.concept.text2}</p>
          </div>
        </div>
      </section>

      {/* 3. SECCION DE VALORES: ¿POR QUE ELEGIRNOS? Sin iconos en cuadrados, sin lineas que se
          dibujan y sin la etiqueta encima del titulo (Impeccable, 20/10). Al pasar el raton la
          tarjeta sube 4 px en 180 ms (Emil Kowalski): la clase .valor, en index.css. */}
      <section id="values" className="relative py-16 md:py-24 px-4 md:px-8 z-10 content-visibility-auto">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-14">
          <div className="max-w-3xl flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-claridad [text-wrap:balance]">{t.values.title}</h2>
            <p className="text-lg md:text-xl text-claridad/85 leading-relaxed [text-wrap:pretty]">{t.values.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="valor bg-teselar-light rounded-lg p-8 md:p-10 flex flex-col gap-3">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-claridad [text-wrap:balance]">{t.values.v1.title}</h3>
              <p className="text-base md:text-lg text-claridad/80 leading-relaxed [text-wrap:pretty]">{t.values.v1.desc}</p>
            </div>
            <div className="valor bg-teselar-light rounded-lg p-8 md:p-10 flex flex-col gap-3">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-claridad [text-wrap:balance]">{t.values.v2.title}</h3>
              <p className="text-base md:text-lg text-claridad/80 leading-relaxed [text-wrap:pretty]">{t.values.v2.desc}</p>
            </div>
            <div className="valor bg-teselar-light rounded-lg p-8 md:p-10 flex flex-col gap-3">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-claridad [text-wrap:balance]">{t.values.v3.title}</h3>
              <p className="text-base md:text-lg text-claridad/80 leading-relaxed [text-wrap:pretty]">{t.values.v3.desc}</p>
            </div>
            <div className="valor bg-teselar-light rounded-lg p-8 md:p-10 flex flex-col gap-3">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-claridad [text-wrap:balance]">{t.values.v4.title}</h3>
              <p className="text-base md:text-lg text-claridad/80 leading-relaxed [text-wrap:pretty]">{t.values.v4.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATALOGO INTERACTIVO DE SERVICIOS */}
      <section id="services" className="relative py-28 px-4 md:px-8 z-10 overflow-hidden content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* Header section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mt-3 mb-8 text-glow-cyan">{t.services.title}</h2>
            <p className="text-claridad/85 font-light text-lg md:text-xl max-w-3xl mx-auto">{t.services.subtitle}</p>
            
            {/* Free adjustments callout alert banner */}
            <div className="mt-10 inline-flex items-center gap-4 bg-innovacion/10 border border-innovacion/35 px-7 py-4.5 rounded-[1.5rem] text-innovacion text-sm font-extrabold text-left max-w-3xl">
              <Info size={24} className="flex-shrink-0" />
              <span>{t.services.live_adjustments}</span>
            </div>

            {/* Los tres servicios que hablan por WhatsApp y se confunden entre si */}
            <div className="mt-12 glass-panel rounded-[2rem] border border-claridad/10 p-8 md:p-10 text-left">
              <h3 className="text-lg md:text-xl font-black text-claridad mb-8 text-center tracking-tight">{t.services.tres_ia.title}</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Zap size={20} className="text-innovacion flex-shrink-0" />
                    <span className="text-sm font-black text-innovacion uppercase tracking-wider">{t.services.tres_ia.c1_title}</span>
                  </div>
                  <p className="text-sm text-claridad/80 font-light leading-relaxed">{t.services.tres_ia.c1_desc}</p>
                </div>
                <div className="md:border-l md:border-claridad/10 md:pl-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain size={20} className="text-innovacion flex-shrink-0" />
                    <span className="text-sm font-black text-innovacion uppercase tracking-wider">{t.services.tres_ia.c2_title}</span>
                  </div>
                  <p className="text-sm text-claridad/80 font-light leading-relaxed">{t.services.tres_ia.c2_desc}</p>
                </div>
                <div className="md:border-l md:border-claridad/10 md:pl-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar size={20} className="text-innovacion flex-shrink-0" />
                    <span className="text-sm font-black text-innovacion uppercase tracking-wider">{t.services.tres_ia.c3_title}</span>
                  </div>
                  <p className="text-sm text-claridad/80 font-light leading-relaxed">{t.services.tres_ia.c3_desc}</p>
                </div>
              </div>
              <p className="mt-8 pt-6 border-t border-claridad/10 text-base text-claridad font-semibold text-center">{t.services.tres_ia.nota}</p>
            </div>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="flex justify-center mb-20">
            <div className="glass-panel p-2 rounded-2xl sm:rounded-full grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 max-w-4xl w-full sm:w-auto">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-7 py-3.5 rounded-full text-sm font-black transition-all duration-300 cursor-pointer ${activeCategory === 'all' ? 'bg-innovacion text-teselar-dark shadow-md' : 'text-claridad/75 hover:bg-claridad/10'}`}
              >
                {lng === 'es' ? 'Todos' : lng === 'ca' ? 'Tots' : 'All'}
              </button>
              <button 
                onClick={() => setActiveCategory('web')}
                className={`px-7 py-3.5 rounded-full text-sm font-black transition-all duration-300 cursor-pointer ${activeCategory === 'web' ? 'bg-innovacion text-teselar-dark shadow-md' : 'text-claridad/75 hover:bg-claridad/10'}`}
              >
                {t.services.categories.web}
              </button>
              <button 
                onClick={() => setActiveCategory('automation')}
                className={`px-7 py-3.5 rounded-full text-sm font-black transition-all duration-300 cursor-pointer ${activeCategory === 'automation' ? 'bg-innovacion text-teselar-dark shadow-md' : 'text-claridad/75 hover:bg-claridad/10'}`}
              >
                {t.services.categories.automation}
              </button>
              <button 
                onClick={() => setActiveCategory('systems')}
                className={`px-7 py-3.5 rounded-full text-sm font-black transition-all duration-300 cursor-pointer ${activeCategory === 'systems' ? 'bg-innovacion text-teselar-dark shadow-md' : 'text-claridad/75 hover:bg-claridad/10'}`}
              >
                {t.services.categories.systems}
              </button>
            </div>
          </div>

          {/* Catalogo en lista (20/10, Taste + Impeccable + Emil Kowalski): una fila por servicio con
              lo que decide (para quien, precio y la accion); lo que incluye se despliega. Antes eran
              tarjetas de 1.400-1.800 px de alto y el catalogo era el 36 % de la pagina en escritorio
              y el 44 % en movil. Lo plegado sigue en el HTML, asi que buscadores e IA lo leen igual. */}
          <ul className="border-t border-claridad/10">
            {filteredServices.map((service) => {
              const abierto = servicioAbierto === service.id;
              const idLista = `incluye-${service.id}`;
              return (
                <li key={service.id} className="fila-servicio border-b border-claridad/10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-4 py-7 md:py-8">
                    <div className="lg:col-span-6 flex flex-col gap-2">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-claridad [text-wrap:balance]">{service.title}</h3>
                      <p className={`text-base text-claridad/80 leading-relaxed max-w-[62ch] [text-wrap:pretty] ${abierto ? '' : 'line-clamp-2'}`}>{service.ideal}</p>
                    </div>
                    <div className="lg:col-span-3 flex lg:flex-col lg:items-end justify-between lg:justify-start gap-1">
                      <span className="text-xl md:text-2xl font-bold text-innovacion lg:text-right">{service.price}</span>
                      <span className="text-sm text-claridad/70">{t.services.vat}</span>
                    </div>
                    <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-2 lg:items-stretch">
                      <button
                        type="button"
                        onClick={() => setServicioAbierto(abierto ? null : service.id)}
                        aria-expanded={abierto}
                        aria-controls={idLista}
                        className="flex-1 lg:flex-none py-3 px-4 rounded-md border border-claridad/15 text-base font-semibold text-claridad hover:border-claridad/40 active:scale-[0.97] transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center justify-center gap-2"
                      >
                        {lng === 'es' ? 'Ver qué incluye' : lng === 'ca' ? 'Veure què inclou' : 'See what\'s included'}
                        <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${abierto ? 'rotate-180' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInterest(service.title.replace(/^\d+\.\s*/, ''))}
                        className="flex-1 lg:flex-none py-3 px-4 rounded-md bg-innovacion text-teselar-dark text-base font-bold hover:bg-[#2fd4bc] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center justify-center gap-2"
                      >
                        {t.services.interest}
                        <ChevronRight size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div
                    id={idLista}
                    className={`grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden" inert={!abierto}>
                      <div className="pb-8 flex flex-col gap-4">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                          {service.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-3 text-base text-claridad/85 leading-relaxed">
                              <CheckCircle2 size={17} aria-hidden="true" className="text-innovacion flex-shrink-0 mt-1" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <span className="text-sm text-claridad/70">{service.tag}</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Service Conditions: Not included & Payment terms */}
          <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-6.5">
            
            {/* What is NOT included */}
            <div className="glass-panel p-6 rounded-2xl border border-claridad/5 text-xs font-light leading-relaxed text-claridad/75">
              <div className="flex items-center gap-2 mb-3 text-claridad font-bold">
                <AlertCircle size={15} className="text-innovacion" />
                <span>{t.pricing.not_included.title}</span>
              </div>
              <p>{t.pricing.not_included.desc}</p>
            </div>

            {/* Payment Terms & Conditions note */}
            <div className="glass-panel p-6 rounded-2xl border border-innovacion/20 text-xs font-light leading-relaxed text-claridad/85 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-innovacion/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 mb-3 text-innovacion font-bold">
                <CreditCard size={15} />
                <span>{t.pricing.payment.title}</span>
              </div>
              <div className="space-y-2">
                <p><strong>{lng === 'es' ? 'Métodos: ' : lng === 'ca' ? 'Mètodes: ' : 'Methods: '}</strong>{t.pricing.payment.methods}</p>
                
                {/* 50% entry, 3 months free installment callout alert */}
                <div className="mt-2.5 bg-innovacion/10 border border-innovacion/35 px-4 py-2.5 rounded-xl text-innovacion font-bold shadow-sm">
                  {t.pricing.payment.conditions}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* POST-SERVICES URGENCY STRIP */}
      <div className="urgency-strip py-8 px-4 md:px-8 z-10 relative border-t border-b border-claridad/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <p className="text-lg text-claridad/85 leading-relaxed max-w-lg [text-wrap:pretty]">
              {t.leads.post_services}
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-innovacion text-teselar-dark font-bold text-base px-6 py-3.5 rounded-md hover:bg-[#2fd4bc] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <Calendar size={18} aria-hidden="true" />
            {t.hero.cta_alt}
          </a>
        </div>
      </div>

      {/* 5. PRECIOS: MANTENIMIENTO, SOPORTE Y METODOS DE PAGO */}
      <section id="pricing" className="relative py-16 md:py-24 px-4 md:px-8 z-10 content-visibility-auto">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">

          {/* Mantenimiento y cuotas en lista (20/10), como el catalogo: una fila por plan con lo
              que decide y el detalle desplegable. Antes eran cuatro tarjetas grandes: el 11 % de la
              pagina en escritorio y el 14 % en movil. */}
          <div className="max-w-3xl flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-claridad [text-wrap:balance]">{t.pricing.title}</h2>
            <p className="text-lg md:text-xl text-claridad/85 leading-relaxed [text-wrap:pretty]">{t.pricing.subtitle}</p>
          </div>

          <ul className="border-t border-claridad/10">
            {[
              { id: 'basic', plan: t.pricing.basic, items: [t.pricing.basic.f1, t.pricing.basic.f2, t.pricing.basic.f3, t.pricing.basic.f4], nota: null, recomendado: false,
                cta: lng === 'es' ? 'Contratar Plan Básico' : lng === 'ca' ? 'Contractar Pla Bàsic' : 'Hire Basic Plan', accion: () => handleScrollToContact('info'), href: null },
              { id: 'plus', plan: t.pricing.plus, items: [t.pricing.plus.f1, t.pricing.plus.f2, t.pricing.plus.f3, t.pricing.plus.f4], nota: null, recomendado: true,
                cta: lng === 'es' ? 'Contratar Plan Plus' : lng === 'ca' ? 'Contractar Pla Plus' : 'Hire Plus Plan', accion: () => handleScrollToContact('info'), href: null },
              { id: 'citas', plan: t.pricing.citas, items: [t.pricing.citas.f1, t.pricing.citas.f2], nota: t.pricing.citas.f3, recomendado: false,
                cta: t.pricing.citas.cta, accion: null, href: '#services' },
              { id: 'ia', plan: t.pricing.ia, items: [t.pricing.ia.f1, t.pricing.ia.f2], nota: t.pricing.ia.f3, recomendado: false,
                cta: t.pricing.ia.cta, accion: null, href: '#services' },
            ].map(({ id, plan, items, nota, recomendado, cta, accion, href }) => {
              const abierto = planAbierto === id;
              const idDetalle = `plan-${id}`;
              const claseCta = 'flex-1 lg:flex-none py-3 px-4 rounded-md bg-innovacion text-teselar-dark text-base font-bold text-center hover:bg-[#2fd4bc] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center justify-center gap-2';
              return (
                <li key={id} className="fila-servicio border-b border-claridad/10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-4 py-7 md:py-8">
                    <div className="lg:col-span-6 flex flex-col gap-2">
                      {/* La etiqueta va fuera del titulo: dentro, buscadores y lectores leian "Plan PlusRecomendado". */}
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-claridad">{plan.title}</h3>
                        {recomendado && <span className="text-sm font-semibold text-teselar-dark bg-innovacion px-2.5 py-0.5 rounded">{lng === 'es' ? 'Recomendado' : lng === 'ca' ? 'Recomanat' : 'Recommended'}</span>}
                      </div>
                      <p className={`text-base text-claridad/80 leading-relaxed max-w-[62ch] [text-wrap:pretty] ${abierto ? '' : 'line-clamp-2'}`}>{plan.desc}</p>
                    </div>
                    <div className="lg:col-span-3 flex lg:flex-col lg:items-end justify-between lg:justify-start gap-1">
                      <span className="text-xl md:text-2xl font-bold text-innovacion lg:text-right">{plan.price}</span>
                      <span className="text-sm text-claridad/70">{plan.period} {t.services.vat}</span>
                    </div>
                    <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-2 lg:items-stretch">
                      <button
                        type="button"
                        onClick={() => setPlanAbierto(abierto ? null : id)}
                        aria-expanded={abierto}
                        aria-controls={idDetalle}
                        className="flex-1 lg:flex-none py-3 px-4 rounded-md border border-claridad/15 text-base font-semibold text-claridad hover:border-claridad/40 active:scale-[0.97] transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center justify-center gap-2"
                      >
                        {lng === 'es' ? 'Ver qué incluye' : lng === 'ca' ? 'Veure què inclou' : 'See what\'s included'}
                        <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${abierto ? 'rotate-180' : ''}`} />
                      </button>
                      {href
                        ? <a href={href} className={claseCta}>{cta}<ArrowRight size={18} aria-hidden="true" /></a>
                        : <button type="button" onClick={accion ?? undefined} className={claseCta}>{cta}</button>}
                    </div>
                  </div>
                  <div
                    id={idDetalle}
                    className={`grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden" inert={!abierto}>
                      <ul className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                        {items.map((item, k) => (
                          <li key={k} className="flex items-start gap-3 text-base text-claridad/85 leading-relaxed">
                            <CheckCircle2 size={17} aria-hidden="true" className="text-innovacion flex-shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {nota && (
                          <li className="flex items-start gap-3 text-base text-claridad/75 leading-relaxed md:col-span-2">
                            <Info size={17} aria-hidden="true" className="text-claridad/70 flex-shrink-0 mt-1" />
                            <span>{nota}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

        </div>
      </section>

      {/* POST-PRICING URGENCY STRIP */}
      <div className="urgency-strip py-8 px-4 md:px-8 z-10 relative border-t border-b border-claridad/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <p className="text-lg text-claridad/85 leading-relaxed max-w-lg [text-wrap:pretty]">
              {t.leads.post_pricing}
            </p>
          </div>
          <a
            href={waLink(t.leads.wa_precios)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-innovacion text-teselar-dark font-bold text-base px-6 py-3.5 rounded-md hover:bg-[#2fd4bc] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {t.leads.cta_whatsapp}
          </a>
        </div>
      </div>

      {/* 5.5. SIMULADOR DE AHORRO Y PRESUPUESTO INTERACTIVO (ROI Slider Estimator) */}
      <section id="roi-simulator" className="relative py-16 md:py-24 px-4 md:px-8 z-10 content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          {/* El simulador queda plegado tras un boton (20/10): era el 6 % de la pagina y solo lo usa
              quien ya esta echando cuentas. No va a pagina propia porque su boton pasa el resultado
              al formulario de contacto de esta misma pagina. */}
          <div className="max-w-3xl flex flex-col gap-4 mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-claridad [text-wrap:balance]">
              {t.simulator.title}
            </h2>
            <p className="text-lg md:text-xl text-claridad/85 leading-relaxed [text-wrap:pretty]">
              {t.simulator.subtitle}
            </p>
            <button
              type="button"
              onClick={() => setSimuladorAbierto(!simuladorAbierto)}
              aria-expanded={simuladorAbierto}
              aria-controls="simulador-cuerpo"
              className="self-start mt-2 py-3 px-5 rounded-md bg-innovacion text-teselar-dark text-base font-bold hover:bg-[#2fd4bc] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center gap-2"
            >
              {simuladorAbierto
                ? (lng === 'es' ? 'Cerrar el simulador' : lng === 'ca' ? 'Tancar el simulador' : 'Close the simulator')
                : (lng === 'es' ? 'Calcular lo que te cuesta' : lng === 'ca' ? 'Calcular el que et costa' : 'Work out what it costs you')}
              <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${simuladorAbierto ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div
            id="simulador-cuerpo"
            className={`grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${simuladorAbierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden" inert={!simuladorAbierto}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Interactive Input sliders */}
            <motion.div 
              initial={{ y: 8 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], delay: 0.12 }}
              className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-[2.5rem] border border-claridad/5 flex flex-col gap-8 justify-between relative overflow-hidden"
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-teselar/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-8">
                {/* Input 1: Hours wasted per week */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label htmlFor="hours-range" className="text-sm font-black tracking-wider uppercase text-claridad/85">{t.simulator.label_hours}</label>
                    <span className="font-mono text-xl font-black text-innovacion bg-innovacion/10 px-3.5 py-1 rounded-xl border border-innovacion/25">{wastedHours}h</span>
                  </div>
                  <input 
                    type="range" 
                    id="hours-range" 
                    min="1" 
                    max="40" 
                    value={wastedHours} 
                    onChange={(e) => setWastedHours(parseInt(e.target.value))} 
                    className="w-full h-2 rounded-lg bg-claridad/10 appearance-none cursor-pointer accent-innovacion"
                  />
                  <div className="flex justify-between text-xs text-claridad/70 font-mono">
                    <span>1h</span>
                    <span>20h</span>
                    <span>40h</span>
                  </div>
                </div>

                {/* Input 2: Number of employees */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label htmlFor="employees-range" className="text-sm font-black tracking-wider uppercase text-claridad/85">{t.simulator.label_employees}</label>
                    <span className="font-mono text-xl font-black text-innovacion bg-innovacion/10 px-3.5 py-1 rounded-xl border border-innovacion/25">{employeeCount}</span>
                  </div>
                  <input 
                    type="range" 
                    id="employees-range" 
                    min="1" 
                    max="20" 
                    value={employeeCount} 
                    onChange={(e) => setEmployeeCount(parseInt(e.target.value))} 
                    className="w-full h-2 rounded-lg bg-claridad/10 appearance-none cursor-pointer accent-innovacion"
                  />
                  <div className="flex justify-between text-xs text-claridad/70 font-mono">
                    <span>1</span>
                    <span>10</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Input 3: Hourly employee cost */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label htmlFor="cost-range" className="text-sm font-black tracking-wider uppercase text-claridad/85">{t.simulator.label_cost}</label>
                    <span className="font-mono text-xl font-black text-innovacion bg-innovacion/10 px-3.5 py-1 rounded-xl border border-innovacion/25">{hourlyCost}€/h</span>
                  </div>
                  <input 
                    type="range" 
                    id="cost-range" 
                    min="10" 
                    max="100" 
                    value={hourlyCost} 
                    onChange={(e) => setHourlyCost(parseInt(e.target.value))} 
                    className="w-full h-2 rounded-lg bg-claridad/10 appearance-none cursor-pointer accent-innovacion"
                  />
                  <div className="flex justify-between text-xs text-claridad/70 font-mono">
                    <span>10€/h</span>
                    <span>55€/h</span>
                    <span>100€/h</span>
                  </div>
                </div>
              </div>

              {/* Informative advice message */}
              <div className="bg-claridad/5 border border-claridad/10 p-5 rounded-2xl text-xs font-light text-claridad/75 leading-relaxed mt-6">
                <strong>{lng === 'es' ? '¿Cómo se calcula?' : lng === 'ca' ? 'Com es calcula?' : 'How is it calculated?'}</strong>{' '}
                {lng === 'es'
                  ? 'Multiplicamos las horas perdidas por el coste por hora, el número de empleados y un factor medio mensual (4.33 semanas al mes). Son recursos invisibles que podrías estar reinvirtiendo en el crecimiento real de tu negocio.'
                  : lng === 'ca'
                    ? 'Multipliquem les hores perdudes pel cost per hora, el nombre d\'empleats i un factor mitjà mensual (4.33 setmanes al mes). Són recursos invisibles que podries estar reinvertint en el creixement real del teu negoci.'
                    : 'We multiply the hours lost by the hourly cost, the number of employees, and a monthly average factor (4.33 weeks per month). These are invisible resources that you could be reinvesting in the actual growth of your business.'}
              </div>
            </motion.div>

            {/* Right: Simulated financial outcomes HUD */}
            <motion.div 
              initial={{ y: 8 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], delay: 0.01 }}
              className="lg:col-span-5 flex flex-col justify-between gap-6"
            >
              
              {/* Financial Dashboard Display Card */}
              <div className="glass-card p-8 rounded-[2.5rem] border-2 border-innovacion/35 bg-teselar-light/40 flex flex-col justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-innovacion/5 rounded-bl-full pointer-events-none" />
                
                <div className="space-y-6">
                  {/* Monthly Savings Result */}
                  <div className="border-b border-claridad/5 pb-5">
                    <span className="text-xs font-mono tracking-widest text-claridad/70 uppercase block mb-1">[ {t.simulator.result_monthly} ]</span>
                    <span className="font-mono text-4xl sm:text-5xl font-black text-innovacion text-glow-cyan">
                      {fmt(Math.round(wastedHours * employeeCount * hourlyCost * 4.33))}€
                    </span>
                    <span className="text-xs text-claridad/70 font-light block mt-1">
                      {lng === 'es' ? 'ahorrados cada mes' : lng === 'ca' ? 'estalviats cada mes' : 'saved each month'}
                    </span>
                  </div>

                  {/* Annual Savings Result */}
                  <div className="border-b border-claridad/5 pb-5">
                    <span className="text-xs font-mono tracking-widest text-claridad/70 uppercase block mb-1">[ {t.simulator.result_yearly} ]</span>
                    <span className="font-mono text-4xl sm:text-5xl font-black text-claridad">
                      {fmt(Math.round(wastedHours * employeeCount * hourlyCost * 4.33 * 12))}€
                    </span>
                    <span className="text-xs text-claridad/70 font-light block mt-1">
                      {lng === 'es' ? 'pérdidas anuales recuperadas' : lng === 'ca' ? 'pèrdues anuals recuperades' : 'annual losses recovered'}
                    </span>
                  </div>

                  {/* Recovered Hours Result */}
                  <div>
                    <span className="text-xs font-mono tracking-widest text-claridad/70 uppercase block mb-1">[ {t.simulator.result_hours} ]</span>
                    <span className="font-mono text-3xl font-black text-claridad/85 block">
                      {fmt(wastedHours * employeeCount * 52)}h
                    </span>
                    <span className="text-xs text-claridad/70 font-light block mt-1">
                      {lng === 'es' ? 'de trabajo redirigidas a tareas productivas' : lng === 'ca' ? 'de treball redirigides a tasques productives' : 'of work redirected to productive tasks'}
                    </span>
                  </div>
                </div>

                {/* Suggested service recommendation box */}
                <div className="border-t border-claridad/5 pt-5 mt-4">
                  <div className="flex justify-between items-center gap-3 mb-2.5">
                    <span className="text-xs font-mono text-claridad/70 tracking-widest uppercase">{t.simulator.rec_title}:</span>
                    <span className="bg-innovacion text-teselar-dark text-xs font-black tracking-widest uppercase px-2 py-0.5 rounded shadow">
                      {t.simulator.rec_badge}
                    </span>
                  </div>
                  
                  {/* Dynamic suggesting name based on financial scale */}
                  <p className="text-sm sm:text-base font-black text-innovacion leading-snug">
                    {wastedHours * employeeCount * hourlyCost * 4.33 < 500 ? t.simulator.opt_s2 :
                     wastedHours * employeeCount * hourlyCost * 4.33 < 1500 ? t.simulator.opt_s4 :
                     t.simulator.opt_s8}
                  </p>
                </div>
              </div>

              {/* Action Trigger Button */}
              <button 
                onClick={() => {
                  const monthlyVal = Math.round(wastedHours * employeeCount * hourlyCost * 4.33);
                  const yearlyVal = monthlyVal * 12;
                  const yearlyHours = wastedHours * employeeCount * 52;
                  const suggestedService = monthlyVal < 500 ? t.simulator.opt_s2 : monthlyVal < 1500 ? t.simulator.opt_s4 : t.simulator.opt_s8;
                  const budgetTier = monthlyVal < 500 ? 'low' : monthlyVal < 1500 ? 'mid' : 'high';
                  
                  // 1. Autofill contact reason
                  setContactReason('quote');
                  
                  // 2. Autofill details into the textarea
                  const customizedText = lng === 'es'
                    ? `Hola Teselar Software, he utilizado el simulador interactivo de vuestra web y he calculado unas pérdidas anuales estimadas de ${fmt(yearlyVal)}€ por tareas manuales repetitivas (${fmt(yearlyHours)}h recuperables/año). Me interesa vuestra propuesta de "${suggestedService}" para automatizar estos procesos e incrementar la rentabilidad de mi negocio.`
                    : lng === 'ca'
                      ? `Hola Teselar Software, he utilitzat el simulador interactiu de la vostra web i he calculat unes pèrdues anuales estimades de ${fmt(yearlyVal)}€ per tasques manuals repetitives (${fmt(yearlyHours)}h recuperables/any). M'interessa la vostra proposta de "${suggestedService}" per automatitzar aquests processos i incrementar la rendibilitat del meu negoci.`
                      : `Hello Teselar Software, I have used the interactive simulator on your website and calculated an estimated annual loss of ${fmt(yearlyVal)}€ due to repetitive manual tasks (${fmt(yearlyHours)} recoverable hours/year). I am interested in your proposal for "${suggestedService}" to automate these processes and increase our operational profitability.`;
                  
                  setContactMessage(customizedText);

                  // 3. Set the budget dropdown to the correct tier in the form using standard element value setting or DOM
                  const budgetSelect = document.getElementById('budget') as HTMLSelectElement;
                  if (budgetSelect) {
                    budgetSelect.value = budgetTier;
                  }
                  // El presupuesto va dentro de "Anadir mas detalles": se abre para que se vea.
                  const masDetalles = document.getElementById('mas-detalles') as HTMLDetailsElement | null;
                  if (masDetalles) masDetalles.open = true;
                  
                  // 4. Trigger cian neon confirmation banner
                  setShowSimulatorNotif(true);
                  setTimeout(() => setShowSimulatorNotif(false), 4000);

                  // 5. Scroll smoothly to contact section
                  const contactSec = document.getElementById('contact');
                  if (contactSec) {
                    contactSec.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-5 rounded-2xl bg-innovacion text-teselar-dark font-black tracking-wider uppercase hover:bg-claridad active:scale-[0.97] transition-all duration-300 cursor-pointer text-center block text-sm"
              >
                {t.simulator.btn_apply}
              </button>

            </motion.div>

          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating interactive neon confirmation notification banner */}
      <AnimatePresence>
        {showSimulatorNotif && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[99999] glass-panel border border-innovacion/45 px-6 py-4.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl bg-teselar-dark/95 max-w-sm"
          >
            <div className="w-8 h-8 rounded-full bg-innovacion/15 border border-innovacion/40 flex items-center justify-center text-innovacion flex-shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="flex-1">
              <p className="text-base text-claridad/90 leading-relaxed">
                {t.simulator.notif_linked}
              </p>
            </div>
            <button
              onClick={() => setShowSimulatorNotif(false)}
              aria-label={t.a11y.cerrar}
              className="text-claridad/70 hover:text-claridad transition-colors p-1 flex-shrink-0 cursor-pointer"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>



      {/* 6. EL PROCESO, en una fila (20/10): los cuatro pasos uno al lado del otro en escritorio y en
          lista en movil. Antes era una linea de tiempo en zigzag (cada paso, una fila entera) con
          nodos, una linea que se dibujaba y los pasos 2 a 4 en gris, como desactivados. El primero
          lleva su boton porque es el paso que da quien esta leyendo. */}
      <section id="process" className="relative py-16 md:py-24 px-4 md:px-8 z-10 bg-teselar content-visibility-auto">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-14">
          <div className="max-w-3xl flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-claridad [text-wrap:balance]">{t.process.title}</h2>
            <p className="text-lg md:text-xl text-claridad/85 leading-relaxed [text-wrap:pretty]">{t.process.subtitle}</p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {[
              { paso: t.process.p1, extra: null, primero: true },
              { paso: t.process.p2, extra: null, primero: false },
              { paso: t.process.p3, extra: null, primero: false },
              { paso: t.process.p4, extra: lng === 'es' ? '¡Semana de ajustes gratis!' : lng === 'ca' ? 'Setmana d\'ajustaments gratis!' : 'Free adjustments week!', primero: false },
            ].map(({ paso, extra, primero }) => {
              const [numero, ...resto] = paso.title.split('. ');
              return (
                <li key={numero} className={`flex flex-col gap-3 pt-6 border-t-2 ${primero ? 'border-innovacion' : 'border-claridad/25'}`}>
                  <span className={`text-4xl md:text-5xl font-bold tracking-tight ${primero ? 'text-innovacion' : 'text-claridad/75'}`} aria-hidden="true">{numero}</span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-claridad [text-wrap:balance]">
                    <span className="sr-only">{numero}. </span>{resto.join('. ')}
                  </h3>
                  {extra && <p className="text-base font-semibold text-innovacion">{extra}</p>}
                  <p className="text-base text-claridad/80 leading-relaxed [text-wrap:pretty]">{paso.desc}</p>
                  {primero && (
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start mt-2 bg-innovacion text-teselar-dark text-base font-bold px-5 py-3 rounded-md hover:bg-[#2fd4bc] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center gap-2"
                    >
                      <Calendar size={18} aria-hidden="true" />
                      {t.hero.cta_alt}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="faq" className="relative py-16 md:py-24 px-4 md:px-8 z-10 content-visibility-auto">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-claridad [text-wrap:balance]">{t.faq.title}</h2>
            <p className="text-lg md:text-xl text-claridad/85 leading-relaxed [text-wrap:pretty]">{t.faq.subtitle}</p>
          </div>

          {/* Se ven 5 preguntas y el resto con un boton (20/10). Las ocultas y las respuestas
              plegadas siguen en el HTML servido: los crawlers de IA que no ejecutan JS las leen. */}
          <ul className="border-t border-claridad/10">
            {faqList.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              const oculta = !todasLasPreguntas && idx >= PREGUNTAS_VISIBLES;
              return (
                <li key={idx} className={`border-b border-claridad/10 ${oculta ? 'hidden' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`respuesta-${idx}`}
                    className="w-full flex items-center justify-between gap-4 text-left py-5 cursor-pointer group"
                  >
                    <span className="text-base md:text-lg font-semibold text-claridad group-hover:text-innovacion transition-colors duration-150">{item.q}</span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`flex-shrink-0 text-innovacion transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    id={`respuesta-${idx}`}
                    className="grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p className="pb-6 text-base text-claridad/80 leading-relaxed max-w-[70ch] [text-wrap:pretty]">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {faqList.length > PREGUNTAS_VISIBLES && (
            <button
              type="button"
              onClick={() => setTodasLasPreguntas(!todasLasPreguntas)}
              aria-expanded={todasLasPreguntas}
              className="self-start py-3 px-5 rounded-md border border-claridad/15 text-base font-semibold text-claridad hover:border-claridad/40 active:scale-[0.97] transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center gap-2"
            >
              {todasLasPreguntas
                ? (lng === 'es' ? 'Ver menos preguntas' : lng === 'ca' ? 'Veure menys preguntes' : 'Show fewer questions')
                : (lng === 'es' ? `Ver las ${faqList.length} preguntas` : lng === 'ca' ? `Veure les ${faqList.length} preguntes` : `See all ${faqList.length} questions`)}
              <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${todasLasPreguntas ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </section>

      {/* 7. FORMULARIO DE CONVERSION: SOPORTE, AGENDA & CONTACTO */}
      <section id="contact" ref={contactSectionRef} className="relative py-16 md:py-24 px-4 md:px-8 z-10 content-visibility-auto">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">

          <div className="max-w-3xl flex flex-col gap-4">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-claridad [text-wrap:balance]">{t.contact.title}</h2>
            <p className="text-lg md:text-xl text-claridad/85 leading-relaxed [text-wrap:pretty]">{t.contact.subtitle}</p>
          </div>

          {/* Contacto en dos columnas (20/10): a la izquierda las vias rapidas (Calendly, WhatsApp y
              correo), a la derecha el formulario para contar el caso con calma. Presupuesto y
              urgencia siguen, pero opcionales dentro de "Anadir mas detalles": se envian en el lead
              y el simulador rellena el presupuesto (y abre el desplegable). */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* First step of the ladder: book the free diagnosis without filling in the form */}
              <div className="bg-teselar rounded-lg p-8 flex flex-col gap-5">
                <h3 className="text-xl md:text-2xl font-bold text-claridad leading-tight [text-wrap:balance]">{t.contact.calendly_title}</h3>
                <p className="text-base text-claridad/85 leading-relaxed [text-wrap:pretty]">{t.contact.calendly_desc}</p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start bg-innovacion text-teselar-dark font-bold text-base px-6 py-3.5 rounded-md hover:bg-[#2fd4bc] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center gap-2"
                >
                  <Calendar size={18} aria-hidden="true" />
                  {t.contact.calendly_btn}
                </a>
              </div>

              <div className="flex flex-col gap-4 border-t border-claridad/10 pt-8">
                <a
                  href={waLink(t.leads.wa_generico)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start text-base font-semibold text-claridad underline underline-offset-[6px] decoration-claridad/50 hover:decoration-claridad transition-colors duration-150 flex items-center gap-2"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  {t.leads.cta_whatsapp}
                </a>
                <p className="text-base text-claridad/75 leading-relaxed">
                  {lng === 'es'
                    ? 'O por correo: '
                    : lng === 'ca'
                      ? 'O per correu: '
                      : 'Or by email: '}
                  <a href="mailto:info@teselarsoftware.com" className="text-innovacion font-semibold hover:underline">info@teselarsoftware.com</a>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-6">
              {/* Web3Forms Honeypot Anti-spam input */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-base font-semibold text-claridad/90">{t.contact.name} *</label>
                  <input type="text" id="name" name="name" required className="form-input" placeholder={lng === 'es' ? 'Ej. Juan Pérez' : lng === 'ca' ? 'Ex. Joan Pérez' : 'e.g. John Doe'} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base font-semibold text-claridad/90">{t.contact.email} *</label>
                  <input type="email" id="email" name="email" required className="form-input" placeholder="correo@ejemplo.com" />
                </div>

                {/* Telefono: opcional a proposito. El canal real de Teselar es WhatsApp
                    -TesS captura telefono, el puerta a puerta va por ahi- y este
                    formulario era el unico sitio que solo devolvia un correo. */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-base font-semibold text-claridad/90">{t.contact.phone}</label>
                  <input type="tel" id="phone" name="phone" inputMode="tel" autoComplete="tel" className="form-input" placeholder="+34 600 000 000" />
                  <span className="text-sm text-claridad/75">{t.contact.phone_hint}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="reason" className="text-base font-semibold text-claridad/90">{t.contact.reason} *</label>
                  <select
                    id="reason"
                    name="reason"
                    value={contactReason}
                    onChange={(e) => setContactReason(e.target.value)}
                    className="form-input cursor-pointer"
                  >
                    <option value="info">{t.contact.reason_opt1}</option>
                    <option value="meeting">{t.contact.reason_opt2}</option>
                    <option value="quote">{t.contact.reason_opt3}</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-base font-semibold text-claridad/90">{lng === 'es' ? 'Mensaje o detalles del proyecto' : lng === 'ca' ? 'Missatge o detalls del projecte' : 'Message or project details'} *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="form-input resize-none text-base md:text-lg"
                  placeholder={t.contact.message}
                />
              </div>

              {/* Los campos de un <details> cerrado se envian igual con el formulario. */}
              <details id="mas-detalles" className="group">
                <summary className="cursor-pointer list-none text-base font-semibold text-claridad/90 flex items-center gap-2 py-1 [&::-webkit-details-marker]:hidden">
                  <ChevronDown size={18} aria-hidden="true" className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-180" />
                  {lng === 'es' ? 'Añadir más detalles (opcional)' : lng === 'ca' ? 'Afegir més detalls (opcional)' : 'Add more details (optional)'}
                </summary>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget" className="text-base font-semibold text-claridad/90">{t.contact.budget}</label>
                    {/* Sin required, y con una primera opcion vacia SELECCIONADA: quitar el
                        required a secas no cambiaba nada -la primera opcion ya venia elegida-
                        y ademas mandaba un presupuesto que el visitante no habia dicho. */}
                    <select id="budget" name="budget" defaultValue="" className="form-input cursor-pointer">
                      <option value="">{t.contact.budget_opt0}</option>
                      <option value="low">{t.contact.budget_opt1}</option>
                      <option value="mid">{t.contact.budget_opt2}</option>
                      <option value="high">{t.contact.budget_opt3}</option>
                      <option value="veryhigh">{t.contact.budget_opt4}</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="urgency" className="text-base font-semibold text-claridad/90">{t.contact.urgency}</label>
                    <select id="urgency" name="urgency" defaultValue="" className="form-input cursor-pointer">
                      <option value="">{t.contact.urgency_opt0}</option>
                      <option value="immediate">{t.contact.urgency_opt1}</option>
                      <option value="medium">{t.contact.urgency_opt2}</option>
                      <option value="low">{t.contact.urgency_opt3}</option>
                    </select>
                  </div>
                </div>
              </details>

              {/* GDPR Explicit consent check ( Spain GDPR regulation requirements: un-checked by default ) */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdpr"
                  name="gdpr"
                  checked={gdprAccepted}
                  onChange={(e) => setGdprAccepted(e.target.checked)}
                  required
                  className="mt-1 w-5 h-5 rounded border-claridad/25 text-innovacion focus:ring-innovacion bg-teselar-dark cursor-pointer flex-shrink-0"
                />
                <label htmlFor="gdpr" className="text-base leading-relaxed text-claridad/80 cursor-pointer">
                  {t.contact.gdpr}{' '}
                  <a
                    href={`/${lng}/legal/privacidad`}
                    onClick={(e) => { e.preventDefault(); setActiveLegalModal('privacidad'); }}
                    className="text-innovacion font-semibold hover:underline"
                  >
                    {lng === 'es' ? 'política de privacidad' : lng === 'ca' ? 'política de privacitat' : 'privacy policy'}.
                  </a>
                </label>
              </div>

              {submitError && (
                <div className="flex items-center gap-2.5 bg-red-950/45 border border-red-500/35 px-5 py-3 rounded-md text-red-300 text-base w-full">
                  <AlertCircle size={18} aria-hidden="true" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !gdprAccepted}
                className="self-start bg-innovacion text-teselar-dark font-bold text-base md:text-lg px-8 py-4 rounded-md hover:bg-[#2fd4bc] active:scale-[0.97] transition-[transform,background-color,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-teselar-dark border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    <span>{t.contact.sending}</span>
                  </>
                ) : (
                  <>
                    <span>{t.contact.send}</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      </main>

      {/* FOOTER (Legal Links and Brand detail) */}
      <footer className="relative bg-teselar-dark/95 border-t border-claridad/10 pt-20 pb-10 px-4 md:px-8 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Info and logo */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="Teselar Logo" className="w-12 h-12 rounded-full border border-innovacion/35 object-cover" />
              <span className="font-extrabold text-2xl tracking-tight">TESELAR <span className="text-innovacion font-black">Software</span></span>
            </div>
            <p className="text-xs text-claridad/75 font-light leading-relaxed max-w-sm mt-2">
              {currentLng === 'es'
                ? 'Desarrollamos soluciones digitales a medida de alto rendimiento e impacto visual. Artesanía en software, automatizaciones e inteligencia artificial.'
                : currentLng === 'ca'
                  ? 'Desenvolupem solucions digitals a mida d\'alt rendiment i impacte visual. Artesania en programari, automatitzacions i intel·ligència artificial.'
                  : 'We hand-craft custom digital solutions with maximum performance and outstanding visual design. Software craftsmanship, automation, and custom artificial intelligence.'}
            </p>

            {/* Social profiles and the booking link for the free diagnosis */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.linkedin.com/company/teselarsoftware"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-10 h-10 rounded-xl glass-panel border border-claridad/10 flex items-center justify-center text-claridad/70 hover:text-innovacion hover:border-innovacion/40 transition-all duration-300"
              >
                <Linkedin size={17} aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/teselarsoftware/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="w-10 h-10 rounded-xl glass-panel border border-claridad/10 flex items-center justify-center text-claridad/70 hover:text-innovacion hover:border-innovacion/40 transition-all duration-300"
              >
                <Instagram size={17} aria-hidden="true" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.hero.cta_alt}
                title={t.hero.cta_alt}
                className="h-10 px-4 rounded-xl glass-panel border border-innovacion/30 flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-innovacion hover:bg-innovacion hover:text-teselar-dark transition-all duration-300"
              >
                <CalendarCheck size={15} aria-hidden="true" />
                {t.hero.cta_alt}
              </a>
            </div>
          </div>

          {/* Column 2: Navigation shortcuts */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-innovacion mb-5">{currentLng === 'es' ? 'Navegación' : currentLng === 'ca' ? 'Navegació' : 'Navigation'}</h3>
            <div className="flex flex-col gap-3.5 text-xs text-claridad/65 font-medium">
              <a href="#values" className="hover:text-innovacion transition-colors">{t.nav.values}</a>
              <a href="#services" className="hover:text-innovacion transition-colors">{t.nav.services}</a>
              <a href="#pricing" className="hover:text-innovacion transition-colors">{t.nav.pricing}</a>
              <a href="#process" className="hover:text-innovacion transition-colors">{t.nav.process}</a>
              <a href="#faq" className="hover:text-innovacion transition-colors">{t.nav.faq}</a>
            </div>
          </div>

          {/* Column 3: Contact information */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-innovacion mb-5">{lng === 'es' ? 'Contacto y Sede' : lng === 'ca' ? 'Contacte i Seu' : 'Contact & Headquarters'}</h3>
            <div className="space-y-4 text-xs font-light text-claridad/75 leading-relaxed">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-innovacion" aria-hidden="true" />
                <span>Lloret de Mar, Girona, {currentLng === 'es' ? 'España' : currentLng === 'ca' ? 'Espanya' : 'Spain'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-innovacion" aria-hidden="true" />
                <a href="mailto:info@teselarsoftware.com" className="hover:text-innovacion transition-colors">info@teselarsoftware.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-innovacion" aria-hidden="true" />
                <a href="tel:+34653232735" className="hover:text-innovacion transition-colors">+34 653 232 735</a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={16} className="text-innovacion" aria-hidden="true" />
                <a href={waLink(t.leads.wa_generico)} target="_blank" rel="noopener noreferrer" className="hover:text-innovacion transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal notice & subpath links */}
        <div className="max-w-7xl mx-auto border-t border-claridad/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-claridad/70 text-center">
          <span suppressHydrationWarning>&copy; {new Date().getFullYear()} Teselar Software. All rights reserved.</span>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href={`/${currentLng}/legal/aviso-legal`} 
              onClick={(e) => { e.preventDefault(); setActiveLegalModal('aviso'); }}
              className="hover:text-innovacion transition-colors-slow"
            >
              {currentLng === 'es' ? 'Aviso Legal' : currentLng === 'ca' ? 'Avís Legal' : 'Legal Notice'}
            </a>
            <span>|</span>
            <a 
              href={`/${currentLng}/legal/privacidad`} 
              onClick={(e) => { e.preventDefault(); setActiveLegalModal('privacidad'); }}
              className="hover:text-innovacion transition-colors"
            >
              {currentLng === 'es' ? 'Política de Privacidad' : currentLng === 'ca' ? 'Política de Privacitat' : 'Privacy Policy'}
            </a>
            <span>|</span>
            <a 
              href={`/${currentLng}/legal/cookies`} 
              onClick={(e) => { e.preventDefault(); setActiveLegalModal('cookies'); }}
              className="hover:text-innovacion transition-colors"
            >
              {currentLng === 'es' ? 'Política de Cookies' : currentLng === 'ca' ? 'Política de Cookies' : 'Cookie Policy'}
            </a>
          </div>
        </div>
      </footer>

      {/* Asistente IA — demo en vivo del servicio de Integración de IA */}
      <ChatWidget lng={currentLng} />

      {/* Dynamic Glassmorphic Legal Modal Popup */}
      <AnimatePresence>
        {activeLegalModal && (() => {
          const content = legalTexts[currentLng as 'es' | 'ca' | 'en']?.[activeLegalModal] || legalTexts.en[activeLegalModal];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999999] bg-teselar-dark/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setActiveLegalModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="max-w-3xl w-full glass-card p-8 sm:p-10 rounded-[2.5rem] border border-innovacion/25 shadow-2xl relative max-h-[80vh] overflow-y-auto flex flex-col gap-6 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveLegalModal(null)}
                  aria-label={t.a11y.cerrar}
                  className="absolute top-6 right-6 p-2 rounded-full bg-claridad/5 hover:bg-innovacion/25 text-claridad hover:text-innovacion border border-claridad/10 hover:border-innovacion/40 transition-all duration-300 cursor-pointer"
                >
                  <X size={20} aria-hidden="true" />
                </button>

                {/* Title */}
                <div>
                  <h2 className="text-3xl font-extrabold text-innovacion text-glow-cyan select-none">
                    {content.title}
                  </h2>
                  <div className="w-16 h-1 bg-innovacion mt-3 rounded-full" />
                </div>

                {/* Body Content */}
                <div className="space-y-6 text-sm sm:text-base text-claridad/85 leading-relaxed overflow-y-auto pr-2">
                  {content.sections.map((section, index) => (
                    <div key={index} className={index > 0 ? "border-t border-claridad/10 pt-5" : ""}>
                      <h3 className="text-lg font-bold text-claridad mb-2.5 font-mono text-innovacion/90 select-none">
                        {section.title}
                      </h3>
                      <p className="whitespace-pre-line leading-relaxed font-light">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>



      {/* LEAD CAPTURE: Sticky Bottom CTA Bar (Mobile only) */}
      <AnimatePresence>
        {showStickyBar && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 left-0 right-0 z-50 pl-4 pr-24 pointer-events-none"
          >
            <div className="max-w-sm mx-auto pointer-events-auto">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-innovacion text-teselar-dark font-bold text-base py-4 rounded-xl sticky-cta-bar flex items-center justify-center gap-2 active:scale-[0.97] transition-transform duration-150"
              >
                <Calendar size={18} />
                <span>{t.leads.sticky_cta_long}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEAD CAPTURE: Exit-Intent Popup (Desktop only) */}
      <AnimatePresence>
        {showExitPopup && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] exit-popup-overlay flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="max-w-md w-full glass-card p-8 rounded-[2rem] border-2 border-innovacion/30 shadow-2xl relative"
            >
              <button
                onClick={() => setShowExitPopup(false)}
                aria-label={t.a11y.cerrar}
                className="absolute top-4 right-4 p-2 rounded-full bg-claridad/5 hover:bg-innovacion/25 text-claridad hover:text-innovacion transition-all duration-300"
              >
                <X size={20} aria-hidden="true" />
              </button>
              
              <div className="text-center mb-6 mt-2">
                <div className="w-16 h-16 rounded-full bg-innovacion/15 border border-innovacion/30 flex items-center justify-center mx-auto mb-4 text-innovacion">
                  <Gift size={32} />
                </div>
                <h3 className="text-2xl font-black text-glow-cyan mb-2">
                  {t.leads.exit_title}
                </h3>
                <p className="text-sm text-claridad/80 font-light leading-relaxed">
                  {t.leads.exit_subtitle}
                </p>
              </div>

              {!exitFormSuccess ? (
                <form onSubmit={handleExitFormSubmit} className="space-y-4">
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="mini-form-input" 
                    placeholder={t.leads.exit_name} 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="mini-form-input" 
                    placeholder={t.leads.exit_email} 
                  />
                  <div className="flex items-start gap-2 pt-1">
                    <input type="checkbox" id="exit-gdpr" required className="mt-1" />
                    <label htmlFor="exit-gdpr" className="text-xs text-claridad/75 leading-tight">
                      {t.leads.exit_gdpr}
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={exitFormSubmitting}
                    className="w-full bg-innovacion text-teselar-dark font-black tracking-wider uppercase py-4 rounded-xl shadow-lg hover:bg-claridad transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                  >
                    {exitFormSubmitting ? (
                      <div className="w-5 h-5 border-2 border-teselar-dark border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        {t.leads.exit_btn}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowExitPopup(false)}
                    className="w-full text-center text-xs text-claridad/70 hover:text-claridad transition-colors mt-2"
                  >
                    {t.leads.exit_close}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="text-lg font-bold text-claridad">
                    {t.contact.success}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEAD CAPTURE: Scroll-Triggered Toast (Bottom Left). Solo en escritorio desde el 20/10: en
          movil se amontonaba con la barra fija y el boton de TesS y tapaba el texto. */}
      <AnimatePresence>
        {showScrollToast && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, y: 20 }}
            className="hidden md:block fixed bottom-6 left-6 z-40 max-w-sm"
          >
            <div className="glass-card p-5 rounded-2xl border border-innovacion/40 shadow-lg shadow-black/30 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-innovacion/20 flex items-center justify-center text-innovacion flex-shrink-0 mt-1">
                <Info size={20} />
              </div>
              <div className="flex-1 pr-4">
                <h4 className="font-bold text-sm text-claridad mb-1">
                  {t.leads.toast_title}
                </h4>
                <p className="text-xs text-claridad/70 leading-relaxed mb-3">
                  {t.leads.toast_text}
                </p>
                <a
                  href={waLink(t.leads.wa_generico)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowScrollToast(false)}
                  className="text-xs font-bold text-innovacion hover:text-claridad transition-colors flex items-center gap-1"
                >
                  {t.leads.toast_btn}
                  <ArrowRight size={12} />
                </a>
              </div>
              <button
                onClick={() => setShowScrollToast(false)}
                aria-label={t.a11y.cerrar}
                className="absolute top-3 right-3 text-claridad/70 hover:text-claridad transition-colors"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

const legalTexts = {
  es: {
    aviso: {
      title: 'Aviso Legal',
      sections: [
        {
          title: '1. Información Identificativa',
          text: 'En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se detallan los siguientes datos del titular del sitio web:\n\n• Nombre Comercial: Teselar Software\n• Domicilio Social: Lloret de Mar, Girona, España\n• Correo electrónico de contacto: info@teselarsoftware.com\n• Teléfono de contacto: +34 653 232 735'
        },
        {
          title: '2. Condiciones de Uso',
          text: 'El acceso y uso de este portal atribuye la condición de USUARIO, que acepta las Condiciones Generales de Uso aquí reflejadas. El sitio web de Teselar Software proporciona el acceso a multitud de informaciones, servicios, programas o datos en Internet pertenecientes a Teselar Software. El USUARIO asume la responsabilidad del uso del portal.'
        },
        {
          title: '3. Propiedad Intelectual e Industrial',
          text: 'Teselar Software por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, etc.), titularidad de Teselar Software o bien de sus licenciantes.'
        },
        {
          title: '4. Exclusión de Garantías y Responsabilidad',
          text: 'Teselar Software no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.'
        }
      ]
    },
    privacidad: {
      title: 'Política de Privacidad',
      sections: [
        {
          title: '1. Responsable del Tratamiento',
          text: 'El Responsable del Tratamiento de los datos de carácter personal que se recaben a través de este sitio web es:\n\n• Nombre Comercial: Teselar Software\n• Domicilio Social: Lloret de Mar, Girona, España\n• Correo electrónico de contacto: info@teselarsoftware.com'
        },
        {
          title: '2. Finalidad del Tratamiento de Datos',
          text: 'Los datos personales facilitados a través del formulario de contacto serán tratados exclusivamente para:\n\n1. Gestionar, atender y responder a la solicitud de contacto, presupuesto o cita enviada por el usuario.\n2. Remitir la información técnica o comercial solicitada por el usuario.'
        },
        {
          title: '3. Legitimación del Tratamiento',
          text: 'La base jurídica que legitima el tratamiento de los datos es el CONSENTIMIENTO del usuario. Para poder enviar una solicitud a través del formulario de contacto de la web, es obligatorio aceptar manualmente la política de privacidad mediante la marcación explícita e inequívoca del checkbox habilitado al efecto (Reglamento General de Protección de Datos - RGPD).'
        },
        {
          title: '4. Conservación de los Datos',
          text: 'Los datos personales se conservarán durante el tiempo estrictamente necesario para cumplir con la finalidad para la que fueron recabados, o hasta que el usuario ejerza su derecho de supresión u oposición, en cuyo caso serán bloqueados para la atención de posibles responsabilidades legales.'
        },
        {
          title: '5. Derechos del Usuario',
          text: 'El usuario puede ejercitar en cualquier momento sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición de sus datos de carácter personal dirigiéndose mediante correo electrónico al Responsable del Tratamiento: info@teselarsoftware.com.'
        }
      ]
    },
    cookies: {
      title: 'Política de Cookies',
      sections: [
        {
          title: '1. ¿Qué son las Cookies?',
          text: 'Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.'
        },
        {
          title: '2. ¿Qué tipos de Cookies utiliza esta web?',
          text: 'Este sitio web únicamente utiliza cookies técnicas y de personalización esenciales para su correcto funcionamiento:\n\n• Cookies Técnicas: Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan.\n• Cookies de Personalización: Permiten almacenar la preferencia del idioma del usuario (español, catalán, inglés) de forma temporal para ofrecer una navegación coherente y fluida.'
        },
        {
          title: '3. Desactivación o Eliminación de Cookies',
          text: 'El usuario puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador. Sin embargo, si bloquea las cookies esenciales, es posible que ciertas funcionalidades de la web (como la memorización del idioma) dejen de funcionar correctamente.'
        }
      ]
    }
  },
  ca: {
    aviso: {
      title: 'Avís Legal',
      sections: [
        {
          title: '1. Informació Identificativa',
          text: 'En compliment de l\'article 10 de la Llei 34/2002, de 11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic, es detallen les següents dades del titular del lloc web:\n\n• Nom Comercial: Teselar Software\n• Domicili Social: Lloret de Mar, Girona, Espanya\n• Correu electrònic de contacte: info@teselarsoftware.com\n• Telèfon de contacte: +34 653 232 735'
        },
        {
          title: '2. Condicions d\'Ús',
          text: 'L\'accés i ús d\'aquest portal atribueix la condició d\'USUARI, que accepta les Condicions Generals d\'Ús aquí reflectides. El lloc web de Teselar Software proporciona l\'accés a multitud d\'informacions, serveis, programes o dades a Internet pertanyents a Teselar Software. L\'USUARI assumeix la responsabilitat de l\'ús del portal.'
        },
        {
          title: '3. Propietat Intel·lectual i Industrial',
          text: 'Teselar Software per si o com a cessionària, és titular de tots els drets de propietat intel·lectual i industrial de la seva pàgina web, així com dels elements continguts en la mateixa (a títol enunciatiu: imatges, so, àudio, vídeo, programari o textos; marques o logotips, combinaciones de colors, estructura i disseny, selecció de materials usats, etc.), titularitat de Teselar Software o bé dels seus llicenciants.'
        },
        {
          title: '4. Exclusió de Garanties i Responsabilidad',
          text: 'Teselar Software no es fa responsable, en cap cas, dels danys i perjudicis de qualsevol naturalesa que poguessin ocasionar, a títol enunciatiu: errors o omissions en els continguts, falta de disponibilitat del portal o la transmissió de virus o programes maliciosos o lesius en els continguts, a pesar d\'haver adoptat totes les mesures tecnològiques necessàries per evitar-ho.'
        }
      ]
    },
    privacidad: {
      title: 'Política de Privacitat',
      sections: [
        {
          title: '1. Responsable del Tractament',
          text: 'El Responsable del Tractament de les dades de caràcter personal que es recullin a través d\'aquest lloc web és:\n\n• Nom Comercial: Teselar Software\n• Domicili Social: Lloret de Mar, Girona, Espanya\n• Correu electrònic de contacte: info@teselarsoftware.com'
        },
        {
          title: '2. Finalitat del Tractament de Dades',
          text: 'Les dades personals facilitades a través del formulari de contacte seran tractades exclusivament per a:\n\n1. Gestionar, atendre i respondre a la sol·licitud de contacte, pressupost o cita enviada per l\'usuari.\n2. Remetre la informació tècnica o comercial sol·licitada per l\'usuari.'
        },
        {
          title: '3. Legitimació del Tractament',
          text: 'La base jurídica que legitima el tractament de les dades és el CONSENTIMENT de l\'usuari. Per poder enviar una sol·licitud a través del formulari de contacte del web, és obligatori acceptar manualment la política de privacitat mitjançant la marcació explícita i inequívoca del checkbox habilitat a aquest efecte (Reglamento General de Protección de Datos - RGPD).'
        },
        {
          title: '4. Conservació de les Dades',
          text: 'Les dades personals es conservaran durant el temps estrictament necessari per complir amb la finalitat per a la qual van ser recollides, o fins que l\'usuari exerceixi el seu dret de supressió o oposició, cas en el qual seran bloquejades per a l\'atenció de possibles responsabilitats legals.'
        },
        {
          title: '5. Drets de l\'Usuari',
          text: 'L\'usuari pot exercitar en qualsevol moment els seus drets d\'accés, rectificació, supressió, limitació del tractament, portabilitat i oposició de les seves dades de caràcter personal adreçant-se mitjançant correu electrònic al Responsable del Tractament: info@teselarsoftware.com.'
        }
      ]
    },
    cookies: {
      title: 'Política de Cookies',
      sections: [
        {
          title: '1. Què són les Cookies?',
          text: 'Una cookie és un fitxer que es descarrega al seu ordinador en accedir a determinades pàgines web. Les cookies permeten a una pàgina web, entre altres coses, emmagatzemar i recuperar informació sobre els hàbits de navegació d\'un usuari o del seu equip i, depenent de la informació que continguin i de la forma en què utilitzi el seu equip, es poden utilitzar per reconèixer l\'usuari.'
        },
        {
          title: '2. Quins tipus de Cookies utilitza aquest web?',
          text: 'Aquest lloc web només utilitza cookies tècniques i de personalització essencials per al seu correcte funcionament:\n\n• Cookies Tècniques: Són aquelles que permeten a l\'usuari la navegació a través d\'una pàgina web, plataforma o aplicació i la utilització de les diferents opcions o serveis que hi hagi.\n• Cookies de Personalització: Permeten emmagatzemar la preferència de l\'idioma de l\'usuari (espanyol, català, anglès) de forma temporals per oferir una navegació coherent i fluida.'
        },
        {
          title: '3. Desactivació o Eliminació de Cookies',
          text: 'L\'usuari pot permetre, bloquejar o eliminar les cookies instal·lades al seu equip mitjançant la configuració de les opcions del navegador instal·lat al seu ordinador. No obstant això, si bloqueja les cookies essencials, és possible que certes funcionalitats del web (com la memorització de l\'idioma) deixin de funcionar correctament.'
        }
      ]
    }
  },
  en: {
    aviso: {
      title: 'Legal Notice',
      sections: [
        {
          title: '1. Identification Information',
          text: 'In compliance with Article 10 of Law 34/2002, of July 11, on Services of the Information Society and Electronic Commerce, the following details of the owner of the website are detailed:\n\n• Trade Name: Teselar Software\n• Registered Office: Lloret de Mar, Girona, Spain\n• Contact Email: info@teselarsoftware.com\n• Contact Phone: +34 653 232 735'
        },
        {
          title: '2. Terms of Use',
          text: 'Access to and/or use of this portal attributes the condition of USER, who accepts the General Conditions of Use reflected here. The website of Teselar Software provides access to information, services, programs, or data on the Internet belonging to Teselar Software. The USER assumes responsibility for the use of the portal.'
        },
        {
          title: '3. Intellectual and Industrial Property',
          text: 'Teselar Software by itself or as an assignee, is the owner of all intellectual and industrial property rights of its website, as well as the elements contained therein (by way of example: images, sound, audio, video, software, or texts; brands or logos, color combinations, structure and design, selection of materials used, etc.), owned by Teselar Software or its licensors.'
        },
        {
          title: '4. Exclusion of Warranties and Liability',
          text: 'Teselar Software is not responsible, under any circumstances, for damages of any kind that could be caused, by way of example: errors or omissions in the content, lack of availability of the portal, or the transmission of viruses or malicious or harmful programs in the content, despite having adopted all necessary technological measures to prevent it.'
        }
      ]
    },
    privacidad: {
      title: 'Privacy Policy',
      sections: [
        {
          title: '1. Data Controller',
          text: 'The Data Controller for the personal data collected through this website is:\n\n• Trade Name: Teselar Software\n• Registered Office: Lloret de Mar, Girona, Spain\n• Contact Email: info@teselarsoftware.com'
        },
        {
          title: '2. Purpose of Data Processing',
          text: 'The personal data provided through the contact form will be processed exclusively to:\n\n1. Manage, address, and respond to the contact, quote, or meeting request submitted by the user.\n2. Deliver the technical or commercial information requested by the user.'
        },
        {
          title: '3. Legal Basis for Processing',
          text: 'The legal basis that legitimize the processing of data is the CONSENT of the user. To submit a request through the web contact form, it is mandatory to manually accept the privacy policy by explicitly and unequivocally checking the checkbox enabled for this purpose (General Data Protection Regulation - GDPR).'
        },
        {
          title: '4. Data Retention',
          text: 'Personal data will be kept for the time strictly necessary to fulfill the purpose for which they were collected, or until the user exercises their right of deletion or opposition, in which case they will be blocked to address potential legal liabilities.'
        },
        {
          title: '5. Rights of the User',
          text: 'The user can exercise at any time their rights of access, rectification, deletion, limitation of processing, portability, and opposition of their personal data by contacting the Data Controller via email: info@teselarsoftware.com.'
        }
      ]
    },
    cookies: {
      title: 'Cookies Policy',
      sections: [
        {
          title: '1. What are Cookies?',
          text: 'A cookie is a file that is downloaded to your computer when you access certain websites. Cookies allow a website, among other things, to store and retrieve information about the browsing habits of a user or their computer and, depending on the information they contain and the way they use their computer, they can be used to recognize the user.'
        },
        {
          title: '2. What types of Cookies does this website use?',
          text: 'This website only uses technical and personalization cookies essential for its proper functioning:\n\n• Technical Cookies: They allow the user to navigate through a website, platform, or application and utilize the different options or services that exist therein.\n• Personalization Cookies: They allow storing the language preference of the user (Spanish, Catalan, English) temporarily to offer a coherent and fluid browsing experience.'
        },
        {
          title: '3. Disabling or Deleting Cookies',
          text: 'The user can allow, block, or delete cookies installed on their computer by configuring the browser options installed on their computer. However, if you block essential cookies, certain features of the website (such as language memorization) may stop working properly.'
        }
      ]
    }
  }
};
