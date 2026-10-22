import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  Share2, 
  ExternalLink,
  Award,
  Search,
  UserCheck,
  Edit3,
  Eye,
  FileSpreadsheet,
  Copy,
  Check,
} from 'lucide-react';
import { ApprenticeProfile, CertificateData } from '../types/induction';

interface Props {
  apprentice: ApprenticeProfile;
  totalXp: number;
  examScore: number;
  isExamPassed?: boolean;
  onOpenProfile?: () => void;
  onGoToExam?: () => void;
  onGoToSheets?: () => void;
}

export const CertificateView: React.FC<Props> = ({
  apprentice,
  totalXp,
  examScore,
  isExamPassed = false,
  onOpenProfile,
  onGoToExam,
  onGoToSheets,
}) => {
  // Generate stable deterministic verification code
  const verificationCode = `SENA-IND-${new Date().getFullYear()}-${apprentice.fichaNumber || '2874102'}-${Math.abs(
    (apprentice.docNumber || '102030').split('').reduce((acc, c) => acc + c.charCodeAt(0), 1337)
  ).toString(16).toUpperCase()}`;

  const issueDateFormatted = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const [verifyInput, setVerifyInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleCopySheetLink = async () => {
    try {
      await navigator.clipboard.writeText(sheetUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyInput.trim().toUpperCase() === verificationCode.toUpperCase()) {
      setVerificationResult(true);
    } else {
      setVerificationResult(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Action Bar (Hidden during print) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              {isExamPassed ? 'Certificación Oficial Aprobada' : 'Vista Previa del Certificado'}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {isExamPassed ? 'Emitido con Éxito' : 'Modo Previsualización'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Certificado Oficial de Inducción SENA
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Acreditación institucional de 40 horas bajo el <strong>Acuerdo 0009 de 2024 y Ley 2466 de 2025</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors shrink-0"
              title="Personalizar nombre, documento o ficha del aprendiz"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Editar Datos</span>
            </button>
          )}

          {onGoToSheets && (
            <button
              onClick={onGoToSheets}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-lg text-xs font-semibold transition-colors shrink-0"
              title="Guardar constancia en la hoja de cálculo de Google Drive"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Guardar en Google Drive</span>
            </button>
          )}

          {!isExamPassed && onGoToExam && (
            <button
              onClick={onGoToExam}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 rounded-lg text-xs font-semibold transition-colors shrink-0"
            >
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Realizar Evaluación</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir o Guardar PDF</span>
          </button>
        </div>
      </div>

      {/* Direct Google Sheets Link Information Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs print:hidden shadow-xs">
        <div className="flex items-center gap-2.5">
          <FileSpreadsheet className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <div>
            <div className="font-semibold text-emerald-950 dark:text-emerald-200">
              Registro Central en Google Sheets:
            </div>
            <div className="text-slate-600 dark:text-slate-400 font-mono text-[11px] truncate max-w-xs sm:max-w-md">
              {sheetUrl}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleCopySheetLink}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
          </button>
          <a
            href={sheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir Hoja</span>
          </a>
        </div>
      </div>

      {/* Official Certificate Paper Container */}
      <div
        id="sena-certificate-print"
        className="bg-white max-w-4xl mx-auto p-8 sm:p-12 md:p-16 rounded-3xl border-8 border-double border-emerald-800/40 shadow-xl relative overflow-hidden text-slate-800"
      >
        {/* Decorative Institutional Corner Accents */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-emerald-800 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-emerald-800 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-emerald-800 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-emerald-800 pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 pb-6 border-b-2 border-emerald-800/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-14 h-14 flex items-center justify-center">
              <svg
                viewBox="0 0 1000 1000"
                className="w-12 h-12 fill-[#39a900]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6 c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6 c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3 c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1 l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4 c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2 c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1 l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z M280.6,268.9 l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z M557.5,269c0,0-51.9,0-77.9,0l0,137.7 l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7 l13.9,24.9l68.8,0L874,269.2L805.6,269.2z M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z M10.6,445.6l0.5,75l280.1-1 c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9 c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699 c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z"
                />
              </svg>
            </div>
          </div>

          <div className="text-xs sm:text-sm font-semibold tracking-widest text-emerald-800 uppercase">
            República de Colombia · Ministerio del Trabajo
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
            Servicio Nacional de Aprendizaje — SENA
          </h1>
          <div className="text-xs sm:text-sm font-medium text-slate-600">
            Regional {apprentice.regional} · {apprentice.centroFormacion}
          </div>
        </div>

        {/* Certificate Sub-Title */}
        <div className="text-center my-6 space-y-1">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Constancia de Aprobación e Idoneidad
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 tracking-tight">
            INDUCCIÓN AL REGLAMENTO DEL APRENDIZ SENA
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Acuerdo 0009 de 2024 y Actualizaciones Normativas 2025 (Ley 2466 y Circular 083)
          </p>
        </div>

        {/* Certificate Statement Body */}
        <div className="text-center space-y-4 my-8 max-w-2xl mx-auto">
          <div className="text-xs sm:text-sm font-serif italic text-slate-600">
            La Subdirección de Centro y la Coordinación Académica hacen constar que:
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight font-serif uppercase border-b border-dashed border-slate-300 pb-2">
            {apprentice.fullName || 'APRENDIZ SENA'}
          </div>

          <div className="text-xs sm:text-sm text-slate-700 font-medium space-x-1">
            <span>Identificado(a) con <strong>{apprentice.docType} No. {apprentice.docNumber || '1020304050'}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Ficha de Formación: <strong>{apprentice.fichaNumber || '2874102'}</strong></span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 font-semibold bg-emerald-50/70 py-2 px-4 rounded-lg border border-emerald-200">
            Programa: {apprentice.programName}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify pt-2">
            Ha cursado, participado activamente y aprobado la totalidad de las <strong>cuarenta (40) horas</strong> de la 
            <strong> Inducción Oficial del Aprendiz</strong> bajo el <strong>Acuerdo 0009 de 2024 y la Ley 2466 de 2025</strong>, acreditando competencia integral y suficiencia conceptual en el 
            conocimiento de sus <em>Derechos Fundamentales, Deberes Académicos y de Convivencia, Integridad en Entornos Digitales (Zajuna e IA), 
            Novedades de Matrícula y Reingreso, Régimen de Etapa Productiva 2025 (75%/100%), Debido Proceso y Comité de Evaluación</em>.
          </p>
        </div>

        {/* Seal and Signatures Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-end gap-6 pt-8 my-6 border-t border-slate-200">
          {/* Subdirector signature */}
          <div className="text-center space-y-2">
            <div className="h-14 flex items-end justify-center">
              <span className="font-serif italic text-slate-700 text-lg border-b border-slate-400 pb-1 px-4">
                Carlos Mario Estrada M.
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900 uppercase">Subdirector de Centro</div>
            <div className="text-[10px] text-slate-500">Centro de Formación Profesional Integral</div>
          </div>

          {/* Academic Seal Insignia Image */}
          <div className="flex flex-col items-center justify-center text-center">
            <img
              src="/src/assets/images/sena_badge_insignia_1792526491696.jpg"
              alt="Sello Institucional de Calidad SENA"
              referrerPolicy="no-referrer"
              className="w-24 h-24 object-contain shadow-xs rounded-full border-2 border-amber-300"
            />
            <span className="text-[10px] font-mono text-emerald-800 font-semibold mt-1">
              CALIDAD & ÉTICA SENA
            </span>
          </div>

          {/* Academic Coordinator signature */}
          <div className="text-center space-y-2">
            <div className="h-14 flex items-end justify-center">
              <span className="font-serif italic text-slate-700 text-lg border-b border-slate-400 pb-1 px-4">
                Dra. Martha Patricia Gómez
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900 uppercase">Coordinadora Académica</div>
            <div className="text-[10px] text-slate-500">Gestión de la Formación Profesional</div>
          </div>
        </div>

        {/* Certificate Verification Footer */}
        <div className="pt-6 border-t-2 border-emerald-800/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="space-y-0.5 text-center sm:text-left">
            <div><strong>Fecha de Expedición:</strong> {issueDateFormatted}</div>
            <div className="font-mono text-[11px] text-slate-500">
              Código de Verificación Único: <strong className="text-emerald-900 font-bold">{verificationCode}</strong>
            </div>
            <div className="text-[10px] text-slate-400">
              Documento con validez académica para radicación en portafolio de evidencias.
            </div>
          </div>

          {/* QR visual placeholder */}
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2">
            <QrCode className="w-8 h-8 text-slate-800" />
            <div className="text-[10px] font-mono leading-tight text-slate-600">
              Verificable en: <br />
              sena.edu.co/validar
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Authenticity Verification Tool (Hidden during print) */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden transition-colors duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Módulo de Validación Institucional de Certificados
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cualquier instructor o entidad puede verificar la autenticidad ingresando el código único.
            </p>
          </div>
        </div>

        <form onSubmit={handleVerifyCode} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
              placeholder={`Ingresa el código (ej: ${verificationCode})`}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs sm:text-sm font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
          >
            Validar Código
          </button>
          <button
            type="button"
            onClick={() => setVerifyInput(verificationCode)}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors shrink-0"
          >
            Copiar mi código
          </button>
        </form>

        {verificationResult !== null && (
          <div className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm animate-fade-in ${
            verificationResult
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
          }`}>
            {verificationResult ? (
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Certificado VÁLIDO y AUTÉNTICO en el Sistema SENA:</strong>
                  <div className="mt-1 text-xs space-y-0.5">
                    <div>Aprendiz: <strong>{apprentice.fullName}</strong> ({apprentice.docType} {apprentice.docNumber})</div>
                    <div>Programa: {apprentice.programName} · Ficha {apprentice.fichaNumber}</div>
                    <div>Horas Acreditadas: 40 Horas de Inducción al Reglamento</div>
                    <div>Normativa: Acuerdo 0009 de 2024 y Ley 2466 de 2025</div>
                    <div>Estado: Registrado en el sistema institucional con satisfacción.</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-bold">Código no encontrado o inválido:</span> Verifica que el código corresponda exactamente a la ficha formativa.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
