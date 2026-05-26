'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ lng: string }>;
}

export default function LegalNoticePage({ params }: Props) {
  const { lng } = use(params);
  const router = useRouter();

  const handleBack = () => {
    router.push(`/${lng}`);
  };

  const content = {
    es: {
      title: 'Aviso Legal',
      sec1_title: '1. Información Identificativa',
      sec1_text: 'En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se detallan los siguientes datos del titular del sitio web:\n\n• Nombre Comercial: Teselar Software\n• Domicilio Social: Lloret de Mar, Girona, España\n• Correo electrónico de contacto: teselarsoftware@icloud.es\n• Teléfono de contacto: +34 653 232 735',
      sec2_title: '2. Condiciones de Uso',
      sec2_text: 'El acceso y uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. El sitio web de Teselar Software proporciona el acceso a multitud de informaciones, servicios, programas o datos en Internet pertenecientes a Teselar Software. El USUARIO asume la responsabilidad del uso del portal.',
      sec3_title: '3. Propiedad Intelectual e Industrial',
      sec3_text: 'Teselar Software por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, etc.), titularidad de Teselar Software o bien de sus licenciantes.',
      sec4_title: '4. Exclusión de Garantías y Responsabilidad',
      sec4_text: 'Teselar Software no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.'
    },
    ca: {
      title: 'Avís Legal',
      sec1_title: '1. Informació Identificativa',
      sec1_text: 'En compliment de l\'article 10 de la Llei 34/2002, de 11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic, es detallen les següents dades del titular del lloc web:\n\n• Nom Comercial: Teselar Software\n• Domicili Social: Lloret de Mar, Girona, Espanya\n• Correu electrònic de contacte: teselarsoftware@icloud.es\n• Telèfon de contacte: +34 653 232 735',
      sec2_title: '2. Condicions d\'Ús',
      sec2_text: 'L\'accés i ús d\'aquest portal atribueix la condició d\'USUARI, que accepta, des d\'aquest accés i/o ús, les Condicions Generals d\'Ús aquí reflectides. El lloc web de Teselar Software proporciona l\'accés a multitud d\'informacions, serveis, programes o dades a Internet pertanyents a Teselar Software. L\'USUARI assumeix la responsabilitat de l\'ús del portal.',
      sec3_title: '3. Propietat Intel·lectual i Industrial',
      sec3_text: 'Teselar Software per si o com a cessionària, és titular de tots els drets de propietat intel·lectual i industrial de la seva pàgina web, així com dels elements continguts en la mateixa (a títol enunciatiu: imatges, so, àudio, vídeo, programari o textos; marques o logotips, combinacions de colors, estructura i disseny, selecció de materials usats, etc.), titularitat de Teselar Software o bé dels seus llicenciants.',
      sec4_title: '4. Exclusió de Garanties i Responsabilitat',
      sec4_text: 'Teselar Software no es fa responsable, en cap cas, dels danys i perjudicis de qualsevol naturalesa que poguessin ocasionar, a títol enunciatiu: errors o omissions en els continguts, falta de disponibilitat del portal o la transmissió de virus o programes maliciosos o lesius en els continguts, a pesar d\'haver adoptat totes les mesures tecnològiques necessàries per evitar-ho.'
    },
    en: {
      title: 'Legal Notice',
      sec1_title: '1. Identification Information',
      sec1_text: 'In compliance with Article 10 of Law 34/2002, of July 11, on Services of the Information Society and Electronic Commerce, the following details of the owner of the website are detailed:\n\n• Trade Name: Teselar Software\n• Registered Office: Lloret de Mar, Girona, Spain\n• Contact Email: teselarsoftware@icloud.es\n• Contact Phone: +34 653 232 735',
      sec2_title: '2. Terms of Use',
      sec2_text: 'Access to and/or use of this portal attributes the condition of USER, who accepts, from said access and/or use, the General Conditions of Use reflected here. The website of Teselar Software provides access to information, services, programs, or data on the Internet belonging to Teselar Software. The USER assumes responsibility for the use of the portal.',
      sec3_title: '3. Intellectual and Industrial Property',
      sec3_text: 'Teselar Software by itself or as an assignee, is the owner of all intellectual and industrial property rights of its website, as well as the elements contained therein (by way of example: images, sound, audio, video, software, or texts; brands or logos, color combinations, structure and design, selection of materials used, etc.), owned by Teselar Software or its licensors.',
      sec4_title: '4. Exclusion of Warranties and Liability',
      sec4_text: 'Teselar Software is not responsible, under any circumstances, for damages of any kind that could be caused, by way of example: errors or omissions in the content, lack of availability of the portal, or the transmission of viruses or malicious or harmful programs in the content, despite having adopted all necessary technological measures to prevent it.'
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
              <p className="whitespace-pre-line">{t.sec1_text}</p>
            </div>
            
            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec2_title}</h2>
              <p>{t.sec2_text}</p>
            </div>

            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec3_title}</h2>
              <p>{t.sec3_text}</p>
            </div>

            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec4_title}</h2>
              <p>{t.sec4_text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
