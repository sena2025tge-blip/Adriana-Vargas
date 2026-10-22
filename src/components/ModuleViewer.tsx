import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Award,
  ArrowRight
} from 'lucide-react';
import { InductionModule } from '../types/induction';

interface Props {
  modules: InductionModule[];
  completedModuleIds: string[];
  onCompleteModule: (moduleId: string, xpEarned: number) => void;
  onGoToSimulator: () => void;
}

export const ModuleViewer: React.FC<Props> = ({
  modules,
  completedModuleIds,
  onCompleteModule,
  onGoToSimulator,
}) => {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmittedCheck, setHasSubmittedCheck] = useState(false);

  const currentModule = modules[selectedModuleIndex];
  const isCurrentModuleCompleted = completedModuleIds.includes(currentModule.id);

  const handleSelectOption = (optionId: string) => {
    if (hasSubmittedCheck) return;
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setHasSubmittedCheck(true);

    const chosenOption = currentModule.quickCheck.options.find(
      (opt) => opt.id === selectedOptionId
    );

    if (chosenOption?.isCorrect) {
      if (!isCurrentModuleCompleted) {
        onCompleteModule(currentModule.id, currentModule.xpReward);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    }
  };

  const handleNextModule = () => {
    if (selectedModuleIndex < modules.length - 1) {
      setSelectedModuleIndex(selectedModuleIndex + 1);
      setSelectedOptionId(null);
      setHasSubmittedCheck(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevModule = () => {
    if (selectedModuleIndex > 0) {
      setSelectedModuleIndex(selectedModuleIndex - 1);
      setSelectedOptionId(null);
      setHasSubmittedCheck(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectModuleDirect = (idx: number) => {
    setSelectedModuleIndex(idx);
    setSelectedOptionId(null);
    setHasSubmittedCheck(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Module Selector Bar */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {modules.map((mod, idx) => {
            const isCompleted = completedModuleIds.includes(mod.id);
            const isCurrent = idx === selectedModuleIndex;

            return (
              <button
                key={mod.id}
                onClick={() => handleSelectModuleDirect(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                  isCurrent
                    ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                ) : (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {mod.number}
                  </span>
                )}
                <span>Módulo {mod.number}: {mod.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Content Layout */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-200">
        {/* Module Header */}
        <div className="p-6 sm:p-8 bg-slate-900 dark:bg-slate-950 text-white">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
            <span>Módulo 0{currentModule.number} de 0{modules.length}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {currentModule.estimatedMinutes} min estimados
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-300">+{currentModule.xpReward} XP</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {currentModule.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {currentModule.subtitle}
          </p>
        </div>

        {/* Topics Stack */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-6">
            {currentModule.topics.map((topic, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  {topic.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {topic.description}
                </p>

                <ul className="space-y-1.5 pl-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {topic.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {topic.highlightTip && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-emerald-800 dark:text-emerald-300">Clave del Reglamento: </strong>
                      {topic.highlightTip}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Check Micro-Quiz */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Comprobación Rápida de Comprensión
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Responde correctamente para validar el módulo y ganar {currentModule.xpReward} XP
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  {currentModule.quickCheck.regulationRef}
                </span>
              </div>

              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
                {currentModule.quickCheck.question}
              </p>

              <div className="space-y-2">
                {currentModule.quickCheck.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let optionStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

                  if (hasSubmittedCheck) {
                    if (option.isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-500';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-200';
                    } else {
                      optionStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-emerald-600 dark:border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 text-slate-900 dark:text-white ring-1 ring-emerald-600';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      disabled={hasSubmittedCheck}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all text-xs sm:text-sm flex items-start gap-3 ${optionStyle}`}
                    >
                      <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1">
                        <div>{option.text}</div>
                        {hasSubmittedCheck && isSelected && (
                          <div className={`mt-2 text-xs p-2 rounded ${
                            option.isCorrect 
                              ? 'bg-emerald-100/70 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100' 
                              : 'bg-rose-100/70 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100'
                          }`}>
                            {option.explanation}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action for check */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  {isCurrentModuleCompleted && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> Módulo Validado y Registrado (+{currentModule.xpReward} XP)
                    </div>
                  )}
                </div>

                {!hasSubmittedCheck ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedOptionId}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    Validar Respuesta
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {selectedModuleIndex < modules.length - 1 ? (
                      <button
                        onClick={handleNextModule}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        <span>Siguiente Módulo</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={onGoToSimulator}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        <Award className="w-4 h-4" />
                        <span>Ir al Simulador de Casos</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrevModule}
            disabled={selectedModuleIndex === 0}
            className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Módulo Anterior</span>
          </button>

          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {selectedModuleIndex + 1} de {modules.length}
          </span>

          <button
            onClick={handleNextModule}
            disabled={selectedModuleIndex === modules.length - 1}
            className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-colors"
          >
            <span>Siguiente Módulo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
