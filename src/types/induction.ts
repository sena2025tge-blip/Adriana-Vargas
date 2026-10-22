export type UserRole = 'instructor' | 'apprentice';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  apprenticeData?: ApprenticeProfile;
}

export interface ApprenticeProfile {
  fullName: string;
  docType: 'CC' | 'TI' | 'CE' | 'PPT';
  docNumber: string;
  programName: string;
  fichaNumber: string;
  regional: string;
  centroFormacion: string;
  startDate: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'onboarding' | 'rights' | 'duties' | 'ethics' | 'exam' | 'mastery';
}

export interface RegulationArticle {
  id: string;
  chapter: string;
  article: string;
  title: string;
  category: 'derechos' | 'deberes' | 'prohibiciones' | 'tramite_faltas' | 'comite' | 'etapa_productiva';
  summary: string;
  content: string[];
  keyTakeaway: string;
  tags: string[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  moduleId?: string;
  question: string;
  scenario?: string;
  options: QuizOption[];
  regulationRef: string;
}

export interface DilemmaChoice {
  id: string;
  actionText: string;
  outcomeType: 'correct' | 'warning' | 'infraction';
  consequence: string;
  regulationBasis: string;
  xpReward: number;
}

export interface DilemmaScenario {
  id: string;
  title: string;
  context: string;
  situation: string;
  characterRole: string;
  choices: DilemmaChoice[];
}

export interface InductionModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  topics: {
    title: string;
    description: string;
    points: string[];
    highlightTip?: string;
  }[];
  quickCheck: QuizQuestion;
  xpReward: number;
}

export interface CertificateData {
  verificationCode: string;
  issuedAt: string;
  apprenticeName: string;
  docType: string;
  docNumber: string;
  programName: string;
  fichaNumber: string;
  regional: string;
  centroFormacion: string;
  totalScore: number;
  totalXp: number;
  durationHours: number;
}

export interface ApprenticeSheetRecord {
  timestamp: string;
  fullName: string;
  docType: string;
  docNumber: string;
  fichaNumber: string;
  programName: string;
  regional: string;
  centroFormacion: string;
  modulesProgress: string;
  scenariosProgress: string;
  examScore: string;
  totalXp: number;
  certificationStatus: string;
  verificationCode: string;
  issueDate: string;
}

export interface GoogleSheetSyncInfo {
  spreadsheetId: string;
  spreadsheetTitle: string;
  sheetUrl: string;
  lastSyncedAt?: string;
  recordsCount?: number;
}
