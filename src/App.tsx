import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Search, 
  Menu, 
  X,
  Target,
  LineChart,
  CalendarDays,
  Sparkles,
  Award,
  BookOpen,
  LayoutDashboard,
  Moon,
  Sun
} from 'lucide-react';
import { StorageData, TopicModule, Flashcard } from './types';
import { KPSS_TOPICS } from './data/topics';
import Dashboard from './components/Dashboard';
import TopicView from './components/TopicView';
import PracticeExam from './components/PracticeExam';
import CampTakvim from './components/CampTakvim';
import AnalysisPanel from './components/AnalysisPanel';

const STORAGE_KEY = "kpss_tarih_master_2026_state";

const DEFAULT_STORAGE: StorageData = {
  stats: {
    level: 1,
    currentXp: 0,
    maxXp: 100,
    totalQuestionsSolved: 0,
    correctAnswers: 0,
    totalStudyTimeMinutes: 0,
    dailyStreak: 1,
    lastStudyDate: new Date().toISOString().split('T')[0]
  },
  completedModules: [],
  incorrectAnswers: {},
  studyLog: {},
  badges: [],
  customFlashcards: [],
  campProgress: {},
  targets: {
    dailyActiveMinutesTarget: 30,
    dailyQuestionsTarget: 20,
    weeklyQuestionsTarget: 150
  }
};

export default function App() {
  
  // Storage state loading
  const [storageData, setStorageData] = useState<StorageData>(() => {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && typeof parsed.stats === 'object') {
          return parsed;
        }
      } catch (err) {
        console.error("Corrupted local state found, resetting defaults", err);
      }
    }
    return DEFAULT_STORAGE;
  });

  // Theme states (Kırmızı-Beyaz Premium / Dark Mode support)
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom router state
  // views: 'dashboard' | 'modules' | 'camp' | 'exam' | 'analysis'
  const [activeView, setActiveView] = useState<string>('dashboard');

  // Selected module pointer if 'modules' view active
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-save local storage on any state updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  }, [storageData]);

  // Handle study tracking streak on boot
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastDate = storageData.stats.lastStudyDate;

    if (lastDate && lastDate !== todayStr) {
      const lastDateTime = new Date(lastDate).getTime();
      const todayTime = new Date(todayStr).getTime();
      const diffDays = Math.round((todayTime - lastDateTime) / (1000 * 60 * 60 * 24));
      
      let nextStreak = storageData.stats.dailyStreak;
      if (diffDays === 1) {
        nextStreak = nextStreak + 1;
      } else if (diffDays > 1) {
        nextStreak = 1; // reset streak if gap larger than 1 day
      }

      setStorageData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          dailyStreak: nextStreak,
          lastStudyDate: todayStr
        }
      }));
    }
  }, []);

  // XP progression engine
  const handleAddXp = (amount: number, isCorrect: boolean, isFirstTime: boolean) => {
    setStorageData(prev => {
      let nextXp = prev.stats.currentXp + amount;
      let nextLevel = prev.stats.level;
      let nextMaxXp = prev.stats.maxXp;

      // Handle subtraction safety
      if (nextXp < 0) nextXp = 0;

      while (nextXp >= nextMaxXp) {
        nextXp = nextXp - nextMaxXp;
        nextLevel++;
        nextMaxXp = Math.round(nextMaxXp * 1.25); // increment difficulty level bar
      }

      const activeDateStr = new Date().toISOString().split('T')[0];
      const todayLogs = prev.studyLog[activeDateStr] || 0;

      return {
        ...prev,
        stats: {
          ...prev.stats,
          currentXp: nextXp,
          level: nextLevel,
          maxXp: nextMaxXp
        }
      };
    });
  };

  const handleRecordAnswer = (questionId: string, isCorrect: boolean) => {
    setStorageData(prev => {
      const solved = prev.stats.totalQuestionsSolved + 1;
      const correct = prev.stats.correctAnswers + (isCorrect ? 1 : 0);
      
      const newIncorrects = { ...prev.incorrectAnswers };
      if (!isCorrect) {
        newIncorrects[questionId] = (newIncorrects[questionId] || 0) + 1;
      }

      // Check automatically unlocking badges milestones based on achievements guidelines
      const newBadges = [...prev.badges];
      
      if (solved >= 1 && !newBadges.includes('bronze')) {
        newBadges.push('bronze');
      }
      if (solved >= 50 && !newBadges.includes('silver')) {
        newBadges.push('silver');
      }
      if (solved >= 100 && !newBadges.includes('gold')) {
        newBadges.push('gold');
      }

      return {
        ...prev,
        stats: {
          ...prev.stats,
          totalQuestionsSolved: solved,
          correctAnswers: correct
        },
        incorrectAnswers: newIncorrects,
        badges: newBadges
      };
    });
  };

  // Add minutes worked manually & dynamically logs active study times
  const handleAddMinutes = (mins: number) => {
    setStorageData(prev => {
      const totalMinutes = prev.stats.totalStudyTimeMinutes + mins;
      
      const activeDateStr = new Date().toISOString().split('T')[0];
      const newLogs = { ...prev.studyLog };
      newLogs[activeDateStr] = (newLogs[activeDateStr] || 0) + mins;

      return {
        ...prev,
        stats: {
          ...prev.stats,
          totalStudyTimeMinutes: totalMinutes
        },
        studyLog: newLogs
      };
    });

    handleAddXp(mins * 3, true, true); // reward 3 XP for each minute studied!
  };

  const handleSaveCustomFlashcard = (card: Flashcard) => {
    setStorageData(prev => {
      const customs = prev.customFlashcards || [];
      return {
        ...prev,
        customFlashcards: [card, ...customs]
      };
    });
  };

  const handleUpdateCampDay = (dayNumber: number, isCompleted: boolean) => {
    setStorageData(prev => {
      const updatedCamp = { ...prev.campProgress };
      if (isCompleted) {
        updatedCamp[dayNumber] = true;
      } else {
        delete updatedCamp[dayNumber];
      }
      return {
        ...prev,
        campProgress: updatedCamp
      };
    });
  };

  const handleUpdateTargets = (newTargets: any) => {
    setStorageData(prev => ({
      ...prev,
      targets: newTargets
    }));
  };

  const handleUploadBackupData = (newData: StorageData) => {
    setStorageData(newData);
  };

  const handleResetData = () => {
    setStorageData(DEFAULT_STORAGE);
    localStorage.removeItem(STORAGE_KEY);
    setActiveView('dashboard');
  };

  // Quick navigation helpers supporting subtab selection shortcuts too
  const handleNavigate = (view: string, arg?: any) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    
    if (view === 'modules' && arg) {
      if (arg.topicId) {
        setSelectedTopicId(arg.topicId);
      }
      // Trigger visual focus
    }
  };

  // Filter modules lists
  const filteredTopics = KPSS_TOPICS.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTopic = KPSS_TOPICS.find(t => t.id === selectedTopicId) || KPSS_TOPICS[0];

  return (
    <div className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Decorative Glowing Blur Spots - Glassmorphism backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-650/15 dark:bg-red-600/12 rounded-full blur-[140px] pointer-events-none select-none z-0"></div>
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-rose-500/15 dark:bg-rose-500/12 rounded-full blur-[120px] pointer-events-none select-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[15%] w-[500px] h-[500px] bg-amber-500/8 dark:bg-red-500/8 rounded-full blur-[130px] pointer-events-none select-none z-0"></div>

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 glass-header border-b transition-colors relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between relative z-10">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => handleNavigate('dashboard')}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-red-650 text-white font-extrabold text-base shadow-md">
              🇹🇷
            </div>
            <div>
              <p className="font-extrabold text-base tracking-tight text-red-600 uppercase">KPSS 2026</p>
              <p className="font-black text-xs text-neutral-600 dark:text-neutral-300 uppercase tracking-widest -mt-1">Tarih Master</p>
            </div>
          </div>

          {/* Search bar inside header desktop */}
          <div className="hidden md:flex items-center relative w-72">
            <Search className="h-4 w-4 absolute left-3.5 text-neutral-400 select-none pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'modules' && e.target.value) {
                  setActiveView('modules');
                }
              }}
              placeholder="Ünite veya anahtar kelime ara..."
              className="w-full text-xs glass-input rounded-xl pl-9 pr-4 py-2 focus:outline-none transition"
              id="search-box-header"
            />
          </div>

          {/* Stats, Toggles and Controls */}
          <div className="flex items-center gap-4">
            
            {/* Quick XP Pill HUD */}
            <div className="hidden sm:flex items-center gap-2 glass-pill px-3 py-1.5 rounded-xl">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <div className="text-right">
                <p className="text-[10px] font-black leading-tight text-neutral-700 dark:text-neutral-200">SEVİYE {storageData.stats.level}</p>
                <div className="w-16 bg-neutral-200 dark:bg-neutral-700 h-1 rounded-full overflow-hidden mt-0.5">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${(storageData.stats.currentXp / storageData.stats.maxXp) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Dark mode controller toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 glass-pill hover:bg-red-600/10 text-neutral-600 dark:text-slate-350 rounded-xl transition cursor-pointer select-none"
              title={darkMode ? "Açık Tema" : "Koyu Tema"}
            >
              {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Mobile layout drawer button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 rounded-xl"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* NAVIGATION RAIL OR DESKTOP SUBBAR */}
      <nav className="hidden md:block bg-white/20 dark:bg-slate-950/20 backdrop-blur-md border-b border-black/5 dark:border-white/5 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 py-2">
          
          {[
            { id: 'dashboard', label: 'Gösterge Paneli', icon: LayoutDashboard },
            { id: 'modules', label: 'Konu Modülleri', icon: BookOpen },
            { id: 'camp', label: '30 Gün Kampı', icon: CalendarDays },
            { id: 'exam', label: 'ÖSYM Deneme Sınavı', icon: Target },
            { id: 'analysis', label: 'Performans Analizleri', icon: LineChart }
          ].map(lnk => {
            const IconComp = lnk.icon;
            const isSelected = activeView === lnk.id;
            return (
              <button
                key={lnk.id}
                onClick={() => handleNavigate(lnk.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition select-none ${isSelected ? 'glow-active-tab shadow-sm' : 'text-neutral-500 dark:text-slate-400 hover:bg-red-650/10 hover:text-red-500'}`}
              >
                <IconComp id={`nav-${lnk.id}`} className="h-4 w-4" />
                <span>{lnk.label}</span>
              </button>
            );
          })}

        </div>
      </nav>

      {/* MOBILE DRAWER VIEW */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-xs flex justify-end" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white dark:bg-neutral-900 max-w-xs w-full h-full p-6 shadow-2xl flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-neutral-800 dark:text-white">MENÜ</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-neutral-400">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Search bar */}
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-2.5 text-neutral-400" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeView !== 'modules' && e.target.value) {
                      setActiveView('modules');
                    }
                  }}
                  placeholder="Ara..."
                  className="w-full text-xs border border-neutral-200 dark:border-neutral-700 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none dark:bg-neutral-800"
                />
              </div>

              <div className="space-y-2 flex flex-col">
                {[
                  { id: 'dashboard', label: 'Gösterge Paneli', icon: LayoutDashboard },
                  { id: 'modules', label: 'Konu Modülleri', icon: BookOpen },
                  { id: 'camp', label: '30 Gün Kampı', icon: CalendarDays },
                  { id: 'exam', label: 'ÖSYM Deneme Sınavı', icon: Target },
                  { id: 'analysis', label: 'Performans Analizi', icon: LineChart }
                ].map(lnk => {
                  const IconComp = lnk.icon;
                  const isSelected = activeView === lnk.id;
                  return (
                    <button
                      key={lnk.id}
                      onClick={() => handleNavigate(lnk.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition text-left select-none ${isSelected ? 'bg-red-600 text-white shadow-xs' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-400'}`}
                    >
                      <IconComp className="h-4.5 w-4.5" />
                      <span>{lnk.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level status mobile footer drawer */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl space-y-2 text-xs">
              <p className="font-bold">Mevcut Seviyeniz: {storageData.stats.level}</p>
              <p className="text-[10px] text-neutral-400">Günlük Seri: {storageData.stats.dailyStreak} Gün ardışık</p>
            </div>
          </div>
        </div>
      )}

      {/* CORE WRAPPER CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative z-10">
        
        {/* VIEW 1: DASHBOARD */}
        {activeView === 'dashboard' && (
          <Dashboard 
            storageData={storageData}
            topics={KPSS_TOPICS}
            onNavigate={handleNavigate}
            onAddMinutes={handleAddMinutes}
          />
        )}

        {/* VIEW 2: MODULES (15 TOPICS + DETAILED TABS) */}
        {activeView === 'modules' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar List of 15 Modules */}
            <div className="lg:col-span-1 space-y-3 max-h-[750px] overflow-y-auto pr-2">
              <div className="pb-2">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Tarih Konu Başlıkları</h3>
                <p className="text-[10px] text-neutral-400">Müfredattaki 15 ana başlık</p>
              </div>

              {filteredTopics.map((topic) => {
                const isSelected = topic.id === selectedTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition relative flex items-start gap-2 select-none ${isSelected ? 'border-red-500 glow-active-tab font-extrabold shadow-sm' : 'glass-panel glass-panel-hover text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="font-mono text-[9px] bg-neutral-100 dark:bg-neutral-800 text-neutral-400 rounded-md px-1.5 py-0.5 mt-0.5">{topic.id}</span>
                    <span className="flex-1 line-clamp-2 leading-relaxed antialiased">{topic.title}</span>
                  </button>
                );
              })}

              {filteredTopics.length === 0 && (
                <p className="text-xs text-neutral-400 italic">Aranan kelimeyle uyuşan başlık bulunamadı.</p>
              )}
            </div>

            {/* Modular Tab Content section (8 Tabs) */}
            <div className="lg:col-span-3">
              <TopicView 
                topic={selectedTopic}
                onAddXp={handleAddXp}
                onRecordAnswer={handleRecordAnswer}
                storageData={storageData}
                onSaveCustomFlashcard={handleSaveCustomFlashcard}
              />
            </div>

          </div>
        )}

        {/* VIEW 3: 30 DAYS KAMP */}
        {activeView === 'camp' && (
          <CampTakvim 
            storageData={storageData}
            onUpdateCampDay={handleUpdateCampDay}
            onUpdateTargets={handleUpdateTargets}
            onAddXp={handleAddXp}
          />
        )}

        {/* VIEW 4: PRACTICE EXAM */}
        {activeView === 'exam' && (
          <PracticeExam 
            topics={KPSS_TOPICS}
            onAddXp={handleAddXp}
            onRecordAnswer={handleRecordAnswer}
          />
        )}

        {/* VIEW 5: ANALYSIS */}
        {activeView === 'analysis' && (
          <AnalysisPanel 
            storageData={storageData}
            topics={KPSS_TOPICS}
            onUploadData={handleUploadBackupData}
            onResetData={handleResetData}
            onAddXp={handleAddXp}
          />
        )}

      </main>

      {/* FOOTER */}
      <footer className="glass-header border-t py-8 mt-12 transition-colors relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-neutral-400">
          <div className="text-center sm:text-left">
            <p className="text-neutral-550">&copy; 2026 KPSS Tarih Master Premium. Tüm Hakları Saklıdır.</p>
            <p className="text-[10px] text-neutral-400 mt-0.5">Yükseköğretim ve alan sınavlarına tam uyumlu profesyonel seviş hazırlanma sistemi.</p>
          </div>
          <div className="flex items-center gap-3.5">
            <span className="text-[10px] bg-red-105 text-red-600 px-3 py-1 rounded">2026 BASIM</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
