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
      let user = auth.currentUser;
      if (!user) {
        const userCredential = await signInAnonymously(auth);
        user = userCredential.user;
      }
      
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
      let user = auth.currentUser;
      if (!user) {
        const userCredential = await signInAnonymously(auth);
        user = userCredential.user;
      }
      
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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 truncate px-2">Bienvenido al SENA</h1>
            <div className="flex justify-between items-center w-full mb-2 gap-2">
              <img src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e" 
                alt="SENA" 
                className="w-10 h-10" 
              />
              <button className="text-sm font-semibold text-slate-700 bg-white/50 px-3 py-1 rounded-full hover:bg-white transition-colors">
                EN/ES
              </button>
            </div>
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
