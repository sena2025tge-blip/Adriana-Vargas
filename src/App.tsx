/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  HelpCircle, 
  FileCheck, 
  ListChecks, 
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { Header } from './components/Header';
import { UserProvider, useUser } from './components/UserProvider';
import { HeroOverview } from './components/HeroOverview';
import { LandingPage } from './components/LandingPage';
import { ModuleViewer } from './components/ModuleViewer';
import { RegulationExplorer } from './components/RegulationExplorer';
import { DilemmaSimulator } from './components/DilemmaSimulator';
import { KnowledgeExam } from './components/KnowledgeExam';
import { CertificateView } from './components/CertificateView';
import { GoogleSheetsSyncView } from './components/GoogleSheetsSyncView';
import { ExpressGraderView } from './components/ExpressGraderView';
import { RegulationsAssistant } from './components/RegulationsAssistant';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { INDUCTION_MODULES, INITIAL_BADGES } from './data/inductionModules';
import { SCENARIO_DILEMMAS } from './data/scenariosData';
import { ApprenticeProfile, Badge, ApprenticeSheetRecord } from './types/induction';
import { syncApprenticeAutomatically, initAuth } from './services/googleSheetsService';

const DEFAULT_PROFILE: ApprenticeProfile = {
  fullName: 'Valentina Gómez Ríos',
  docType: 'CC',
  docNumber: '1025874120',
  programName: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  fichaNumber: '2874102',
  regional: 'Distrito Capital',
  centroFormacion: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
  startDate: new Date().toISOString(),
};

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

function MainApp() {
  const { userProfile, loading } = useUser();

  // Dark Mode state with localStorage and HTML class sync
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sena_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Screen blur transition state when switching modes
  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);

  // Persistent State via localStorage
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    const saved = localStorage.getItem('sena_apprentice_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [currentTab, setCurrentTab] = useState<string>('express');
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('sena_completed_modules');
    return saved ? JSON.parse(saved) : ['mod-1-identidad'];
  });

  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('sena_completed_scenarios');
    return saved ? JSON.parse(saved) : [];
  });

  const [totalXp, setTotalXp] = useState<number>(() => {
    const saved = localStorage.getItem('sena_total_xp');
    return saved ? parseInt(saved, 10) : 150;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('sena_badges');
    return saved ? JSON.parse(saved) : INITIAL_BADGES;
  });

  const [examPassed, setExamPassed] = useState<boolean>(() => {
    const saved = localStorage.getItem('sena_exam_passed');
    return saved ? JSON.parse(saved) : false;
  });

  const [examScore, setExamScore] = useState<number>(() => {
    const saved = localStorage.getItem('sena_exam_score');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  // Automatic Sync Status state
  const [syncStatus, setSyncStatus] = useState<{
    state: 'idle' | 'syncing' | 'synced' | 'error' | 'queued';
    message: string;
    lastSyncedAt?: string;
  }>(() => {
    const saved = localStorage.getItem('sena_last_auto_sync');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          state: 'synced',
          message: parsed.action === 'updated' ? 'Fila actualizada automáticamente' : 'Registro sincronizado',
          lastSyncedAt: parsed.timestamp,
        };
      } catch (e) {
        // ignore
      }
    }
    return { state: 'idle', message: 'Sincronización automática activa' };
  });

  // Sync dark mode class with root <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sena_dark_mode', isDarkMode ? 'true' : 'false');
  }, [isDarkMode]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sena_completed_modules', JSON.stringify(completedModuleIds));
  }, [completedModuleIds]);

  useEffect(() => {
    localStorage.setItem('sena_completed_scenarios', JSON.stringify(completedScenarioIds));
  }, [completedScenarioIds]);

  useEffect(() => {
    localStorage.setItem('sena_total_xp', totalXp.toString());
  }, [totalXp]);

  useEffect(() => {
    localStorage.setItem('sena_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('sena_exam_passed', JSON.stringify(examPassed));
  }, [examPassed]);

  useEffect(() => {
    localStorage.setItem('sena_exam_score', examScore.toString());
  }, [examScore]);

  // Auto-sync listener on initial load
  useEffect(() => {
    const unsubscribe = initAuth((user, token) => {
      const pending = localStorage.getItem('sena_pending_sheet_sync');
      if (pending && token) {
        try {
          const parsed = JSON.parse(pending);
          if (parsed.record) {
            syncApprenticeAutomatically(parsed.record, token).then((res) => {
              if (res.success) {
                setSyncStatus({
                  state: 'synced',
                  message: res.message,
                  lastSyncedAt: res.timestamp,
                });
              }
            });
          }
        } catch (e) {
          // ignore
        }
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
  
  // Handlers
  const handleToggleDarkMode = () => {
    setIsBlurTransitioning(true);
    setIsDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 550);
  };
  
  // Conditional rendering
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!userProfile) return <LandingPage />;



  // Helper to build current ApprenticeSheetRecord
  const buildCurrentSheetRecord = (
    updatedModules?: string[],
    updatedScenarios?: string[],
    updatedScore?: number,
    updatedPassed?: boolean,
    updatedXp?: number,
    updatedProfile?: ApprenticeProfile
  ): ApprenticeSheetRecord => {
    const prof = updatedProfile || profile;
    const modCount = updatedModules ? updatedModules.length : completedModuleIds.length;
    const scenCount = updatedScenarios ? updatedScenarios.length : completedScenarioIds.length;
    const sc = updatedScore !== undefined ? updatedScore : examScore;
    const isPass = updatedPassed !== undefined ? updatedPassed : examPassed;
    const xp = updatedXp !== undefined ? updatedXp : totalXp;

    const verificationCode = `SENA-IND-${new Date().getFullYear()}-${prof.fichaNumber || '2874102'}-${Math.abs(
      (prof.docNumber || '102030').split('').reduce((acc, c) => acc + c.charCodeAt(0), 1337)
    ).toString(16).toUpperCase()}`;

    return {
      timestamp: new Date().toLocaleString('es-CO'),
      fullName: prof.fullName || 'Aprendiz SENA',
      docType: prof.docType,
      docNumber: prof.docNumber,
      fichaNumber: prof.fichaNumber,
      programName: prof.programName,
      regional: prof.regional,
      centroFormacion: prof.centroFormacion,
      modulesProgress: `${modCount}/${INDUCTION_MODULES.length} (${Math.round(
        (modCount / INDUCTION_MODULES.length) * 100
      )}%)`,
      scenariosProgress: `${scenCount}/${SCENARIO_DILEMMAS.length}`,
      examScore: `${sc}% ${isPass ? '· APROBADO' : '· PENDIENTE'}`,
      totalXp: xp,
      certificationStatus: isPass ? 'CERTIFICADO Y ACREDITADO (40H)' : 'EN CURSO (PROCESO)',
      verificationCode: verificationCode,
      issueDate: new Date().toLocaleDateString('es-CO'),
    };
  };

  // Trigger non-blocking automatic background sync
  const triggerAutoSync = async (
    updatedModules?: string[],
    updatedScenarios?: string[],
    updatedScore?: number,
    updatedPassed?: boolean,
    updatedXp?: number,
    updatedProfile?: ApprenticeProfile
  ) => {
    setSyncStatus((prev) => ({ ...prev, state: 'syncing', message: 'Guardando automáticamente en Sheets...' }));
    const record = buildCurrentSheetRecord(
      updatedModules,
      updatedScenarios,
      updatedScore,
      updatedPassed,
      updatedXp,
      updatedProfile
    );

    try {
      const result = await syncApprenticeAutomatically(record);
      if (result.success) {
        setSyncStatus({
          state: 'synced',
          message: result.message,
          lastSyncedAt: result.timestamp,
        });
      } else if (result.action === 'queued') {
        setSyncStatus({
          state: 'queued',
          message: result.message,
          lastSyncedAt: result.timestamp,
        });
      } else {
        setSyncStatus({
          state: 'error',
          message: result.message,
        });
      }
    } catch (e: unknown) {
      setSyncStatus({
        state: 'error',
        message: e instanceof Error ? e.message : 'Error al sincronizar',
      });
    }
  };



  // Handler for completing a module
  const handleCompleteModule = (moduleId: string, xpReward: number) => {
    if (!completedModuleIds.includes(moduleId)) {
      const updated = [...completedModuleIds, moduleId];
      setCompletedModuleIds(updated);
      const newXp = totalXp + xpReward;
      setTotalXp(newXp);

      // Trigger automatic background sync with updated module list
      triggerAutoSync(updated, undefined, undefined, undefined, newXp);

      // Check badge unlocking
      setBadges((prevBadges) =>
        prevBadges.map((b) => {
          if (moduleId === 'mod-2-derechos' && b.id === 'badge-derechos') {
            return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
          }
          if (moduleId === 'mod-3-deberes' && b.id === 'badge-deberes') {
            return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
          }
          if (moduleId === 'mod-4-prohibiciones' && b.id === 'badge-etica') {
            return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
          }
          if (moduleId === 'mod-5-comite' && b.id === 'badge-debido-proceso') {
            return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
          }
          return b;
        })
      );
    }
  };

  // Handler for completing a scenario
  const handleCompleteScenario = (scenarioId: string, xpEarned: number) => {
    if (!completedScenarioIds.includes(scenarioId)) {
      const updated = [...completedScenarioIds, scenarioId];
      setCompletedScenarioIds(updated);
      const newXp = totalXp + xpEarned;
      setTotalXp(newXp);

      // Trigger automatic background sync with updated scenarios list
      triggerAutoSync(undefined, updated, undefined, undefined, newXp);
    }
  };

  // Handler for passing exam
  const handleExamPassed = (score: number, totalQuestions: number) => {
    setExamPassed(true);
    setExamScore(score);
    const newXp = totalXp + 300;
    setTotalXp(newXp);

    // Trigger automatic background sync with approved exam
    triggerAutoSync(undefined, undefined, score, true, newXp);

    setBadges((prevBadges) =>
      prevBadges.map((b) =>
        b.id === 'badge-certificado'
          ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() }
          : b
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300 relative">
      {/* Screen Blur Overlay Effect when Toggling Dark Mode */}
      {isBlurTransitioning && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-xl bg-slate-900/20 dark:bg-black/30 animate-screen-blur"
          aria-hidden="true"
        />
      )}

      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        apprentice={profile}
        role={userProfile?.role || 'apprentice'}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        totalXp={totalXp}
        isCertified={examPassed}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        syncStatus={syncStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Banner with Structured Plan Quick Access */}
        <div className="mb-6 p-3.5 bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 dark:from-emerald-950 dark:via-slate-900 dark:to-slate-950 rounded-xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs print:hidden border border-emerald-700/30">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
              SENA
            </span>
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-white">Programa de Inducción Formativa 2025 - 2026: </span>
              <span className="text-emerald-200 dark:text-emerald-300">
                Basado en el Reglamento del Aprendiz (Acuerdo 0009 de 2024) y Ley 2466 de 2025 · 40 Horas Certificables
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <ListChecks className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ver Plan Estructurado</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Inicio / Hero Dashboard */}
        {currentTab === 'inicio' && (
          <HeroOverview
            apprentice={profile}
            completedModulesCount={completedModuleIds.length}
            totalModulesCount={INDUCTION_MODULES.length}
            completedScenariosCount={completedScenarioIds.length}
            totalScenariosCount={SCENARIO_DILEMMAS.length}
            examPassed={examPassed}
            totalXp={totalXp}
            badges={badges}
            onStartInduction={() => setCurrentTab('modulos')}
            onGoToExam={() => setCurrentTab(examPassed ? 'certificado' : 'examen')}
            onExploreRegulations={() => setCurrentTab('reglamento')}
            onPreviewCertificate={() => setCurrentTab('certificado')}
            onGoToSheets={() => setCurrentTab('sheets')}
            onGoToExpress={() => setCurrentTab('express')}
          />
        )}

        {/* Tab 2: Módulos de Inducción */}
        {currentTab === 'modulos' && (
          <ModuleViewer
            modules={INDUCTION_MODULES}
            completedModuleIds={completedModuleIds}
            onCompleteModule={handleCompleteModule}
            onGoToSimulator={() => setCurrentTab('casos')}
          />
        )}

        {/* Tab 3: Explorador de Reglamento */}
        {currentTab === 'reglamento' && <RegulationExplorer />}

        {/* Tab 4: Simulador de Casos Éticos */}
        {currentTab === 'casos' && (
          <DilemmaSimulator
            completedScenarioIds={completedScenarioIds}
            onCompleteScenario={handleCompleteScenario}
            onGoToExam={() => setCurrentTab('examen')}
          />
        )}

        {/* Tab 5: Examen de Certificación */}
        {currentTab === 'examen' && (
          <KnowledgeExam
            examPassed={examPassed}
            onExamPassed={handleExamPassed}
            onViewCertificate={() => setCurrentTab('certificado')}
            onGoToExpress={() => setCurrentTab('express')}
          />
        )}

        {/* Tab: Calificador Express con Confeti y Efecto de Rayos */}
        {currentTab === 'express' && (
          <ExpressGraderView
            onEarnXp={(amount) => setTotalXp((prev) => prev + amount)}
            onGoToRegulations={() => setCurrentTab('reglamento')}
            onGoToCertificate={() => setCurrentTab('certificado')}
          />
        )}

        {/* Tab 6: Certificado Oficial */}
        {currentTab === 'certificado' && (
          <CertificateView
            apprentice={profile}
            totalXp={totalXp}
            examScore={examScore}
            isExamPassed={examPassed}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onGoToExam={() => setCurrentTab('examen')}
            onGoToSheets={() => setCurrentTab('sheets')}
          />
        )}

        {/* Tab 7: Google Drive & Sheets Sync */}
        {currentTab === 'sheets' && (
          <GoogleSheetsSyncView
            apprentice={profile}
            completedModulesCount={completedModuleIds.length}
            totalModulesCount={INDUCTION_MODULES.length}
            completedScenariosCount={completedScenarioIds.length}
            totalScenariosCount={SCENARIO_DILEMMAS.length}
            examScore={examScore}
            examPassed={examPassed}
            totalXp={totalXp}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            syncStatus={syncStatus}
            onTriggerAutoSync={() => triggerAutoSync()}
          />
        )}

        {/* Tab 8: Guía y Asesoría */}
        {currentTab === 'asistente' && <RegulationsAssistant />}
      </main>

      {/* Plan Estructurado Modal */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in print:hidden">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold">Plan Estructurado de Inducción y Capacitación SENA</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Ruta pedagógica y de gamificación diseñada para la apropiación del reglamento
                </p>
              </div>
              <button
                onClick={() => setIsPlanModalOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 space-y-1">
                <strong className="font-bold">Objetivo General:</strong>
                <p>
                  Garantizar que todo aprendiz comprenda sus garantías constitucionales, deberes éticos, régimen disciplinario y alternativas de etapa productiva mediante una experiencia inmersiva, interactiva y certificable de 40 horas.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-emerald-600 pl-4 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Fase 1: Identidad Institucional y Enfoque Diferencial (Módulo 1)</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Apropiación de la misión, símbolos y valores SENA bajo el marco del Acuerdo 0009 de 2024. Inclusión con enfoque diferencial, ajustes razonables y ruta de Bienestar al Aprendiz.
                  </p>
                </div>

                <div className="border-l-2 border-blue-600 pl-4 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Fase 2: Dominio de Derechos Fundamentales (Módulo 2)</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Capítulo II del Acuerdo 0009 de 2024: Derecho a la formación integral, retroalimentación oportuna en Zajuna, ambientes tecnológicos y derecho fundamental al Plan de Mejoramiento Formativo antes de cualquier sanción.
                  </p>
                </div>

                <div className="border-l-2 border-amber-600 pl-4 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Fase 3: Deberes, Asistencia y Novedades (Módulo 3)</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Capítulo III y IV: Acta de compromiso, cumplimiento de evidencias en Zajuna, carné, EPP, la regla de 3 días hábiles para justificar inasistencias y el nuevo trámite formal de Reingreso.
                  </p>
                </div>

                <div className="border-l-2 border-rose-600 pl-4 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Fase 4: Prohibiciones, Ética Digital e Inteligencia Artificial (Módulo 4)</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Capítulo VI: Tipificación de faltas (Académicas vs. Disciplinarias). Regulación del uso ético y citación de Inteligencia Artificial (IA), prevención del plagio y ciberacoso.
                  </p>
                </div>

                <div className="border-l-2 border-purple-600 pl-4 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Fase 5: Etapa Productiva 2025 y Debido Proceso (Módulo 5 + Simulador)</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Capítulo V, VII y VIII: Ley 2466 de 2025 (75% SMMLV en lectiva y 100% en productiva con prestaciones sociales), prácticas en Economía Popular y Campesina, Comité de Evaluación con enfoque restaurativo y Recurso de Reposición (5 días hábiles).
                  </p>
                </div>

                <div className="border-l-2 border-emerald-700 pl-4 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Fase 6: Evaluación de Certificación y Emisión Oficial</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Examen de 10 preguntas con umbral mínimo de 80%. Generación del Certificado de Inducción con código de verificación QR, firmas de Subdirección y herramienta de validación en tiempo real.
                  </p>
                </div>

                <div className="border-l-2 border-teal-600 pl-4 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Fase 7: Almacenamiento Centralizado en Google Drive & Sheets</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Estructura de datos para registrar automáticamente en una hoja de cálculo institucional de Google Drive: perfil del aprendiz, ficha, progreso de módulos, dilemas resueltos, nota de examen, código hash y estado de acreditación con confirmación previa del usuario.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-5 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apprentice Profile Modal */}
      <ApprenticeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={(updated) => {
          setProfile(updated);
          triggerAutoSync(undefined, undefined, undefined, undefined, undefined, updated);
        }}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-12 text-center text-xs text-slate-500 dark:text-slate-400 print:hidden transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-800 dark:text-emerald-400">SENA</span>
            <span>·</span>
            <span>Servicio Nacional de Aprendizaje — Colombia</span>
          </div>
          <div>
            Prototipo de Inducción Gamificada y Formación en el Reglamento del Aprendiz (Acuerdo 0009 de 2024 y Ley 2466 de 2025)
          </div>
        </div>
      </footer>
    </div>
  );
}
