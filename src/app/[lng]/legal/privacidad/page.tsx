'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ lng: string }>;
}

export default function PrivacyPolicyPage({ params }: Props) {
  const { lng } = use(params);
  const router = useRouter();

  const handleBack = () => {
    router.push(`/${lng}`);
  };

  const content = {
    es: {
      title: 'Política de Privacidad',
      sec1_title: '1. Responsable del Tratamiento',
      sec1_text: 'El Responsable del Tratamiento de los datos de carácter personal que se recaben a través de este sitio web es:\n\n• Nombre Comercial: Teselar Software\n• Domicilio Social: Lloret de Mar, Girona, España\n• Correo electrónico de contacto: info@teselarsoftware.com',
      sec2_title: '2. Finalidad del Tratamiento de Datos',
      sec2_text: 'Los datos personales facilitados a través del formulario de contacto serán tratados exclusivamente para:\n\n1. Gestionar, atender y responder a la solicitud de contacto, presupuesto o cita enviada por el usuario.\n2. Remitir la información técnica o comercial solicitada por el usuario.',
      sec3_title: '3. Legitimación del Tratamiento',
      sec3_text: 'La base jurídica que legitima el tratamiento de los datos es el CONSENTIMIENTO del usuario. Para poder enviar una solicitud a través del formulario de contacto de la web, es obligatorio aceptar manualmente la política de privacidad mediante la marcación explícita e inequívoca del checkbox habilitado al efecto (Reglamento General de Protección de Datos - RGPD).',
      sec4_title: '4. Conservación de los Datos',
      sec4_text: 'Los datos personales se conservarán durante el tiempo estrictamente necesario para cumplir con la finalidad para la que fueron recabados, o hasta que el usuario ejerza su derecho de supresión u oposición, en cuyo caso serán bloqueados para la atención de posibles responsabilidades legales.',
      sec5_title: '5. Derechos del Usuario',
      sec5_text: 'El usuario puede ejercitar en cualquier momento sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición de sus datos de carácter personal dirigiéndose mediante correo electrónico al Responsable del Tratamiento: info@teselarsoftware.com.'
    },
    ca: {
      title: 'Política de Privacitat',
      sec1_title: '1. Responsable del Tractament',
      sec1_text: 'El Responsable del Tractament de les dades de caràcter personal que es recullin a través d\'aquest lloc web és:\n\n• Nom Comercial: Teselar Software\n• Domicili Social: Lloret de Mar, Girona, Espanya\n• Correu electrònic de contacte: info@teselarsoftware.com',
      sec2_title: '2. Finalitat del Tractament de Dades',
      sec2_text: 'Les dades personals facilitades a través del formulari de contacte seran tractades exclusivament per a:\n\n1. Gestionar, atendre i respondre a la sol·licitud de contacte, pressupost o cita enviada per l\'usuari.\n2. Remetre la informació tècnica o comercial sol·licitada per l\'usuari.',
      sec3_title: '3. Legitimació del Tractament',
      sec3_text: 'La base jurídica que legitima el tractament de les dades és el CONSENTIMENT de l\'usuari. Per poder enviar una sol·licitud a través del formulari de contacte del web, és obligatori acceptar manualment la política de privacitat mitjançant la marcació explícita i inequívoca del checkbox habilitat a aquest efecte (Reglament General de Protecció de Dades - RGPD).',
      sec4_title: '4. Conservació de les Dades',
      sec4_text: 'Les dades personals es conservaran durant el temps estrictament necessari per complir amb la finalitat per a la qual van ser recollides, o fins que l\'usuari exerceixi el seu dret de supressió o oposició, cas en el qual seran bloquejades per a l\'atenció de possibles responsabilitats legals.',
      sec5_title: '5. Drets de l\'Usuari',
      sec5_text: 'L\'usuari pot exercitar en qualsevol moment els seus drets d\'accés, rectificació, supressió, limitació del tractament, portabilitat i oposició de les seves dades de caràcter personal adreçant-se mitjançant correu electrònic al Responsable del Tractament: info@teselarsoftware.com.'
    },
    en: {
      title: 'Privacy Policy',
      sec1_title: '1. Data Controller',
      sec1_text: 'The Data Controller for the personal data collected through this website is:\n\n• Trade Name: Teselar Software\n• Registered Office: Lloret de Mar, Girona, Spain\n• Contact Email: info@teselarsoftware.com',
      sec2_title: '2. Purpose of Data Processing',
      sec2_text: 'The personal data provided through the contact form will be processed exclusively to:\n\n1. Manage, address, and respond to the contact, quote, or meeting request submitted by the user.\n2. Deliver the technical or commercial information requested by the user.',
      sec3_title: '3. Legal Basis for Processing',
      sec3_text: 'The legal basis that legitimizes the processing of data is the CONSENT of the user. To submit a request through the web contact form, it is mandatory to manually accept the privacy policy by explicitly and unequivocally checking the checkbox enabled for this purpose (General Data Protection Regulation - GDPR).',
      sec4_title: '4. Data Retention',
      sec4_text: 'Personal data will be kept for the time strictly necessary to fulfill the purpose for which they were collected, or until the user exercises their right of deletion or opposition, in which case they will be blocked to address potential legal liabilities.',
      sec5_title: '5. Rights of the User',
      sec5_text: 'The user can exercise at any time their rights of access, rectification, deletion, limitation of processing, portability, and opposition of their personal data by contacting the Data Controller via email: info@teselarsoftware.com.'
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
              <p className="whitespace-pre-line">{t.sec2_text}</p>
            </div>

            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec3_title}</h2>
              <p>{t.sec3_text}</p>
            </div>

            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec4_title}</h2>
              <p>{t.sec4_text}</p>
            </div>

            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec5_title}</h2>
              <p>{t.sec5_text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
