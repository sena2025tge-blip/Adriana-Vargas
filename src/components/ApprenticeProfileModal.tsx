import React, { useState } from 'react';
import { X, Check, Building2, BookOpen, Hash, CreditCard } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onSave: (updated: ApprenticeProfile) => void;
}

const REGIONALES = [
  'Distrito Capital',
  'Antioquia',
  'Valle del Cauca',
  'Santander',
  'Atlántico',
  'Cundinamarca',
  'Boyacá',
  'Caldas',
  'Risaralda',
  'Tolima',
  'Huila',
  'Bolívar',
  'Nariño',
  'Norte de Santander',
  'Córdoba',
  'Meta',
  'Cesar',
  'Magdalena',
  'Sucre',
  'Cauca',
  'Quindío',
  'Chocó',
  'Casanare',
  'Amazonas',
  'Arauca',
  'Guainía',
  'Guaviare',
  'La Guajira',
  'Putumayo',
  'San Andrés y Providencia',
  'Vaupés',
  'Vichada'
];

const PROGRAMAS_COMUNES = [
  'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  'Tecnología en Gestión Empresarial',
  'Tecnología en Mantenimiento Mecatrónico',
  'Tecnología en Animación Digital y 3D',
  'Tecnología en Gestión de Redes de Datos',
  'Técnico en Programación de Software',
  'Técnico en Contabilización de Operaciones Comerciales y Financieras',
  'Técnico en Sistemas e Instalación de Redes',
  'Técnico en Asistencia Administrativa',
  'Técnico en Cocina y Servicios Gastronómicos',
  'Tecnología en Gestión Logística'
];

export const ApprenticeProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>(profile);
  const [isCustomProgram, setIsCustomProgram] = useState(!PROGRAMAS_COMUNES.includes(profile.programName));

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-800 to-emerald-950 text-white flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Ficha y Datos del Aprendiz</h2>
            <p className="text-xs text-emerald-200 mt-0.5">
              Esta información se plasmará en tu Certificado Oficial de Inducción SENA
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Nombre Completo del Aprendiz
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Ej: Laura Camila Rodríguez Pérez"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Tipo Documento
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <select
                  value={formData.docType}
                  onChange={(e) => setFormData({ ...formData, docType: e.target.value as ApprenticeProfile['docType'] })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                >
                  <option value="CC">Cédula de Ciudadanía (CC)</option>
                  <option value="TI">Tarjeta de Identidad (TI)</option>
                  <option value="CE">Cédula de Extranjería (CE)</option>
                  <option value="PPT">Permiso por Protección Temporal (PPT)</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Número de Documento
              </label>
              <input
                type="text"
                required
                value={formData.docNumber}
                onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                placeholder="Ej: 1025894123"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Número de Ficha
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={formData.fichaNumber}
                  onChange={(e) => setFormData({ ...formData, fichaNumber: e.target.value })}
                  placeholder="Ej: 2874102"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Regional SENA
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <select
                  value={formData.regional}
                  onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                >
                  {REGIONALES.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Programa de Formación
              </label>
              <button
                type="button"
                onClick={() => setIsCustomProgram(!isCustomProgram)}
                className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
              >
                {isCustomProgram ? 'Elegir de lista frecuente' : 'Escribir otro programa'}
              </button>
            </div>

            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
              {isCustomProgram ? (
                <input
                  type="text"
                  required
                  value={formData.programName}
                  onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                  placeholder="Ej: Tecnólogo en Biotecnología Industrial"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                />
              ) : (
                <select
                  value={formData.programName}
                  onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                >
                  {PROGRAMAS_COMUNES.map((prog) => (
                    <option key={prog} value={prog}>{prog}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Centro de Formación Profesional
            </label>
            <input
              type="text"
              required
              value={formData.centroFormacion}
              onChange={(e) => setFormData({ ...formData, centroFormacion: e.target.value })}
              placeholder="Ej: Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <Check className="w-4 h-4" /> Guardar Información
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
