'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ lng: string }>;
}

export default function CookiesPolicyPage({ params }: Props) {
  const { lng } = use(params);
  const router = useRouter();

  const handleBack = () => {
    router.push(`/${lng}`);
  };

  const content = {
    es: {
      title: 'Política de Cookies',
      sec1_title: '1. ¿Qué son las Cookies?',
      sec1_text: 'Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.',
      sec2_title: '2. ¿Qué tipos de Cookies utiliza esta web?',
      sec2_text: 'Este sitio web únicamente utiliza cookies técnicas y de personalización esenciales para su correcto funcionamiento:\n\n• Cookies Técnicas: Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan (como el control del tráfico, identificar la sesión o acceder a partes de acceso restringido).\n• Cookies de Personalización: Permiten almacenar la preferencia del idioma del usuario (español, catalán, inglés) de forma temporal para ofrecer una navegación coherente y fluida.',
      sec3_title: '3. Desactivación o Eliminación de Cookies',
      sec3_text: 'El usuario puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador. Sin embargo, si bloquea las cookies esenciales, es posible que ciertas funcionalidades de la web (como la memorización del idioma) dejen de funcionar correctamente.'
    },
    ca: {
      title: 'Política de Cookies',
      sec1_title: '1. Què són les Cookies?',
      sec1_text: 'Una cookie és un fitxer que es descarrega al seu ordinador en accedir a determinades pàgines web. Les cookies permeten a una pàgina web, entre altres coses, emmagatzemar i recuperar informació sobre els hàbits de navegació d\'un usuari o del seu equip i, depenent de la informació que continguin i de la forma en què utilitzi el seu equip, es poden utilitzar per reconèixer l\'usuari.',
      sec2_title: '2. Quins tipus de Cookies utilitza aquest web?',
      sec2_text: 'Aquest lloc web només utilitza cookies tècniques i de personalització essencials per al seu correcte funcionament:\n\n• Cookies Tècniques: Són aquelles que permeten a l\'usuari la navegació a través d\'una pàgina web, plataforma o aplicació i la utilització de les diferents opcions o serveis que hi hagi (com el control del trànsit, identificar la sessió o accedir a parts d\'accés restringit).\n• Cookies de Personalització: Permeten emmagatzemar la preferència de l\'idioma de l\'usuari (espanyol, català, anglès) de forma temporal per oferir una navegació coherent i fluida.',
      sec3_title: '3. Desactivació o Eliminació de Cookies',
      sec3_text: 'L\'usuari pot permetre, bloquejar o eliminar les cookies instal·lades al seu equip mitjançant la configuració de les opcions del navegador instal·lat al seu ordinador. No obstant això, si bloqueja les cookies essencials, és possible que certes funcionalitats del web (com la memorització de l\'idioma) deixin de funcionar correctament.'
    },
    en: {
      title: 'Cookies Policy',
      sec1_title: '1. What are Cookies?',
      sec1_text: 'A cookie is a file that is downloaded to your computer when you access certain websites. Cookies allow a website, among other things, to store and retrieve information about the browsing habits of a user or their computer and, depending on the information they contain and the way they use their computer, they can be used to recognize the user.',
      sec2_title: '2. What types of Cookies does this website use?',
      sec2_text: 'This website only uses technical and personalization cookies essential for its proper functioning:\n\n• Technical Cookies: They allow the user to navigate through a website, platform, or application and utilize the different options or services that exist therein (such as controlling traffic, identifying the session, or accessing restricted areas).\n• Personalization Cookies: They allow storing the language preference of the user (Spanish, Catalan, English) temporarily to offer a coherent and fluid browsing experience.',
      sec3_title: '3. Disabling or Deleting Cookies',
      sec3_text: 'The user can allow, block, or delete cookies installed on their computer by configuring the browser options installed on their computer. However, if you block essential cookies, certain features of the website (such as language memorization) may stop working properly.'
    }
  };

  const t = content[lng as 'es' | 'ca' | 'en'] || content.en;

  return (
    <div className="min-h-screen bg-teselar-dark text-claridad font-sans antialiased py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={handleBack} 
          className="inline-flex items-center gap-2 text-innovacion hover:text-claridad transition-colors mb-8 font-bold text-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          {lng === 'es' ? 'Volver al Inicio' : lng === 'ca' ? 'Tornar a l\'Inici' : 'Back to Home'}
        </button>

        <div className="glass-card p-8 md:p-12 rounded-3xl border border-claridad/5 shadow-2xl space-y-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-glow-cyan text-innovacion mb-4">
            {t.title}
          </h1>

          <div className="space-y-6 text-sm md:text-base text-claridad/85 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec1_title}</h2>
              <p>{t.sec1_text}</p>
            </div>
            
            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec2_title}</h2>
              <p className="whitespace-pre-line">{t.sec2_text}</p>
            </div>

            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec3_title}</h2>
              <p>{t.sec3_text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
