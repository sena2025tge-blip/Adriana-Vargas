import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldAlert, 
  Scale, 
  RotateCcw,
  Award
} from 'lucide-react';
import { SCENARIO_DILEMMAS } from '../data/scenariosData';
import { DilemmaChoice } from '../types/induction';

interface Props {
  completedScenarioIds: string[];
  onCompleteScenario: (scenarioId: string, xpEarned: number) => void;
  onGoToExam: () => void;
}

export const DilemmaSimulator: React.FC<Props> = ({
  completedScenarioIds,
  onCompleteScenario,
  onGoToExam,
}) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [resolvedChoices, setResolvedChoices] = useState<Record<string, DilemmaChoice>>({});

  const scenario = SCENARIO_DILEMMAS[currentScenarioIndex];
  const isScenarioCompleted = completedScenarioIds.includes(scenario.id);
  const activeChoice = resolvedChoices[scenario.id];

  const handleSelectChoice = (choice: DilemmaChoice) => {
    if (activeChoice) return;
    setSelectedChoiceId(choice.id);
  };

  const handleConfirmDecision = () => {
    if (!selectedChoiceId) return;
    const choice = scenario.choices.find((c) => c.id === selectedChoiceId);
    if (!choice) return;

    setResolvedChoices((prev) => ({ ...prev, [scenario.id]: choice }));

    if (choice.outcomeType === 'correct') {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    }

    if (!isScenarioCompleted) {
      onCompleteScenario(scenario.id, choice.xpReward);
    }
  };

  const handleNext = () => {
    if (currentScenarioIndex < SCENARIO_DILEMMAS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedChoiceId(null);
    }
  };

  const handlePrev = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1);
      setSelectedChoiceId(null);
    }
  };

  const handleResetScenario = () => {
    const updated = { ...resolvedChoices };
    delete updated[scenario.id];
    setResolvedChoices(updated);
    setSelectedChoiceId(null);
  };

  return (
    <div className="space-y-6">
      {/* Simulator Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Simulador Gamificado de Decisiones
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dilemas Éticos y Casos Reales del Aprendiz SENA
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Toma decisiones ante situaciones complejas del Centro y experimenta sus consecuencias jurídicas reales.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300">
            <span>{completedScenarioIds.length} de {SCENARIO_DILEMMAS.length} resueltos</span>
          </div>
        </div>

        {/* Stepper buttons */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
          {SCENARIO_DILEMMAS.map((sc, idx) => {
            const isDone = completedScenarioIds.includes(sc.id);
            const isCurrent = idx === currentScenarioIndex;

            return (
              <button
                key={sc.id}
                onClick={() => {
                  setCurrentScenarioIndex(idx);
                  setSelectedChoiceId(null);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-2xs'
                    : isDone
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-300 text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                )}
                <span>Caso {idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Dilemma Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-200">
        {/* Scenario Context Banner */}
        <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
            <span>Caso {currentScenarioIndex + 1} de {SCENARIO_DILEMMAS.length}</span>
            <span aria-hidden="true">·</span>
            <span>Rol: {scenario.characterRole}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            {scenario.title}
          </h3>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Situation description */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Contexto de los Hechos
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {scenario.context}
            </p>
            <div className="pt-2 text-xs sm:text-sm text-slate-900 dark:text-white font-medium leading-relaxed">
              <strong>El dilema: </strong>{scenario.situation}
            </div>
          </div>

          {/* Choices selection */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              ¿Qué decisión tomas como aprendiz SENA?
            </h4>

            {scenario.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              const isResolved = !!activeChoice;
              const isChosenResolved = activeChoice?.id === choice.id;

              let choiceStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

              if (isResolved) {
                if (choice.outcomeType === 'correct') {
                  choiceStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200';
                } else if (isChosenResolved && choice.outcomeType === 'infraction') {
                  choiceStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                } else if (isChosenResolved && choice.outcomeType === 'warning') {
                  choiceStyle = 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200';
                } else {
                  choiceStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 opacity-60';
                }
              } else if (isSelected) {
                choiceStyle = 'border-emerald-600 dark:border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/40 text-slate-900 dark:text-white ring-1 ring-emerald-600';
              }

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice)}
                  disabled={isResolved}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${choiceStyle}`}
                >
                  <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    isSelected || isChosenResolved ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {(isSelected || isChosenResolved) && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{choice.actionText}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Outcome Result Card */}
          {activeChoice && (
            <div className={`p-5 rounded-xl border animate-fade-in space-y-3 ${
              activeChoice.outcomeType === 'correct'
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : activeChoice.outcomeType === 'warning'
                ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeChoice.outcomeType === 'correct' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : activeChoice.outcomeType === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  )}
                  <h4 className="text-sm font-bold">
                    {activeChoice.outcomeType === 'correct'
                      ? 'Decisión Ética y Acorde al Reglamento (+120 XP)'
                      : activeChoice.outcomeType === 'warning'
                      ? 'Advertencia: Consecuencia Formativa Imprevista'
                      : '¡Falta Reglamentaria Cometida!'}
                  </h4>
                </div>

                <button
                  onClick={handleResetScenario}
                  className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reintentar caso
                </button>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed">
                {activeChoice.consequence}
              </p>

              <div className="pt-2 text-xs font-mono border-t border-slate-200/60 dark:border-slate-700/60">
                <strong>Fundamento Legal: </strong> {activeChoice.regulationBasis}
              </div>
            </div>
          )}

          {/* Actions strip */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentScenarioIndex === 0}
              className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Caso Anterior</span>
            </button>

            <div>
              {!activeChoice ? (
                <button
                  onClick={handleConfirmDecision}
                  disabled={!selectedChoiceId}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  Confirmar mi Decisión
                </button>
              ) : currentScenarioIndex < SCENARIO_DILEMMAS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 px-5 py-2.5 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  <span>Siguiente Caso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onGoToExam}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>Ir al Examen de Certificación</span>
                </button>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={currentScenarioIndex === SCENARIO_DILEMMAS.length - 1}
              className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-colors"
            >
              <span>Siguiente Caso</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
