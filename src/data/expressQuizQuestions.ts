export interface ExpressOption {
  id: string;
  text: string;
  isCorrect: boolean;
  whyWrong?: string; // Clear explanation of why this answer is incorrect
  regulationNote?: string; // Legal & institutional basis (Acuerdo 0009 / Ley 2466)
}

export interface ExpressQuestion {
  id: string;
  category: 'Derechos' | 'Deberes' | 'Prohibiciones' | 'Etapa Productiva' | 'Ética e IA' | 'Debido Proceso';
  question: string;
  context: string;
  options: ExpressOption[];
  correctExplanation: string;
  regulationArticle: string;
  xpReward: number;
}

export const EXPRESS_QUESTIONS: ExpressQuestion[] = [
  {
    id: 'exp-q1',
    category: 'Deberes',
    question: 'Un aprendiz se enferma y falta a su formación presencial. ¿Cuál es el término legal y el procedimiento correcto para justificar su inasistencia?',
    context: 'Capítulo IV del Acuerdo 0009 de 2024 (Trámite de Novedades e Inasistencias)',
    options: [
      {
        id: 'opt-1-a',
        text: 'Radicar la justificación médica formal dentro de los tres (3) días hábiles siguientes al hecho ante el Coordinador o Instructor.',
        isCorrect: true,
        regulationNote: 'Acuerdo 0009 de 2024 - Art. 18'
      },
      {
        id: 'opt-1-b',
        text: 'Esperar a final de trimestre cuando se cierren las notas para presentar todas las excusas juntas.',
        isCorrect: false,
        whyWrong: '¡Incorrecto! La norma establece estrictamente un plazo máximo de tres (3) días hábiles. Si esperas al final del trimestre, el sistema reportará inasistencia injustificada y activará el proceso de deserción.',
        regulationNote: 'Vulnera el plazo de 3 días del Acuerdo 0009 de 2024.'
      },
      {
        id: 'opt-1-c',
        text: 'Enviar un mensaje informal de WhatsApp a un compañero de ficha para que le avise al instructor.',
        isCorrect: false,
        whyWrong: '¡Incorrecto! Los mensajes informales a compañeros no constituyen justificación legal ni radicación de prueba formal. Solo se valida soporte médico EPS o fuerza mayor comprobable.',
        regulationNote: 'El Acuerdo exige soporte documental expedido por entidad de salud o autoridad competente.'
      }
    ],
    correctExplanation: '¡Excelente! El Acuerdo 0009 de 2024 estipula que toda inasistencia debe justificarse dentro de los tres (3) días hábiles siguientes con soporte idóneo para evitar el reporte de deserción.',
    regulationArticle: 'Acuerdo 0009 de 2024, Art. 18 (Justificación de Inasistencias)',
    xpReward: 35
  },
  {
    id: 'exp-q2',
    category: 'Derechos',
    question: 'Si un aprendiz presenta dificultades técnicas y no logra aprobar los resultados de aprendizaje, ¿cuál es su derecho pedagógico fundamental antes de cualquier sanción?',
    context: 'Capítulo II del Acuerdo 0009 de 2024 (Derechos del Aprendiz)',
    options: [
      {
        id: 'opt-2-a',
        text: 'Pagar una multa pecuniaria en la tesorería del Centro de Formación para tener derecho a habilitar.',
        isCorrect: false,
        whyWrong: '¡Totalmente Falso! En el SENA la educación es 100% gratuita. Está terminantemente prohibido cobrar multas, cobros pecuniarios o sanciones económicas a los aprendices.',
        regulationNote: 'Constitución Política y Estatuto SENA: Gratuidad de la Formación Profesional Integral.'
      },
      {
        id: 'opt-2-b',
        text: 'Concertar y recibir un Plan de Mejoramiento Formativo con actividades pedagógicas de refuerzo y acompañamiento.',
        isCorrect: true,
        regulationNote: 'Acuerdo 0009 de 2024 - Art. 7 (Garantía Formativa)'
      },
      {
        id: 'opt-2-c',
        text: 'Ser remitido directamente a cancelación de matrícula sin oportunidad de acompañamiento pedagógico.',
        isCorrect: false,
        whyWrong: '¡Incorrecto! El debido proceso pedagógico prohíbe las sanciones automáticas. Todo aprendiz tiene derecho a superar deficiencias mediante un plan de mejoramiento antes de elevar el caso a comité.',
        regulationNote: 'El debido proceso y el enfoque formativo son principios rectores obligatorios.'
      }
    ],
    correctExplanation: '¡Correcto! El Plan de Mejoramiento Formativo es un derecho esencial que permite reforzar competencias y superar deficiencias con orientación directa del equipo de instructores.',
    regulationArticle: 'Acuerdo 0009 de 2024, Art. 7 (Derecho al Plan de Mejoramiento Formativo)',
    xpReward: 35
  },
  {
    id: 'exp-q3',
    category: 'Etapa Productiva',
    question: 'Bajo la Ley 2466 de 2025 y la Circular 083 de 2025, ¿cuál es el apoyo de sostenimiento para un aprendiz con contrato de aprendizaje?',
    context: 'Régimen Laboral y Etapa Productiva 2025 - 2026',
    options: [
      {
        id: 'opt-3-a',
        text: '50% del salario mínimo en ambas etapas y solo cobertura de salud básica.',
        isCorrect: false,
        whyWrong: '¡Desactualizado e Incorrecto! La Ley 2466 de 2025 derogó los topes antiguos inferiores para dignificar el contrato de aprendizaje, garantizando el 75% en lectiva y el 100% en productiva.',
        regulationNote: 'Esos porcentajes correspondían a normativas anteriores ya no vigentes en 2025.'
      },
      {
        id: 'opt-3-b',
        text: '75% del SMMLV en etapa lectiva y 100% del SMMLV en etapa práctica, con auxilio de transporte, ARL y prestaciones de ley.',
        isCorrect: true,
        regulationNote: 'Ley 2466 de 2025 & Circular 083 de 2025'
      },
      {
        id: 'opt-3-c',
        text: 'Solo se remunera en etapa práctica con el 60% del salario mínimo si la empresa tiene utilidades.',
        isCorrect: false,
        whyWrong: '¡Falso! El apoyo de sostenimiento es de orden público y de obligatorio cumplimiento para la empresa patrocinadora, independientemente de sus utilidades financieras.',
        regulationNote: 'Ley 2466 de 2025: Es un derecho irrenunciable del aprendiz vinculado.'
      }
    ],
    correctExplanation: '¡Exacto! La reforma del 2025 fijó el 75% del SMMLV en lectiva y el 100% en productiva, incluyendo prestaciones sociales de ley y auxilio de transporte completo.',
    regulationArticle: 'Ley 2466 de 2025 y Circular Conjunta 083 de 2025',
    xpReward: 40
  },
  {
    id: 'exp-q4',
    category: 'Ética e IA',
    question: 'Un aprendiz utiliza herramientas de Inteligencia Artificial (ChatGPT / Claude) para elaborar una evidencia en Zajuna. ¿Cuál es la conducta éticamente correcta?',
    context: 'Capítulo VI del Acuerdo 0009 de 2024 (Integridad Académica y Tecnológica)',
    options: [
      {
        id: 'opt-4-a',
        text: 'Copiar y pegar la respuesta de la IA textualmente y presentarla como si fuera de su propia autoría intelectual.',
        isCorrect: false,
        whyWrong: '¡Falta Grave! Presentar contenido generado por IA sin citar ni intervenir con criterio propio constituye fraude académico y plagio, sancionable ante el Comité de Evaluación.',
        regulationNote: 'Acuerdo 0009 de 2024, Art. 24: Fraude en el uso de plataformas tecnológicas.'
      },
      {
        id: 'opt-4-b',
        text: 'Emplear la IA como asistente de investigación, referenciar el prompt/fuente usada, y aportar análisis crítico personal verificado.',
        isCorrect: true,
        regulationNote: 'Acuerdo 0009 de 2024 - Art. 12 (Uso Responsable de TIC)'
      },
      {
        id: 'opt-4-c',
        text: 'Nunca usar tecnologías digitales porque el reglamento prohíbe cualquier uso de computadores en el SENA.',
        isCorrect: false,
        whyWrong: '¡Incorrecto! El SENA promueve activamente la apropiación de la tecnología, inteligencia artificial y herramientas 4.0; lo que exige es uso ético, transparente y citado.',
        regulationNote: 'El SENA fomenta la innovación y la transformación digital ética.'
      }
    ],
    correctExplanation: '¡Muy bien! El reglamento promueve la tecnología siempre y cuando se declare la fuente, se cite la herramienta y se evidencie el pensamiento crítico y original del aprendiz.',
    regulationArticle: 'Acuerdo 0009 de 2024, Art. 12 y 24 (Integridad en Ambientes Digitales)',
    xpReward: 35
  },
  {
    id: 'exp-q5',
    category: 'Prohibiciones',
    question: 'En un taller de maquinaria pesada o laboratorio químico, ¿qué implicación disciplinaria tiene negarse a utilizar los Elementos de Protección Personal (EPP)?',
    context: 'Capítulo VI del Acuerdo 0009 de 2024 (Prohibiciones y Seguridad en el Trabajo)',
    options: [
      {
        id: 'opt-5-a',
        text: 'Ninguna implicación; el uso de casco, gafas y botas es opcional según el gusto del aprendiz.',
        isCorrect: false,
        whyWrong: '¡Peligroso e Incorrecto! El uso de EPP es obligatorio e innegociable. Pone en riesgo la vida del aprendiz y la de sus compañeros, y constituye una falta disciplinaria sancionable.',
        regulationNote: 'Normas de Seguridad y Salud en el Trabajo (SST) y Reglamento del Aprendiz.'
      },
      {
        id: 'opt-5-b',
        text: 'Constituye falta disciplinaria por vulneración a las normas de Seguridad y Salud en el Trabajo (SST) y da lugar a suspensión de acceso al taller.',
        isCorrect: true,
        regulationNote: 'Acuerdo 0009 de 2024 - Art. 22 (Seguridad Integral)'
      },
      {
        id: 'opt-5-c',
        text: 'Solo se convierte en falta si el aprendiz causa un incendio o rompe una máquina.',
        isCorrect: false,
        whyWrong: '¡Falso! La falta se configura de manera preventiva desde el momento en que se omiten los protocolos de seguridad, no requiere que ocurra una catástrofe para intervenir.',
        regulationNote: 'La prevención del riesgo es un deber prioritario en todos los Centros de Formación.'
      }
    ],
    correctExplanation: '¡Correcto! Los protocolos de SST y el uso estricto de EPP son de carácter imperativo para salvaguardar la vida y la integridad física en todos los ambientes SENA.',
    regulationArticle: 'Acuerdo 0009 de 2024, Art. 22 (Deber de Seguridad y Cuidado)',
    xpReward: 35
  },
  {
    id: 'exp-q6',
    category: 'Debido Proceso',
    question: 'Si la Subdirección de Centro emite una sanción disciplinaria mediante Acto Administrativo motivado, ¿de cuánto tiempo dispone el aprendiz para interponer el Recurso de Reposición?',
    context: 'Capítulo VIII del Acuerdo 0009 de 2024 (Recursos y Garantías Constitucionales)',
    options: [
      {
        id: 'exp-6-a',
        text: 'Cinco (5) días hábiles contados a partir del día siguiente a la notificación personal o electrónica del acto.',
        isCorrect: true,
        regulationNote: 'Acuerdo 0009 de 2024 - Art. 35'
      },
      {
        id: 'exp-6-b',
        text: 'Dos meses después de haber terminado el trimestre lectivo.',
        isCorrect: false,
        whyWrong: '¡Extemporáneo! El recurso debe radicarse estrictamente dentro de los cinco (5) días hábiles siguientes. De lo contrario, la decisión queda en firme y no admite reclamación posterior.',
        regulationNote: 'Código de Procedimiento Administrativo y Art. 35 del Acuerdo 0009.'
      },
      {
        id: 'exp-6-c',
        text: 'No existe derecho a recurso alguno; las decisiones del Subdirector son inapelables de forma inmediata.',
        isCorrect: false,
        whyWrong: '¡Vulnera la Constitución! El Artículo 29 de la Constitución Política y el Acuerdo 0009 garantizan la doble instancia y el derecho de defensa y contradicción ante cualquier sanción.',
        regulationNote: 'Garantía del Debido Proceso y Contradicción.'
      }
    ],
    correctExplanation: '¡Exacto! El Recurso de Reposición es la garantía procesal que permite solicitar la revisión o revocatoria del acto dentro de los 5 días hábiles siguientes a la notificación.',
    regulationArticle: 'Acuerdo 0009 de 2024, Art. 35 (Recurso de Reposición)',
    xpReward: 40
  },
  {
    id: 'exp-q7',
    category: 'Deberes',
    question: '¿Qué debe hacer un aprendiz que necesita suspender temporalmente sus estudios por servicio militar, calamidad doméstica o motivo de fuerza mayor?',
    context: 'Capítulo IV del Acuerdo 0009 de 2024 (Trámite de Aplazamiento y Reingreso)',
    options: [
      {
        id: 'opt-7-a',
        text: 'Dejar de asistir sin avisar a nadie y volver dos años después esperando que su cupo siga activo.',
        isCorrect: false,
        whyWrong: '¡Grave Error! Si dejas de asistir sin radicar la novedad, el Centro aplicará deserción y cancelación de matrícula con sanción de 6 meses a 1 año sin poder inscribirse.',
        regulationNote: 'Acuerdo 0009 de 2024: La deserción conlleva inhabilidad de inscripción en SofíaPlus.'
      },
      {
        id: 'opt-7-b',
        text: 'Radicar formalmente la solicitud de Aplazamiento (máximo hasta por un año) a través de la plataforma institucional con los soportes requeridos.',
        isCorrect: true,
        regulationNote: 'Acuerdo 0009 de 2024 - Art. 19 (Novedades de Matrícula)'
      },
      {
        id: 'opt-7-c',
        text: 'Venderle o transferirle su cupo a un familiar o amigo para que asista por él.',
        isCorrect: false,
        whyWrong: '¡Prohibición Estricta! La matrícula en el SENA es personal, intransferible e indelegable. Suplantar o ceder un cupo es una falta gravísima con implicaciones legales.',
        regulationNote: 'Acuerdo 0009 de 2024, Art. 23: Prohibición de suplantación y falsedad.'
      }
    ],
    correctExplanation: '¡Excelente! El aplazamiento formal protege tu cupo hasta por un (1) año calendario, permitiéndote tramitar el reingreso oportuno sin sanciones ni deserción.',
    regulationArticle: 'Acuerdo 0009 de 2024, Art. 19 (Aplazamiento y Reingreso)',
    xpReward: 35
  },
  {
    id: 'exp-q8',
    category: 'Etapa Productiva',
    question: 'Además del Contrato de Aprendizaje, ¿cuál de las siguientes es una alternativa válida y aprobada en 2025 para realizar la etapa productiva?',
    context: 'Capítulo V del Acuerdo 0009 de 2024 y Ley 2466 de 2025 (Modalidades de Etapa Práctica)',
    options: [
      {
        id: 'opt-8-a',
        text: 'Proyecto Productivo I+D+i, Monitoría Institucional, Pasantía Social o apoyo a unidades de la Economía Popular y Campesina.',
        isCorrect: true,
        regulationNote: 'Acuerdo 0009 de 2024 - Art. 15 & Ley 2466 de 2025'
      },
      {
        id: 'opt-8-b',
        text: 'Trabajar en cualquier empleo informal sin ninguna relación con el programa de formación técnica cursado.',
        isCorrect: false,
        whyWrong: '¡Incorrecto! La etapa productiva debe permitir aplicar directamente las competencias técnicas del programa de formación. Si no guarda pertinencia técnica, no es certificable.',
        regulationNote: 'Art. 14 del Acuerdo: El principio de pertinencia formativa es obligatorio.'
      },
      {
        id: 'opt-8-c',
        text: 'Pagar a una empresa privada para que falsifique la carta de cumplimiento de horas.',
        isCorrect: false,
        whyWrong: '¡Falta Gravísima y Delito! Falsificar certificados o documentos públicos acarrea expulsión inmediata del SENA, cancelación definitiva de matrícula y denuncia penal ante la Fiscalía.',
        regulationNote: 'Acuerdo 0009 de 2024, Art. 25: Falsedad en documento público y fraude.'
      }
    ],
    correctExplanation: '¡Perfecto! El SENA ofrece múltiples modalidades para certificar la etapa práctica: proyectos I+D+i, monitorías, pasantías en entidades públicas y apoyo a la Economía Popular.',
    regulationArticle: 'Acuerdo 0009 de 2024, Art. 15 y Ley 2466 de 2025',
    xpReward: 40
  }
];
