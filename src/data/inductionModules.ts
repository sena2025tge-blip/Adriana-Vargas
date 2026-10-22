import { InductionModule } from '../types/induction';

export const INDUCTION_MODULES: InductionModule[] = [
  {
    id: 'mod-1-identidad',
    number: 1,
    title: 'Identidad, Principios y Enfoque Diferencial (Acuerdo 0009 de 2024)',
    subtitle: 'El ADN del Aprendiz: Misión, Símbolos, Inclusión y Bienestar Integral',
    estimatedMinutes: 8,
    xpReward: 150,
    topics: [
      {
        title: 'Misión y Rol Transformador del SENA',
        description: 'El SENA (Servicio Nacional de Aprendizaje) es la entidad pública líder en formación profesional integral para la inserción productiva y el desarrollo social de Colombia.',
        points: [
          'Formación profesional gratuita, incluyente y con pertinencia tecnológica para todos los colombianos.',
          'Modelo pedagógico basado en competencias laborales y proyectos formativos aplicados.',
          'Valores institucionales: Honestidad, Respeto, Compromiso, Diligencia, Solidaridad y Justicia.'
        ],
        highlightTip: 'El Acuerdo 0009 de 2024 consolida un enfoque diferencial y pluralista, garantizando inclusión para todas las regiones y comunidades de Colombia.'
      },
      {
        title: 'Etapa Lectiva vs. Etapa Productiva (Marco 2025)',
        description: 'Tu formación se divide en dos fases secuenciales con derechos socioeconómicos fortalecidos por la Ley 2466 de 2025.',
        points: [
          'Etapa Lectiva: Desarrollo de competencias teóricas, talleres y laboratorios con apoyo de sostenimiento del 75% del SMMLV, más Salud y ARL.',
          'Etapa Productiva: Aplicación práctica en empresas o comunidades con remuneración del 100% del SMMLV, prestaciones sociales y auxilio de transporte.'
        ]
      },
      {
        title: 'Bienestar al Aprendiz',
        description: 'Estrategia integral de acompañamiento bio-psicosocial, cultural, de salud mental y deportivo.',
        points: [
          'Ruta de bienestar: Salud física y mental, arte, deporte, liderazgo, cultura y prevención integral.',
          'Apoyos socioeconómicos: Monitorías y apoyos de sostenimiento FIC para aprendices en condición de vulnerabilidad.',
          'Ajustes razonables para aprendices en condición de discapacidad garantizados por el nuevo reglamento.'
        ]
      }
    ],
    quickCheck: {
      id: 'qc-mod-1',
      question: '¿Qué acuerdo oficial del Consejo Directivo Nacional adoptó el actual Reglamento del Aprendiz SENA que rige a partir de 2024 y 2025?',
      options: [
        {
          id: 'opt-1-a',
          text: 'El Acuerdo 007 de 2012 (antiguo)',
          isCorrect: false,
          explanation: 'El Acuerdo 007 de 2012 fue derogado expresamente por el Consejo Directivo Nacional.'
        },
        {
          id: 'opt-1-b',
          text: 'El Acuerdo 0009 de 2024',
          isCorrect: true,
          explanation: '¡Correcto! El Acuerdo 0009 de 2024 es el reglamento vigente que unificó las directrices y derogó los acuerdos anteriores.'
        },
        {
          id: 'opt-1-c',
          text: 'El Decreto de 1957',
          isCorrect: false,
          explanation: 'Ese año corresponde a la fundación histórica del SENA, no al reglamento del aprendiz actual.'
        }
      ],
      regulationRef: 'Acuerdo 0009 de 2024 - Consejo Directivo Nacional'
    }
  },
  {
    id: 'mod-2-derechos',
    number: 2,
    title: 'Derechos Fundamentales del Aprendiz (Capítulo II)',
    subtitle: 'Garantías formativas, accesibilidad digital en Zajuna y acompañamiento pedagógico',
    estimatedMinutes: 10,
    xpReward: 200,
    topics: [
      {
        title: 'Derecho a la Formación Integral y a la Inducción',
        description: 'Todo aprendiz formalmente matriculado adquiere de inmediato un conjunto de derechos protegidos.',
        points: [
          'Recibir una inducción estructurada al iniciar el programa sobre reglamento, bienestar y diseño curricular.',
          'Acceso libre y equitativo a ambientes de formación, maquinaria, software con licenciamiento legal y biblioteca SENA.',
          'Acceso garantizado a la plataforma virtual institucional Zajuna con soporte técnico y pedagógico.',
          'Ser evaluado formativa y objetivamente, conociendo con prontitud las retroalimentaciones en Zajuna.'
        ],
        highlightTip: 'Si consideras que un juicio evaluativo no refleja tus evidencias, tienes derecho a solicitar revisión pedagógica fundamentada.'
      },
      {
        title: 'Derecho Fundamental al Plan de Mejoramiento Formativo',
        description: 'El SENA prioriza la pedagogía sobre el castigo cuando se presentan dificultades.',
        points: [
          'Cuando no logras un resultado de aprendizaje, el instructor debe concertar un Plan de Mejoramiento Formativo.',
          'El plan fija actividades complementarias y plazos razonables para que puedas superar la dificultad académica.',
          'Garantiza que ningún aprendiz sea sancionado por motivos académicos sin antes haber recibido acompañamiento pedagógico.'
        ]
      },
      {
        title: 'Representación Democrática e Inclusión',
        description: 'Voz y voto en la vida institucional del Centro.',
        points: [
          'Elegir y ser elegido democráticamente como Vocero de Ficha o Representante de los Aprendices del Centro.',
          'Ser tratado con absoluta dignidad, con derecho a ajustes razonables si tienes alguna discapacidad.',
          'Debido proceso y presunción de inocencia en cualquier procedimiento de seguimiento.'
        ]
      }
    ],
    quickCheck: {
      id: 'qc-mod-2',
      question: 'Bajo el Acuerdo 0009 de 2024, si un aprendiz presenta dificultades y no alcanza a aprobar una competencia o resultado, ¿cuál es su derecho pedagógico inmediato antes de cualquier sanción?',
      options: [
        {
          id: 'opt-2-a',
          text: 'Cancelación inmediata de matrícula y expulsión',
          isCorrect: false,
          explanation: 'La cancelación es la sanción máxima y solo procede con debido proceso formal tras agotar medidas formativas.'
        },
        {
          id: 'opt-2-b',
          text: 'Concertar y recibir un Plan de Mejoramiento Formativo pedagógico con su instructor',
          isCorrect: true,
          explanation: '¡Excelente! El Acuerdo 0009 de 2024 ratifica el Plan de Mejoramiento Formativo como una garantía previa obligatoria.'
        },
        {
          id: 'opt-2-c',
          text: 'Pagar una penalidad monetaria',
          isCorrect: false,
          explanation: 'La formación en el SENA es 100% gratuita; no existen multas económicas.'
        }
      ],
      regulationRef: 'Acuerdo 0009 de 2024 - Capítulo II (Derechos)'
    }
  },
  {
    id: 'mod-3-deberes',
    number: 3,
    title: 'Deberes, Asistencia y Novedades (Capítulo III y IV)',
    subtitle: 'Acta de compromiso, regla de 3 días de justificación y trámite de Reingreso',
    estimatedMinutes: 10,
    xpReward: 200,
    topics: [
      {
        title: 'Deberes del Aprendiz y Acta de Compromiso',
        description: 'La formación profesional exige disciplina, rigor y convivencia ética.',
        points: [
          'Suscribir el acta de compromiso del aprendiz y honrarla durante todo el ciclo formativo.',
          'Asistir con puntualidad a las sesiones presenciales y participar en las actividades de Zajuna.',
          'Portar visiblemente el carné institucional dentro de las instalaciones y vestir los EPP en talleres.',
          'Cuidar los equipos y la infraestructura física y tecnológica del Centro de Formación.'
        ]
      },
      {
        title: 'Justificación de Inasistencias (Regla de Oro: 3 Días Hábiles)',
        description: 'La inasistencia sin justificar es la principal causal de reporte de deserción.',
        points: [
          'Plazo máximo e improrrogable de 3 DÍAS HÁBILES siguientes al hecho para radicar la justificación formal.',
          'Soportes válidos: Incapacidad médica oficial expedida por EPS o entidad de salud, calamidad doméstica justificada o deber legal.',
          'Acumular tres (3) días consecutivos de inasistencia no justificada activa el trámite de Deserción con citación a descargos.'
        ],
        highlightTip: '¡Importante! Radica siempre tu justificación formal dentro de los 3 días hábiles para evitar que el sistema genere reporte de deserción.'
      },
      {
        title: 'Novedades del Aprendiz: Aplazamientos, Traslados y Nuevo Reingreso',
        description: 'Trámites reglados en el Capítulo IV del Acuerdo 0009 de 2024.',
        points: [
          'Aplazamiento: Pausa justificada de la formación por motivos de fuerza mayor, salud o servicio militar.',
          'Traslado: Solicitud formal de cambio de Centro, jornada o modalidad de formación.',
          'Nuevo trámite de Reingreso: Procedimiento reglado que permite al aprendiz solicitar su retorno a la formación conforme a la disponibilidad de ficha y diseño curricular vigente.'
        ]
      }
    ],
    quickCheck: {
      id: 'qc-mod-3',
      question: '¿Cuántos días hábiles tiene el aprendiz para radicar la justificación médica o de fuerza mayor tras haber faltado a sus actividades formativas?',
      options: [
        {
          id: 'opt-3-a',
          text: 'Máximo tres (3) días hábiles siguientes al hecho con su soporte formal',
          isCorrect: true,
          explanation: '¡Correcto! El Acuerdo 0009 de 2024 mantiene el término de 3 días hábiles para presentar la justificación debidamente sustentada.'
        },
        {
          id: 'opt-3-b',
          text: 'Un mes después de terminado el trimestre',
          isCorrect: false,
          explanation: 'Esperar un mes supera el término perentorio y activa el proceso sancionatorio por deserción.'
        },
        {
          id: 'opt-3-c',
          text: 'No hay plazo establecido',
          isCorrect: false,
          explanation: 'El plazo está formalmente determinado en el reglamento para evitar deserciones no justificadas.'
        }
      ],
      regulationRef: 'Acuerdo 0009 de 2024 - Capítulos III y IV'
    }
  },
  {
    id: 'mod-4-prohibiciones',
    number: 4,
    title: 'Prohibiciones, Ética Digital e Inteligencia Artificial (Capítulo VI)',
    subtitle: 'Prevención del plagio, uso responsable de IA, convivencia y faltas',
    estimatedMinutes: 10,
    xpReward: 200,
    topics: [
      {
        title: 'Uso Ético de la Inteligencia Artificial y Prevención del Plagio',
        description: 'La integridad académica en la era digital es un pilar innegociable en el SENA.',
        points: [
          'Plagio: Copiar trabajos, códigos, proyectos o evidencias de terceros o de internet sin la debida citación bibliográfica.',
          'Inteligencia Artificial (IA): Se permite como herramienta pedagógica de consulta y apoyo, pero está terminantemente prohibido copiar y pegar textos o códigos generados por IA presentándolos como propios sin análisis del aprendiz.',
          'Fraude evaluativo: Suplantar identidad en plataformas como Zajuna o alterar notas e incapacidades médicas.'
        ],
        highlightTip: 'Cita siempre las herramientas y fuentes consultadas. En el SENA se evalúa tu capacidad crítica y tu aprendizaje real, no lo que genera un algoritmo automáticamente.'
      },
      {
        title: 'Convivencia Pacífica y Cero Tolerancia al Ciberacoso',
        description: 'El SENA es un territorio seguro, plural y respetuoso de los derechos humanos.',
        points: [
          'Prohibido el ciberbullying, difamación o agresiones en canales oficiales, grupos de WhatsApp o redes sociales.',
          'Prohibición de ingresar bajo efectos de sustancias psicoactivas o alcohol en sedes o empresas patrocinadoras.',
          'Prohibición absoluta de porte de armas de cualquier tipo en instalaciones del SENA.'
        ]
      },
      {
        title: 'Clasificación de Faltas (Académicas vs. Disciplinarias)',
        description: 'El reglamento tipifica las faltas en Leves, Graves y Gravísimas según el impacto y la intencionalidad.',
        points: [
          'Faltas Académicas: Relacionadas con el logro de resultados, entrega de evidencias y planes de mejoramiento.',
          'Faltas Disciplinarias: Relacionadas con la conducta, respeto, normas de seguridad y convivencia comunitaria.'
        ]
      }
    ],
    quickCheck: {
      id: 'qc-mod-4',
      question: 'Bajo las normas éticas del Acuerdo 0009 de 2024, ¿cómo debe utilizar un aprendiz las herramientas de Inteligencia Artificial (IA)?',
      options: [
        {
          id: 'opt-4-a',
          text: 'Copiar y pegar todo el texto generado por la IA en la evidencia sin citar ni leer',
          isCorrect: false,
          explanation: 'Eso constituye plagio y deshonestidad académica, tipificado como falta grave en el nuevo reglamento.'
        },
        {
          id: 'opt-4-b',
          text: 'Usarla como apoyo para investigar y consultar, citando las fuentes y aportando su propio análisis y desarrollo',
          isCorrect: true,
          explanation: '¡Excelente! La IA es un facilitador tecnológico, pero el aprendizaje debe ser demostrado con criterio propio y citación transparente.'
        },
        {
          id: 'opt-4-c',
          text: 'Pagarle a un tercero para que utilice IA por el aprendiz',
          isCorrect: false,
          explanation: 'El fraude por encargo es una falta grave que conlleva a cancelación de matrícula.'
        }
      ],
      regulationRef: 'Acuerdo 0009 de 2024 - Capítulo VI (Prohibiciones)'
    }
  },
  {
    id: 'mod-5-etapa-productiva',
    number: 5,
    title: 'Etapa Productiva 2025 y Debido Proceso (Capítulo V, VII y Ley 2466)',
    subtitle: 'Nuevos apoyos económicos (75% / 100%), economía popular y garantías del Comité',
    estimatedMinutes: 12,
    xpReward: 250,
    topics: [
      {
        title: 'Nuevos Beneficios de la Etapa Productiva (Ley 2466 y Circular 083 de 2025)',
        description: 'La Reforma Laboral mejoró sustancialmente las condiciones socioeconómicas del contrato de aprendizaje.',
        points: [
          'Apoyo en Etapa Lectiva: 75% del SMMLV (aumento desde el anterior 50%), con cobertura de Salud y Riesgos Laborales (ARL) desde el día 1.',
          'Apoyo en Etapa Práctica: 100% del Salario Mínimo Legal Vigente (SMMLV), más auxilio de transporte, cotización a pensión, salud, ARL y prestaciones sociales de ley.',
          'Inclusión en comités paritarios (COPASST) y de convivencia laboral de la empresa patrocinadora.',
          'Nuevas alternativas: Prácticas en la Economía Popular, Comunitaria y Campesina, además de proyecto productivo, vínculo formativo, monitorías y pasantías.'
        ],
        highlightTip: 'Con la Ley 2466 de 2025, el contrato de aprendizaje cuenta con plenas garantías laborales: 75% en lectiva y 100% en productiva con prestaciones.'
      },
      {
        title: 'El Debido Proceso y Enfoque Restaurativo (Capítulo VII y VIII)',
        description: 'Garantías del artículo 29 de la Constitución Política y enfoque pedagógico del nuevo reglamento.',
        points: [
          'Enfoque restaurativo: Se privilegia el diálogo pedagógico y la corrección formativa antes de aplicar sanciones.',
          'Comunicación formal con pruebas, presunción de inocencia y derecho a rendir descargos.',
          'Comité de Evaluación y Seguimiento: Sesión colegiada con instructor, vocero de ficha, representante estudiantil y bienestar.'
        ]
      },
      {
        title: 'Sanciones y Recurso de Reposición',
        description: 'Autoridad competente y mecanismos de defensa legal.',
        points: [
          'Sanciones oficiales (solo las emite el Subdirector de Centro): Condicionamiento de matrícula o Cancelación definitiva de matrícula.',
          'Recurso de Reposición: El aprendiz tiene cinco (5) días hábiles tras la notificación para interponer recurso formal y solicitar la revocatoria o modificación de la sanción.'
        ]
      }
    ],
    quickCheck: {
      id: 'qc-mod-5',
      question: 'Según la Ley 2466 de 2025 y la Circular 083 de 2025, ¿cuál es el porcentaje de apoyo de sostenimiento en etapa lectiva y en etapa práctica para aprendices con contrato de aprendizaje?',
      options: [
        {
          id: 'opt-5-a',
          text: '50% en lectiva y 75% en práctica (esquema anterior derogado)',
          isCorrect: false,
          explanation: 'Ese era el esquema antiguo del artículo 30 de la Ley 789 de 2002, reformado por la Ley 2466 de 2025.'
        },
        {
          id: 'opt-5-b',
          text: '75% del SMMLV en etapa lectiva y 100% del SMMLV en etapa práctica con prestaciones sociales',
          isCorrect: true,
          explanation: '¡Exacto! La Ley 2466 de 2025 elevó el sostenimiento en lectiva al 75% y en práctica al 100% con auxilio de transporte y prestaciones.'
        },
        {
          id: 'opt-5-c',
          text: 'No se recibe ninguna remuneración en ninguna etapa',
          isCorrect: false,
          explanation: 'El contrato de aprendizaje contempla obligatoriamente apoyo de sostenimiento y seguridad social.'
        }
      ],
      regulationRef: 'Ley 2466 de 2025 y Circular Externa 083 de 2025'
    }
  }
];

export const INITIAL_BADGES = [
  {
    id: 'badge-induccion-iniciada',
    title: 'Pionero SENA 2025',
    description: 'Completaste tu registro con el marco del Acuerdo 0009 de 2024.',
    iconName: 'UserCheck',
    unlocked: true,
    unlockedAt: new Date().toISOString(),
    category: 'onboarding' as const,
  },
  {
    id: 'badge-derechos',
    title: 'Defensor de Derechos',
    description: 'Completaste el módulo sobre garantías, ajustes razonables y Zajuna.',
    iconName: 'ShieldCheck',
    unlocked: false,
    category: 'rights' as const,
  },
  {
    id: 'badge-deberes',
    title: 'Compromiso y Novedades',
    description: 'Dominaste los deberes, la regla de los 3 días y el trámite de reingreso.',
    iconName: 'CheckCircle2',
    unlocked: false,
    category: 'duties' as const,
  },
  {
    id: 'badge-etica',
    title: 'Integridad y Ética Digital',
    description: 'Dominaste el uso ético de IA, prevención del plagio y ciberacoso.',
    iconName: 'Scale',
    unlocked: false,
    category: 'ethics' as const,
  },
  {
    id: 'badge-debido-proceso',
    title: 'Práctica 2025 y Debido Proceso',
    description: 'Superaste la normativa de la Ley 2466 de 2025 (75%/100%) y el Comité.',
    iconName: 'GraduationCap',
    unlocked: false,
    category: 'exam' as const,
  },
  {
    id: 'badge-certificado',
    title: 'Aprendiz Certificado SENA',
    description: 'Aprobaste la evaluación final y obtuviste tu certificación oficial.',
    iconName: 'Award',
    unlocked: false,
    category: 'mastery' as const,
  }
];
