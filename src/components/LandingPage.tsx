import React, { useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { useUser } from './UserProvider';
import { ApprenticeProfile, UserRole } from '../types/induction';
import { ArrowLeft, User, GraduationCap, ChevronRight, Lock, ClipboardList, Play, X } from 'lucide-react';

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg relative border border-slate-100 overflow-y-auto max-h-[90vh]">
    {children}
  </div>
);

export const LandingPage: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { updateUserProfile } = useUser();
  const auth = getAuth();

  const handleInstructorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      
      const user = auth.currentUser;
      if (user) {
        await updateUserProfile({
          uid: user.uid,
          email: 'instructor@sena.edu.co', // Use a placeholder email or just role
          role: 'instructor'
        });
      } else {
        console.error("Could not sign in user");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const [apprenticeData, setApprenticeData] = useState<ApprenticeProfile>({
    fullName: '',
    docType: 'CC',
    docNumber: '',
    programName: '',
    fichaNumber: '',
    regional: '',
    centroFormacion: '',
    startDate: new Date().toISOString(),
  });

  const handleApprenticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      
      const user = auth.currentUser;
      if (user) {
        await updateUserProfile({
          uid: user.uid,
          email: 'apprentice@sena.edu.co',
          role: 'apprentice',
          apprenticeData: apprenticeData
        });
      }
    } catch (error) {
      console.error("Error signing in apprentice:", error);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center p-4">
        <Card>
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-extrabold text-slate-900">Bienvenido al SENA</h1>
            <p className="text-slate-600">Selecciona cómo deseas ingresar a la plataforma de inducción.</p>
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="mx-auto flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
            >
              <Play className="w-4 h-4 fill-emerald-700" />
              Ver video tutorial
            </button>
            <div className="space-y-4">
              <button onClick={() => setRole('instructor')} className="w-full p-6 bg-slate-900 text-white rounded-2xl font-semibold flex items-center justify-between hover:bg-slate-800 transition-all">
                <div className="flex items-center gap-4">
                  <User className="w-6 h-6" />
                  <span>Soy Instructor</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button onClick={() => setRole('apprentice')} className="w-full p-6 bg-emerald-600 text-white rounded-2xl font-semibold flex items-center justify-between hover:bg-emerald-500 transition-all">
                <div className="flex items-center gap-4">
                  <GraduationCap className="w-6 h-6" />
                  <span>Soy Aprendiz</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-4 w-full max-w-4xl shadow-2xl relative">
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-slate-200"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-2xl"
                  src="https://drive.google.com/file/d/1Iq-EqT3mu5zL7keWRPVUxAP8H2Z2vUyrrH2AjBSKCVE/preview"
                  title="Video Tutorial"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center p-4">
      <Card>
        <button onClick={() => setRole(null)} className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        {role === 'instructor' ? (
          <form onSubmit={handleInstructorSubmit} className="space-y-6">
            <div className="flex justify-center text-emerald-600"><Lock className="w-12 h-12" /></div>
            <h2 className="text-2xl font-bold text-center">Ingreso Instructor</h2>
            <button type="submit" className="w-full p-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800">Ingresar</button>
          </form>
        ) : (
          <form onSubmit={handleApprenticeSubmit} className="space-y-4">
            <div className="flex justify-center text-emerald-600"><ClipboardList className="w-12 h-12" /></div>
            <h2 className="text-2xl font-bold text-center">Registro de Aprendiz</h2>
            <input type="text" placeholder="Nombre Completo" value={apprenticeData.fullName} onChange={e => setApprenticeData({...apprenticeData, fullName: e.target.value})} className="w-full p-3 border rounded-xl" required />
            <select value={apprenticeData.docType} onChange={e => setApprenticeData({...apprenticeData, docType: e.target.value as any})} className="w-full p-3 border rounded-xl bg-white">
              <option value="CC">CC</option>
              <option value="TI">TI</option>
              <option value="CE">CE</option>
              <option value="PPT">PPT</option>
            </select>
            <input type="text" placeholder="Número de Documento" value={apprenticeData.docNumber} onChange={e => setApprenticeData({...apprenticeData, docNumber: e.target.value})} className="w-full p-3 border rounded-xl" required />
            <input type="text" placeholder="Programa de Formación" value={apprenticeData.programName} onChange={e => setApprenticeData({...apprenticeData, programName: e.target.value})} className="w-full p-3 border rounded-xl" required />
            <input type="text" placeholder="Ficha" value={apprenticeData.fichaNumber} onChange={e => setApprenticeData({...apprenticeData, fichaNumber: e.target.value})} className="w-full p-3 border rounded-xl" required />
            <input type="text" placeholder="Regional" value={apprenticeData.regional} onChange={e => setApprenticeData({...apprenticeData, regional: e.target.value})} className="w-full p-3 border rounded-xl" required />
            <input type="text" placeholder="Centro de Formación" value={apprenticeData.centroFormacion} onChange={e => setApprenticeData({...apprenticeData, centroFormacion: e.target.value})} className="w-full p-3 border rounded-xl" required />
            <button type="submit" className="w-full p-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-500">Registrar mi perfil</button>
          </form>
        )}
      </Card>
    </div>
  );
};
