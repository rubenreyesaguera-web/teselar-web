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
      sec1_text: 'El Responsable del Tratamiento de los datos de carácter personal que se recaben a través de este sitio web es:\n\n• Titular: Rubén Reyes Agüera\n• NIF: 47897952-S\n• Nombre Comercial: Teselar Software\n• Domicilio Social: Lloret de Mar, Girona, España\n• Correo electrónico de contacto: info@teselarsoftware.com',
      sec2_title: '2. Finalidad del Tratamiento de Datos',
      sec2_text: 'Los datos personales facilitados a través del formulario de contacto serán tratados exclusivamente para:\n\n1. Gestionar, atender y responder a la solicitud de contacto, presupuesto o cita enviada por el usuario.\n2. Remitir la información técnica o comercial solicitada por el usuario.',
      sec3_title: '3. Legitimación del Tratamiento',
      sec3_text: 'La base jurídica que legitima el tratamiento de los datos es el CONSENTIMIENTO del usuario. Para poder enviar una solicitud a través del formulario de contacto de la web, es obligatorio aceptar manualmente la política de privacidad mediante la marcación explícita e inequívoca del checkbox habilitado al efecto (Reglamento General de Protección de Datos - RGPD).',
      sec4_title: '4. Conservación de los Datos',
      sec4_text: 'Los datos personales se conservarán durante el tiempo estrictamente necesario para cumplir con la finalidad para la que fueron recabados, o hasta que el usuario ejerza su derecho de supresión u oposición, en cuyo caso serán bloqueados para la atención de posibles responsabilidades legales.',
      sec5_title: '5. Derechos del Usuario',
      sec5_text: 'El usuario puede ejercitar en cualquier momento sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición de sus datos de carácter personal dirigiéndose mediante correo electrónico al Responsable del Tratamiento: info@teselarsoftware.com.',
      sec6_title: '6. Demo de gestión',
      sec6_text: 'La demo de gestión (/demo) no usa cookies ni guarda datos personales. Lo que escribas en ella (el nombre de tu empresa o a qué os dedicáis) se queda en tu navegador y solo llega a Teselar Software si reservas el diagnóstico, dentro de la reserva de Calendly. Para saber cómo se usa la demo se cuentan, sin identificar a nadie, los pasos que se dan en ella, el sector elegido y las opciones marcadas.',
      sec7_title: '7. Propuestas',
      sec7_text: 'Si Teselar Software te envía una propuesta con tu enlace personal, al abrirla con ese enlace se apuntan la fecha y la hora de la primera y de la última vez que la abres y cuántas veces lo has hecho, para saber si te ha llegado y hacer el seguimiento. No se guarda tu IP ni tu navegador, y no se usan cookies. La base jurídica es el interés legítimo en hacer el seguimiento de una propuesta que has pedido (art. 6.1.f del RGPD). Se conserva mientras la propuesta esté abierta y, si la aceptas, lo que duren el contrato y sus obligaciones legales. Puedes oponerte escribiendo a info@teselarsoftware.com.'
    },
    ca: {
      title: 'Política de Privacitat',
      sec1_title: '1. Responsable del Tractament',
      sec1_text: 'El Responsable del Tractament de les dades de caràcter personal que es recullin a través d\'aquest lloc web és:\n\n• Titular: Rubén Reyes Agüera\n• NIF: 47897952-S\n• Nom Comercial: Teselar Software\n• Domicili Social: Lloret de Mar, Girona, Espanya\n• Correu electrònic de contacte: info@teselarsoftware.com',
      sec2_title: '2. Finalitat del Tractament de Dades',
      sec2_text: 'Les dades personals facilitades a través del formulari de contacte seran tractades exclusivament per a:\n\n1. Gestionar, atendre i respondre a la sol·licitud de contacte, pressupost o cita enviada per l\'usuari.\n2. Remetre la informació tècnica o comercial sol·licitada per l\'usuari.',
      sec3_title: '3. Legitimació del Tractament',
      sec3_text: 'La base jurídica que legitima el tractament de les dades és el CONSENTIMENT de l\'usuari. Per poder enviar una sol·licitud a través del formulari de contacte del web, és obligatori acceptar manualment la política de privacitat mitjançant la marcació explícita i inequívoca del checkbox habilitat a aquest efecte (Reglament General de Protecció de Dades - RGPD).',
      sec4_title: '4. Conservació de les Dades',
      sec4_text: 'Les dades personals es conservaran durant el temps estrictament necessari per complir amb la finalitat per a la qual van ser recollides, o fins que l\'usuari exerceixi el seu dret de supressió o oposició, cas en el qual seran bloquejades per a l\'atenció de possibles responsabilitats legals.',
      sec5_title: '5. Drets de l\'Usuari',
      sec5_text: 'L\'usuari pot exercitar en qualsevol moment els seus drets d\'accés, rectificació, supressió, limitació del tractament, portabilitat i oposició de les seves dades de caràcter personal adreçant-se mitjançant correu electrònic al Responsable del Tractament: info@teselarsoftware.com.',
      sec6_title: '6. Demo de gestió',
      sec6_text: 'La demo de gestió (/demo) no fa servir galetes ni desa dades personals. El que hi escriguis (el nom de la teva empresa o a què us dediqueu) es queda al teu navegador i només arriba a Teselar Software si reserves el diagnòstic, dins de la reserva de Calendly. Per saber com es fa servir la demo es compten, sense identificar ningú, els passos que s\'hi fan, el sector triat i les opcions marcades.',
      sec7_title: '7. Propostes',
      sec7_text: 'Si Teselar Software t’envia una proposta amb el teu enllaç personal, quan l’obres amb aquest enllaç s’apunten la data i l’hora de la primera i de l’última vegada que l’obres i quantes vegades ho has fet, per saber si t’ha arribat i fer-ne el seguiment. No es desa la teva IP ni el teu navegador, i no es fan servir galetes. La base jurídica és l’interès legítim a fer el seguiment d’una proposta que has demanat (art. 6.1.f del RGPD). Es conserva mentre la proposta estigui oberta i, si l’acceptes, el que durin el contracte i les seves obligacions legals. Pots oposar-t’hi escrivint a info@teselarsoftware.com.'
    },
    en: {
      title: 'Privacy Policy',
      sec1_title: '1. Data Controller',
      sec1_text: 'The Data Controller for the personal data collected through this website is:\n\n• Owner: Rubén Reyes Agüera\n• Tax ID (NIF): 47897952-S\n• Trade Name: Teselar Software\n• Registered Office: Lloret de Mar, Girona, Spain\n• Contact Email: info@teselarsoftware.com',
      sec2_title: '2. Purpose of Data Processing',
      sec2_text: 'The personal data provided through the contact form will be processed exclusively to:\n\n1. Manage, address, and respond to the contact, quote, or meeting request submitted by the user.\n2. Deliver the technical or commercial information requested by the user.',
      sec3_title: '3. Legal Basis for Processing',
      sec3_text: 'The legal basis that legitimizes the processing of data is the CONSENT of the user. To submit a request through the web contact form, it is mandatory to manually accept the privacy policy by explicitly and unequivocally checking the checkbox enabled for this purpose (General Data Protection Regulation - GDPR).',
      sec4_title: '4. Data Retention',
      sec4_text: 'Personal data will be kept for the time strictly necessary to fulfill the purpose for which they were collected, or until the user exercises their right of deletion or opposition, in which case they will be blocked to address potential legal liabilities.',
      sec5_title: '5. Rights of the User',
      sec5_text: 'The user can exercise at any time their rights of access, rectification, deletion, limitation of processing, portability, and opposition of their personal data by contacting the Data Controller via email: info@teselarsoftware.com.',
      sec6_title: '6. Management demo',
      sec6_text: 'The management demo (/demo) uses no cookies and stores no personal data. What you type in it (your business name or what you do) stays in your browser and only reaches Teselar Software if you book the diagnosis, inside the Calendly booking. To understand how the demo is used, the steps taken in it, the sector chosen and the options picked are counted without identifying anyone.',
      sec7_title: '7. Proposals',
      sec7_text: 'If Teselar Software sends you a proposal with your personal link, opening it with that link records the date and time of the first and the last time you open it and how many times you have done so, to know it reached you and to follow up. Your IP address and browser are not stored, and no cookies are used. The legal basis is the legitimate interest in following up a proposal you asked for (Art. 6(1)(f) GDPR). It is kept while the proposal is open and, if you accept it, for as long as the contract and its legal obligations last. You can object by writing to info@teselarsoftware.com.'
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
            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec6_title}</h2>
              <p>{t.sec6_text}</p>
            </div>
            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec7_title}</h2>
              <p>{t.sec7_text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
