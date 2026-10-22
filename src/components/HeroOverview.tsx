import React from 'react';
import { BookOpen, ShieldCheck, Award, ArrowRight, CheckCircle2, Sparkles, AlertCircle, FileSpreadsheet, Zap } from 'lucide-react';
import { ApprenticeProfile, Badge } from '../types/induction';

interface Props {
  apprentice: ApprenticeProfile;
  completedModulesCount: number;
  totalModulesCount: number;
  completedScenariosCount: number;
  totalScenariosCount: number;
  examPassed: boolean;
  totalXp: number;
  badges: Badge[];
  onStartInduction: () => void;
  onGoToExam: () => void;
  onExploreRegulations: () => void;
  onPreviewCertificate: () => void;
  onGoToSheets?: () => void;
  onGoToExpress?: () => void;
}

export const HeroOverview: React.FC<Props> = ({
  apprentice,
  completedModulesCount,
  totalModulesCount,
  completedScenariosCount,
  totalScenariosCount,
  examPassed,
  totalXp,
  badges,
  onStartInduction,
  onGoToExam,
  onExploreRegulations,
  onPreviewCertificate,
  onGoToSheets,
  onGoToExpress,
}) => {
  const percentComplete = Math.round(
    ((completedModulesCount / totalModulesCount) * 0.5 +
      (completedScenariosCount / totalScenariosCount) * 0.3 +
      (examPassed ? 0.2 : 0)) *
      100
  );

  return (
    <div className="space-y-8">
      {/* 2-Column Hero Split */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Context, Value Proposition & Actions */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">SENA Regional {apprentice.regional}</span>
                <span aria-hidden="true">·</span>
                <span>Ficha {apprentice.fichaNumber}</span>
                <span aria-hidden="true">·</span>
                <span>40 Horas de Inducción</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Inducción Oficial y Reglamento del Aprendiz SENA
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Bienvenido, <strong className="text-slate-900 dark:text-white font-semibold">{apprentice.fullName || 'Aprendiz'}</strong>. 
                Conoce tus derechos, asume tus deberes, resuelve dilemas reales del Centro de Formación y 
                obtén tu certificación institucional acreditada con código de verificación.
              </p>

              {/* Progress Summary Strip */}
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Progreso de Inducción</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold tabular-nums">{percentComplete}% Completado</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span>{completedModulesCount} de {totalModulesCount} módulos</span>
                  <span>{completedScenariosCount} de {totalScenariosCount} casos resueltos</span>
                  <span>{examPassed ? 'Examen Aprobado' : 'Examen pendiente'}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartInduction}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap shrink-0"
              >
                <span>{completedModulesCount > 0 ? 'Continuar Módulos' : 'Iniciar Módulo 1'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreRegulations}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Explorar Reglamento</span>
              </button>

              {onGoToExpress && (
                <button
                  onClick={onGoToExpress}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow-md whitespace-nowrap shrink-0"
                >
                  <Zap className="w-4 h-4 fill-white text-white" />
                  <span>Calificador Express</span>
                </button>
              )}

              <button
                onClick={onPreviewCertificate}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Previsualizar Certificado</span>
              </button>

              {onGoToSheets && (
                <button
                  onClick={onGoToSheets}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Ver Hoja de Cálculo</span>
                </button>
              )}

              <button
                onClick={onGoToExam}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>Evaluación de Certificación</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image with SENA Atmosphere */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-slate-900">
            <img
              src="/src/assets/images/hero_sena_induction_1792526491886.jpg"
              alt="Ambiente de formación tecnológica SENA con aprendices"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                Comunidad Educativa SENA
              </span>
              <p className="text-sm font-medium leading-snug">
                Formación profesional integral con rigor tecnológico y principios éticos para transformar a Colombia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Item Indicator Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Módulos Teórico-Prácticos</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            {completedModulesCount} <span className="text-sm font-normal text-slate-400 dark:text-slate-500">/ {totalModulesCount}</span>
          </div>
          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-1">
            {completedModulesCount === totalModulesCount ? 'Completados' : 'En progreso'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Dilemas Resueltos</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            {completedScenariosCount} <span className="text-sm font-normal text-slate-400 dark:text-slate-500">/ {totalScenariosCount}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Casos y Comités</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Experiencia Acumulada</div>
          <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mt-1 tabular-nums font-mono">
            {totalXp} XP
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Nivel Aprendiz Activo</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Certificación Oficial</div>
          <div className="text-xl font-bold mt-1">
            {examPassed ? (
              <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-5 h-5 inline text-emerald-600 dark:text-emerald-400" /> Aprobada
              </span>
            ) : (
              <span className="text-amber-700 dark:text-amber-400 text-sm">Pendiente Examen</span>
            )}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">40 Horas Reglamentarias</div>
        </div>
      </div>

      {/* Badges / Insignias Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Insignias y Logros de Inducción</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Recompensas gamificadas por dominar el reglamento, derechos y debido proceso
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            {badges.filter(b => b.unlocked).length} de {badges.length} desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-xl border text-center transition-all ${
                badge.unlocked
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-slate-100'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  badge.unlocked
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                }`}
              >
                {badge.unlocked ? <Sparkles className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <h3 className="text-xs font-semibold truncate" title={badge.title}>
                {badge.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
