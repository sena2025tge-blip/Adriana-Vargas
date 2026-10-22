import React from 'react';
import { User, Award, Moon, Sun, FileSpreadsheet, Zap, ExternalLink, RefreshCw, CheckCircle2, Cloud, Info, BookOpen, ShieldCheck, HelpCircle, FileCheck, ListChecks, X } from 'lucide-react';
import { ApprenticeProfile, UserRole } from '../types/induction';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  apprentice: ApprenticeProfile;
  role: UserRole;
  onOpenProfile: () => void;
  totalXp: number;
  isCertified: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  syncStatus?: {
    state: 'idle' | 'syncing' | 'synced' | 'error' | 'queued';
    message: string;
    lastSyncedAt?: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  apprentice,
  role,
  onOpenProfile,
  totalXp,
  isCertified,
  isDarkMode,
  onToggleDarkMode,
  onLogout,
  syncStatus,
}) => {
  const sheetUrl = (() => {
    const saved = localStorage.getItem('sena_google_sheet_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.sheetUrl) return parsed.sheetUrl;
      } catch (e) {
        // ignore
      }
    }
    const custom = localStorage.getItem('sena_custom_sheet_url');
    if (custom) return custom;
    return 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing';
  })();
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0" aria-label="Logo Oficial SENA">
              <svg
                id="Capa_1"
                viewBox="0 0 1000 1000"
                className="w-7 h-7 sm:w-8 sm:h-8 fill-[#39a900] dark:fill-[#39a900] shrink-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="path47-5"
                  d="M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6 c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6 c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3 c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1 l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4 c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2 c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1 l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z M280.6,268.9 l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z M557.5,269c0,0-51.9,0-77.9,0l0,137.7 l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7 l13.9,24.9l68.8,0L874,269.2L805.6,269.2z M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z M10.6,445.6l0.5,75l280.1-1 c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9 c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699 c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z"
                />
              </svg>
            </div>
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('inicio');
              }}
              className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white truncate"
            >
              SENA <span className="text-emerald-600 dark:text-emerald-400 font-semibold hidden sm:inline">· Inducción y Reglamento</span>
            </a>
          </div>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectTab('inicio')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                currentTab === 'inicio' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400' : ''
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              Ruta Formativa
            </button>
            <button
              onClick={() => onSelectTab('modulos')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                currentTab === 'modulos' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400' : ''
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Módulos de Inducción
            </button>
            <button
              onClick={() => onSelectTab('reglamento')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                currentTab === 'reglamento' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400' : ''
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              Explorador del Reglamento
            </button>
            <button
              onClick={() => onSelectTab('casos')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                currentTab === 'casos' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400' : ''
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Simulador de Casos
            </button>
            <button
              onClick={() => onSelectTab('examen')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                currentTab === 'examen' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400' : ''
              }`}
            >
              <ListChecks className="w-3.5 h-3.5" />
              Evaluación
            </button>
            <button
              onClick={() => onSelectTab('express')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                currentTab === 'express' ? 'text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-500' : ''
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Calificador Express</span>
            </button>
            <button
              onClick={() => onSelectTab('certificado')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                currentTab === 'certificado' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400' : ''
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Certificado</span>
            </button>
            {role === 'instructor' && (
              <button
                onClick={() => onSelectTab('sheets')}
                className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                  currentTab === 'sheets' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400' : ''
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Google Sheets</span>
              </button>
            )}
            <button
              onClick={() => onSelectTab('asistente')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                currentTab === 'asistente' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400' : ''
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Guía de Ayuda
            </button>
          </nav>

          {/* Zone 3: Actions + Dark Mode Toggle on Top Right */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap justify-end">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 tabular-nums">{totalXp} XP</span>
              {isCertified && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Certificado
                  </span>
                </>
              )}
            </div>

            {/* Profile Button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Configurar datos del aprendiz"
            >
              <User className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span className="max-w-[110px] sm:max-w-[130px] truncate">{apprentice.fullName || 'Mi Perfil'}</span>
            </button>

            {/* Auto-Sync Status Badge */}
            {syncStatus && syncStatus.state !== 'idle' && (
              <div
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all"
                title={syncStatus.message}
              >
                {syncStatus.state === 'syncing' && (
                  <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800">
                    <RefreshCw className="w-3 h-3 animate-spin text-amber-600 dark:text-amber-400" />
                    <span>Guardando en Sheets...</span>
                  </span>
                )}
                {syncStatus.state === 'synced' && (
                  <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Sheets al día {syncStatus.lastSyncedAt ? `(${syncStatus.lastSyncedAt})` : ''}</span>
                  </span>
                )}
                {syncStatus.state === 'queued' && (
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <Cloud className="w-3 h-3 text-slate-500" />
                    <span>Guardado localmente</span>
                  </span>
                )}
              </div>
            )}

            {/* Direct Google Sheets Link Button */}
            {role === 'instructor' && (
              <a
                href={sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs"
                title="Abrir la hoja de cálculo de Google Sheets en una nueva pestaña"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Ver Hoja Drive</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            )}

            {/* Dark Mode Toggle Button in the Top Right Corner */}
            <button
              onClick={onToggleDarkMode}
              aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
              )}
            </button>
            <button
              onClick={onLogout}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition-colors shrink-0"
              title="Cerrar sesión"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800 no-scrollbar text-xs">
          <button
            onClick={() => onSelectTab('inicio')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'inicio' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Inicio
          </button>
          <button
            onClick={() => onSelectTab('modulos')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'modulos' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Módulos
          </button>
          <button
            onClick={() => onSelectTab('reglamento')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'reglamento' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Reglamento
          </button>
          <button
            onClick={() => onSelectTab('casos')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'casos' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Casos
          </button>
          <button
            onClick={() => onSelectTab('examen')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'examen' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Evaluación
          </button>
          <button
            onClick={() => onSelectTab('express')}
            className={`px-2.5 py-1 rounded whitespace-nowrap flex items-center gap-1 ${currentTab === 'express' ? 'bg-amber-600 text-white font-bold' : 'text-amber-600 dark:text-amber-400'}`}
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>Express</span>
          </button>
          <button
            onClick={() => onSelectTab('certificado')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'certificado' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Certificado
          </button>
          <button
            onClick={() => onSelectTab('sheets')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'sheets' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Google Sheets
          </button>
          <button
            onClick={() => onSelectTab('asistente')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'asistente' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Guía
          </button>
        </div>
      </div>
    </header>
  );
};
