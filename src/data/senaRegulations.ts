import { RegulationArticle } from '../types/induction';

export const SENA_REGULATION_ARTICLES: RegulationArticle[] = [
  {
    id: 'art-derechos-general',
    chapter: 'Capítulo II: Derechos del Aprendiz SENA',
    article: 'Acuerdo 0009 de 2024 - Art. 7',
    title: 'Derecho a la Formación Integral y Entornos Tecnológicos',
    category: 'derechos',
    summary: 'El aprendiz tiene derecho a una formación profesional de calidad, pertinente, incluyente y con acceso a recursos tecnológicos.',
    content: [
      'Recibir inducción integral y oportuna al inicio de la formación sobre el reglamento, bienestar y el programa curricular.',
      'Acceder equitativamente a los ambientes presenciales y a las plataformas virtuales oficiales de aprendizaje (Zajuna).',
      'Disponer de infraestructura física, conectividad, talleres especializados, bibliotecas y herramientas digitales institucionales.',
      'Ser tratado con dignidad, respeto y sin discriminación alguna por etnia, género, orientación, religión o condición de discapacidad (con derecho a ajustes razonables).',
      'Conocer oportunamente las evaluaciones, juicios evaluativos y retroalimentaciones pedagógicas de sus evidencias.'
    ],
    keyTakeaway: 'Garantía de educación gratuita, accesible y con enfoque diferencial, con retroalimentación oportuna en la plataforma Zajuna.',
    tags: ['formacion', 'induccion', 'zajuna', 'ajustes_razonables', 'derechos']
  },
  {
    id: 'art-derecho-bienestar',
    chapter: 'Capítulo II: Derechos del Aprendiz SENA',
    article: 'Acuerdo 0009 de 2024 - Art. 7 y Bienestar',
    title: 'Bienestar al Aprendiz y Planes de Mejoramiento',
    category: 'derechos',
    summary: 'Acceso a programas integrales de bienestar, apoyos de sostenimiento y medidas formativas pedagógicas.',
    content: [
      'Disfrutar de las actividades y beneficios de Bienestar al Aprendiz en salud física y mental, cultura, arte, recreación y liderazgo.',
      'Postularse a los apoyos de sostenimiento (FIC, sostenimiento regular) y monitorías cumpliendo los requisitos socioeconómicos.',
      'Derecho fundamental a recibir un Plan de Mejoramiento Formativo cuando no se evidencie el logro de resultados de aprendizaje, antes de cualquier sanción.',
      'Participar democráticamente en la elección de voceros de ficha y representantes del Centro de Formación.'
    ],
    keyTakeaway: 'El SENA prioriza el acompañamiento formativo: ante dificultades académicas, tienes derecho a concertar un Plan de Mejoramiento pedagógico.',
    tags: ['bienestar', 'apoyos', 'mejoramiento', 'liderazgo', 'salud_mental']
  },
  {
    id: 'art-deberes-academicos',
    chapter: 'Capítulo III: Deberes del Aprendiz SENA',
    article: 'Acuerdo 0009 de 2024 - Art. 9',
    title: 'Compromiso Formativo, Convivencia y Ética Digital',
    category: 'deberes',
    summary: 'Obligaciones esenciales del aprendiz para preservar la excelencia académica, la convivencia y el uso responsable de plataformas.',
    content: [
      'Suscribir y honrar el acta de compromiso del aprendiz al momento de formalizar la matrícula.',
      'Cumplir puntualmente con las actividades presenciales, sincrónicas y asincrónicas en la plataforma Zajuna.',
      'Portar visiblemente el carné institucional dentro de las sedes y usar los Elementos de Protección Personal (EPP) en talleres y laboratorios.',
      'Actuar con base en los valores de honestidad, respeto, solidaridad, justicia y diligencia en todos los canales institucionales y redes.',
      'Cuidar los bienes, equipos y cumplir con el Plan de Gestión Ambiental del Centro.'
    ],
    keyTakeaway: 'El compromiso formativo incluye la puntualidad en Zajuna, el porte del carné y el uso estricto de EPP en ambientes técnicos.',
    tags: ['deberes', 'zajuna', 'carne', 'epp', 'convivencia']
  },
  {
    id: 'art-deberes-novedades',
    chapter: 'Capítulo IV: Novedades del Aprendiz',
    article: 'Acuerdo 0009 de 2024 - Arts. 11 al 16',
    title: 'Justificaciones, Traslados, Aplazamientos y Reingreso',
    category: 'deberes',
    summary: 'Procedimiento unificado para justificar ausencias y gestionar trámites administrativos formativos.',
    content: [
      'Justificar las inasistencias dentro de los 3 días hábiles siguientes al hecho con el soporte formal de EPS, calamidad o fuerza mayor demostrable.',
      'Solicitar aplazamiento de la formación por causas justificadas hasta por un tiempo máximo reglamentado antes de abandonar la ficha.',
      'Tramitar formalmente el retiro voluntario o traslado de centro/jornada a través de los canales oficiales institucionales.',
      'Nuevo trámite de Reingreso: Posibilidad reglada de reingresar al programa bajo las condiciones académicas vigentes del diseño curricular.',
      'Actualizar permanentemente los datos de contacto y residencia en los sistemas del SENA.'
    ],
    keyTakeaway: 'La regla de oro de los 3 días hábiles para justificar inasistencias sigue vigente. Si necesitas pausar, solicita aplazamiento o reingreso formal.',
    tags: ['inasistencias', '3_dias', 'aplazamiento', 'reingreso', 'traslados']
  },
  {
    id: 'art-etapa-productiva-2025',
    chapter: 'Capítulo V: Etapa Productiva y Actualización 2025',
    article: 'Acuerdo 0009 de 2024, Ley 2466 y Circular 083 de 2025',
    title: 'Alternativas de Práctica y Nuevos Derechos Económicos',
    category: 'etapa_productiva',
    summary: 'Régimen actualizado de la etapa productiva con remuneraciones mejoradas y nuevas modalidades.',
    content: [
      'Contrato de Aprendizaje (Ley 2466 de 2025): Apoyo en etapa lectiva del 75% del SMMLV con afiliación inmediata a Salud y Riesgos Laborales (ARL).',
      'En etapa práctica (Ley 2466 de 2025): Remuneración del 100% del SMMLV, auxilio de transporte, cotización a pensión, salud, ARL y prestaciones sociales de ley.',
      'Participación de aprendices en el COPASST y Comité de Convivencia Laboral de las empresas patrocinadoras (Circular 083 de 2025).',
      'Nuevas alternativas comunitarias: Prácticas formativas en la Economía Popular, Comunitaria y Campesina avaladas por el Centro.',
      'Modalidades tradicionales vigentes: Vínculo formativo/laboral, proyectos productivos institucionales, monitorías y pasantías concertadas.'
    ],
    keyTakeaway: 'Bajo la Ley 2466 de 2025, el apoyo en lectiva subió al 75% del SMMLV y en práctica al 100% con prestaciones sociales completas.',
    tags: ['etapa_productiva', 'ley_2466_2025', '75_porciento', '100_porciento', 'economia_popular']
  },
  {
    id: 'art-prohibiciones-academicas',
    chapter: 'Capítulo VI: Prohibiciones y Faltas',
    article: 'Acuerdo 0009 de 2024 - Art. 18',
    title: 'Plagio, Fraude e Integridad en el Uso de IA',
    category: 'prohibiciones',
    summary: 'Conductas académicas no permitidas y lineamientos éticos en el uso de herramientas tecnológicas.',
    content: [
      'Plagiar materiales, informes, códigos o evidencias elaboradas por otros aprendices o publicadas en internet.',
      'Uso indebido de Inteligencia Artificial: Presentar textos, algoritmos o proyectos generados por IA como si fueran producción propia sin citar y sin desarrollo crítico del aprendiz.',
      'Cometer fraude en evaluaciones presenciales o pruebas en línea a través de Zajuna.',
      'Suplantar la identidad de compañeros en plataformas institucionales o ceder credenciales de acceso a terceros.',
      'Falsificar o alterar incapacidades médicas, calificaciones o documentos de cualquier índole.'
    ],
    keyTakeaway: 'La Inteligencia Artificial es una herramienta de consulta; presentar contenido generado por IA sin citar ni aportar análisis es considerado falta grave.',
    tags: ['plagio', 'ia_etica', 'fraude', 'suplantacion', 'zajuna']
  },
  {
    id: 'art-prohibiciones-convivencia',
    chapter: 'Capítulo VI: Prohibiciones y Faltas',
    article: 'Acuerdo 0009 de 2024 - Art. 19',
    title: 'Convivencia, Ciberacoso y Seguridad en Sedes',
    category: 'prohibiciones',
    summary: 'Prohibiciones disciplinarias para salvaguardar la seguridad y la dignidad de la comunidad SENA.',
    content: [
      'Ingresar a sedes del SENA o empresas de práctica bajo efectos de bebidas alcohólicas o sustancias psicoactivas, o consumirlas allí.',
      'Portar armas de fuego, elementos cortopunzantes o sustancias inflamables/peligrosas en instalaciones del SENA.',
      'Incurrir en conductas de acoso sexual, ciberacoso, intimidación, matoneo o discriminación hacia cualquier persona.',
      'Destruir, dañar o sustraer infraestructura, herramientas, maquinaria o propiedad intelectual del SENA o de terceros.',
      'Utilizar redes sociales o canales grupales de la ficha para difamar o agraviar a integrantes de la entidad.'
    ],
    keyTakeaway: 'Cero tolerancia al acoso, drogas, armas y agresiones. El SENA es un territorio de paz, respeto y convivencia armónica.',
    tags: ['convivencia', 'ciberacoso', 'seguridad', 'paz', 'disciplina']
  },
  {
    id: 'art-medidas-formativas',
    chapter: 'Capítulo VII: Medidas Formativas y Debido Proceso',
    article: 'Acuerdo 0009 de 2024 - Arts. 22 al 26',
    title: 'Enfoque Formativo, Restaurativo y Debido Proceso',
    category: 'tramite_faltas',
    summary: 'Principios pedagógicos y garantías constitucionales aplicadas a las medidas correctivas.',
    content: [
      'Enfoque restaurativo y formativo: Se prioriza la mediación, la pedagogía y la reparación del daño antes de imponer sanciones.',
      'Medidas formativas previas: Llamado de atención verbal reflexivo, llamado de atención por escrito y Plan de Mejoramiento con seguimiento.',
      'Debido proceso estricto: Presunción de inocencia, derecho a conocer las pruebas, formular descargos por escrito y aportar testigos.',
      'Sanciones institucionales (potestad exclusiva del Subdirector): Condicionamiento de matrícula y Cancelación definitiva de matrícula.',
      'Recurso de Reposición: El aprendiz sancionado tiene cinco (5) días hábiles siguientes a la notificación para impugnar motivadamente la decisión.'
    ],
    keyTakeaway: 'El nuevo reglamento enfatiza el enfoque restaurativo y pedagógico. Toda sanción debe respetar el debido proceso y admite recurso de reposición.',
    tags: ['debido_proceso', 'restaurativo', 'mejoramiento', 'descargos', 'reposicion']
  },
  {
    id: 'art-comite-evaluacion',
    chapter: 'Capítulo VIII: Comité de Evaluación y Seguimiento',
    article: 'Acuerdo 0009 de 2024 - Arts. 27 al 32',
    title: 'Instancia Colegiada de Evaluación y Seguimiento',
    category: 'comite',
    summary: 'Composición, rol investigativo y garantías del comité que analiza situaciones académicas y disciplinarias.',
    content: [
      'El Comité de Evaluación y Seguimiento actúa como cuerpo colegiado de investigación y análisis; emite recomendaciones motivadas al Subdirector.',
      'Integrantes con derecho a voz y voto: Un instructor del programa (designado por Subdirector), el Coordinador Misional, el Representante de los Aprendices y el profesional de Bienestar (Secretario).',
      'Integrantes con voz pero sin voto: El Coordinador Académico y el Vocero de la ficha formativa del aprendiz.',
      'En audiencia se escuchan los descargos del aprendiz, se valoran las evidencias de descargo y se examinan atenuantes y agravantes.',
      'La recomendación del comité busca alternativas formativas pedagógicas siempre que sea legalmente viable.'
    ],
    keyTakeaway: 'El Comité no sanciona directamente: recomienda. Cuentas con la voz de tu vocero de ficha y el voto del representante estudiantil.',
    tags: ['comite', 'vocero', 'representante', 'audiencia', 'descargos']
  }
];

export const REGLAMENTO_METRICS = {
  acuerdoPrincipal: 'Acuerdo 0009 de 2024 del Consejo Directivo Nacional del SENA',
  actualizacionesLaborales: 'Ley 2466 de 2025 y Circular Externa 083 de 2025 (MinTrabajo / SENA)',
  capitulos: 8,
  articulosClave: 38,
  horasInduccion: 40,
  diasMaxJustificacion: 3,
  apoyoLectiva: '75% del SMMLV (Salud + ARL)',
  apoyoPractica: '100% del SMMLV (Salud + Pensión + ARL + Transporte + Prestaciones)',
  deroga: 'Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024'
};
