import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  Clock, 
  AlertTriangle,
  FileText,
  Zap
} from 'lucide-react';
import { CERTIFICATION_EXAM_QUESTIONS } from '../data/quizQuestions';

interface Props {
  onExamPassed: (score: number, totalQuestions: number) => void;
  examPassed: boolean;
  onViewCertificate: () => void;
  onGoToExpress?: () => void;
}

export const KnowledgeExam: React.FC<Props> = ({
  onExamPassed,
  examPassed,
  onViewCertificate,
  onGoToExpress,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);

  const totalQuestions = CERTIFICATION_EXAM_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const passThreshold = 8; // 80%

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitExam = () => {
    if (answeredCount < totalQuestions) return;

    let correctCount = 0;
    CERTIFICATION_EXAM_QUESTIONS.forEach((q) => {
      const chosenOptionId = selectedAnswers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (chosenOptionId === correctOption?.id) {
        correctCount += 1;
      }
    });

    setScore(correctCount);
    setIsSubmitted(true);

    if (correctCount >= passThreshold) {
      onExamPassed(correctCount, totalQuestions);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryExam = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPassed = score >= passThreshold;

  return (
    <div className="space-y-6">
      {/* Exam Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Evaluación Institucional Acreditada
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Examen de Certificación: Reglamento del Aprendiz SENA
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Demuestra tu dominio sobre derechos, deberes, prohibiciones, medidas formativas y el comité de evaluación.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Requisito de Aprobación</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                80% (8 de 10)
              </div>
            </div>
          </div>
        </div>

        {/* Progress & Status Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>{answeredCount} de {totalQuestions} preguntas respondidas</span>
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
            {Math.round((answeredCount / totalQuestions) * 100)}% Listo
          </span>
        </div>

        {onGoToExpress && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span className="text-amber-950 dark:text-amber-200 font-medium">
                ¿Prefieres practicar con feedback inmediato? Prueba el <strong>Calificador Express</strong> (con confeti y rayos).
              </span>
            </div>
            <button
              onClick={onGoToExpress}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shrink-0 transition-colors"
            >
              Ir a Modo Express
            </button>
          </div>
        )}
      </div>

      {/* Result Card if submitted */}
      {isSubmitted && (
        <div className={`p-6 sm:p-8 rounded-2xl border animate-fade-in shadow-xs ${
          isPassed 
            ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800' 
            : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                isPassed ? 'bg-emerald-600 text-white shadow-md' : 'bg-rose-600 text-white shadow-md'
              }`}>
                {isPassed ? <Award className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isPassed ? '¡Felicitaciones! Has Aprobado la Inducción SENA' : 'No alcanzaste el puntaje mínimo de 80%'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Obtuviste <strong className="font-bold text-slate-900 dark:text-white">{score} de {totalQuestions} aciertos</strong> ({Math.round((score / totalQuestions) * 100)}%). 
                  {isPassed
                    ? ' Tu Certificado Oficial de Inducción ha sido generado exitosamente con validez institucional.'
                    : ' Revisa las explicaciones de cada artículo a continuación y vuelve a intentarlo.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {isPassed ? (
                <button
                  onClick={onViewCertificate}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>Ver y Descargar Certificado</span>
                </button>
              ) : (
                <button
                  onClick={handleRetryExam}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reintentar Examen</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Questions Stack */}
      <div className="space-y-4">
        {CERTIFICATION_EXAM_QUESTIONS.map((question, qIdx) => {
          const chosenOptionId = selectedAnswers[question.id];
          const correctOption = question.options.find((o) => o.isCorrect);
          const isCorrect = isSubmitted && chosenOptionId === correctOption?.id;

          return (
            <div
              key={question.id}
              className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-rose-200 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                <span>Pregunta {qIdx + 1} de {totalQuestions}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{question.regulationRef}</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-4 leading-snug">
                {question.question}
              </h3>

              <div className="space-y-2.5">
                {question.options.map((option) => {
                  const isSelected = chosenOptionId === option.id;

                  let optionStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

                  if (isSubmitted) {
                    if (option.isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-500';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                    } else {
                      optionStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-emerald-600 dark:border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 text-slate-900 dark:text-white ring-1 ring-emerald-600';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectAnswer(question.id, option.id)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${optionStyle}`}
                    >
                      <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>

                      <div className="flex-1">
                        <div>{option.text}</div>

                        {/* Explanation when submitted */}
                        {isSubmitted && (option.isCorrect || isSelected) && (
                          <div className={`mt-2 text-xs p-2.5 rounded-lg ${
                            option.isCorrect 
                              ? 'bg-emerald-100/70 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-100' 
                              : 'bg-rose-100/70 dark:bg-rose-900/60 text-rose-950 dark:text-rose-100'
                          }`}>
                            <strong className="font-semibold">
                              {option.isCorrect ? 'Sustento del Reglamento: ' : 'Corrección: '}
                            </strong>
                            {option.explanation}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Action Bottom Bar */}
      {!isSubmitted && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-200">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {answeredCount < totalQuestions ? (
              <span className="text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Faltan {totalQuestions - answeredCount} preguntas por responder para habilitar el envío
              </span>
            ) : (
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Todas las preguntas contestadas. Listo para calificar.
              </span>
            )}
          </div>

          <button
            onClick={handleSubmitExam}
            disabled={answeredCount < totalQuestions}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Enviar y Calificar Evaluación</span>
          </button>
        </div>
      )}
    </div>
  );
};
