import { DilemmaScenario } from '../types/induction';

export const SCENARIO_DILEMMAS: DilemmaScenario[] = [
  {
    id: 'dilemma-plagio-ia',
    title: 'Caso 1: El proyecto en Zajuna y el uso ético de la Inteligencia Artificial',
    characterRole: 'Aprendiz de Análisis y Desarrollo de Software / Gestión',
    context: 'Es viernes a las 11:30 PM. La evidencia final de la fase de análisis vence a medianoche en la plataforma Zajuna. Tu compañero de equipo no aportó el módulo técnico asignado.',
    situation: 'Entras en pánico. Una herramienta de IA generativa redacta el documento completo en 30 segundos. Estás tentado a subirlo a Zajuna tal cual sin leerlo, sin citar la herramienta ni verificar las fuentes.',
    choices: [
      {
        id: 'c1-copy',
        actionText: 'Copiar y pegar todo el texto tal cual de la IA, colocarle una portada con los nombres y enviarlo a Zajuna para salvar la entrega.',
        outcomeType: 'infraction',
        consequence: 'El instructor analiza la evidencia con herramientas institucionales de integridad académica. Se detecta 95% de texto generado artificialmente sin citar ni aportar análisis propio. Eres remitido a Comité por Falta Grave de Plagio y Deshonestidad Intelectual.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Art. 18 (Prohibición de plagio y uso indebido de contenidos digitales o de IA sin citación).',
        xpReward: 0
      },
      {
        id: 'c2-honest',
        actionText: 'Subir lo desarrollado auténticamente por ti, documentar en anexos las consultas hechas con IA indicando el prompt y análisis propio, y escribirle un mensaje formal al instructor en Zajuna explicando la situación del equipo.',
        outcomeType: 'correct',
        consequence: '¡Excelente decisión ética! El instructor valora tu honestidad profesional, valida el uso ético y transparente de la tecnología y te otorga una extensión formativa de 48 horas para culminar la evidencia.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Art. 7 y Principios Institucionales de Honestidad y Rigor Académico.',
        xpReward: 120
      },
      {
        id: 'c3-ignore',
        actionText: 'No entregar nada, no avisar por Zajuna y esperar a ver si el instructor se olvida.',
        outcomeType: 'warning',
        consequence: 'Obtienes juicio evaluativo "No Aprobado (D)" por incumplimiento no justificado. Deberás concertar un Plan de Mejoramiento Formativo de emergencia.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Art. 9 (Es deber del aprendiz comunicar oportunamente las novedades de su proceso formativo).',
        xpReward: 30
      }
    ]
  },
  {
    id: 'dilemma-urgencia-salud',
    title: 'Caso 2: Emergencia de salud y la regla de los 3 días hábiles',
    characterRole: 'Aprendiz en Etapa Lectiva',
    context: 'El día martes sufres una apendicitis y debes ser intervenido de urgencia en tu EPS. Te otorgan una incapacidad médica oficial por 5 días hábiles.',
    situation: 'Durante ese tiempo no pudiste asistir a dos clases presenciales ni presentar una evaluación práctica en el taller de maquinaria.',
    choices: [
      {
        id: 'c2-plazo-correcto',
        actionText: 'Escanear o fotografiar la incapacidad oficial de la EPS y radicarla formalmente ante tu instructor y coordinación dentro de los 3 días hábiles siguientes.',
        outcomeType: 'correct',
        consequence: '¡Procedimiento perfecto! El instructor registra la inasistencia justificada en el sistema y concierta contigo una fecha flexible para reprogramar la evaluación práctica sin penalizaciones.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Art. 11 (Plazo de hasta 3 días hábiles para justificar inasistencias con soporte médico oficial expedido por EPS).',
        xpReward: 120
      },
      {
        id: 'c2-whatsapp-informal',
        actionText: 'Escribirle un mensaje informal a un compañero en WhatsApp diciéndole: "Dile al profe que estoy enfermo y la otra semana voy".',
        outcomeType: 'warning',
        consequence: 'El mensaje informal no llega a la coordinación. Al sumar 3 días hábiles sin radicación oficial de soporte, el sistema genera una alerta automática de presunta deserción.',
        regulationBasis: 'El aviso verbal entre aprendices no constituye trámite formal de justificación ni soporte institucional válido.',
        xpReward: 40
      },
      {
        id: 'c2-ignorar-plazo',
        actionText: 'Guardar la incapacidad en tu maleta y mostrarla 4 semanas después cuando se cierre el trimestre.',
        outcomeType: 'infraction',
        consequence: 'El plazo reglamentario de 3 días precluyó. Tu ficha ya fue notificada de reporte de deserción en los sistemas del SENA y debes presentar descargos formales ante coordinación.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Capítulo IV: El término para justificar inasistencias es perentorio (3 días hábiles).',
        xpReward: 0
      }
    ]
  },
  {
    id: 'dilemma-plan-mejoramiento',
    title: 'Caso 3: Dificultad con un resultado y el Plan de Mejoramiento Formativo',
    characterRole: 'Aprendiz técnico',
    context: 'Finalizó el segundo trimestre y obtuviste resultado "D (No Aprobado)" en una de las competencias clave de tu diseño curricular.',
    situation: 'Un compañero te dice: "Ya te van a expulsar del SENA y a cancelar la matrícula directamente". Te sientes preocupado y no sabes qué hacer.',
    choices: [
      {
        id: 'c3-conocer-derecho',
        actionText: 'Acercarte al instructor y ejercer tu derecho fundamental a concertar un Plan de Mejoramiento Formativo con actividades pedagógicas adicionales.',
        outcomeType: 'correct',
        consequence: '¡Excelente conocimiento de tus derechos! El instructor elabora el acta de Plan de Mejoramiento Formativo, te brinda tutoría de refuerzo, superas la actividad y tu juicio evaluativo cambia a "A (Aprobado)".',
        regulationBasis: 'Acuerdo 0009 de 2024 - Art. 7 (Derecho a contar con Planes de Mejoramiento Formativo antes de cualquier medida sancionatoria).',
        xpReward: 120
      },
      {
        id: 'c3-abandonar',
        actionText: 'Creerle a tu compañero, deprimirte y dejar de asistir a clases sin firmar retiro voluntario ni solicitar aplazamiento o reingreso.',
        outcomeType: 'infraction',
        consequence: 'Incurres en deserción injustificada. La subdirección emite resolución de cancelación de matrícula con sanción de inhabilidad en el sistema nacional de formación.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Régimen de deserciones y sanciones.',
        xpReward: 0
      },
      {
        id: 'c3-agredir',
        actionText: 'Ir a reclamarle con gritos e insultos al instructor en la sala de profesores por haberte calificado "D".',
        outcomeType: 'infraction',
        consequence: 'Incurres en una Falta Disciplinaria Grave contra la dignidad y respeto debidos al instructor. El caso pasa directo a Comité disciplinario con riesgo de expulsión.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Art. 19: Prohibido faltar al respeto e intimidar a cualquier integrante de la comunidad SENA.',
        xpReward: 0
      }
    ]
  },
  {
    id: 'dilemma-practica-2025',
    title: 'Caso 4: Contrato de Aprendizaje y Derechos Laborales 2025',
    characterRole: 'Aprendiz próximo a etapa productiva',
    context: 'Una empresa te ofrece un contrato de aprendizaje bajo el nuevo marco de la Ley 2466 de 2025, pero el encargado de recursos humanos te dice que en etapa práctica solo te pagará el 50% del salario mínimo y sin prestaciones.',
    situation: 'Dudas sobre si firmar o qué responder ante esta propuesta.',
    choices: [
      {
        id: 'c4-derecho-ley2025',
        actionText: 'Informar a la empresa sobre la Ley 2466 de 2025 y la Circular 083 de 2025, donde se estipula que la etapa práctica debe remunerarse con el 100% del SMMLV, auxilio de transporte y prestaciones sociales, y acudir a la coordinación de relaciones corporativas del SENA.',
        outcomeType: 'correct',
        consequence: '¡Excelente conocimiento legal! El SENA asesora a la empresa, se corrige el contrato al 100% del SMMLV con prestaciones completas y comienzas tu práctica con total respaldo jurídico.',
        regulationBasis: 'Ley 2466 de 2025 y Circular Externa 083 de 2025 (MinTrabajo y SENA: 100% del SMMLV más prestaciones en etapa práctica).',
        xpReward: 120
      },
      {
        id: 'c4-firmar-callado',
        actionText: 'Aceptar y firmar las condiciones ilegales para no generar molestias, perdiendo tus derechos a prestaciones y auxilio de transporte.',
        outcomeType: 'warning',
        consequence: 'Pierdes los derechos garantizados por la ley de reforma laboral 2025. El SENA podría rechazar la legalización del contrato al no cumplir los mínimos de ley.',
        regulationBasis: 'Los derechos laborales y apoyos del contrato de aprendizaje regulados por la Ley 2466 son de orden público y de obligatorio cumplimiento.',
        xpReward: 30
      },
      {
        id: 'c4-falso-certificado',
        actionText: 'Pagar a un intermediario para que te entregue una certificación de práctica falsa sin trabajar en la empresa.',
        outcomeType: 'infraction',
        consequence: 'Incurres en fraude gravísimo y falsedad documental. Implica cancelación inmediata de matrícula e investigación judicial.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Falta Gravísima sancionable con cancelación e inhabilidad.',
        xpReward: 0
      }
    ]
  },
  {
    id: 'dilemma-audiencia-comite',
    title: 'Caso 5: Citación formal al Comité de Evaluación y Seguimiento',
    characterRole: 'Aprendiz citado formalmente',
    context: 'Recibes una notificación oficial firmada por la coordinación donde te citan a audiencia del Comité de Evaluación y Seguimiento por un presunto incumplimiento en tus actividades formativas.',
    situation: 'La comunicación te brinda un término de 5 días hábiles para presentarte a la audiencia colegiada con tus argumentos y evidencias.',
    choices: [
      {
        id: 'c5-descargos-defensa',
        actionText: 'Preparar tus argumentos por escrito con evidencias, solicitar el acompañamiento de tu vocero de ficha o representante de aprendices y presentarte puntualmente a la audiencia.',
        outcomeType: 'correct',
        consequence: '¡Excelente ejercicio de tu derecho constitucional a la defensa! El Comité escucha tus descargos con enfoque restaurativo, revisa las pruebas y en lugar de sanción recomienda una medida formativa pedagógica.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Capítulo VII y VIII: Garantía de presunción de inocencia, contradicción y enfoque restaurativo.',
        xpReward: 120
      },
      {
        id: 'c5-no-asistir',
        actionText: 'Romper la carta de citación, no asistir y creer que sin tu presencia no pueden tomar ninguna decisión.',
        outcomeType: 'infraction',
        consequence: 'Grave error. El reglamento estipula que si el aprendiz no asiste sin causa justificada demostrable, el Comité sesiona y emite su recomendación con las pruebas que reposen en el expediente.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Art. 29: La inasistencia injustificada no suspende la sesión del Comité de Evaluación y Seguimiento.',
        xpReward: 0
      },
      {
        id: 'c5-agresion-legal',
        actionText: 'Publicar amenazas en redes sociales contra los miembros del comité acusándolos sin fundamento.',
        outcomeType: 'infraction',
        consequence: 'Incurres en falta disciplinaria grave por ciberacoso y difamación institucional, agravando tu situación ante la Subdirección.',
        regulationBasis: 'Acuerdo 0009 de 2024 - Art. 19: Prohibido agraviar a los miembros de la comunidad educativa.',
        xpReward: 0
      }
    ]
  }
];
