import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, BookOpen, Send, ShieldAlert } from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  regulationBasis: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Asistencia & Salud',
    question: '¿Qué hago si me enfermo o tengo una urgencia médica y no puedo asistir?',
    answer: 'Debes acudir a tu EPS o centro de salud y solicitar incapacidad médica oficial. Tienes un plazo MÁXIMO e improrrogable de tres (3) días hábiles siguientes al hecho para presentarla formalmente ante tu instructor o coordinación con copia a la ficha.',
    regulationBasis: 'Acuerdo 0009 de 2024 - Capítulos III y IV'
  },
  {
    id: 'faq-2',
    category: 'Evaluación & Notas',
    question: '¿Qué pasa si pierdo o no apruebo un resultado de aprendizaje (calificación "D")?',
    answer: 'Tienes derecho fundamental a que el instructor concierte contigo un Plan de Mejoramiento Formativo. Este plan contiene actividades pedagógicas complementarias y un cronograma para que logres superar la dificultad sin ser sancionado de antemano.',
    regulationBasis: 'Acuerdo 0009 de 2024 - Capítulo II (Derechos)'
  },
  {
    id: 'faq-3',
    category: 'Ética & Inteligencia Artificial',
    question: '¿Puedo usar herramientas de Inteligencia Artificial o internet para mis proyectos?',
    answer: 'Sí como fuente de investigación y consulta, pero NUNCA copiar y pegar textos o código generados por IA haciéndolos pasar como propios. Todo material externo debe ser debidamente citado bajo normas APA o IEEE. El plagio en Zajuna es falta grave y da inicio a proceso disciplinario.',
    regulationBasis: 'Acuerdo 0009 de 2024 - Capítulo VI (Prohibiciones)'
  },
  {
    id: 'faq-4',
    category: 'Comité de Evaluación',
    question: '¿Quién me acompaña y defiende si me citan al Comité de Evaluación y Seguimiento?',
    answer: 'Tienes derecho a que asista el Representante de los Aprendices del Centro y el Vocero de tu Ficha. En la sesión ejerces tu derecho constitucional a descargos con enfoque restaurativo, aportando pruebas testimoniales o documentales.',
    regulationBasis: 'Acuerdo 0009 de 2024 - Capítulos VII y VIII (Debido Proceso)'
  },
  {
    id: 'faq-5',
    category: 'Etapa Práctica & Remuneración 2025',
    question: '¿Cuáles son los apoyos económicos y alternativas para la etapa práctica?',
    answer: 'Con la Ley 2466 de 2025 y Circular 083 de 2025, el contrato de aprendizaje otorga 75% del SMMLV en etapa lectiva (con Salud y ARL) y 100% del SMMLV en etapa práctica más auxilio de transporte y prestaciones sociales. Además, el Acuerdo 0009 de 2024 incorporó prácticas en la Economía Popular, Comunitaria y Campesina, junto con proyectos productivos, vínculo formativo, monitorías y pasantías.',
    regulationBasis: 'Acuerdo 0009 de 2024, Ley 2466 de 2025 y Circular 083 de 2025'
  },
  {
    id: 'faq-6',
    category: 'Bienestar al Aprendiz',
    question: '¿Cómo puedo acceder a los apoyos de sostenimiento y beneficios de Bienestar?',
    answer: 'El Centro abre convocatorias trimestrales para apoyos FIC y sostenimiento regular para aprendices de estratos 1 y 2 que no cuenten con contrato de aprendizaje. Además, todos los aprendices tienen acceso gratuito a orientación psicosocial, gimnasio, torneos y cultura.',
    regulationBasis: 'Política de Bienestar al Aprendiz SENA'
  },
  {
    id: 'faq-7',
    category: 'Recursos Legales',
    question: 'Si la Subdirección me sanciona, ¿puedo apelar o defenderme?',
    answer: 'Sí. Contra la resolución de sanción del Subdirector procede el Recurso de Reposición, el cual debes interponer por escrito dentro de los cinco (5) días hábiles siguientes a la notificación formal del acto administrativo.',
    regulationBasis: 'Acuerdo 0009 de 2024 - Recursos de Ley'
  },
  {
    id: 'faq-8',
    category: 'Deserción',
    question: '¿Qué pasa si falto 3 días seguidos sin avisar a nadie?',
    answer: 'El sistema emite reporte de presunta Deserción. La coordinación te enviará una comunicación dándote 5 días hábiles para justificar. Si no respondes, se cancela la matrícula con sanción de inhabilidad de 6 meses a 2 años en el SENA.',
    regulationBasis: 'Reglamento del Aprendiz SENA - Deserción'
  }
];

export const RegulationsAssistant: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);

  const filteredFaqs = FAQS.filter(
    (f) =>
      !searchQuery ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAskCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    const q = customQuestion.toLowerCase();
    let reply = '';

    if (q.includes('falta') || q.includes('enfermo') || q.includes('cita') || q.includes('inasistencia')) {
      reply = 'Recuerda que tienes hasta 3 días hábiles para radicar ante tu instructor la constancia médica expedida por EPS. De lo contrario, se considerará inasistencia injustificada.';
    } else if (q.includes('plagio') || q.includes('copia') || q.includes('ia') || q.includes('chatgpt')) {
      reply = 'El plagio es considerado una falta grave académica. Toda cita o uso de herramientas debe estar debidamente referenciado con normas bibliográficas en la evidencia.';
    } else if (q.includes('comite') || q.includes('audiencia') || q.includes('sancion')) {
      reply = 'El Comité de Evaluación analiza el caso y escucha tus descargos con la presencia del Representante de los Aprendices. La decisión final la toma el Subdirector y cuentas con 5 días hábiles para interponer recurso de reposición.';
    } else if (q.includes('etapa') || q.includes('practica') || q.includes('contrato')) {
      reply = 'Bajo la Ley 2466 de 2025 y el Acuerdo 0009 de 2024, el contrato de aprendizaje otorga 75% del SMMLV en lectiva y 100% en práctica con prestaciones sociales. También existen modalidades en economía popular, proyectos productivos, vínculo formativo, monitorías y pasantías.';
    } else if (q.includes('mejoramiento') || q.includes('perdi') || q.includes('deficiente') || q.includes('d')) {
      reply = 'Tienes derecho al Plan de Mejoramiento Formativo concertado con el instructor antes de cualquier proceso sancionatorio.';
    } else {
      reply = `Sobre tu consulta ("${customQuestion}"), el Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024 y Ley 2466 de 2025) protege el debido proceso, garantiza la formación integral gratuita, fomenta la convivencia pacífica y los derechos formativos. Te invitamos a consultar el Explorador del Reglamento o acudir a la coordinación académica de tu Centro.`;
    }

    setCustomAnswer(reply);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Guía Rápida y Preguntas Frecuentes del Aprendiz
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Respuestas directas basadas en el Acuerdo 0009 de 2024 y las actualizaciones normativas de 2025.
            </p>
          </div>
        </div>

        {/* Quick query bar */}
        <div className="relative mt-4">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Escribe tu duda (ej: qué pasa si falto, cómo es la práctica, plan de mejoramiento)..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Interactive Ask Box */}
      <div className="bg-emerald-900 dark:bg-emerald-950 text-white p-6 rounded-2xl shadow-xs space-y-4 border border-emerald-800/60">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Consultorio Virtual de Inducción
          </span>
          <h3 className="text-lg font-bold">¿Tienes una duda específica sobre el reglamento?</h3>
          <p className="text-xs text-emerald-100 mt-0.5">
            Escribe tu situación y obtén orientación inmediata conforme a la normativa SENA.
          </p>
        </div>

        <form onSubmit={handleAskCustom} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Ej: ¿Qué pasa si la empresa cancela mi contrato de aprendizaje antes de tiempo?"
            className="flex-1 px-4 py-2.5 rounded-lg bg-emerald-950/70 dark:bg-slate-900/80 border border-emerald-700 text-white placeholder-emerald-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Consultar</span>
          </button>
        </form>

        {customAnswer && (
          <div className="p-4 rounded-xl bg-emerald-950 dark:bg-slate-900 border border-emerald-700/80 text-xs sm:text-sm leading-relaxed text-emerald-100 animate-fade-in">
            <strong className="text-emerald-300 block mb-1">Orientación del Reglamento SENA:</strong>
            {customAnswer}
          </div>
        )}
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider px-1">
          Preguntas Habituales del Aprendiz ({filteredFaqs.length})
        </h3>

        {filteredFaqs.map((faq) => {
          const isExpanded = expandedId === faq.id;

          return (
            <div
              key={faq.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs transition-colors duration-200"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div>
                  <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
                    {faq.category}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </h4>
                </div>
                <div className="text-slate-400 dark:text-slate-500 p-1 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 animate-fade-in">
                  <p className="leading-relaxed">{faq.answer}</p>
                  <div className="text-xs font-mono text-emerald-800 dark:text-emerald-400 font-medium pt-1">
                    Fundamento: {faq.regulationBasis}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
