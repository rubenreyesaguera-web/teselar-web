'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

// Convierte las direcciones (https://…) de un texto en enlaces; el resto queda como texto.
function conEnlaces(texto: string) {
  return texto.split(/(https:\/\/[^\s)]+)/g).map((trozo, i) =>
    trozo.startsWith('https://') ? (
      <a key={i} href={trozo} className="text-innovacion underline underline-offset-2 break-all" target="_blank" rel="noopener noreferrer">
        {trozo}
      </a>
    ) : (
      trozo
    ),
  );
}

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
      sec5_text: 'El usuario puede ejercitar en cualquier momento sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición de sus datos de carácter personal dirigiéndose mediante correo electrónico al Responsable del Tratamiento: info@teselarsoftware.com. También puede presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).',
      sec6_title: '6. Demo de gestión',
      sec6_text: 'La demo de gestión (/demo) no usa cookies ni guarda datos personales. Lo que escribas en ella (el nombre de tu empresa o a qué os dedicáis) se queda en tu navegador y solo llega a Teselar Software si reservas el diagnóstico, dentro de la reserva de Calendly. Para saber cómo se usa la demo se cuentan, sin identificar a nadie, los pasos que se dan en ella, el sector elegido y las opciones marcadas.',
      sec7_title: '7. Propuestas',
      sec7_text: 'Si Teselar Software te envía una propuesta con tu enlace personal, al abrirla con ese enlace se apuntan la fecha y la hora de la primera y de la última vez que la abres y cuántas veces lo has hecho, para saber si te ha llegado y hacer el seguimiento. No se guarda tu IP ni tu navegador, y no se usan cookies. La base jurídica es el interés legítimo en hacer el seguimiento de una propuesta que has pedido (art. 6.1.f del RGPD). Se conserva mientras la propuesta esté abierta y, si la aceptas, lo que duren el contrato y sus obligaciones legales. Puedes oponerte escribiendo a info@teselarsoftware.com.',
      sec8_title: '8. Contactos que no llegan por la web',
      sec8_text: 'Si contactas con Teselar Software por WhatsApp, por teléfono o en persona, o si un colaborador nos pasa tus datos para que te contactemos, se guardan el nombre del negocio, el de la persona de contacto, el teléfono, el correo, cómo llegó el contacto y, si fue a través de un colaborador, de parte de quién, el estado de la conversación, la siguiente acción con su fecha y notas de lo hablado. Se usan solo para atender lo que pediste y hacer el seguimiento. La base jurídica es el interés legítimo en mantener el contacto con negocios y profesionales (art. 6.1.f del RGPD y art. 19 de la LOPDGDD). Si no se firma un contrato, se borran a los 12 meses del último contacto. Puedes ejercer tus derechos como se indica en el apartado 5 y reclamar ante la Agencia Española de Protección de Datos (aepd.es).',
      sec9_title: '9. Estadísticas de visitas',
      sec9_text: 'Para saber cuánta gente visita la web y por dónde llega, Teselar Software cuenta cada página que se abre: cuál es, el día y la hora, la web desde la que se llegó (solo su dominio, como google.com), la etiqueta del enlace si la lleva (por ejemplo, ?origen=bio), el país y si es un móvil, un ordenador o una tableta. El país y el tipo de dispositivo se deducen en el momento a partir de la conexión y del navegador, que no se guardan, y se hace por el interés legítimo en saber cómo se usa la web (art. 6.1.f del RGPD). No se usan cookies ni nada que permita reconocerte de una visita a otra, así que lo que se guarda no identifica a nadie. La hora exacta se guarda solo 48 horas; después, solo el día, y todo se borra a los 25 meses. No se cede a nadie.',
      sec10_title: '10. Grabación de reuniones',
      sec10_text: 'Si nos reunimos para preparar tu diagnóstico, Teselar Software puede pedirte permiso para grabar la conversación: con el móvil si es en persona, o desde el ordenador si es por videollamada. Solo se graba si dices que sí; si prefieres que no, se toman notas a mano. La grabación sirve solo para preparar tu diagnóstico y, si la pides, tu propuesta. Pasa del móvil al ordenador por la red local y se convierte en texto en ese mismo ordenador, sin enviarla a ningún servicio de fuera, y el audio se borra en cuanto está transcrito. A las notas del proyecto pasan solo las conclusiones. La transcripción se borra cuando termina el contacto y, si no se firma un contrato, como tarde a los 12 meses del último contacto, como en el apartado 8. La base jurídica es tu consentimiento (art. 6.1.a del RGPD), que puedes retirar en cualquier momento, también a mitad de la reunión. No se cede a nadie. Puedes ejercer tus derechos como se indica en el apartado 5.',
      sec11_title: "11. Teselar Citas y Google Calendar",
      sec11_text: "Teselar Citas es el servicio de reservas en línea de Teselar Software para negocios. Si el dueño de un negocio conecta su cuenta de Google Calendar, Teselar Citas accede a:\n\n• la lista de sus calendarios, solo para que elija qué calendario corresponde a cada agenda;\n• los eventos de los calendarios de los que es propietario y que haya elegido, para no ofrecer en la página de reservas las horas en que ya tiene algo, para añadir a su calendario las citas que se reservan y para recibir aviso cuando algo cambia en esos calendarios.\n\nDe cada evento de Google solo se guardan la hora de inicio, la de fin y su identificador; nunca el título, la descripción ni los invitados. El permiso de acceso se guarda cifrado, en servidores de la Unión Europea (Frankfurt).\n\nLos datos de Google no se usan para nada más: no se venden ni se ceden, no se usan para publicidad ni para entrenar modelos de inteligencia artificial, y ninguna persona los lee salvo con el consentimiento del dueño, por seguridad o por obligación legal.\n\nEl uso que hace Teselar Citas de la información recibida de las API de Google, y su transferencia a cualquier otra aplicación, se ajusta a la Política de Datos de Usuario de los Servicios de API de Google (https://developers.google.com/terms/api-services-user-data-policy), incluidos los requisitos de Uso Limitado.\n\nEl dueño puede desconectar Google Calendar en cualquier momento desde el panel de Teselar Citas o desde los permisos de su cuenta de Google (https://myaccount.google.com/permissions). Si lo desconecta desde el panel, se borran en el momento el permiso y las horas guardadas de sus eventos. Si retira el permiso desde su cuenta de Google o la conexión deja de funcionar, el permiso se borra y las horas guardadas se conservan 7 días, para que no se den citas encima de lo que tiene apuntado mientras lo vuelve a conectar; pasado ese plazo, se borran. Si el negocio deja el servicio, todos sus datos se borran a los 30 días de la baja.\n\nEn este tratamiento, el negocio es el responsable y Teselar Software actúa como encargada por cuenta del negocio, según el contrato que firman. Los derechos se ejercen como se indica en el apartado 5.",
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
      sec5_text: 'L\'usuari pot exercitar en qualsevol moment els seus drets d\'accés, rectificació, supressió, limitació del tractament, portabilitat i oposició de les seves dades de caràcter personal adreçant-se mitjançant correu electrònic al Responsable del Tractament: info@teselarsoftware.com. També pot presentar una reclamació davant l\'Agència Espanyola de Protecció de Dades (aepd.es).',
      sec6_title: '6. Demo de gestió',
      sec6_text: 'La demo de gestió (/demo) no fa servir galetes ni desa dades personals. El que hi escriguis (el nom de la teva empresa o a què us dediqueu) es queda al teu navegador i només arriba a Teselar Software si reserves el diagnòstic, dins de la reserva de Calendly. Per saber com es fa servir la demo es compten, sense identificar ningú, els passos que s\'hi fan, el sector triat i les opcions marcades.',
      sec7_title: '7. Propostes',
      sec7_text: 'Si Teselar Software t’envia una proposta amb el teu enllaç personal, quan l’obres amb aquest enllaç s’apunten la data i l’hora de la primera i de l’última vegada que l’obres i quantes vegades ho has fet, per saber si t’ha arribat i fer-ne el seguiment. No es desa la teva IP ni el teu navegador, i no es fan servir galetes. La base jurídica és l’interès legítim a fer el seguiment d’una proposta que has demanat (art. 6.1.f del RGPD). Es conserva mentre la proposta estigui oberta i, si l’acceptes, el que durin el contracte i les seves obligacions legals. Pots oposar-t’hi escrivint a info@teselarsoftware.com.',
      sec8_title: '8. Contactes que no arriben pel web',
      sec8_text: 'Si contactes amb Teselar Software per WhatsApp, per telèfon o en persona, o si un col·laborador ens passa les teves dades perquè et contactem, es desen el nom del negoci, el de la persona de contacte, el telèfon, el correu, com va arribar el contacte i, si va ser a través d’un col·laborador, de part de qui, l’estat de la conversa, la següent acció amb la seva data i notes del que s’ha parlat. Només es fan servir per atendre el que vas demanar i fer-ne el seguiment. La base jurídica és l’interès legítim a mantenir el contacte amb negocis i professionals (art. 6.1.f del RGPD i art. 19 de la LOPDGDD). Si no se signa cap contracte, s’esborren als 12 mesos de l’últim contacte. Pots exercir els teus drets com s’indica a l’apartat 5 i reclamar davant l’Agència Espanyola de Protecció de Dades (aepd.es).',
      sec9_title: '9. Estadístiques de visites',
      sec9_text: 'Per saber quanta gent visita el web i per on hi arriba, Teselar Software compta cada pàgina que s’obre: quina és, el dia i l’hora, el web des del qual s’hi ha arribat (només el seu domini, com google.com), l’etiqueta de l’enllaç si en porta (per exemple, ?origen=bio), el país i si és un mòbil, un ordinador o una tauleta. El país i el tipus de dispositiu es dedueixen en el moment a partir de la connexió i del navegador, que no es desen, i es fa per l’interès legítim a saber com es fa servir el web (art. 6.1.f del RGPD). No es fan servir galetes ni res que permeti reconèixer-te d’una visita a una altra, així que el que es desa no identifica ningú. L’hora exacta només es desa 48 hores; després, només el dia, i tot s’esborra als 25 mesos. No es cedeix a ningú.',
      sec10_title: '10. Gravació de reunions',
      sec10_text: 'Si ens reunim per preparar el teu diagnòstic, Teselar Software et pot demanar permís per gravar la conversa: amb el mòbil si és en persona, o des de l’ordinador si és per videotrucada. Només es grava si dius que sí; si prefereixes que no, es prenen notes a mà. La gravació només serveix per preparar el teu diagnòstic i, si la demanes, la teva proposta. Passa del mòbil a l’ordinador per la xarxa local i es converteix en text en aquest mateix ordinador, sense enviar-la a cap servei de fora, i l’àudio s’esborra tan bon punt està transcrit. A les notes del projecte només hi passen les conclusions. La transcripció s’esborra quan s’acaba el contacte i, si no se signa cap contracte, a tot tardar al cap de 12 mesos de l’últim contacte, com a l’apartat 8. La base jurídica és el teu consentiment (art. 6.1.a del RGPD), que pots retirar en qualsevol moment, també a mitja reunió. No se cedeix a ningú. Pots exercir els teus drets com s’indica a l’apartat 5.',
      sec11_title: "11. Teselar Citas i Google Calendar",
      sec11_text: "Teselar Citas és el servei de reserves en línia de Teselar Software per a negocis. Si el propietari d’un negoci connecta el seu compte de Google Calendar, Teselar Citas accedeix a:\n\n• la llista dels seus calendaris, només perquè triï quin calendari correspon a cada agenda;\n• els esdeveniments dels calendaris dels quals és propietari i que hagi triat, per no oferir a la pàgina de reserves les hores en què ja té alguna cosa, per afegir al seu calendari les cites que es reserven i per rebre avís quan alguna cosa canvia en aquests calendaris.\n\nDe cada esdeveniment de Google només es desen l’hora d’inici, la de final i el seu identificador; mai el títol, la descripció ni els convidats. El permís d’accés es desa xifrat, en servidors de la Unió Europea (Frankfurt).\n\nLes dades de Google no es fan servir per a res més: no es venen ni se cedeixen, no es fan servir per a publicitat ni per entrenar models d’intel·ligència artificial, i cap persona les llegeix tret que el propietari hi consenti, per seguretat o per obligació legal.\n\nL’ús que fa Teselar Citas de la informació rebuda de les API de Google, i la seva transferència a qualsevol altra aplicació, s’ajusta a la Política de Dades d’Usuari dels Serveis d’API de Google (https://developers.google.com/terms/api-services-user-data-policy), inclosos els requisits d’Ús Limitat.\n\nEl propietari pot desconnectar Google Calendar en qualsevol moment des del tauler de Teselar Citas o des dels permisos del seu compte de Google (https://myaccount.google.com/permissions). Si el desconnecta des del tauler, s’esborren en el moment el permís i les hores desades dels seus esdeveniments. Si retira el permís des del seu compte de Google o la connexió deixa de funcionar, el permís s’esborra i les hores desades es conserven 7 dies, perquè no es donin cites a sobre del que té apuntat mentre el torna a connectar; passat aquest termini, s’esborren. Si el negoci deixa el servei, totes les seves dades s’esborren als 30 dies de la baixa.\n\nEn aquest tractament, el negoci és el responsable i Teselar Software actua com a encarregada per compte del negoci, segons el contracte que signen. Els drets s’exerceixen com s’indica a l’apartat 5.",
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
      sec5_text: 'The user can exercise at any time their rights of access, rectification, deletion, limitation of processing, portability, and opposition of their personal data by contacting the Data Controller via email: info@teselarsoftware.com. They can also lodge a complaint with the Spanish Data Protection Agency (aepd.es).',
      sec6_title: '6. Management demo',
      sec6_text: 'The management demo (/demo) uses no cookies and stores no personal data. What you type in it (your business name or what you do) stays in your browser and only reaches Teselar Software if you book the diagnosis, inside the Calendly booking. To understand how the demo is used, the steps taken in it, the sector chosen and the options picked are counted without identifying anyone.',
      sec7_title: '7. Proposals',
      sec7_text: 'If Teselar Software sends you a proposal with your personal link, opening it with that link records the date and time of the first and the last time you open it and how many times you have done so, to know it reached you and to follow up. Your IP address and browser are not stored, and no cookies are used. The legal basis is the legitimate interest in following up a proposal you asked for (Art. 6(1)(f) GDPR). It is kept while the proposal is open and, if you accept it, for as long as the contract and its legal obligations last. You can object by writing to info@teselarsoftware.com.',
      sec8_title: '8. Contacts that do not come through the website',
      sec8_text: 'If you contact Teselar Software by WhatsApp, by phone or in person, or if a partner passes us your details so that we can contact you, we keep the business name, the contact person’s name, the phone number, the email address, how the contact came in and, if it was through a partner, on whose behalf, the status of the conversation, the next step with its date and notes on what was discussed. They are used only to deal with what you asked for and to follow up. The legal basis is the legitimate interest in keeping in touch with businesses and professionals (Art. 6(1)(f) GDPR and Art. 19 of the Spanish LOPDGDD). If no contract is signed, they are deleted 12 months after the last contact. You can exercise your rights as set out in section 5 and lodge a complaint with the Spanish Data Protection Agency (aepd.es).',
      sec9_title: '9. Visit statistics',
      sec9_text: 'To know how many people visit the website and how they get here, Teselar Software counts each page that is opened: which page, the day and time, the website you came from (only its domain, such as google.com), the link tag if there is one (for example, ?origen=bio), the country and whether it is a phone, a computer or a tablet. The country and device type are worked out on the spot from the connection and the browser, which are not stored, on the basis of the legitimate interest in knowing how the website is used (Art. 6(1)(f) GDPR). No cookies are used, nor anything that could recognise you from one visit to the next, so what is stored does not identify anyone. The exact time is kept for only 48 hours; after that, only the day, and everything is deleted after 25 months. It is not shared with anyone.',
      sec10_title: '10. Meeting recordings',
      sec10_text: 'If we meet to prepare your diagnosis, Teselar Software may ask your permission to record the conversation: with a phone if we meet in person, or from the computer if it is a video call. It is only recorded if you say yes; if you would rather not, notes are taken by hand. The recording is used only to prepare your diagnosis and, if you ask for one, your proposal. It goes from the phone to the computer over the local network and is turned into text on that same computer, without being sent to any outside service, and the audio is deleted as soon as it has been transcribed. Only the conclusions go into the project notes. The transcript is deleted when the contact ends and, if no contract is signed, no later than 12 months after the last contact, as in section 8. The legal basis is your consent (Art. 6(1)(a) GDPR), which you can withdraw at any time, including halfway through the meeting. It is not shared with anyone. You can exercise your rights as set out in section 5.',
      sec11_title: "11. Teselar Citas and Google Calendar",
      sec11_text: "Teselar Citas is Teselar Software’s online booking service for businesses. If a business owner connects their Google Calendar account, Teselar Citas accesses:\n\n• the list of their calendars, only so that they can choose which calendar belongs to each schedule;\n• the events of the calendars they own and have chosen, in order to avoid offering on the booking page the times when they already have something, to add the bookings made to their calendar, and to be notified when something changes in those calendars.\n\nFor each Google event only its start time, end time and identifier are stored; never its title, description or guests. The access permission is stored encrypted, on servers in the European Union (Frankfurt).\n\nGoogle data is not used for anything else: it is not sold or transferred, it is not used for advertising or to train artificial intelligence models, and no person reads it except with the owner’s consent, for security purposes or to comply with the law.\n\nTeselar Citas’ use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.\n\nThe owner can disconnect Google Calendar at any time from the Teselar Citas dashboard or from their Google Account permissions (https://myaccount.google.com/permissions). If they disconnect it from the dashboard, the permission and the stored times of their events are deleted immediately. If they remove the permission from their Google Account or the connection stops working, the permission is deleted and the stored times are kept for 7 days, so that no bookings are made over what they have scheduled while they reconnect it; after that, they are deleted. If the business leaves the service, all its data is deleted 30 days after it leaves.\n\nFor this processing, the business is the controller and Teselar Software acts as processor on the business’s behalf, under the contract they sign. Rights are exercised as set out in section 5.",
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

          <div className="max-w-[58ch] space-y-6 text-sm md:text-base text-claridad/85 leading-relaxed [&_p]:[text-wrap:pretty] [&_h2]:[text-wrap:balance]">
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
            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec8_title}</h2>
              <p>{t.sec8_text}</p>
            </div>
            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec9_title}</h2>
              <p>{t.sec9_text}</p>
            </div>
            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec10_title}</h2>
              <p>{t.sec10_text}</p>
            </div>
            <div className="border-t border-claridad/10 pt-6">
              <h2 className="text-xl font-bold text-claridad mb-3">{t.sec11_title}</h2>
              <p className="whitespace-pre-line">{conEnlaces(t.sec11_text)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
