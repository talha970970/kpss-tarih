export interface ChronologyItem {
  year: string;
  event: string;
}

export interface Mnemonic {
  title: string;
  phrase: string;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface Question {
  id: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
}

export interface PastQuestion {
  id: string;
  year: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
}

export interface LogicConnection {
  cause: string;
  effect: string;
  impact: string;
}

export interface HistoryEngineInfo {
  sebep: string;
  sonuc: string;
  etki: string;
  kpssPronePercent: number; // KPSS'de çıkma ihtimali (0-100)
  benzerOlaylar: string[];
}

export interface TopicModule {
  id: number;
  title: string;
  summary: string; // Akademik anlatım
  keyNotes: string[]; // Sınavda çıkan bilgiler, renkli kutular
  logicMap: LogicConnection[]; // Sebep-Sonuç-Etki zinciri
  chronology: ChronologyItem[];
  mnemonics: Mnemonic[];
  flashcards: Flashcard[];
  questions: Question[];
  pastQuestions: PastQuestion[];
  engineInfo: HistoryEngineInfo;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  unlockedAt: string | null;
  iconName: string;
}

export interface LevelStats {
  level: number;
  currentXp: number;
  maxXp: number;
  totalQuestionsSolved: number;
  correctAnswers: number;
  totalStudyTimeMinutes: number; // minutes
  dailyStreak: number;
  lastStudyDate: string | null;
}

export interface DailyGoal {
  id: string;
  text: string;
  target: number;
  current: number;
  isCompleted: boolean;
}

// KPSS 1 Ay Kampı (30 Days)
export interface CampDay {
  dayNumber: number;
  title: string;
  tasks: string[];
  moduleRefId?: number; // related module
  isCompleted: boolean;
}

// Saved User Analytics
export interface StorageData {
  stats: LevelStats;
  completedModules: number[]; // module IDs
  incorrectAnswers: { [key: string]: number }; // questionId -> count
  studyLog: { [date: string]: number }; // YYYY-MM-DD -> minutes active
  badges: string[]; // unlocked badge IDs
  customFlashcards: Flashcard[];
  campProgress: { [day: number]: boolean };
  targets: {
    dailyActiveMinutesTarget: number;
    dailyQuestionsTarget: number;
    weeklyQuestionsTarget: number;
  };
}
