import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Zap,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Flame,
  Award,
  BookOpen,
  HelpCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { EXPRESS_QUESTIONS, ExpressQuestion, ExpressOption } from '../data/expressQuizQuestions';

interface Props {
  onEarnXp: (amount: number) => void;
  onGoToRegulations: () => void;
  onGoToCertificate: () => void;
}

export const ExpressGraderView: React.FC<Props> = ({
  onEarnXp,
  onGoToRegulations,
  onGoToCertificate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // FX States
  const [showLightningFx, setShowLightningFx] = useState(false);
  const [showConfettiModal, setShowConfettiModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Scoring & Streak
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentQuestion = EXPRESS_QUESTIONS[currentIndex];
  const selectedOption = currentQuestion?.options.find((o) => o.id === selectedOptionId);

  // Trigger web audio synthesizers for sound effects (lightning crackle and positive chime)
  const playAudioFx = (type: 'success' | 'lightning') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === 'success') {
        // Melodic ascending chime
        const now = ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.08);
          gain.gain.setValueAtTime(0.18, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.35);
        });
      } else {
        // Thunder & electric distortion crackle
        const now = ctx.currentTime;
        const bufferSize = ctx.sampleRate * 0.45;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1; // White noise for thunder
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(80, now + 0.45);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      }
    } catch {
      // AudioContext unavailable or blocked by autoplay policy; silent fallback
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    const chosen = currentQuestion.options.find((o) => o.id === selectedOptionId);
    if (!chosen) return;

    setIsAnswerSubmitted(true);

    if (chosen.isCorrect) {
      // SUCCESS PATH: CONFETTI BURST
      setIsCorrect(true);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount((prev) => prev + 1);

      const xpGain = currentQuestion.xpReward + (newStreak > 1 ? (newStreak - 1) * 10 : 0);
      setTotalXpEarned((prev) => prev + xpGain);
      onEarnXp(xpGain);

      playAudioFx('success');

      // Trigger vibrant multi-angle confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#39a900', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#ffffff'],
      });

      // Secondary bursts for streaks
      if (newStreak >= 2) {
        setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#39a900', '#fbbf24', '#ffffff'],
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#10b981', '#38bdf8', '#ffffff'],
          });
        }, 250);
      }

      setShowConfettiModal(true);
    } else {
      // ERROR PATH: LIGHTNING & THUNDER STRIKE
      setIsCorrect(false);
      setStreak(0); // Reset streak

      playAudioFx('lightning');
      setShowLightningFx(true);

      // Flash & Shake duration
      setTimeout(() => {
        setShowLightningFx(false);
        setShowErrorModal(true);
      }, 700);
    }
  };

  const handleNextQuestion = () => {
    setShowConfettiModal(false);
    setShowErrorModal(false);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);

    if (currentIndex + 1 < EXPRESS_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
      // Final celebratory confetti burst if passed nicely
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setShowConfettiModal(false);
    setShowErrorModal(false);
    setStreak(0);
    setCorrectCount(0);
    setTotalXpEarned(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="relative space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* FULLSCREEN LIGHTNING STRIKE EFFECT OVERLAY (when answer is wrong) */}
      {showLightningFx && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center animate-lightning-flash">
          {/* Jagged Electric Lightning SVG Graphics */}
          <div className="absolute inset-0 flex items-center justify-center animate-electric-pulse">
            <svg
              className="w-full h-full max-w-2xl opacity-90 stroke-cyan-300 drop-shadow-[0_0_25px_rgba(56,189,248,1)]"
              viewBox="0 0 400 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M200 0 L170 220 L240 260 L140 480 L230 520 L160 800"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M200 0 L170 220 L240 260 L140 480 L230 520 L160 800"
                strokeWidth="20"
                stroke="white"
                opacity="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Branch bolts */}
              <path
                d="M170 220 L110 300 L130 350"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M140 480 L80 560 L110 600"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M240 260 L300 340 L280 400"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Electric Shock Center Emblem */}
          <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-3xl border-4 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.8)]">
            <Zap className="w-20 h-20 text-cyan-300 animate-bounce" />
            <span className="text-2xl font-extrabold tracking-wider text-white uppercase mt-2 drop-shadow-[0_0_15px_rgba(239,68,68,1)]">
              ¡DESCARGA ELÉCTRICA!
            </span>
            <span className="text-xs font-semibold text-cyan-200 mt-1">
              Infracción o error normativo detectado
            </span>
          </div>
        </div>
      )}

      {/* Main Container with Shake capability on error */}
      <div className={`space-y-6 ${showLightningFx ? 'animate-screen-shake' : ''}`}>
        {/* Top Header Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors duration-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Calificador Express SENA
              </span>
              <span className="text-xs text-slate-500 font-mono">Feedback Inmediato</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Evaluador Rápido del Reglamento
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Respuestas correctas activan <strong>lluvia de confeti</strong>; errores disparan <strong>rayos y explicaciones</strong> detalladas.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 rounded-xl text-xs font-bold text-orange-700 dark:text-orange-300">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Racha: {streak}</span>
            </div>

            {/* Total XP Gained */}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>+{totalXpEarned} XP</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title={soundEnabled ? 'Desactivar efectos de sonido' : 'Activar efectos de sonido'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* QUIZ INTERFACE OR SUMMARY */}
        {!isQuizFinished ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors duration-200">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 dark:bg-slate-800 w-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / EXPRESS_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Question Category and Number */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Categoría: {currentQuestion.category}
                </span>
                <span className="font-mono font-medium">
                  Pregunta {currentIndex + 1} de {EXPRESS_QUESTIONS.length}
                </span>
              </div>

              {/* Context Pill */}
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span><strong>Contexto Normativo:</strong> {currentQuestion.context}</span>
              </div>

              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                {currentQuestion.question}
              </h2>

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOptionId === option.id;
                  const letter = String.fromCharCode(65 + idx);

                  let optionStyles = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/70 text-slate-800 dark:text-slate-200';

                  if (isSelected) {
                    optionStyles = 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-slate-900 dark:text-white ring-2 ring-emerald-500/30';
                  }

                  if (isAnswerSubmitted) {
                    if (option.isCorrect) {
                      optionStyles = 'border-emerald-600 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyles = 'border-rose-600 bg-rose-100 dark:bg-rose-950/70 text-rose-950 dark:text-rose-100 font-semibold ring-2 ring-rose-500 animate-pulse';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${optionStyles} disabled:cursor-not-allowed`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm pt-0.5 leading-relaxed flex-1">
                        {option.text}
                      </span>
                      {isAnswerSubmitted && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {isAnswerSubmitted && isSelected && !option.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400">
                  {selectedOptionId ? 'Opción seleccionada. Pulsa calificar.' : 'Selecciona una respuesta para continuar.'}
                </span>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId || isAnswerSubmitted}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Calificar Respuesta</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* FINAL SUMMARY VIEW */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-6 shadow-xs animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto border-4 border-emerald-400">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                ¡Desafío Express Completado!
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Rendimiento de Inducción Rápida
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Has puesto a prueba tus conocimientos sobre derechos, deberes y la reforma 2025.
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-xs text-slate-400">Aciertos</div>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                  {correctCount} / {EXPRESS_QUESTIONS.length}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {Math.round((correctCount / EXPRESS_QUESTIONS.length) * 100)}% de efectividad
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-xs text-slate-400">Racha Máxima</div>
                <div className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-1">
                  <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
                  <span>{maxStreak}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Respuestas seguidas</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-xs text-slate-400">Experiencia Ganada</div>
                <div className="text-2xl font-bold text-amber-600 flex items-center justify-center gap-1">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>+{totalXpEarned} XP</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Sumados a tu perfil</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir Desafío Express</span>
              </button>

              <button
                onClick={onGoToCertificate}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-colors"
              >
                <Award className="w-4 h-4" />
                <span>Ver Mi Certificado Oficial</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: CONFETTI SUCCESS CELEBRATION MODAL */}
      {showConfettiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border-2 border-emerald-500 overflow-hidden transform animate-scale-up">
            {/* Header with celebration banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wider uppercase mb-1">
                🎉 ¡Respuesta Correcta!
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                +{currentQuestion.xpReward + (streak > 1 ? (streak - 1) * 10 : 0)} XP Ganados
              </h3>
              {streak > 1 && (
                <div className="mt-1 flex items-center justify-center gap-1 text-xs font-bold text-amber-200">
                  <Flame className="w-4 h-4 fill-amber-300" />
                  <span>¡Racha activa de {streak} aciertos! (+{(streak - 1) * 10} XP Bono)</span>
                </div>
              )}
            </div>

            {/* Explanation Body */}
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Fundamento del Reglamento:
                </div>
                <p className="leading-relaxed">
                  {currentQuestion.correctExplanation}
                </p>
                <div className="pt-1 text-[11px] font-mono font-medium text-emerald-800 dark:text-emerald-400">
                  {currentQuestion.regulationArticle}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <span>Siguiente Pregunta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LIGHTNING ERROR & DETAILED "POR QUÉ NO ES CORRECTA" MODAL */}
      {showErrorModal && selectedOption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border-2 border-rose-500 overflow-hidden transform">
            {/* Header with electric danger banner */}
            <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 p-6 text-white text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Zap className="w-10 h-10 text-amber-300 fill-amber-300 animate-pulse" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-black/25 text-xs font-bold tracking-wider uppercase mb-1">
                ⚡ ¡Respuesta Incorrecta!
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Análisis de Error Normativo
              </h3>
              <p className="text-xs text-rose-100 mt-1">
                El reglamento establece reglas específicas para esta situación.
              </p>
            </div>

            {/* Explanation Body explaining WHY it is wrong */}
            <div className="p-6 space-y-4 text-left">
              {/* Box 1: Selected Wrong Answer */}
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-950 dark:text-rose-200">
                <div className="font-bold flex items-center gap-1.5 text-rose-800 dark:text-rose-300 mb-1">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Opción que marcaste:
                </div>
                <div className="italic">"{selectedOption.text}"</div>
              </div>

              {/* Box 2: CLEAR WHY WRONG REASONING */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs sm:text-sm text-amber-950 dark:text-amber-200 space-y-1.5">
                <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  ¿Por qué no es correcta esta respuesta?
                </div>
                <p className="leading-relaxed">
                  {selectedOption.whyWrong || 'Esta afirmación contradice las disposiciones expresas del Reglamento del Aprendiz SENA.'}
                </p>
                {selectedOption.regulationNote && (
                  <div className="text-[11px] font-mono text-amber-800 dark:text-amber-400 pt-1">
                    Nota: {selectedOption.regulationNote}
                  </div>
                )}
              </div>

              {/* Box 3: Correct Principle Reminder */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  Disposición Correcta según el {currentQuestion.regulationArticle}:
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {currentQuestion.correctExplanation}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={onGoToRegulations}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Consultar artículo en el Explorador</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Continuar Desafío</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
