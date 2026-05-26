'use client';

import React, { useState, useEffect, use, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { Background3D } from '../../components/Background3D';
import { dictionaries } from '../../i18n/dictionaries';
import { 
  Search, Zap, Laptop, Brain, Briefcase, ShoppingCart, Languages, Monitor, 
  ArrowRight, CheckCircle2, AlertCircle, Info, Menu, X, Mail, Phone, MapPin, 
  Check, ShieldCheck, CreditCard, ChevronRight, Calendar, Sparkles,
  Gift, Star, Users, Clock, Send
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lng: string }>;
}

interface AnimatedWordProps {
  word: string;
  index: number;
  totalWords: number;
  isGradient: boolean;
  scrollY: any;
  heroBuilt: boolean;
}

const AnimatedWord = ({ word, index, totalWords, isGradient, scrollY, heroBuilt }: AnimatedWordProps) => {
  // Let the title animation span from 200px to 440px scroll depth
  const startScroll = 200;
  const endScroll = 440;
  const scrollSpan = endScroll - startScroll;
  
  // Stagger the activation of each word across the span
  const wordStart = startScroll + (index / totalWords) * (scrollSpan * 0.55);
  const wordEnd = wordStart + (scrollSpan * 0.45); // overlaps slightly for a fluid wave effect
  
  const opacityVal = useTransform(scrollY, [wordStart, wordEnd], [0, 1]);
  const yVal = useTransform(scrollY, [wordStart, wordEnd], [18, 0]);
  const scaleVal = useTransform(scrollY, [wordStart, wordEnd], [0.94, 1]);
  
  return (
    <motion.span
      style={{ 
        opacity: heroBuilt ? 1 : opacityVal, 
        y: heroBuilt ? 0 : yVal, 
        scale: heroBuilt ? 1 : scaleVal, 
        display: 'inline-block' 
      }}
      className={`mr-[0.22em] select-none ${isGradient ? 'bg-gradient-to-r from-innovacion via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,191,165,0.25)] font-black' : 'font-extrabold'}`}
    >
      {word}
    </motion.span>
  );
};

export default function Page({ params }: PageProps) {
  const { lng: urlLng } = use(params);
  const [currentLng, setCurrentLng] = useState(urlLng);
  const lng = currentLng;
  const t = dictionaries[currentLng as 'es' | 'ca' | 'en'] || dictionaries.en;
  
  // Keep local language state synchronized if URL is directly navigated
  useEffect(() => {
    setCurrentLng(urlLng);
  }, [urlLng]);

  // Word arrays for staggered title construction (Apple-style cinematic reveal)
  const esWords = [
    { text: "La", isGradient: false },
    { text: "pieza", isGradient: false },
    { text: "exacta", isGradient: false },
    { text: "donde", isGradient: false },
    { text: "la", isGradient: false },
    { text: "tecnología", isGradient: false },
    { text: "y", isGradient: false },
    { text: "tu", isGradient: false },
    { text: "negocio", isGradient: false },
    { text: "encajan", isGradient: true },
    { text: "perfectamente", isGradient: true }
  ];

  const caWords = [
    { text: "La", isGradient: false },
    { text: "peça", isGradient: false },
    { text: "exacta", isGradient: false },
    { text: "on", isGradient: false },
    { text: "la", isGradient: false },
    { text: "tecnologia", isGradient: false },
    { text: "i", isGradient: false },
    { text: "el", isGradient: false },
    { text: "teu", isGradient: false },
    { text: "negoci", isGradient: false },
    { text: "encaixen", isGradient: true },
    { text: "perfectament", isGradient: true }
  ];

  const enWords = [
    { text: "The", isGradient: false },
    { text: "exact", isGradient: false },
    { text: "piece", isGradient: false },
    { text: "where", isGradient: false },
    { text: "technology", isGradient: false },
    { text: "and", isGradient: false },
    { text: "your", isGradient: false },
    { text: "business", isGradient: false },
    { text: "fit", isGradient: true },
    { text: "perfectly", isGradient: true }
  ];

  const activeWords = currentLng === 'es' ? esWords : currentLng === 'ca' ? caWords : enWords;
  
  const router = useRouter();
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
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactReason, setContactReason] = useState('info'); // default to requesting info
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'automation' | 'systems'>('all');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'aviso' | 'privacidad' | 'cookies' | null>(null);

  // States for interactive technical HUD comparison (Option 3)
  const [activeHudPlatform, setActiveHudPlatform] = useState<'nextjs' | 'wordpress'>('nextjs');

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

  // Sticky Scroll Container tracking for cinematic morphing
  const heroContainerRef = useRef<HTMLDivElement>(null);
  
  // Track global scroll Y position (prevents off-screen viewport exit resets completely)
  const { scrollY } = useScroll();
  
  // Smooth out discrete scroll ticks with a premium spring physics model (buttery 120fps glide)
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 250,     // Ultra-responsive, tracks aggressive/rapid keyboard jumps immediately
    damping: 38,        // Critically damped to eliminate overshoot/rebound latency completely
    restDelta: 0.05
  });

  // 0. Header: one-shot reveal triggered by IntersectionObserver (zero per-frame JS, restores 9-transform smoothScrollY load)
  // Observes the center hero title - when it exits viewport (user scrolled), header appears once via spring
  const [headerVisible, setHeaderVisible] = useState(false);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  
  // UX Optimization: once the hero has been built, scrolling back to top must NOT show the central massive loader title again
  const [heroBuilt, setHeroBuilt] = useState(false);
  
  useEffect(() => {
    // Check initial position on mount (e.g. reload)
    if (typeof window !== 'undefined' && window.scrollY > 400) {
      setHeroBuilt(true);
    }
    const unsubscribe = scrollY.on('change', v => {
      if (v > 400) {
        setHeroBuilt(true);
      }
    });
    return unsubscribe;
  }, [scrollY]);

  useEffect(() => {
    const el = heroTitleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect(); // Fire once, then stop — zero ongoing overhead
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', '5c1024f8-ccf6-408d-926f-553dd013526a');
    formData.append('subject', `Lead Rápido Exit-Intent: ${formData.get('name')}`);
    formData.append('from_name', 'Teselar Web Exit-Intent');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
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

  // 1. Center Massive Title Transforms (0px to 140px - fades out quickly to prevent overlap)
  const centerTitleOpacity = useTransform(smoothScrollY, [0, 140], [1, 0]);
  const centerTitleScale = useTransform(smoothScrollY, [0, 140], [1, 0.7]);
  const centerTitleY = useTransform(smoothScrollY, [0, 140], [0, -50]);

  // 3. Left Slogan Title Reveal (handled word-by-word inside AnimatedWord from 200px to 440px)

  // 4. Subtitle Reveal (400px to 520px - slides up cleanly in sequence)
  const subtitleOpacity = useTransform(smoothScrollY, [400, 520], [0, 1]);
  const subtitleY = useTransform(smoothScrollY, [400, 520], [20, 0]);

  // 5. CTA Buttons Reveal (460px to 560px - final interactive elements arrival)
  const ctaOpacity = useTransform(smoothScrollY, [460, 560], [0, 1]);
  const ctaY = useTransform(smoothScrollY, [460, 560], [15, 0]);

  // 6. Right Content Reveal (Floating Holographic Glass Shapes & Core) (340px to 480px)
  const rightOpacity = useTransform(smoothScrollY, [340, 480], [0, 1]);
  const rightScale = useTransform(smoothScrollY, [340, 480], [0.85, 1]);

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

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', '5c1024f8-ccf6-408d-926f-553dd013526a');
    formData.append('subject', `Nuevo Lead Teselar (${contactReason.toUpperCase()}): ${formData.get('name')}`);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        window.location.href = `/${currentLng}/gracias`;
      } else {
        setSubmitError(data.message || t.contact.error);
        setIsSubmitting(false);
      }
    } catch (err) {
      setSubmitError(t.contact.error);
      setIsSubmitting(false);
    }
  };

  // Build the list of 8 services mapping to dictionary entries
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
      features: [t.services.s2.f1, t.services.s2.f2, t.services.s2.f3, t.services.s2.f4, t.services.s2.f5, t.services.s2.f6, t.services.s2.f7]
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
      features: [t.services.s5.f1, t.services.s5.f2, t.services.s5.f3, t.services.s5.f4, t.services.s5.f5, t.services.s5.f6, t.services.s5.f7]
    },
    {
      id: 's6',
      category: 'web',
      title: t.services.s6.title,
      ideal: t.services.s6.ideal,
      price: t.services.s6.price,
      tag: t.services.s6.tag,
      icon: ShoppingCart,
      features: [t.services.s6.f1, t.services.s6.f2, t.services.s6.f3, t.services.s6.f4, t.services.s6.f5, t.services.s6.f6, t.services.s6.f7]
    },
    {
      id: 's7',
      category: 'web',
      title: t.services.s7.title,
      ideal: t.services.s7.ideal,
      price: t.services.s7.price,
      tag: t.services.s7.tag,
      icon: Languages,
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
      features: [t.services.s8.f1, t.services.s8.f2, t.services.s8.f3, t.services.s8.f4, t.services.s8.f5, t.services.s8.f6, t.services.s8.f7]
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? servicesList 
    : servicesList.filter(s => s.category === activeCategory);

  return (
    <div className="relative min-h-screen">
      {/* Immersive 3D interactive nodes connection canvas */}
      <Background3D />

      {/* Floating Modern Header / Navbar — one-shot spring reveal, zero per-frame JS after trigger */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : -40 }}
        transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 1 }}
        className="fixed top-0 inset-x-0 z-50 px-4 py-4 md:px-8"
      >
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
          </div>

          {/* Navigation right controls (CTAs and Selector) */}
          <div className="flex items-center gap-4">
            {/* Quick Language Selector */}
            <div className="relative group">
              <button className="glass-panel text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 hover:border-innovacion hover:text-innovacion transition-all duration-300">
                <Languages size={13} />
                <span className="uppercase">{currentLng}</span>
              </button>
              <div className="absolute right-0 mt-2 w-28 glass-panel rounded-2xl p-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 shadow-xl border border-claridad/10 backdrop-blur-md">
                <button onClick={() => handleLanguageChange('es')} className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-colors ${currentLng === 'es' ? 'bg-innovacion/25 text-innovacion font-black' : 'hover:bg-claridad/10'}`}>Castellano</button>
                <button onClick={() => handleLanguageChange('ca')} className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-colors ${currentLng === 'ca' ? 'bg-innovacion/25 text-innovacion font-black' : 'hover:bg-claridad/10'}`}>Català</button>
                <button onClick={() => handleLanguageChange('en')} className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-colors ${currentLng === 'en' ? 'bg-innovacion/25 text-innovacion font-black' : 'hover:bg-claridad/10'}`}>English</button>
              </div>
            </div>

            {/* Aggressive visible CTA Button */}
            <button 
              onClick={() => handleScrollToContact('meeting')}
              className="bg-innovacion text-teselar-dark font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-lg shadow-innovacion/15 hover:bg-claridad hover:scale-105 transition-all duration-300 cursor-pointer hidden xs:inline-block"
            >
              {t.nav.contact}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-1 text-claridad hover:text-innovacion transition-colors cursor-pointer">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Responsive Navigation overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-teselar-dark/95 backdrop-blur-xl pt-28 px-8 flex flex-col gap-6 md:hidden"
          >
            <div className="flex flex-col gap-5 text-xl font-bold text-claridad/90 border-b border-claridad/10 pb-8">
              <a href="#values" onClick={() => setIsMenuOpen(false)} className="hover:text-innovacion transition-colors">{t.nav.values}</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-innovacion transition-colors">{t.nav.services}</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-innovacion transition-colors">{t.nav.pricing}</a>
              <a href="#process" onClick={() => setIsMenuOpen(false)} className="hover:text-innovacion transition-colors">{t.nav.process}</a>
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
              <button 
                onClick={() => handleScrollToContact('meeting')}
                className="w-full bg-innovacion text-teselar-dark text-center font-extrabold py-3.5 rounded-full shadow-lg shadow-innovacion/20 hover:bg-claridad"
              >
                {t.hero.cta_alt}
              </button>
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

      {/* 1. SCROLL-DRIVEN CINEMATIC HERO TRACK (Desktop: scroll-driven | Mobile: auto-reveal) */}
      <section ref={heroContainerRef} className={`relative w-full z-10 ${isMobile ? 'min-h-screen-dynamic' : 'h-[160vh]'}`}>
        <div className={`${isMobile ? 'relative min-h-screen-dynamic' : 'sticky top-0 h-screen'} w-full flex items-center justify-center overflow-hidden`}>
          {/* Scoped High-Tech Cyber Dotted Grid (Subtle and ultra-premium) */}
          <div className="hero-grid opacity-15" />

          {/* Colorful cinematic neon glow balls (reduced on mobile) */}
          <div className={`absolute top-[18%] left-[8%] rounded-full bg-innovacion/8 pointer-events-none z-0 ${isMobile ? 'w-[60vw] h-[60vw] blur-[80px]' : 'w-[40vw] h-[40vw] blur-[130px]'}`} />
          <div className={`absolute bottom-[10%] right-[10%] rounded-full bg-teselar/25 pointer-events-none z-0 animate-pulse ${isMobile ? 'w-[60vw] h-[60vw] blur-[100px]' : 'w-[45vw] h-[45vw] blur-[160px]'}`} style={{ animationDuration: '9s' }} />

          {/* Widescreen Hollywood Anamorphic Lens Flare Background accents (hidden on mobile for perf) */}
          {!isMobile && (
            <>
              <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[1px] bg-gradient-to-r from-transparent via-innovacion/70 to-transparent blur-[2px] pointer-events-none z-0" />
              <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[6px] bg-gradient-to-r from-transparent via-innovacion to-transparent blur-[6px] pointer-events-none z-0 cinematic-flare-pulse" />
              <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-innovacion/20 blur-2xl pointer-events-none z-0 cinematic-flare-pulse" />
              <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[120px] bg-gradient-to-r from-transparent via-teselar/25 to-transparent blur-[80px] pointer-events-none z-0" />
            </>
          )}

          {/* Centered Massive branding logo card — Desktop: scroll-driven fade | Mobile: auto-fade splash */}
          <motion.div 
            ref={heroTitleRef}
            style={isMobile ? undefined : { 
              opacity: heroBuilt ? 0 : centerTitleOpacity, 
              scale: heroBuilt ? 0.7 : centerTitleScale, 
              y: heroBuilt ? -50 : centerTitleY 
            }}
            initial={isMobile ? { opacity: 1, scale: 1 } : undefined}
            animate={isMobile ? { opacity: 0, scale: 0.7, y: -30 } : undefined}
            transition={isMobile ? { duration: 0.8, delay: 1.2, ease: 'easeInOut' } : undefined}
            className={`absolute z-40 flex flex-col items-center justify-center pointer-events-none select-none text-center px-4 ${isMobile ? '' : ''}`}
          >
            <div className="w-16 h-px bg-innovacion/35 mb-6" />
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.06em] text-claridad drop-shadow-[0_0_30px_rgba(0,191,165,0.3)] uppercase leading-none">
              TESELAR
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.32em] text-innovacion/85 uppercase mt-4">
              SOFTWARE
            </h2>
            <div className="w-16 h-px bg-innovacion/35 mt-8" />
            {!isMobile && (
              <p className="font-mono text-[9px] tracking-[0.4em] text-claridad/30 uppercase mt-3.5">
                [ SCROLL_TO_INITIALIZE ]
              </p>
            )}
          </motion.div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 px-4 md:px-8 pt-24 md:pt-28 lg:pt-20">
            
            {/* Hero Left Content — Desktop: scroll-reveal | Mobile: staggered auto fade-in */}
            <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10 pr-0 lg:pr-6">
              {isMobile ? (
                /* MOBILE: Simple staggered fade-in title (no scroll dependency) */
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-8 text-claridad text-glow-cyan uppercase"
                >
                  {activeWords.map((wordObj, idx) => (
                    <span 
                      key={idx}
                      className={`inline-block mr-[0.22em] ${wordObj.isGradient ? 'bg-gradient-to-r from-innovacion via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,191,165,0.25)] font-black' : 'font-extrabold'}`}
                    >
                      {wordObj.text}
                    </span>
                  ))}
                </motion.h1>
              ) : (
                /* DESKTOP: Scroll-driven word-by-word reveal */
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8 text-claridad text-glow-cyan uppercase flex flex-wrap">
                  {activeWords.map((wordObj, idx) => (
                    <AnimatedWord 
                      key={idx}
                      word={wordObj.text}
                      index={idx}
                      totalWords={activeWords.length}
                      isGradient={wordObj.isGradient}
                      scrollY={smoothScrollY}
                      heroBuilt={heroBuilt}
                    />
                  ))}
                </h1>
              )}
              
              {isMobile ? (
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 2.0 }}
                  className="text-xl font-light text-claridad/95 leading-relaxed max-w-2xl mb-12"
                >
                  {t.hero.subtitle}
                </motion.p>
              ) : (
                <motion.p 
                  style={{ 
                    opacity: heroBuilt ? 1 : subtitleOpacity, 
                    y: heroBuilt ? 0 : subtitleY 
                  }}
                  className="text-xl md:text-2xl font-light text-claridad/95 leading-relaxed max-w-2xl mb-12"
                >
                  {t.hero.subtitle}
                </motion.p>
              )}
              
              {isMobile ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 2.3 }}
                  className="w-full flex flex-col gap-4"
                >
                  <button 
                    onClick={() => handleScrollToContact('meeting')}
                    className="bg-innovacion text-teselar-dark text-center font-black text-base tracking-wider uppercase px-10 py-5 rounded-full shadow-2xl shadow-innovacion/25 hover:bg-claridad transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    {t.hero.cta_alt}
                  </button>
                  <button 
                    onClick={() => handleScrollToContact('info')}
                    className="glass-panel text-center font-black text-base tracking-wider uppercase px-10 py-5 rounded-full border border-claridad/10 hover:border-innovacion hover:text-innovacion transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Info size={18} />
                    {t.hero.cta}
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  style={{ 
                    opacity: heroBuilt ? 1 : ctaOpacity, 
                    y: heroBuilt ? 0 : ctaY 
                  }}
                  className="w-full sm:w-auto flex flex-col sm:flex-row gap-4"
                >
                  <button 
                    onClick={() => handleScrollToContact('meeting')}
                    className="bg-innovacion text-teselar-dark text-center font-black text-base tracking-wider uppercase px-10 py-5 rounded-full shadow-2xl shadow-innovacion/25 hover:bg-claridad hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    {t.hero.cta_alt}
                  </button>
                  <button 
                    onClick={() => handleScrollToContact('info')}
                    className="glass-panel text-center font-black text-base tracking-wider uppercase px-10 py-5 rounded-full border border-claridad/10 hover:border-innovacion hover:text-innovacion hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Info size={18} />
                    {t.hero.cta}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Hero Right Content (hidden on mobile for clean hero, visible on lg+) */}
            <motion.div 
              style={isMobile ? undefined : { 
                opacity: heroBuilt ? 1 : rightOpacity, 
                scale: heroBuilt ? 1 : rightScale 
              }}
              initial={isMobile ? { opacity: 0, scale: 0.9 } : undefined}
              animate={isMobile ? { opacity: 1, scale: 1 } : undefined}
              transition={isMobile ? { duration: 0.8, delay: 2.5 } : undefined}
              className="lg:col-span-5 flex justify-center items-center relative min-h-[280px] md:min-h-[350px]"
            >
              <div className="w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 relative flex items-center justify-center">
                {/* Glassmorphic puzzle elements floating with custom animations & rich cyber HUD details */}
                <div className={`absolute bg-teselar/30 backdrop-blur-md border border-claridad/15 rounded-3xl -rotate-12 -translate-x-12 -translate-y-8 animate-float shadow-2xl flex flex-col justify-between p-5 text-[10px] font-mono text-claridad/50 ${isMobile ? 'w-32 h-32 p-3 text-[8px]' : 'w-44 h-44'}`}>
                  <div className="flex justify-between items-center">
                    <span>[ MODULE.01 ]</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-innovacion" />
                  </div>
                  <div className={`tracking-widest text-innovacion/70 uppercase font-bold ${isMobile ? 'text-[7px]' : 'text-[9px]'}`}>INTEGRITY_OK</div>
                </div>
                
                <div className={`absolute bg-innovacion/20 backdrop-blur-md border border-innovacion/35 rounded-[2.5rem] rotate-12 translate-x-12 translate-y-12 animate-float shadow-2xl flex flex-col justify-between p-5 text-[10px] font-mono text-innovacion ${isMobile ? 'w-28 h-28 p-3 text-[8px]' : 'w-36 h-36'}`} style={{ animationDelay: '-2s' }}>
                  <div className="flex justify-between items-center">
                    <span>[ CORE.SYS ]</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-innovacion animate-ping" />
                  </div>
                  <div className={`tracking-widest text-claridad/85 uppercase font-black ${isMobile ? 'text-[7px]' : 'text-[9px]'}`}>PERF: 99.2%</div>
                </div>
                
                {!isMobile && (
                  <div className="absolute w-24 h-24 bg-teselar-light/50 backdrop-blur-lg border border-claridad/10 rounded-2xl rotate-45 translate-x-6 -translate-y-20 animate-float shadow-xl flex flex-col justify-between p-4 text-[8px] font-mono text-claridad/45" style={{ animationDelay: '-4s' }}>
                    <span>[ DB.NODE ]</span>
                    <span className="text-[7px] tracking-widest text-innovacion/80 uppercase font-bold">SYNC_ACTIVE</span>
                  </div>
                )}
                
                {/* Central Glowing Active Core representing Teselar Logo concept */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className={`rounded-full border border-dashed border-innovacion/30 flex items-center justify-center absolute p-4 ${isMobile ? 'w-36 h-36' : 'w-48 h-48'}`}
                >
                  <div className={`rounded-full border border-innovacion/15 flex items-center justify-center ${isMobile ? 'w-28 h-28' : 'w-36 h-36'}`}>
                    <img src="/logo.jpeg" alt="Teselar core" className={`rounded-full border-2 border-innovacion/60 shadow-lg shadow-innovacion/20 object-cover ${isMobile ? 'w-20 h-20' : 'w-24 h-24'}`} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. EL CONCEPTO: LA PIEZA QUE ENCAJA (Scroll Experience) */}
      <section className="relative py-24 px-4 md:px-8 bg-teselar-dark/50 backdrop-blur-sm z-10 border-t border-b border-claridad/5 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-16 h-1 bg-innovacion mx-auto mb-8 rounded-full shadow-lg shadow-innovacion"
          />

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-10 text-glow-cyan"
          >
            {t.concept.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left mt-20 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -180, y: isMobile ? -60 : -50, rotate: isMobile ? 0 : -12 }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                y: 0, 
                rotate: 0,
                boxShadow: ["0 0 0px rgba(0,191,165,0)", "0 0 35px rgba(0,191,165,0.45)", "0 0 0px rgba(0,191,165,0)"]
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring", 
                stiffness: 90, 
                damping: 18,
                boxShadow: { duration: 1.2, delay: 0.5 }
              }}
              className="glass-card p-10 rounded-[2rem] border border-claridad/5 flex flex-col gap-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-teselar/10 rounded-bl-full pointer-events-none" />
              <p className="text-lg md:text-xl text-claridad/95 font-light leading-relaxed">{t.concept.text1}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 180, y: isMobile ? 60 : 50, rotate: isMobile ? 0 : 12 }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                y: 0, 
                rotate: 0,
                boxShadow: ["0 0 0px rgba(0,191,165,0)", "0 0 35px rgba(0,191,165,0.45)", "0 0 0px rgba(0,191,165,0)"]
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring", 
                stiffness: 90, 
                damping: 18, 
                delay: 0.12,
                boxShadow: { duration: 1.2, delay: 0.62 }
              }}
              className="glass-card p-10 rounded-[2rem] border border-claridad/5 flex flex-col gap-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-innovacion/5 rounded-bl-full pointer-events-none" />
              <p className="text-lg md:text-xl text-claridad/95 font-light leading-relaxed">{t.concept.text2}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SECCION DE VALORES: ¿POR QUE ELEGIRNOS? */}
      <section id="values" className="relative py-28 px-4 md:px-8 z-10 overflow-hidden content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-innovacion uppercase tracking-widest text-sm font-black">{t.nav.values}</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mt-3 mb-8 text-glow-cyan">{t.values.title}</h2>
            <p className="text-claridad/85 font-light text-lg md:text-xl max-w-3xl mx-auto">{t.values.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Value 1 */}
            <div className="glass-card p-10 rounded-[2rem] border border-claridad/5 flex gap-6 items-start group relative overflow-hidden">
              {/* Blueprint Vector Line Drawing SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <motion.rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="30"
                  fill="none"
                  stroke="#00BFA5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </svg>
              <motion.div
                initial={{ opacity: 0, filter: 'brightness(3) blur(4px)' }}
                whileInView={{ opacity: 1, filter: 'brightness(1) blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex gap-6 items-start w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-teselar/40 border border-claridad/10 flex items-center justify-center text-innovacion flex-shrink-0">
                  <Mail size={26} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-4 group-hover:text-innovacion transition-colors">{t.values.v1.title}</h3>
                  <p className="text-sm md:text-base text-claridad/80 font-light leading-relaxed">{t.values.v1.desc}</p>
                </div>
              </motion.div>
            </div>

            {/* Value 2 */}
            <div className="glass-card p-10 rounded-[2rem] border border-claridad/5 flex gap-6 items-start group relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <motion.rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="30"
                  fill="none"
                  stroke="#00BFA5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.4, ease: "easeInOut", delay: 0.15 }}
                />
              </svg>
              <motion.div
                initial={{ opacity: 0, filter: 'brightness(3) blur(4px)' }}
                whileInView={{ opacity: 1, filter: 'brightness(1) blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="flex gap-6 items-start w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-teselar/40 border border-claridad/10 flex items-center justify-center text-innovacion flex-shrink-0">
                  <Laptop size={26} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-4 group-hover:text-innovacion transition-colors">{t.values.v2.title}</h3>
                  <p className="text-sm md:text-base text-claridad/80 font-light leading-relaxed">{t.values.v2.desc}</p>
                </div>
              </motion.div>
            </div>

            {/* Value 3 */}
            <div className="glass-card p-10 rounded-[2rem] border border-claridad/5 flex gap-6 items-start group relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <motion.rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="30"
                  fill="none"
                  stroke="#00BFA5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
                />
              </svg>
              <motion.div
                initial={{ opacity: 0, filter: 'brightness(3) blur(4px)' }}
                whileInView={{ opacity: 1, filter: 'brightness(1) blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex gap-6 items-start w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-teselar/40 border border-claridad/10 flex items-center justify-center text-innovacion flex-shrink-0">
                  <MapPin size={26} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-4 group-hover:text-innovacion transition-colors">{t.values.v3.title}</h3>
                  <p className="text-sm md:text-base text-claridad/80 font-light leading-relaxed">{t.values.v3.desc}</p>
                </div>
              </motion.div>
            </div>

            {/* Value 4 */}
            <div className="glass-card p-10 rounded-[2rem] border border-claridad/5 flex gap-6 items-start group relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <motion.rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="30"
                  fill="none"
                  stroke="#00BFA5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.4, ease: "easeInOut", delay: 0.45 }}
                />
              </svg>
              <motion.div
                initial={{ opacity: 0, filter: 'brightness(3) blur(4px)' }}
                whileInView={{ opacity: 1, filter: 'brightness(1) blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.95 }}
                className="flex gap-6 items-start w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-teselar/40 border border-claridad/10 flex items-center justify-center text-innovacion flex-shrink-0">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-4 group-hover:text-innovacion transition-colors">{t.values.v4.title}</h3>
                  <p className="text-sm md:text-base text-claridad/80 font-light leading-relaxed">{t.values.v4.desc}</p>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* INLINE LEAD MAGNET CTA BANNER (Between Values and HUD) */}
      <section className="relative py-16 px-4 md:px-8 z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto inline-cta-banner glass-card p-10 md:p-14 rounded-[2.5rem] text-center relative"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-innovacion/8 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-innovacion/15 border border-innovacion/30 px-4 py-2 rounded-full text-innovacion text-xs font-mono font-bold tracking-wider uppercase mb-6">
              <Gift size={14} />
              <span>{lng === 'es' ? 'SIN COMPROMISO' : lng === 'ca' ? 'SENSE COMPROMÍS' : 'NO COMMITMENT'}</span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-glow-cyan">
              {t.leads.inline_title}
            </h3>
            <p className="text-base md:text-lg text-claridad/80 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
              {t.leads.inline_subtitle}
            </p>
            <button
              onClick={() => handleScrollToContact('info')}
              className="bg-innovacion text-teselar-dark font-black tracking-wider uppercase px-10 py-5 rounded-full shadow-2xl shadow-innovacion/25 hover:bg-claridad hover:scale-105 transition-all duration-300 cursor-pointer text-base flex items-center justify-center gap-2 mx-auto"
            >
              <Star size={18} />
              {t.leads.inline_btn}
            </button>
          </div>
        </motion.div>
      </section>

      {/* 3.5. HUD COMPARATIVO TÉCNICO (Next.js vs. WordPress / No-Code) */}
      <section id="hud-comparison" className="relative py-24 px-4 md:px-8 bg-teselar-dark/30 backdrop-blur-sm z-10 border-t border-b border-claridad/5 overflow-hidden content-visibility-auto">
        {/* Laser Scanning Beam Sweep */}
        <motion.div 
          initial={{ top: "-10%", opacity: 0 }}
          whileInView={{ 
            top: ["0%", "110%"],
            opacity: [0, 1, 1, 0] 
          }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-innovacion to-transparent shadow-[0_0_15px_#00BFA5] pointer-events-none z-30"
        />

        <div className="absolute inset-0 loader-grid opacity-5 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-innovacion uppercase tracking-widest text-xs font-mono font-black">
              &gt; {lng === 'es' ? 'COMPARATIVA_SISTEMAS' : lng === 'ca' ? 'COMPARATIVA_SISTEMES' : 'SYSTEM_COMPARISON'}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mt-3 mb-6 text-glow-cyan">
              {t.hud.title}
            </h2>
            <p className="text-claridad/85 font-light text-base md:text-lg max-w-2xl mx-auto">
              {t.hud.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Dynamic interactive visual dial control */}
            <motion.div 
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
              className="lg:col-span-5 glass-card p-8 rounded-[2.5rem] border border-claridad/5 flex flex-col justify-between items-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-innovacion/5 rounded-bl-full pointer-events-none" />
              
              <div className="w-full flex flex-col items-center text-center">
                <span className="text-xs font-mono text-claridad/40 uppercase tracking-widest mb-6">
                  [ {lng === 'es' ? 'SELECCIÓN_ARQUITECTURA' : lng === 'ca' ? 'SELECCIÓ_ARQUITECTURA' : 'ARCHITECTURE_SELECTION'} ]
                </span>
                
                {/* Visual HUD platform toggler */}
                <div className="relative glass-panel p-1.5 rounded-full flex gap-1 w-full max-w-xs mb-10 shadow-inner">
                  {/* Selector Background slide overlay */}
                  <motion.div 
                    className="absolute top-1.5 bottom-1.5 rounded-full bg-innovacion shadow-[0_0_15px_rgba(0,191,165,0.4)]"
                    animate={{ 
                      left: activeHudPlatform === 'nextjs' ? '6px' : 'calc(50% + 2px)',
                      width: 'calc(50% - 8px)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                  <button 
                    onClick={() => setActiveHudPlatform('nextjs')}
                    className={`relative z-10 w-1/2 py-3 rounded-full text-xs font-black tracking-wider uppercase transition-colors duration-300 cursor-pointer ${activeHudPlatform === 'nextjs' ? 'text-teselar-dark font-black' : 'text-claridad/65 hover:text-claridad font-bold'}`}
                  >
                    Next.js
                  </button>
                  <button 
                    onClick={() => setActiveHudPlatform('wordpress')}
                    className={`relative z-10 w-1/2 py-3 rounded-full text-xs font-black tracking-wider uppercase transition-colors duration-300 cursor-pointer ${activeHudPlatform === 'wordpress' ? 'text-teselar-dark font-black' : 'text-claridad/65 hover:text-claridad font-bold'}`}
                  >
                    WordPress
                  </button>
                </div>

                {/* Circular HUD radar/speedometer dial visual */}
                <div className="relative w-64 h-64 flex items-center justify-center mb-6">
                  {/* Outer rotating ring */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: activeHudPlatform === 'nextjs' ? 8 : 25, repeat: Infinity, ease: 'linear' }}
                    className={`absolute inset-0 rounded-full border border-dashed ${activeHudPlatform === 'nextjs' ? 'border-innovacion/30' : 'border-red-500/25'}`}
                  />
                  
                  {/* Glowing core shadow */}
                  <div className={`absolute w-40 h-40 rounded-full blur-3xl opacity-20 transition-colors duration-500 ${activeHudPlatform === 'nextjs' ? 'bg-innovacion' : 'bg-red-500'}`} />

                  {/* SVG Dash dial */}
                  <svg className="w-52 h-52 transform -rotate-90">
                    {/* Background circle */}
                    <circle 
                      cx="104" cy="104" r="88" 
                      className="stroke-claridad/5 fill-none" 
                      strokeWidth="10" 
                    />
                    {/* Active circle with transition */}
                    <motion.circle 
                      cx="104" cy="104" r="88" 
                      className="fill-none stroke-linecap-round" 
                      strokeWidth="10"
                      initial={{ strokeDasharray: '553', strokeDashoffset: '553' }}
                      animate={{ 
                        strokeDashoffset: activeHudPlatform === 'nextjs' ? 553 - (553 * 0.99) : 553 - (553 * 0.42),
                        stroke: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#ef4444'
                      }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{
                        filter: activeHudPlatform === 'nextjs' ? 'drop-shadow(0 0 8px rgba(0, 191, 165, 0.6))' : 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))'
                      }}
                    />
                  </svg>

                  {/* Percentage Counter Monospace text */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-mono text-[10px] tracking-widest text-claridad/40 uppercase mb-1">SCORE</span>
                    <motion.span 
                      key={activeHudPlatform}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-5xl font-black font-mono transition-colors duration-500 ${activeHudPlatform === 'nextjs' ? 'text-innovacion text-glow-cyan' : 'text-red-500'}`}
                    >
                      {activeHudPlatform === 'nextjs' ? '99' : '42'}%
                    </motion.span>
                    <span className="font-mono text-[9px] tracking-wider text-claridad/50 mt-1 uppercase">
                      {activeHudPlatform === 'nextjs' ? 'LIGHTHOUSE MAX' : 'SLUGGISH_SCORE'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status footer with monospace diagnostics */}
              <div className="w-full font-mono text-[10px] text-left border-t border-claridad/5 pt-5 space-y-1.5 text-claridad/65">
                <p className="flex justify-between">
                  <span>STATUS:</span>
                  <span className={activeHudPlatform === 'nextjs' ? 'text-innovacion font-bold' : 'text-amber-500 animate-pulse'}>
                    {activeHudPlatform === 'nextjs' ? 'OPTIMIZED_NATIVE' : 'WARNING_HEAVY_THEME'}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>RESPONSE_TIME:</span>
                  <span className={activeHudPlatform === 'nextjs' ? 'text-innovacion font-bold' : 'text-red-500'}>
                    {activeHudPlatform === 'nextjs' ? '0.2s (FAST)' : '4.8s (SLUGGISH)'}
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Right: Detailed dynamic metrics comparison */}
            <div className="lg:col-span-7 flex flex-col gap-5 justify-between">
              
              {/* Metric 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card p-6 rounded-2xl border border-claridad/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-innovacion/20 relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-500" style={{ backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#f59e0b' }} />
                <div>
                  <h4 className="text-xs font-black uppercase text-claridad/40 tracking-wider mb-1.5 font-mono">&gt; 01. {t.hud.metric_perf}</h4>
                  <p className="text-base font-bold text-claridad">
                    {activeHudPlatform === 'nextjs' ? t.hud.nextjs_perf_desc : t.hud.wp_perf_desc}
                  </p>
                </div>
                <div className="w-full sm:w-32 bg-claridad/5 h-2 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute left-0 top-0 h-full rounded-full"
                    animate={{ 
                      width: activeHudPlatform === 'nextjs' ? '99%' : '42%',
                      backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#ef4444' 
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>

              {/* Metric 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card p-6 rounded-2xl border border-claridad/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-innovacion/20 relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-500" style={{ backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#f59e0b' }} />
                <div>
                  <h4 className="text-sm font-black uppercase text-claridad/40 tracking-wider mb-1.5 font-mono">&gt; 02. {t.hud.metric_speed}</h4>
                  <p className="text-base font-bold text-claridad">
                    {activeHudPlatform === 'nextjs' ? t.hud.nextjs_speed_desc : t.hud.wp_speed_desc}
                  </p>
                </div>
                <div className="w-full sm:w-32 bg-claridad/5 h-2 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute left-0 top-0 h-full rounded-full"
                    animate={{ 
                      width: activeHudPlatform === 'nextjs' ? '95%' : '15%',
                      backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#ef4444' 
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>

              {/* Metric 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass-card p-6 rounded-2xl border border-claridad/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-innovacion/20 relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-500" style={{ backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#f59e0b' }} />
                <div>
                  <h4 className="text-sm font-black uppercase text-claridad/40 tracking-wider mb-1.5 font-mono">&gt; 03. {t.hud.metric_sec}</h4>
                  <p className="text-base font-bold text-claridad">
                    {activeHudPlatform === 'nextjs' ? t.hud.nextjs_sec_desc : t.hud.wp_sec_desc}
                  </p>
                </div>
                <div className="w-full sm:w-32 bg-claridad/5 h-2 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute left-0 top-0 h-full rounded-full"
                    animate={{ 
                      width: activeHudPlatform === 'nextjs' ? '100%' : '30%',
                      backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#ef4444' 
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>

              {/* Metric 4 */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="glass-card p-6 rounded-2xl border border-claridad/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-innovacion/20 relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-500" style={{ backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#f59e0b' }} />
                <div>
                  <h4 className="text-sm font-black uppercase text-claridad/40 tracking-wider mb-1.5 font-mono">&gt; 04. {t.hud.metric_plug}</h4>
                  <p className="text-base font-bold text-claridad">
                    {activeHudPlatform === 'nextjs' ? t.hud.nextjs_plug_desc : t.hud.wp_plug_desc}
                  </p>
                </div>
                <div className="w-full sm:w-32 bg-claridad/5 h-2 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute left-0 top-0 h-full rounded-full"
                    animate={{ 
                      width: activeHudPlatform === 'nextjs' ? '100%' : '20%',
                      backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#ef4444' 
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>

              {/* Metric 5 */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="glass-card p-6 rounded-2xl border border-claridad/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-innovacion/20 relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-500" style={{ backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#f59e0b' }} />
                <div>
                  <h4 className="text-sm font-black uppercase text-claridad/40 tracking-wider mb-1.5 font-mono">&gt; 05. {t.hud.metric_scale}</h4>
                  <p className="text-base font-bold text-claridad">
                    {activeHudPlatform === 'nextjs' ? t.hud.nextjs_scale_desc : t.hud.wp_scale_desc}
                  </p>
                </div>
                <div className="w-full sm:w-32 bg-claridad/5 h-2 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute left-0 top-0 h-full rounded-full"
                    animate={{ 
                      width: activeHudPlatform === 'nextjs' ? '100%' : '35%',
                      backgroundColor: activeHudPlatform === 'nextjs' ? '#00BFA5' : '#ef4444' 
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. CATALOGO INTERACTIVO DE SERVICIOS */}
      <section id="services" className="relative py-28 px-4 md:px-8 z-10 overflow-hidden content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* Header section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-innovacion uppercase tracking-widest text-sm font-black">{t.nav.services}</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mt-3 mb-8 text-glow-cyan">{t.services.title}</h2>
            <p className="text-claridad/85 font-light text-lg md:text-xl max-w-3xl mx-auto">{t.services.subtitle}</p>
            
            {/* Free adjustments callout alert banner */}
            <div className="mt-10 inline-flex items-center gap-4 bg-innovacion/10 border border-innovacion/35 px-7 py-4.5 rounded-[1.5rem] text-innovacion text-sm font-extrabold text-left max-w-3xl shadow-xl shadow-innovacion/10">
              <Info size={24} className="flex-shrink-0" />
              <span>{t.services.live_adjustments}</span>
            </div>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="flex justify-center mb-20">
            <div className="glass-panel p-2 rounded-full flex flex-wrap justify-center gap-2 max-w-4xl">
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

          {/* Dynamic Filterable Services Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, sIndex) => {
                const IconComponent = service.icon;
                const isEvenColumn = sIndex % 2 === 0;
                return (
                  <motion.div
                    layout
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.97, y: 30, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-40px" }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 90, 
                      damping: 18, 
                      delay: (sIndex % 4) * 0.05 
                    }}
                    className="glass-card p-8 rounded-[2rem] border border-claridad/5 flex flex-col justify-between h-full relative overflow-hidden group"
                  >
                    <div>
                      {/* Top icon and tag */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-teselar/40 border border-claridad/10 rounded-2xl flex items-center justify-center text-innovacion">
                          <IconComponent size={28} />
                        </div>
                        <span className="text-xs font-black tracking-widest uppercase text-claridad/60 bg-claridad/5 border border-claridad/10 px-3 py-1.5 rounded-full">{service.tag}</span>
                      </div>

                      {/* Service Title */}
                      <h3 className="text-xl md:text-2xl font-black leading-snug tracking-tight mb-5 group-hover:text-innovacion transition-colors">{service.title}</h3>

                      {/* Ideal for audience */}
                      <div className="mb-6 text-sm text-claridad/80 font-light">
                        <strong className="text-innovacion block font-black mb-1.5">{t.services.ideal}</strong>
                        {service.ideal}
                      </div>

                      {/* List of features */}
                      <ul className="space-y-3 mb-8 border-t border-claridad/5 pt-6">
                        <strong className="text-claridad font-extrabold text-sm block mb-3">{t.services.features}</strong>
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-3 text-sm text-claridad/90 font-light leading-relaxed">
                            <CheckCircle2 size={15} className="text-innovacion flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="border-t border-claridad/5 pt-6 mt-auto">
                      <div className="flex justify-between items-center gap-4 mb-5">
                        <span className="text-sm text-claridad/60 font-semibold">{t.services.pricing}</span>
                        <span className="text-xl md:text-2xl font-black text-innovacion">{service.price}</span>
                      </div>

                      <button 
                        onClick={() => handleInterest(service.title.replace(/^\d+\.\s*/, ''))}
                        className="w-full py-4.5 rounded-2xl bg-teselar/40 border border-claridad/10 text-sm font-black text-claridad tracking-wider uppercase hover:bg-innovacion hover:text-teselar-dark hover:border-innovacion hover:scale-[1.02] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {t.services.interest}
                        <ChevronRight size={15} />
                      </button>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

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
            <div className="w-12 h-12 rounded-2xl bg-innovacion/10 border border-innovacion/25 flex items-center justify-center text-innovacion flex-shrink-0">
              <Users size={22} />
            </div>
            <p className="text-sm md:text-base text-claridad/85 font-light leading-relaxed max-w-lg">
              {t.leads.post_services}
            </p>
          </div>
          <button
            onClick={() => handleScrollToContact('meeting')}
            className="bg-innovacion text-teselar-dark font-black text-xs tracking-wider uppercase px-8 py-4 rounded-full shadow-lg shadow-innovacion/15 hover:bg-claridad hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <Calendar size={14} />
            {t.leads.post_services_btn}
          </button>
        </div>
      </div>

      {/* 4.5. SIMULADOR DE AHORRO Y PRESUPUESTO INTERACTIVO (ROI Slider Estimator) */}
      <section id="roi-simulator" className="relative py-28 px-4 md:px-8 z-10 overflow-hidden bg-teselar-dark/10 backdrop-blur-sm border-b border-claridad/5 content-visibility-auto">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-innovacion uppercase tracking-widest text-xs font-mono font-black">
              &gt; {lng === 'es' ? 'ANALIZADOR_DE_COSTES' : lng === 'ca' ? 'ANALITZADOR_DE_COSTOS' : 'COST_ANALYZER'}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mt-3 mb-6 text-glow-cyan">
              {t.simulator.title}
            </h2>
            <p className="text-claridad/85 font-light text-base md:text-lg max-w-2xl mx-auto">
              {t.simulator.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Interactive Input sliders */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -180, y: isMobile ? -50 : 0 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0,
                boxShadow: ["0 0 0px rgba(0,191,165,0)", "0 0 25px rgba(0,191,165,0.3)", "0 0 0px rgba(0,191,165,0)"]
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring", 
                stiffness: 110, 
                damping: 14,
                boxShadow: { duration: 1.2, delay: 0.5 }
              }}
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
                  <div className="flex justify-between text-[10px] text-claridad/40 font-mono">
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
                  <div className="flex justify-between text-[10px] text-claridad/40 font-mono">
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
                  <div className="flex justify-between text-[10px] text-claridad/40 font-mono">
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
              initial={{ opacity: 0, x: isMobile ? 0 : 180, y: isMobile ? 50 : 0 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0,
                boxShadow: ["0 0 0px rgba(0,191,165,0)", "0 0 25px rgba(0,191,165,0.3)", "0 0 0px rgba(0,191,165,0)"]
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring", 
                stiffness: 110, 
                damping: 14, 
                delay: 0.05,
                boxShadow: { duration: 1.2, delay: 0.55 }
              }}
              className="lg:col-span-5 flex flex-col justify-between gap-6"
            >
              
              {/* Financial Dashboard Display Card */}
              <div className="glass-card p-8 rounded-[2.5rem] border-2 border-innovacion/35 bg-teselar-light/40 flex flex-col justify-between gap-8 relative overflow-hidden shadow-2xl shadow-innovacion/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-innovacion/5 rounded-bl-full pointer-events-none" />
                
                <div className="space-y-6">
                  {/* Monthly Savings Result */}
                  <div className="border-b border-claridad/5 pb-5">
                    <span className="text-xs font-mono tracking-widest text-claridad/40 uppercase block mb-1">[ {t.simulator.result_monthly} ]</span>
                    <span className="font-mono text-4xl sm:text-5xl font-black text-innovacion text-glow-cyan">
                      {Math.round(wastedHours * employeeCount * hourlyCost * 4.33).toLocaleString()}€
                    </span>
                    <span className="text-xs text-claridad/50 font-light block mt-1">
                      {lng === 'es' ? 'ahorrados cada mes' : lng === 'ca' ? 'estalviats cada mes' : 'saved each month'}
                    </span>
                  </div>

                  {/* Annual Savings Result */}
                  <div className="border-b border-claridad/5 pb-5">
                    <span className="text-xs font-mono tracking-widest text-claridad/40 uppercase block mb-1">[ {t.simulator.result_yearly} ]</span>
                    <span className="font-mono text-4xl sm:text-5xl font-black text-claridad">
                      {Math.round(wastedHours * employeeCount * hourlyCost * 4.33 * 12).toLocaleString()}€
                    </span>
                    <span className="text-xs text-claridad/50 font-light block mt-1">
                      {lng === 'es' ? 'pérdidas anuales recuperadas' : lng === 'ca' ? 'pèrdues anuals recuperades' : 'annual losses recovered'}
                    </span>
                  </div>

                  {/* Recovered Hours Result */}
                  <div>
                    <span className="text-xs font-mono tracking-widest text-claridad/40 uppercase block mb-1">[ {t.simulator.result_hours} ]</span>
                    <span className="font-mono text-3xl font-black text-claridad/85 block">
                      {(wastedHours * employeeCount * 52).toLocaleString()}h
                    </span>
                    <span className="text-xs text-claridad/50 font-light block mt-1">
                      {lng === 'es' ? 'de trabajo redirigidas a tareas productivas' : lng === 'ca' ? 'de treball redirigides a tasques productives' : 'of work redirected to productive tasks'}
                    </span>
                  </div>
                </div>

                {/* Suggested service recommendation box */}
                <div className="border-t border-claridad/5 pt-5 mt-4">
                  <div className="flex justify-between items-center gap-3 mb-2.5">
                    <span className="text-xs font-mono text-claridad/40 tracking-widest uppercase">{t.simulator.rec_title}:</span>
                    <span className="bg-innovacion text-teselar-dark text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded shadow">
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
                    ? `Hola Teselar Software, he utilizado el simulador interactivo de vuestra web y he calculado unas pérdidas anuales estimadas de ${yearlyVal.toLocaleString()}€ por tareas manuales repetitivas (${yearlyHours.toLocaleString()}h recuperables/año). Me interesa vuestra propuesta de "${suggestedService}" para automatizar estos procesos e incrementar la rentabilidad de mi negocio.`
                    : lng === 'ca'
                      ? `Hola Teselar Software, he utilitzat el simulador interactiu de la vostra web i he calculat unes pèrdues anuales estimades de ${yearlyVal.toLocaleString()}€ per tasques manuals repetitives (${yearlyHours.toLocaleString()}h recuperables/any). M'interessa la vostra proposta de "${suggestedService}" per automatitzar aquests processos i incrementar la rendibilitat del meu negoci.`
                      : `Hello Teselar Software, I have used the interactive simulator on your website and calculated an estimated annual loss of ${yearlyVal.toLocaleString()}€ due to repetitive manual tasks (${yearlyHours.toLocaleString()} recoverable hours/year). I am interested in your proposal for "${suggestedService}" to automate these processes and increase our operational profitability.`;
                  
                  setContactMessage(customizedText);

                  // 3. Set the budget dropdown to the correct tier in the form using standard element value setting or DOM
                  const budgetSelect = document.getElementById('budget') as HTMLSelectElement;
                  if (budgetSelect) {
                    budgetSelect.value = budgetTier;
                  }
                  
                  // 4. Trigger cian neon confirmation banner
                  setShowSimulatorNotif(true);
                  setTimeout(() => setShowSimulatorNotif(false), 4000);

                  // 5. Scroll smoothly to contact section
                  const contactSec = document.getElementById('contact');
                  if (contactSec) {
                    contactSec.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-5 rounded-2xl bg-innovacion text-teselar-dark font-black tracking-wider uppercase hover:bg-claridad hover:scale-[1.01] transition-all duration-300 cursor-pointer shadow-lg shadow-innovacion/15 text-center block text-sm"
              >
                {t.simulator.btn_apply}
              </button>

            </motion.div>

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
            <div className="w-8 h-8 rounded-full bg-innovacion/15 border border-innovacion/40 flex items-center justify-center text-innovacion flex-shrink-0 animate-pulse">
              <Sparkles size={16} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-innovacion font-mono font-bold uppercase tracking-wider mb-0.5">&gt; PROTOCOLO_SINCRO</p>
              <p className="text-xs text-claridad/90 font-light leading-relaxed">
                {t.simulator.notif_linked}
              </p>
            </div>
            <button 
              onClick={() => setShowSimulatorNotif(false)} 
              className="text-claridad/40 hover:text-claridad transition-colors p-1 flex-shrink-0 cursor-pointer"
            >
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. PRECIOS: MANTENIMIENTO, SOPORTE Y METODOS DE PAGO */}
      {/* POST-ROI URGENCY STRIP */}
      <div className="urgency-strip py-8 px-4 md:px-8 z-10 relative border-t border-b border-claridad/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-innovacion/10 border border-innovacion/25 flex items-center justify-center text-innovacion flex-shrink-0">
              <Clock size={22} />
            </div>
            <p className="text-sm md:text-base text-claridad/85 font-light leading-relaxed max-w-lg">
              {t.leads.post_roi}
            </p>
          </div>
          <button
            onClick={() => handleScrollToContact('meeting')}
            className="bg-innovacion text-teselar-dark font-black text-xs tracking-wider uppercase px-8 py-4 rounded-full shadow-lg shadow-innovacion/15 hover:bg-claridad hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <Calendar size={14} />
            {t.leads.post_roi_btn}
          </button>
        </div>
      </div>

      <section id="pricing" className="relative py-24 px-4 md:px-8 bg-teselar-dark/50 backdrop-blur-sm z-10 border-t border-b border-claridad/5 content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-innovacion uppercase tracking-widest text-sm font-black">{t.nav.pricing}</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mt-3 mb-8 text-glow-cyan">{t.pricing.title}</h2>
            <p className="text-claridad/85 font-light text-lg md:text-xl max-w-3xl mx-auto">{t.pricing.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Basic Plan Card */}
            <motion.div 
              initial={{ opacity: 0, rotateY: isMobile ? 0 : 90, rotateX: isMobile ? 45 : 0 }}
              whileInView={{ opacity: 1, rotateY: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformOrigin: isMobile ? 'center top' : 'left center', transformPerspective: 1200 }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="lg:col-span-6 glass-card p-10 rounded-[2.5rem] border border-claridad/5 flex flex-col justify-between [backface-visibility:hidden]"
            >
              <div>
                <span className="text-sm font-black text-claridad/55 uppercase tracking-widest">{t.pricing.basic.title}</span>
                <div className="flex items-baseline gap-1 mt-5 mb-8">
                  <span className="text-5xl md:text-6xl font-black text-claridad">{t.pricing.basic.price}</span>
                  <span className="text-base font-light text-claridad/50">{t.pricing.basic.period}</span>
                </div>
                <p className="text-base md:text-lg font-light text-claridad/85 mb-8 leading-relaxed">{t.pricing.basic.desc}</p>
                
                <ul className="space-y-4 border-t border-claridad/5 pt-8">
                  <li className="flex items-start gap-3.5 text-sm md:text-base text-claridad/95 font-light leading-relaxed">
                    <CheckCircle2 size={18} className="text-innovacion flex-shrink-0 mt-0.5" />
                    <span>{t.pricing.basic.f1}</span>
                  </li>
                  <li className="flex items-start gap-3.5 text-sm md:text-base text-claridad/95 font-light leading-relaxed">
                    <CheckCircle2 size={18} className="text-innovacion flex-shrink-0 mt-0.5" />
                    <span>{t.pricing.basic.f2}</span>
                  </li>
                  <li className="flex items-start gap-3.5 text-sm md:text-base text-claridad/95 font-light leading-relaxed">
                    <CheckCircle2 size={18} className="text-innovacion flex-shrink-0 mt-0.5" />
                    <span>{t.pricing.basic.f3}</span>
                  </li>
                  <li className="flex items-start gap-3.5 text-sm md:text-base text-claridad/95 font-light leading-relaxed">
                    <CheckCircle2 size={18} className="text-innovacion flex-shrink-0 mt-0.5" />
                    <span>{t.pricing.basic.f4}</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => handleScrollToContact('info')}
                className="w-full py-5.5 rounded-2xl bg-teselar/40 border border-claridad/10 text-sm font-black text-claridad tracking-wider uppercase hover:bg-innovacion hover:text-teselar-dark hover:border-innovacion transition-all duration-300 cursor-pointer mt-10"
              >
                {lng === 'es' ? 'Contratar Plan Básico' : lng === 'ca' ? 'Contractar Pla Bàsic' : 'Hire Basic Plan'}
              </button>
            </motion.div>

            {/* Plus Plan Card (Recommended) */}
            <motion.div 
              initial={{ opacity: 0, rotateY: isMobile ? 0 : -90, rotateX: isMobile ? 45 : 0 }}
              whileInView={{ opacity: 1, rotateY: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformOrigin: isMobile ? 'center top' : 'right center', transformPerspective: 1200 }}
              transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.12 }}
              className="lg:col-span-6 glass-card p-10 rounded-[2.5rem] border-2 border-innovacion/35 bg-teselar-light/50 flex flex-col justify-between relative shadow-2xl shadow-innovacion/10 [backface-visibility:hidden]"
            >
              <div className="absolute top-4 right-4 bg-innovacion text-teselar-dark text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
                {lng === 'es' ? 'Recomendado' : lng === 'ca' ? 'Recomanat' : 'Recommended'}
              </div>
              
              <div>
                <span className="text-sm font-black text-innovacion uppercase tracking-widest">{t.pricing.plus.title}</span>
                <div className="flex items-baseline gap-1 mt-5 mb-8">
                  <span className="text-5xl md:text-6xl font-black text-claridad">{t.pricing.plus.price}</span>
                  <span className="text-base font-light text-claridad/50">{t.pricing.plus.period}</span>
                </div>
                <p className="text-base md:text-lg font-light text-claridad/85 mb-8 leading-relaxed">{t.pricing.plus.desc}</p>
                
                <ul className="space-y-4 border-t border-claridad/5 pt-8">
                  <li className="flex items-start gap-3.5 text-sm md:text-base text-claridad/95 font-light leading-relaxed">
                    <CheckCircle2 size={18} className="text-innovacion flex-shrink-0 mt-0.5" />
                    <span>{t.pricing.plus.f1}</span>
                  </li>
                  <li className="flex items-start gap-3.5 text-sm md:text-base text-claridad/95 font-light leading-relaxed">
                    <CheckCircle2 size={18} className="text-innovacion flex-shrink-0 mt-0.5" />
                    <span>{t.pricing.plus.f2}</span>
                  </li>
                  <li className="flex items-start gap-3.5 text-sm md:text-base text-claridad/95 font-light leading-relaxed">
                    <CheckCircle2 size={18} className="text-innovacion flex-shrink-0 mt-0.5" />
                    <span>{t.pricing.plus.f3}</span>
                  </li>
                  <li className="flex items-start gap-3.5 text-sm md:text-base text-claridad/95 font-light leading-relaxed">
                    <CheckCircle2 size={18} className="text-innovacion flex-shrink-0 mt-0.5" />
                    <span>{t.pricing.plus.f4}</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => handleScrollToContact('info')}
                className="w-full py-5.5 rounded-2xl bg-innovacion text-teselar-dark text-sm font-black tracking-wider uppercase hover:bg-claridad hover:text-teselar-dark transition-all duration-300 cursor-pointer mt-10 shadow-lg shadow-innovacion/15"
              >
                {lng === 'es' ? 'Contratar Plan Plus' : lng === 'ca' ? 'Contractar Pla Plus' : 'Hire Plus Plan'}
              </button>
            </motion.div>

          </div>



        </div>
      </section>

      {/* POST-PRICING URGENCY STRIP */}
      <div className="urgency-strip py-8 px-4 md:px-8 z-10 relative border-t border-b border-claridad/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-innovacion/10 border border-innovacion/25 flex items-center justify-center text-innovacion flex-shrink-0">
              <Star size={22} />
            </div>
            <p className="text-sm md:text-base text-claridad/85 font-light leading-relaxed max-w-lg">
              {t.leads.post_pricing}
            </p>
          </div>
          <button
            onClick={() => handleScrollToContact('quote')}
            className="bg-innovacion text-teselar-dark font-black text-xs tracking-wider uppercase px-8 py-4 rounded-full shadow-lg shadow-innovacion/15 hover:bg-claridad hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <Send size={14} />
            {t.leads.post_pricing_btn}
          </button>
        </div>
      </div>

      {/* 6. EL PROCESO: TIMELINE INTERACTIVO */}
      <section id="process" className="relative py-24 px-4 md:px-8 bg-teselar-dark/50 backdrop-blur-sm z-10 border-t border-b border-claridad/5 overflow-hidden content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-4xl mx-auto mb-24">
            <span className="text-innovacion uppercase tracking-widest text-sm font-black">{t.nav.process}</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mt-3 mb-8 text-glow-cyan">{t.process.title}</h2>
            <p className="text-claridad/85 font-light text-lg md:text-xl max-w-3xl mx-auto">{t.process.subtitle}</p>
          </div>

          {/* Timeline Wrapper (Vertical Line) */}
          <div className="relative max-w-5xl mx-auto">
            {/* Center background line for desktop */}
            <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-0.5 bg-claridad/5 -translate-x-[1px]" />
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute left-[31px] md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-innovacion via-teal-300 to-transparent -translate-x-[1px] shadow-[0_0_8px_#00BFA5]"
            />
            
            {/* Step 1 — HIGHLIGHTED: "You are here" */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28 mb-24">
              <div className="hidden md:block text-right self-center pr-10">
                <span className="text-innovacion font-black text-base tracking-widest uppercase">{lng === 'es' ? 'Fase Inicial' : lng === 'ca' ? 'Fase Inicial' : 'Initial Phase'}</span>
              </div>
              <div className="pl-16 md:pl-8 relative">
                {/* Horizontal wire pulse */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute left-[31px] md:left-[-40px] top-[30px] w-[20px] md:w-[40px] h-[1.5px] bg-innovacion shadow-[0_0_6px_#00BFA5] hidden md:block"
                />
                
                {/* Active node marker with triple-ring pulse */}
                <div className="absolute left-[31px] md:left-0 top-4 w-9 h-9 rounded-full border-[3px] border-innovacion bg-teselar-dark -translate-x-[48px] md:-translate-x-[20px] flex items-center justify-center shadow-[0_0_25px_rgba(45,212,191,0.45)] z-20">
                  <div className="w-3 h-3 rounded-full bg-innovacion animate-ping" />
                  <div className="absolute w-14 h-14 rounded-full border border-innovacion/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute w-20 h-20 rounded-full border border-innovacion/15 animate-ping" style={{ animationDuration: '3s' }} />
                </div>
                {/* Tech HUD-style "You are here" indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute -top-14 left-16 md:left-8 z-30"
                >
                  <div className="relative flex items-center gap-2">
                    {/* Connecting line from badge down to the node */}
                    <div className="absolute -bottom-3 left-3 w-px h-3 bg-innovacion/50" />
                    {/* Terminal-style container */}
                    <div className="bg-teselar-dark/90 border border-innovacion/50 text-innovacion whitespace-nowrap flex items-center gap-2 px-3 py-1.5 shadow-[0_0_12px_rgba(45,212,191,0.15)]" style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                      <span className="w-1.5 h-1.5 bg-innovacion rounded-full shadow-[0_0_6px_rgba(45,212,191,0.8)]" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
                      <span className="font-mono text-[10px] tracking-wider uppercase">
                        <span className="text-claridad/40">&gt; </span>
                        {lng === 'es' ? 'ESTÁS AQUÍ' : lng === 'ca' ? 'ETS AQUÍ' : 'YOU ARE HERE'}
                        <span className="text-claridad/40 animate-pulse">_</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
                  className="glass-card p-8 rounded-[2rem] border-2 border-innovacion/40 bg-innovacion/5 shadow-[0_0_40px_rgba(45,212,191,0.08)] relative overflow-hidden"
                >
                  {/* Glowing edge accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-innovacion to-transparent" />
                  <h3 className="text-lg md:text-xl font-black text-innovacion mb-3.5">{t.process.p1.title}</h3>
                  <p className="text-sm md:text-base text-claridad/85 font-light leading-relaxed mb-5">{t.process.p1.desc}</p>
                  <button
                    onClick={() => handleScrollToContact('meeting')}
                    className="inline-flex items-center gap-2 bg-innovacion text-teselar-dark text-xs font-black tracking-wider uppercase px-5 py-2.5 rounded-full shadow-lg shadow-innovacion/20 hover:bg-claridad hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <Calendar size={14} />
                    {lng === 'es' ? 'Agendar cita' : lng === 'ca' ? 'Agendar cita' : 'Book a meeting'}
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28 mb-24">
              <div className="pl-16 md:pl-0 md:pr-8 md:text-right md:col-start-1 relative self-center">
                {/* Horizontal wire pulse */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  style={{ transformOrigin: 'right center' }}
                  className="absolute right-[31px] md:right-[-40px] top-[26px] w-[20px] md:w-[40px] h-[1.5px] bg-innovacion shadow-[0_0_6px_#00BFA5] hidden md:block"
                />

                {/* Node marker */}
                <div className="absolute left-[31px] md:left-full top-2.5 w-7 h-7 rounded-full border-2 border-claridad/30 bg-teselar-dark -translate-x-[45px] md:translate-x-[9px] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-claridad/30" />
                </div>
                <motion.div
                  initial={{ opacity: 0, clipPath: isMobile ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
                  className="glass-card p-8 rounded-[2rem] border border-claridad/5 opacity-75"
                >
                  <h3 className="text-lg md:text-xl font-black text-claridad/50 mb-3.5">{t.process.p2.title}</h3>
                  <p className="text-sm md:text-base text-claridad/60 font-light leading-relaxed">{t.process.p2.desc}</p>
                </motion.div>
              </div>
              <div className="hidden md:block self-center pl-10">
                <span className="text-claridad/40 font-black text-base tracking-widest uppercase">{lng === 'es' ? 'Planificación' : lng === 'ca' ? 'Planificació' : 'Planning'}</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28 mb-24">
              <div className="hidden md:block self-center md:text-right pr-10">
                <span className="text-claridad/40 font-black text-base tracking-widest uppercase">{lng === 'es' ? 'Construcción' : lng === 'ca' ? 'Construcció' : 'Construction'}</span>
              </div>
              <div className="pl-16 md:pl-8 relative">
                {/* Horizontal wire pulse */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute left-[31px] md:left-[-40px] top-[26px] w-[20px] md:w-[40px] h-[1.5px] bg-innovacion shadow-[0_0_6px_#00BFA5] hidden md:block"
                />

                {/* Node marker */}
                <div className="absolute left-[31px] md:left-0 top-2.5 w-7 h-7 rounded-full border-2 border-claridad/30 bg-teselar-dark -translate-x-[45px] md:-translate-x-[14px] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-claridad/30" />
                </div>
                <motion.div
                  initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
                  className="glass-card p-8 rounded-[2rem] border border-claridad/5 opacity-75"
                >
                  <h3 className="text-lg md:text-xl font-black text-claridad/50 mb-3.5">{t.process.p3.title}</h3>
                  <p className="text-sm md:text-base text-claridad/60 font-light leading-relaxed">{t.process.p3.desc}</p>
                </motion.div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28">
              <div className="pl-16 md:pl-0 md:pr-8 md:text-right md:col-start-1 relative self-center">
                {/* Horizontal wire pulse */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  style={{ transformOrigin: 'right center' }}
                  className="absolute right-[31px] md:right-[-40px] top-[26px] w-[20px] md:w-[40px] h-[1.5px] bg-innovacion shadow-[0_0_6px_#00BFA5] hidden md:block"
                />

                {/* Node marker */}
                <div className="absolute left-[31px] md:left-full top-2.5 w-7 h-7 rounded-full border-2 border-claridad/30 bg-teselar-dark -translate-x-[45px] md:translate-x-[9px] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-claridad/30" />
                </div>
                <motion.div
                  initial={{ opacity: 0, clipPath: isMobile ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
                  className="glass-card p-8 rounded-[2rem] border border-claridad/5 opacity-75"
                >
                  <h3 className="text-lg md:text-xl font-black text-claridad/50 mb-3.5">{t.process.p4.title}</h3>
                  <p className="text-sm md:text-base text-claridad/50 font-bold mb-1.5">{lng === 'es' ? '¡Semana de Ajustes Gratis!' : lng === 'ca' ? 'Setmana d\'Ajustaments Gratis!' : 'Free Adjustments Week!'}</p>
                  <p className="text-sm md:text-base text-claridad/60 font-light leading-relaxed">{t.process.p4.desc}</p>
                </motion.div>
              </div>
              <div className="hidden md:block self-center pl-10">
                <span className="text-claridad/40 font-black text-base tracking-widest uppercase">{lng === 'es' ? 'Lanzamiento' : lng === 'ca' ? 'Llançament' : 'Launch'}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. FORMULARIO DE CONVERSION: SOPORTE, AGENDA & CONTACTO */}
      <section id="contact" ref={contactSectionRef} className="relative py-28 px-4 md:px-8 z-10 overflow-hidden content-visibility-auto">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-innovacion uppercase tracking-widest text-sm font-black">{currentLng === 'es' ? 'Hablemos' : currentLng === 'ca' ? 'Parlem' : 'Let\'s Talk'}</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mt-3 mb-8 text-glow-cyan">{t.contact.title}</h2>
            <p className="text-claridad/85 font-light text-lg md:text-xl max-w-3xl mx-auto">{t.contact.subtitle}</p>
          </div>

          {/* Contact form (Glassmorphism card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 sm:p-12 rounded-[2.5rem] border border-innovacion/15 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient glows behind the form */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-teselar/25 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-innovacion/10 rounded-full blur-[100px] pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Web3Forms Honeypot Anti-spam input */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="text-sm font-black tracking-wider uppercase text-claridad/80 pl-1.5">{t.contact.name} *</label>
                  <input type="text" id="name" name="name" required className="form-input" placeholder={lng === 'es' ? 'Ej. Juan Pérez' : lng === 'ca' ? 'Ex. Joan Pérez' : 'e.g. John Doe'} />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-sm font-black tracking-wider uppercase text-claridad/80 pl-1.5">{t.contact.email} *</label>
                  <input type="email" id="email" name="email" required className="form-input" placeholder="correo@ejemplo.com" />
                </div>
              </div>

              {/* Subject dropdown & Lead Qualifiers budget/urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                
                {/* Subject / Purpose */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="reason" className="text-sm font-black tracking-wider uppercase text-claridad/80 pl-1.5">{t.contact.reason} *</label>
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

                {/* Budget Range qualifier */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="budget" className="text-sm font-black tracking-wider uppercase text-claridad/80 pl-1.5">{t.contact.budget} *</label>
                  <select id="budget" name="budget" required className="form-input cursor-pointer">
                    <option value="low">{t.contact.budget_opt1}</option>
                    <option value="mid">{t.contact.budget_opt2}</option>
                    <option value="high">{t.contact.budget_opt3}</option>
                  </select>
                </div>

                {/* Urgency qualifier */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="urgency" className="text-sm font-black tracking-wider uppercase text-claridad/80 pl-1.5">{t.contact.urgency} *</label>
                  <select id="urgency" name="urgency" required className="form-input cursor-pointer">
                    <option value="immediate">{t.contact.urgency_opt1}</option>
                    <option value="medium">{t.contact.urgency_opt2}</option>
                    <option value="low">{t.contact.urgency_opt3}</option>
                  </select>
                </div>

              </div>

              {/* Message text area */}
              <div className="flex flex-col gap-3">
                <label htmlFor="message" className="text-sm font-black tracking-wider uppercase text-claridad/80 pl-1.5">{lng === 'es' ? 'Mensaje o Detalles del Proyecto' : lng === 'ca' ? 'Missatge o Detalls del Projecte' : 'Message or Project Details'} *</label>
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

              {/* GDPR Explicit consent check ( Spain GDPR regulation requirements: un-checked by default ) */}
              <div className="flex items-start gap-4.5 bg-claridad/5 border border-claridad/10 p-5 rounded-[1.25rem]">
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
                  {t.contact.gdpr}{' '}
                  <a 
                    href={`/${lng}/legal/privacidad`} 
                    onClick={(e) => { e.preventDefault(); setActiveLegalModal('privacidad'); }}
                    className="text-innovacion font-bold hover:underline"
                  >
                    {lng === 'es' ? 'política de privacidad' : lng === 'ca' ? 'política de privacitat' : 'privacy policy'}.
                  </a>
                </label>
              </div>

              {/* Action and submit handling */}
              <div className="flex flex-col items-center gap-5 border-t border-claridad/5 pt-8">
                
                {/* Submit Feedback error info */}
                {submitError && (
                  <div className="flex items-center gap-2.5 bg-red-950/45 border border-red-500/35 px-5 py-3 rounded-xl text-red-400 text-sm w-full">
                    <AlertCircle size={18} />
                    <span>{submitError}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting || !gdprAccepted}
                  className="w-full bg-innovacion text-teselar-dark font-black tracking-wider uppercase py-5.5 rounded-2xl shadow-xl shadow-innovacion/15 hover:bg-claridad hover:text-teselar-dark hover:scale-[1.01] transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base md:text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-teselar-dark border-t-transparent rounded-full animate-spin" />
                      <span>{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight size={18} />
                      <span>{t.contact.send}</span>
                    </>
                  )}
                </button>

                <p className="text-xs md:text-sm text-claridad/50 font-light text-center">
                  {lng === 'es' 
                    ? '¿Prefieres escribirnos directamente? También atendemos en: '
                    : lng === 'ca'
                      ? 'Prefereixes escriure\'ns directament? També atenem a: '
                      : 'Prefer to write directly? Contact us at: '}
                  <span className="text-innovacion font-semibold">info@teselarsoftware.com</span>
                </p>
              </div>

            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER (Legal Links and Brand detail) */}
      <footer className="relative bg-teselar-dark/95 border-t border-claridad/10 pt-20 pb-10 px-4 md:px-8 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Info and logo */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="Teselar Logo" className="w-12 h-12 rounded-full border border-innovacion/35 object-cover" />
              <span className="font-extrabold text-2xl tracking-tight">TESELAR <span className="text-innovacion font-black">Software</span></span>
            </div>
            <p className="text-xs text-claridad/60 font-light leading-relaxed max-w-sm mt-2">
              {currentLng === 'es'
                ? 'Desarrollamos soluciones digitales a medida de alto rendimiento e impacto visual. Artesanía en software, automatizaciones e inteligencia artificial.'
                : currentLng === 'ca'
                  ? 'Desenvolupem solucions digitals a mida d\'alt rendiment i impacte visual. Artesania en programari, automatitzacions i intel·ligència artificial.'
                  : 'We hand-craft custom digital solutions with maximum performance and outstanding visual design. Software craftsmanship, automation, and custom artificial intelligence.'}
            </p>
          </div>

          {/* Column 2: Navigation shortcuts */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-innovacion mb-5">{currentLng === 'es' ? 'Navegación' : currentLng === 'ca' ? 'Navegació' : 'Navigation'}</h4>
            <div className="flex flex-col gap-3.5 text-xs text-claridad/65 font-medium">
              <a href="#values" className="hover:text-innovacion transition-colors">{t.nav.values}</a>
              <a href="#services" className="hover:text-innovacion transition-colors">{t.nav.services}</a>
              <a href="#pricing" className="hover:text-innovacion transition-colors">{t.nav.pricing}</a>
              <a href="#process" className="hover:text-innovacion transition-colors">{t.nav.process}</a>
            </div>
          </div>

          {/* Column 3: Contact information */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-innovacion mb-5">{lng === 'es' ? 'Contacto y Sede' : lng === 'ca' ? 'Contacte i Seu' : 'Contact & Headquarters'}</h4>
            <div className="space-y-4 text-xs font-light text-claridad/75 leading-relaxed">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-innovacion" />
                <span>Lloret de Mar, Girona, {currentLng === 'es' ? 'España' : currentLng === 'ca' ? 'Espanya' : 'Spain'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-innovacion" />
                <span>info@teselarsoftware.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-innovacion" />
                <span>+34 653 232 735</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal notice & subpath links */}
        <div className="max-w-7xl mx-auto border-t border-claridad/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-light text-claridad/40 text-center">
          <span>&copy; {new Date().getFullYear()} Teselar Software. All rights reserved.</span>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href={`/${currentLng}/legal/aviso-legal`} 
              onClick={(e) => { e.preventDefault(); setActiveLegalModal('aviso'); }}
              className="hover:text-innovacion transition-colors animate-pulse-slow"
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
                  className="absolute top-6 right-6 p-2 rounded-full bg-claridad/5 hover:bg-innovacion/25 text-claridad hover:text-innovacion border border-claridad/10 hover:border-innovacion/40 transition-all duration-300 cursor-pointer"
                >
                  <X size={20} />
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
            className="fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none"
          >
            <div className="max-w-sm mx-auto pointer-events-auto">
              <button
                onClick={() => handleScrollToContact('meeting')}
                className="w-full bg-innovacion text-teselar-dark font-black tracking-widest uppercase py-4 rounded-2xl sticky-cta-bar flex items-center justify-center gap-3 shadow-2xl"
              >
                <Calendar size={18} />
                <span>{t.leads.sticky_cta_long}</span>
              </button>
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
                className="absolute top-4 right-4 p-2 rounded-full bg-claridad/5 hover:bg-innovacion/25 text-claridad hover:text-innovacion transition-all duration-300"
              >
                <X size={20} />
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
                    <label htmlFor="exit-gdpr" className="text-[10px] text-claridad/50 leading-tight">
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
                    className="w-full text-center text-xs text-claridad/40 hover:text-claridad transition-colors mt-2"
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

      {/* LEAD CAPTURE: Scroll-Triggered Toast (Bottom Left) */}
      <AnimatePresence>
        {showScrollToast && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, y: 20 }}
            className="fixed bottom-6 left-6 z-40 max-w-sm"
          >
            <div className="glass-card p-5 rounded-2xl border border-innovacion/40 shadow-[0_8px_32px_rgba(0,191,165,0.2)] flex items-start gap-4">
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
                <button
                  onClick={() => {
                    setShowScrollToast(false);
                    handleScrollToContact('info');
                  }}
                  className="text-xs font-bold text-innovacion hover:text-claridad transition-colors flex items-center gap-1"
                >
                  {t.leads.toast_btn}
                  <ArrowRight size={12} />
                </button>
              </div>
              <button
                onClick={() => setShowScrollToast(false)}
                className="absolute top-3 right-3 text-claridad/40 hover:text-claridad transition-colors"
              >
                <X size={14} />
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
