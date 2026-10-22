import { QuizQuestion } from '../types/induction';

export const CERTIFICATION_EXAM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'exam-q1',
    question: 'Bajo el Acuerdo 0009 de 2024, ¿cuál es el plazo perentorio que tiene el aprendiz para justificar por escrito una inasistencia a sus actividades de formación?',
    options: [
      {
        id: 'opt-q1-a',
        text: 'Dentro de los tres (3) días hábiles siguientes al hecho, adjuntando el soporte formal (médico EPS o fuerza mayor).',
        isCorrect: true,
        explanation: 'El Acuerdo 0009 de 2024 estipula explícitamente hasta tres (3) días hábiles para radicar la justificación formal con su respectivo soporte.'
      },
      {
        id: 'opt-q1-b',
        text: 'Hasta 30 días después de culminar el año lectivo.',
        isCorrect: false,
        explanation: 'Esperar a final de ciclo supera ampliamente el término legal y activa el reporte de deserción.'
      },
      {
        id: 'opt-q1-c',
        text: 'No es necesario justificar si el aprendiz le avisa por chat a un compañero de ficha.',
        isCorrect: false,
        explanation: 'Los avisos informales no tienen validez legal ni constituyen trámite formal de justificación.'
      }
    ],
    regulationRef: 'Acuerdo 0009 de 2024 - Capítulo IV'
  },
  {
    id: 'exam-q2',
    question: 'Si un aprendiz presenta falencias y no alcanza a aprobar una competencia técnica, ¿cuál es su derecho pedagógico fundamental antes de cualquier sanción?',
    options: [
      {
        id: 'opt-q2-a',
        text: 'Pagar una sanción pecuniaria en la caja del Centro.',
        isCorrect: false,
        explanation: 'La formación en el SENA es 100% gratuita y no existen multas económicas a aprendices.'
      },
      {
        id: 'opt-q2-b',
        text: 'Concertar y recibir un Plan de Mejoramiento Formativo con actividades pedagógicas complementarias.',
        isCorrect: true,
        explanation: 'El Plan de Mejoramiento Formativo es una garantía pedagógica orientada a superar falencias antes de remitir a comité.'
      },
      {
        id: 'opt-q2-c',
        text: 'Ser cancelada su matrícula inmediatamente de forma automática.',
        isCorrect: false,
        explanation: 'El debido proceso prohíbe las sanciones automáticas sin acompañamiento formativo previo.'
      }
    ],
    regulationRef: 'Acuerdo 0009 de 2024 - Capítulo II (Derechos)'
  },
  {
    id: 'exam-q3',
    question: 'Según la Ley 2466 de 2025 y la Circular 083 de 2025, ¿cuál es el apoyo de sostenimiento económico para aprendices con contrato de aprendizaje en etapa lectiva y en etapa práctica?',
    options: [
      {
        id: 'opt-q3-a',
        text: '75% del SMMLV en etapa lectiva y 100% del SMMLV en etapa práctica más auxilio de transporte y prestaciones sociales.',
        isCorrect: true,
        explanation: 'La Ley 2466 de 2025 elevó el apoyo en lectiva al 75% y en práctica al 100% del SMMLV con plenas prestaciones sociales legales.'
      },
      {
        id: 'opt-q3-b',
        text: '50% en lectiva y 75% en práctica sin prestaciones (régimen anterior derogado).',
        isCorrect: false,
        explanation: 'Ese régimen antiguo fue modificado y mejorado por la Reforma Laboral de la Ley 2466 de 2025.'
      },
      {
        id: 'opt-q3-c',
        text: 'Un salario mínimo en ambas etapas pero sin cobertura de riesgos laborales (ARL).',
        isCorrect: false,
        explanation: 'La cobertura de ARL y salud es obligatoria e irrenunciable desde el primer día de formación.'
      }
    ],
    regulationRef: 'Ley 2466 de 2025 y Circular 083 de 2025'
  },
  {
    id: 'exam-q4',
    question: 'Bajo el Acuerdo 0009 de 2024, ¿cómo está regulado el uso de Inteligencia Artificial (IA) en las evidencias y proyectos del aprendiz?',
    options: [
      {
        id: 'opt-q4-a',
        text: 'Se permite como herramienta de consulta e investigación, pero es falta grave copiar y pegar contenidos generados por IA sin citar ni aportar análisis propio.',
        isCorrect: true,
        explanation: 'El reglamento exige honestidad intelectual y rigor ético en el uso de herramientas tecnológicas e inteligencia artificial.'
      },
      {
        id: 'opt-q4-b',
        text: 'Está prohibido utilizar internet o computadores en todo momento.',
        isCorrect: false,
        explanation: 'El SENA promueve la transformación digital y el uso de tecnologías de vanguardia.'
      },
      {
        id: 'opt-q4-c',
        text: 'Se permite entregar trabajos 100% generados por IA diciendo que los hizo el aprendiz.',
        isCorrect: false,
        explanation: 'Presentar contenido de IA como producción propia sin citar constituye plagio y deshonestidad académica.'
      }
    ],
    regulationRef: 'Acuerdo 0009 de 2024 - Capítulo VI (Prohibiciones)'
  },
  {
    id: 'exam-q5',
    question: '¿Qué escala de valoración cualitativa utiliza el SENA para evaluar las competencias del aprendiz en sus plataformas oficiales (Zajuna)?',
    options: [
      {
        id: 'opt-q5-a',
        text: 'Aprobado (A) o No Aprobado / Deficiente (D), con base en evidencias de conocimiento, desempeño y producto.',
        isCorrect: true,
        explanation: 'El modelo pedagógico del SENA evalúa si el resultado de aprendizaje ha sido Aprobado (A) o No Aprobado (D).'
      },
      {
        id: 'opt-q5-b',
        text: 'Notas numéricas decimales de 0.0 a 5.0 con promedio ponderado.',
        isCorrect: false,
        explanation: 'En el SENA no se utilizan calificaciones numéricas cuantitativas de 0 a 5.'
      },
      {
        id: 'opt-q5-c',
        text: 'Estrellas de satisfacción de 1 a 5.',
        isCorrect: false,
        explanation: 'No corresponde al sistema de registro institucional de juicios evaluativos.'
      }
    ],
    regulationRef: 'Sistema de Evaluación del Aprendizaje SENA'
  },
  {
    id: 'exam-q6',
    question: '¿Cuál de las siguientes es una nueva alternativa oficial contemplada para la etapa productiva bajo las directrices del Acuerdo 0009 de 2024?',
    options: [
      {
        id: 'opt-q6-a',
        text: 'Prácticas y proyectos formativos vinculados a la Economía Popular, Comunitaria y Campesina.',
        isCorrect: true,
        explanation: 'El nuevo marco normativo incluyó formalmente prácticas en la economía popular y comunitaria como alternativa avalada.'
      },
      {
        id: 'opt-q6-b',
        text: 'Comprar certificados de horas ficticias por internet sin laborar.',
        isCorrect: false,
        explanation: 'Presentar certificaciones falsas es un delito de falsedad y falta gravísima en el SENA.'
      },
      {
        id: 'opt-q6-c',
        text: 'Hacer turismo sin concertación de plan de trabajo formativo.',
        isCorrect: false,
        explanation: 'Toda etapa práctica requiere plan de trabajo y supervisión institucional.'
      }
    ],
    regulationRef: 'Acuerdo 0009 de 2024 - Capítulo V (Etapa Productiva)'
  },
  {
    id: 'exam-q7',
    question: '¿Qué autoridad institucional tiene la potestad legal exclusiva de suscribir el acto administrativo de Cancelación de Matrícula tras el debido proceso?',
    options: [
      {
        id: 'opt-q7-a',
        text: 'El Subdirector del respectivo Centro de Formación Profesional Integral.',
        isCorrect: true,
        explanation: 'El Subdirector de Centro es la autoridad competente que suscribe la resolución motivada que impone sanciones formales.'
      },
      {
        id: 'opt-q7-b',
        text: 'El vocero estudiantil de la ficha formativa.',
        isCorrect: false,
        explanation: 'El vocero representa a los aprendices con voz, no tiene facultades disciplinarias sancionatorias.'
      },
      {
        id: 'opt-q7-c',
        text: 'El instructor técnico en medio de una sesión formativa.',
        isCorrect: false,
        explanation: 'Los instructores aplican medidas formativas pedagógicas, pero no pueden cancelar matrículas.'
      }
    ],
    regulationRef: 'Acuerdo 0009 de 2024 - Medidas Sancionatorias'
  },
  {
    id: 'exam-q8',
    question: 'Una vez notificado formalmente de una resolución sancionatoria del Subdirector, ¿de cuánto tiempo dispone el aprendiz para interponer el Recurso de Reposición?',
    options: [
      {
        id: 'opt-q8-a',
        text: 'Cinco (5) días hábiles siguientes a la fecha de notificación formal.',
        isCorrect: true,
        explanation: 'El debido proceso administrativo garantiza cinco (5) días hábiles para radicar el recurso de reposición motivado.'
      },
      {
        id: 'opt-q8-b',
        text: 'Un año después de haber finalizado el programa.',
        isCorrect: false,
        explanation: 'El término legal vence a los 5 días hábiles, tras lo cual la decisión administrativa queda en firme.'
      },
      {
        id: 'opt-q8-c',
        text: 'No existe ningún recurso legal ni derecho a impugnar en el SENA.',
        isCorrect: false,
        explanation: 'El derecho de contradicción y reposición está plenamente garantizado en el reglamento.'
      }
    ],
    regulationRef: 'Acuerdo 0009 de 2024 - Recursos de Ley'
  },
  {
    id: 'exam-q9',
    question: 'Bajo el Capítulo IV del Acuerdo 0009 de 2024, ¿qué novedad permite a un aprendiz que aplazó su formación solicitar formalmente su retorno al programa?',
    options: [
      {
        id: 'opt-q9-a',
        text: 'El trámite de Reingreso reglamentado conforme a disponibilidad de ficha y diseño curricular vigente.',
        isCorrect: true,
        explanation: 'El nuevo reglamento unificó e incorporó el trámite de reingreso formal para garantizar el retorno ordenado a la formación.'
      },
      {
        id: 'opt-q9-b',
        text: 'Presentarse sin avisar ni realizar ningún trámite institucional.',
        isCorrect: false,
        explanation: 'Todo reintegro o reingreso requiere radicación y validación administrativa en el sistema.'
      },
      {
        id: 'opt-q9-c',
        text: 'Volver a inscribirse con un número de documento diferente.',
        isCorrect: false,
        explanation: 'Suplantar o duplicar identificaciones es ilegal y constituye falta gravísima.'
      }
    ],
    regulationRef: 'Acuerdo 0009 de 2024 - Capítulo IV (Novedades)'
  },
  {
    id: 'exam-q10',
    question: '¿Qué sucede si un aprendiz acumula tres (3) días hábiles consecutivos de inasistencia sin justificación médica ni soporte válido?',
    options: [
      {
        id: 'opt-q10-a',
        text: 'Se inicia el trámite de reporte por Deserción, notificando al aprendiz para que presente descargos formales.',
        isCorrect: true,
        explanation: 'El reglamento califica tres días hábiles continuos sin justificar como causal de presunta deserción, dando inicio al debido proceso.'
      },
      {
        id: 'opt-q10-b',
        text: 'El sistema borra automáticamente su registro sin darle oportunidad de descargos.',
        isCorrect: false,
        explanation: 'El debido proceso exige comunicación formal previa y plazo de descargos antes de resolver la cancelación.'
      },
      {
        id: 'opt-q10-c',
        text: 'No ocurre absolutamente nada y se le aprueban todas las materias.',
        isCorrect: false,
        explanation: 'La asistencia y entrega de evidencias es obligatoria para garantizar las competencias laborales.'
      }
    ],
    regulationRef: 'Acuerdo 0009 de 2024 - Deserción'
  }
];
