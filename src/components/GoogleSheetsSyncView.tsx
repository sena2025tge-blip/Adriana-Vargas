import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  LogOut,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Info,
  Users,
  Search,
  Sparkles,
  Lock,
  Copy,
  Check,
  Download,
  Link as LinkIcon,
  Edit2,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  findOrCreateApprenticesSpreadsheet,
  appendApprenticeToSheet,
  upsertApprenticeToSheet,
  syncApprenticeAutomatically,
  fetchApprenticesFromSheet,
  SPREADSHEET_TITLE,
  SHEET_TAB_NAME,
} from '../services/googleSheetsService';
import { ApprenticeProfile, ApprenticeSheetRecord, GoogleSheetSyncInfo } from '../types/induction';

const DEFAULT_OFFICIAL_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing';

interface Props {
  apprentice: ApprenticeProfile;
  completedModulesCount: number;
  totalModulesCount: number;
  completedScenariosCount: number;
  totalScenariosCount: number;
  examScore: number;
  examPassed: boolean;
  totalXp: number;
  onOpenProfile: () => void;
  syncStatus?: {
    state: 'idle' | 'syncing' | 'synced' | 'error' | 'queued';
    message: string;
    lastSyncedAt?: string;
  };
  onTriggerAutoSync?: () => void;
}

export const GoogleSheetsSyncView: React.FC<Props> = ({
  apprentice,
  completedModulesCount,
  totalModulesCount,
  completedScenariosCount,
  totalScenariosCount,
  examScore,
  examPassed,
  totalXp,
  onOpenProfile,
  syncStatus,
  onTriggerAutoSync,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [sheetInfo, setSheetInfo] = useState<GoogleSheetSyncInfo | null>(() => {
    const saved = localStorage.getItem('sena_google_sheet_info');
    return saved ? JSON.parse(saved) : null;
  });

  const [customSheetUrl, setCustomSheetUrl] = useState<string>(() => {
    const saved = localStorage.getItem('sena_custom_sheet_url');
    return saved || '';
  });

  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrlInput, setTempUrlInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const [sheetRecords, setSheetRecords] = useState<ApprenticeSheetRecord[]>([]);
  const [isLoadingSheet, setIsLoadingSheet] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Confirmation Modal State (MANDATORY for mutating operations)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Generate deterministic verification code
  const verificationCode = `SENA-IND-${new Date().getFullYear()}-${apprentice.fichaNumber || '2874102'}-${Math.abs(
    (apprentice.docNumber || '102030').split('').reduce((acc, c) => acc + c.charCodeAt(0), 1337)
  ).toString(16).toUpperCase()}`;

  const currentRecordToSave: ApprenticeSheetRecord = {
    timestamp: new Date().toLocaleString('es-CO'),
    fullName: apprentice.fullName || 'Aprendiz SENA',
    docType: apprentice.docType,
    docNumber: apprentice.docNumber,
    fichaNumber: apprentice.fichaNumber,
    programName: apprentice.programName,
    regional: apprentice.regional,
    centroFormacion: apprentice.centroFormacion,
    modulesProgress: `${completedModulesCount}/${totalModulesCount} (${Math.round(
      (completedModulesCount / totalModulesCount) * 100
    )}%)`,
    scenariosProgress: `${completedScenariosCount}/${totalScenariosCount}`,
    examScore: `${examScore}% ${examPassed ? '· APROBADO' : '· PENDIENTE'}`,
    totalXp: totalXp,
    certificationStatus: examPassed ? 'CERTIFICADO Y ACREDITADO (40H)' : 'EN CURSO (PROCESO)',
    verificationCode: verificationCode,
    issueDate: new Date().toLocaleDateString('es-CO'),
  };

  const handleSignIn = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        await handleConnectOrCreateSpreadsheet(result.accessToken);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al conectar con Google';
      setAuthError(msg);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    setCurrentUser(null);
    setAccessToken(null);
  };

  const handleConnectOrCreateSpreadsheet = async (token: string) => {
    setIsLoadingSheet(true);
    setAuthError(null);
    try {
      const info = await findOrCreateApprenticesSpreadsheet(token);
      setSheetInfo(info);
      localStorage.setItem('sena_google_sheet_info', JSON.stringify(info));

      // Fetch existing records
      const records = await fetchApprenticesFromSheet(token, info.spreadsheetId);
      setSheetRecords(records);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al vincular Google Sheet';
      setAuthError(msg);
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleRefreshRecords = async () => {
    if (!accessToken || !sheetInfo) return;
    setIsLoadingSheet(true);
    try {
      const records = await fetchApprenticesFromSheet(accessToken, sheetInfo.spreadsheetId);
      setSheetRecords(records);
      setSyncSuccessMsg('Lista de aprendices actualizada desde Google Sheets');
      setTimeout(() => setSyncSuccessMsg(null), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al refrescar datos';
      setAuthError(msg);
    } finally {
      setIsLoadingSheet(false);
    }
  };

  // Trigger confirmation modal first
  const handleOpenSyncConfirmation = () => {
    if (!accessToken || !sheetInfo) {
      setAuthError('Debes iniciar sesión con Google para sincronizar.');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  // Execute after explicit user confirmation
  const handleConfirmSync = async () => {
    if (!accessToken || !sheetInfo) return;
    setIsConfirmModalOpen(false);
    setIsSyncing(true);
    setAuthError(null);
    setSyncSuccessMsg(null);

    try {
      const result = await upsertApprenticeToSheet(accessToken, sheetInfo.spreadsheetId, currentRecordToSave);
      const syncTime = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem(
        'sena_last_auto_sync',
        JSON.stringify({
          timestamp: syncTime,
          action: result.action,
          rowNumber: result.rowNumber,
        })
      );
      setSyncSuccessMsg(
        result.action === 'updated'
          ? `¡Fila ${result.rowNumber} actualizada con éxito en Google Sheets!`
          : `¡Nuevo registro agregado en la fila ${result.rowNumber} de Google Sheets!`
      );

      // Refresh records list
      const records = await fetchApprenticesFromSheet(accessToken, sheetInfo.spreadsheetId);
      setSheetRecords(records);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al guardar en Google Sheets';
      setAuthError(msg);
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredRecords = sheetRecords.filter((rec) => {
    const term = searchTerm.toLowerCase();
    return (
      rec.fullName.toLowerCase().includes(term) ||
      rec.docNumber.toLowerCase().includes(term) ||
      rec.fichaNumber.toLowerCase().includes(term) ||
      rec.verificationCode.toLowerCase().includes(term)
    );
  });

  // Effective sheet link calculation
  const activeSheetUrl =
    sheetInfo?.sheetUrl || customSheetUrl || DEFAULT_OFFICIAL_SHEET_URL;

  const getSpreadsheetIdFromUrl = (url: string): string | null => {
    if (sheetInfo?.spreadsheetId) return sheetInfo.spreadsheetId;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const activeSpreadsheetId = getSpreadsheetIdFromUrl(activeSheetUrl);

  const exportXlsxUrl = activeSpreadsheetId
    ? `https://docs.google.com/spreadsheets/d/${activeSpreadsheetId}/export?format=xlsx`
    : activeSheetUrl;

  const exportCsvUrl = activeSpreadsheetId
    ? `https://docs.google.com/spreadsheets/d/${activeSpreadsheetId}/export?format=csv`
    : activeSheetUrl;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(activeSheetUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {
      console.error('No se pudo copiar:', err);
    }
  };

  const handleSaveCustomUrl = () => {
    const trimmed = tempUrlInput.trim();
    if (!trimmed) {
      setCustomSheetUrl('');
      localStorage.removeItem('sena_custom_sheet_url');
      setIsEditingUrl(false);
      return;
    }
    setCustomSheetUrl(trimmed);
    localStorage.setItem('sena_custom_sheet_url', trimmed);
    setIsEditingUrl(false);
    setSyncSuccessMsg('Enlace de la hoja de cálculo personalizado guardado con éxito.');
    setTimeout(() => setSyncSuccessMsg(null), 3500);
  };

  const handleResetToDefault = () => {
    setCustomSheetUrl('');
    localStorage.removeItem('sena_custom_sheet_url');
    setIsEditingUrl(false);
    setSyncSuccessMsg('Enlace restablecido a la plantilla oficial de Google Sheets.');
    setTimeout(() => setSyncSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Almacenamiento en Google Drive & Sheets
              </span>
              <span className="text-xs text-slate-500 font-mono">Acuerdo 0009 de 2024</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Gestión Centralizada de Aprendices en Google Sheets
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
              Almacena automáticamente los datos de los aprendices, sus avances en los módulos de inducción,
              el cumplimiento de derechos y deberes, y las constancias de certificación directamente en una
              hoja de cálculo de Google Drive con acceso seguro y compartido.
            </p>
          </div>

          {/* Google Auth Status Widget */}
          <div className="shrink-0 w-full lg:w-auto">
            {currentUser && accessToken ? (
              <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Google User'}
                      className="w-10 h-10 rounded-full border border-emerald-400"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      {currentUser.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-semibold text-emerald-950 dark:text-emerald-200">
                      {currentUser.displayName || 'Cuenta Conectada'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-[200px]">
                      {currentUser.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  title="Cerrar sesión de Google"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={isLoadingAuth}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-white rounded-xl font-medium text-sm shadow-xs hover:shadow-md transition-all duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isLoadingAuth ? 'Conectando...' : 'Iniciar Sesión con Google'}</span>
              </button>
            )}
          </div>
        </div>

        {authError && (
          <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong>Error:</strong> {authError}
            </div>
          </div>
        )}

        {syncSuccessMsg && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>{syncSuccessMsg}</div>
          </div>
        )}
      </div>

      {/* SECCIÓN DESTACADA: ENLACE DIRECTO DE LA HOJA DE CÁLCULO */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 dark:from-emerald-950/50 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-7 rounded-2xl border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-emerald-200/70 dark:border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  Enlace Oficial de la Hoja
                </span>
                {sheetInfo ? (
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    Sincronizada con Google Drive
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    Plantilla / Registro Central
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                Enlace Directo de la Hoja de Cálculo (Google Sheets)
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setTempUrlInput(activeSheetUrl);
                setIsEditingUrl(!isEditingUrl);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{isEditingUrl ? 'Cancelar Edición' : 'Vincular otra Hoja'}</span>
            </button>

            {activeSpreadsheetId && (
              <>
                <a
                  href={exportXlsxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Descargar en formato Excel (.xlsx)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar .xlsx</span>
                </a>
                <a
                  href={exportCsvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  title="Descargar en formato CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </a>
              </>
            )}
          </div>
        </div>

        {/* Formulario de URL personalizada si está activo */}
        {isEditingUrl && (
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 animate-fade-in">
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4 text-emerald-600" />
              <span>Personalizar enlace o vincular Google Sheet institucional existente:</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={tempUrlInput}
                onChange={(e) => setTempUrlInput(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/TU_ID_AQUI/edit..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="button"
                onClick={handleSaveCustomUrl}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Guardar Enlace
              </button>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="px-3 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors"
              >
                Restaurar Predeterminado
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Pega aquí el enlace de cualquier hoja de cálculo de Google Sheets con permisos de lectura o edición.
            </p>
          </div>
        )}

        {/* Input con la URL directa, Botón de Copiar y Botón de Abrir */}
        <div className="mt-4 space-y-3">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>URL de acceso web a la hoja de cálculo:</span>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
              Pestaña: {SHEET_TAB_NAME}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            {/* Box con URL */}
            <div className="flex-1 flex items-center bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 overflow-hidden shadow-inner">
              <LinkIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mr-2" />
              <input
                type="text"
                readOnly
                value={activeSheetUrl}
                className="w-full bg-transparent font-mono text-xs text-slate-800 dark:text-emerald-200 focus:outline-none select-all truncate"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
            </div>

            {/* Botón Copiar */}
            <button
              onClick={handleCopyLink}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 ${
                copiedLink
                  ? 'bg-emerald-700 text-white shadow-emerald-500/20'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white'
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>Copiar Enlace</span>
                </>
              )}
            </button>

            {/* Botón Abrir Directamente en Google Sheets */}
            <a
              href={activeSheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir en Google Sheets</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>
                Acceso en línea para instructores, aprendices y coordinadores académicos.
              </span>
            </div>
            {activeSpreadsheetId && (
              <span className="font-mono text-[10px] text-slate-400">
                ID: {activeSpreadsheetId}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Control Panel: Active Sheet Info & Sync Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Spreadsheet Details & Sync Action */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Linked Spreadsheet */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Hoja de Cálculo en Google Drive
              </h2>
              {sheetInfo && (
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Conectada
                </span>
              )}
            </div>

            {sheetInfo ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5">
                  <div className="text-slate-500 dark:text-slate-400">Título del Documento:</div>
                  <div className="font-semibold text-slate-900 dark:text-white break-words">
                    {sheetInfo.spreadsheetTitle}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 pt-1">Pestaña Principal:</div>
                  <div className="font-mono text-emerald-700 dark:text-emerald-400">{SHEET_TAB_NAME}</div>
                  <div className="text-slate-500 dark:text-slate-400 pt-1">ID en Google Drive:</div>
                  <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400 break-all">
                    {sheetInfo.spreadsheetId}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <a
                    href={sheetInfo.sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Abrir en Google Sheets</span>
                  </a>
                  <button
                    onClick={handleRefreshRecords}
                    disabled={isLoadingSheet}
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium transition-colors disabled:opacity-50"
                    title="Actualizar datos desde Google Sheets"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheet ? 'animate-spin' : ''}`} />
                    <span>Actualizar</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 text-center rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
                <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto" />
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Inicia sesión con Google para crear o enlazar automáticamente la hoja de cálculo institucional en tu Google Drive.
                </div>
              </div>
            )}
          </div>

          {/* Card: Current Apprentice Data to Store */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Ficha del Aprendiz Activo
              </h3>
              <button
                onClick={onOpenProfile}
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
              >
                Editar Perfil
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Nombre:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{apprentice.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Documento:</span>
                <span className="font-mono text-slate-900 dark:text-white">
                  {apprentice.docType} {apprentice.docNumber}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Ficha:</span>
                <span className="font-mono text-slate-900 dark:text-white">{apprentice.fichaNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Módulos Aprobados:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {completedModulesCount} de {totalModulesCount}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Casos Éticos:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {completedScenariosCount} de {totalScenariosCount}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Puntaje Evaluación:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{examScore}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Estado Certificación:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    examPassed
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {examPassed ? 'ACREDITADO' : 'EN PROCESO'}
                </span>
              </div>
            </div>

            {/* Auto-Sync Status Info Box */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Sincronización Automática: ACTIVA</span>
              </div>
              <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
                El avance se actualiza automáticamente en segundo plano (con lógica inteligente de no duplicación) al aprobar módulos, casos y evaluación.
              </p>
              {syncStatus?.lastSyncedAt && (
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 pt-0.5">
                  Última sincronización automática: {syncStatus.lastSyncedAt}
                </div>
              )}
            </div>

            {/* Manual Sync Trigger Button */}
            <button
              onClick={handleOpenSyncConfirmation}
              disabled={isSyncing || !currentUser || !sheetInfo}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UploadCloud className={`w-4 h-4 ${isSyncing ? 'animate-bounce' : ''}`} />
              <span>
                {isSyncing
                  ? 'Actualizando en Google Sheets...'
                  : 'Forzar Sincronización Manual Inmediata'}
              </span>
            </button>
            <p className="text-[11px] text-slate-400 text-center">
              Actualiza la fila del aprendiz en tiempo real utilizando búsqueda por documento.
            </p>
          </div>
        </div>

        {/* Right Column: Live Table of Saved Apprentices */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Aprendices Registrados en la Hoja ({filteredRecords.length})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visualización sincronizada en tiempo real con Google Sheets
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar aprendiz o ficha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Aprendiz</th>
                  <th className="py-2.5 px-3">Documento / Ficha</th>
                  <th className="py-2.5 px-3">Progreso</th>
                  <th className="py-2.5 px-3">Nota</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3">Código Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((rec, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-900 dark:text-white">{rec.fullName}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{rec.programName}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                        <div>{rec.docType} {rec.docNumber}</div>
                        <div className="text-[10px] text-slate-400">Ficha: {rec.fichaNumber}</div>
                      </td>
                      <td className="py-2.5 px-3 text-[11px]">
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                          {rec.modulesProgress}
                        </span>
                        <div className="text-[10px] text-slate-400">Casos: {rec.scenariosProgress}</div>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                        {rec.examScore}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            rec.certificationStatus.includes('CERTIFICADO')
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {rec.certificationStatus.includes('CERTIFICADO') ? 'CERTIFICADO' : 'EN CURSO'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500 break-all">
                        {rec.verificationCode}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400 space-y-2">
                      <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                      <div className="text-xs">
                        {sheetInfo
                          ? 'No hay registros en la hoja aún. Pulsa "Almacenar / Sincronizar Aprendiz en Drive" para guardar el primer registro.'
                          : 'Conecta tu cuenta de Google arriba para ver la hoja de cálculo.'}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2">
            <div>Estructura oficial alineada con el Sistema de Gestión SENA.</div>
            {sheetInfo && (
              <a
                href={sheetInfo.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Descargar en Excel o CSV desde Google Drive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* MANDATORY USER CONFIRMATION MODAL FOR WORKSPACE MUTATION */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Confirmar Guardado en Google Sheets
                  </h3>
                  <p className="text-xs text-slate-500">
                    Se agregará una nueva fila a tu hoja en Google Drive
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="font-semibold text-slate-800 dark:text-slate-200 pb-1 border-b border-slate-200 dark:border-slate-700">
                  Detalles del registro a almacenar:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">Aprendiz:</span>
                    <div className="font-bold text-slate-900 dark:text-white">{currentRecordToSave.fullName}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Identificación:</span>
                    <div className="font-mono">{currentRecordToSave.docType} {currentRecordToSave.docNumber}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Ficha:</span>
                    <div className="font-mono">{currentRecordToSave.fichaNumber}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Programa:</span>
                    <div className="truncate">{currentRecordToSave.programName}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Progreso Inducción:</span>
                    <div className="font-semibold text-emerald-600">{currentRecordToSave.modulesProgress}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Calificación:</span>
                    <div className="font-semibold">{currentRecordToSave.examScore}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Estado:</span>
                    <div className="font-bold text-emerald-700">{currentRecordToSave.certificationStatus}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Código Verificación:</span>
                    <div className="font-mono text-[10px] truncate">{currentRecordToSave.verificationCode}</div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                ¿Deseas confirmar la escritura en la hoja <strong>"{SPREADSHEET_TITLE}"</strong> en tu Google Drive?
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSync}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors flex items-center gap-2"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Confirmar y Guardar en Drive</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
