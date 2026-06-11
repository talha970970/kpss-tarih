import React from 'react';
import { 
  Trophy, 
  Flame, 
  CheckCircle, 
  BookOpen, 
  TrendingUp, 
  AlertCircle, 
  Hourglass, 
  Sparkles, 
  CalendarDays,
  Target
} from 'lucide-react';
import { StorageData, TopicModule } from '../types';
import { motion } from 'motion/react';

interface DashboardProps {
  storageData: StorageData;
  topics: TopicModule[];
  onNavigate: (view: string, arg?: any) => void;
  onAddMinutes: (mins: number) => void;
}

export default function Dashboard({ storageData, topics, onNavigate, onAddMinutes }: DashboardProps) {
  const { stats, targets, incorrectAnswers } = storageData;

  // Calculative stats
  const completionPercent = Math.round(
    (storageData.completedModules.length / topics.length) * 100
  );
  
  const successRate = stats.totalQuestionsSolved > 0 
    ? Math.round((stats.correctAnswers / stats.totalQuestionsSolved) * 100) 
    : 0;

  // Find weak subjects: subjects where the user made the most mistakes
  const weakSubjects = React.useMemo(() => {
    const errorMap: { [topicId: number]: number } = {};
    
    // Accumulate incorrect answers by scanning all topics
    Object.keys(incorrectAnswers).forEach((qId) => {
      const errorCount = incorrectAnswers[qId] || 0;
      if (errorCount > 0) {
        // Find which topic this question belongs to
        const topic = topics.find(t => 
          t.questions.some(q => q.id === qId) || t.pastQuestions.some(pq => pq.id === qId)
        );
        if (topic) {
          errorMap[topic.id] = (errorMap[topic.id] || 0) + errorCount;
        }
      }
    });

    return Object.keys(errorMap)
      .map(id => {
        const tId = parseInt(id);
        const topic = topics.find(t => t.id === tId);
        return {
          id: tId,
          title: topic?.title || "Bilinmeyen Konu",
          errors: errorMap[tId]
        };
      })
      .sort((a, b) => b.errors - a.errors)
      .slice(0, 3);
  }, [incorrectAnswers, topics]);

  // Check unlocks
  const activeBadges = storageData.badges;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="h-4.5 w-4.5 text-amber-200" />
              KPSS 2026 Tarih Master
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
              Geleceğini Tasarla, <br className="hidden sm:inline" />Tarihini Yaşa ve Öğren!
            </h1>
            <p className="mt-2 text-white/90 max-w-xl text-sm md:text-base">
              Ezberci sistemleri geride bırak. Yapay zeka koçu, akıllı mantık haritaları ve kişiselleştirilmiş zayıf yön analiziyle hedefine emin adımlarla ilerle.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => onNavigate('modules')} 
              className="px-6 py-3 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:bg-neutral-50 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider"
              id="btn-quick-study"
            >
              Çalışmaya Başla
            </button>
            <button 
              onClick={() => onNavigate('exam')} 
              className="px-6 py-3 bg-red-800/40 text-white font-bold rounded-xl hover:bg-red-800/60 border border-white/20 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider"
              id="btn-quick-exam"
            >
              Hızlı Deneme
            </button>
          </div>
        </div>
      </div>

      {/* Target & Dynamic Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Study Time Card */}
        <div className="rounded-2xl glass-panel glass-panel-hover p-6 flex items-center gap-5 relative group transition-all duration-300">
          <div className="rounded-xl bg-red-500/10 p-3.5 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <Hourglass className="h-6 w-6" id="metric-hourglass" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Çalışma Süresi</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{stats.totalStudyTimeMinutes}</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">dk</span>
            </div>
            
            {/* Quick manual time adder for interactive convenience */}
            <div className="mt-2 flex items-center gap-1.5">
              <button 
                onClick={() => onAddMinutes(15)} 
                className="text-[10px] font-bold bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-350 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 px-2 py-0.5 rounded transition cursor-pointer"
              >
                +15 dk
              </button>
              <button 
                onClick={() => onAddMinutes(60)} 
                className="text-[10px] font-bold bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-350 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 px-2 py-0.5 rounded transition cursor-pointer"
              >
                +1 sa
              </button>
            </div>
          </div>
        </div>

        {/* Solved Questions Card */}
        <div className="rounded-2xl glass-panel glass-panel-hover p-6 flex items-center gap-5 relative group transition-all duration-300">
          <div className="rounded-xl bg-red-500/10 p-3.5 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <CheckCircle className="h-6 w-6" id="metric-questions" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Çözülen Soru</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{stats.totalQuestionsSolved}</span>
              <span className="text-xs font-medium text-slate-450">/ hedef {targets.dailyQuestionsTarget}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Doğru Sayısı: <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{stats.correctAnswers}</span></p>
          </div>
        </div>

        {/* Success Rate Card */}
        <div className="rounded-2xl glass-panel glass-panel-hover p-6 flex items-center gap-5 relative group transition-all duration-300">
          <div className="rounded-xl bg-red-500/10 p-3.5 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <TrendingUp className="h-6 w-6" id="metric-success-rate" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Başarı Oranı</span>
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1 block">%{successRate}</span>
            <div className="w-24 bg-black/10 dark:bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-red-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Streak & Level Card */}
        <div className="rounded-2xl glass-panel glass-panel-hover p-6 flex items-center gap-5 relative group transition-all duration-300">
          <div className="rounded-xl bg-red-500/10 p-3.5 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <Flame className="h-6 w-6 text-amber-500 group-hover:text-amber-200" id="metric-streak" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Günlük Seri</span>
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1 block">{stats.dailyStreak} Gün</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Seviye: <span className="font-bold text-amber-600 dark:text-amber-450">Sev. {stats.level}</span> ({stats.currentXp}/{stats.maxXp} XP)</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Panel (Weak Areas & Goals) / Right Panel (Daily Targets & Badges) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lower Left Column - span 2 */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Weakness Engine Warning Board (ÖĞRENME ALGORİTMASI) */}
          <div className="rounded-2xl glass-panel bg-gradient-to-br from-white/40 to-red-500/5 dark:from-slate-900/40 dark:to-red-500/5 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-500/10 p-2 text-orange-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg">Öğrenme Algoritması Analizi</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Sistem hata analizlerinizi taradı ve özel odak alanları belirledi</p>
                </div>
              </div>
              <span className="text-xs bg-red-500/15 text-red-600 dark:text-red-400 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Yapay Zekâ Destekli
              </span>
            </div>

            {weakSubjects.length === 0 ? (
              <div className="text-center py-6">
                <span className="text-3xl">🥳</span>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-2">Harika! Henüz kritik bir hata birikiminiz bulunmuyor.</p>
                <p className="text-xs text-slate-450 mt-1">Soruları çözdükçe yapay zeka buraya zayıf alanlarınızı listeler.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-450">
                  Aşağıdaki konularda hata oranınız diğer ünitelere kıyasla yüksektir. Sistem, bu konuları daha iyi kavramanız için <strong>Daha Fazla Soru</strong> ve <strong>Hafıza Kodlaması</strong> çalışmanızı önermektedir.
                </p>
                
                <div className="space-y-3">
                  {weakSubjects.map((sub, idx) => (
                    <div 
                      key={sub.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-black/5 dark:border-white/5 bg-white/10 dark:bg-black/10 shadow-xs hover:border-red-500/35 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-red-500/15 text-xs font-bold text-red-600 dark:text-red-400">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{sub.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-450 mt-0.5">Tespit edilen toplam hata: <span className="text-red-500 font-black">{sub.errors}</span></p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => onNavigate('modules', { topicId: sub.id, tab: 4 })} // flashcard or questions tab
                          className="px-3.5 py-1.5 text-xs font-bold text-red-600 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-lg transition cursor-pointer"
                        >
                          Kartları Tekrar Et
                        </button>
                        <button 
                          onClick={() => onNavigate('modules', { topicId: sub.id, tab: 5 })} // question tab
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition cursor-pointer"
                        >
                          Soru Çöz
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Core App Progress Tracker */}
          <div className="rounded-2xl glass-panel p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg">Konu Tamamlama İlerlemesi</h3>
              <span className="text-sm font-bold text-red-600">%{completionPercent} Tamamlandı</span>
            </div>

            <div className="w-full bg-black/10 dark:bg-white/10 h-3 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-gradient-to-r from-red-500 to-rose-600 h-full rounded-full transition-all duration-700" 
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>

            {/* Quick grid stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3.5 rounded-xl glass-subcard">
                <p className="text-lg font-black text-slate-800 dark:text-slate-100">{storageData.completedModules.length} / {topics.length}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Biten Konu</p>
              </div>
              <div className="p-3.5 rounded-xl glass-subcard">
                <p className="text-lg font-black text-slate-800 dark:text-slate-100">{topics.length - storageData.completedModules.length}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kalan Konu</p>
              </div>
              <div className="p-3.5 rounded-xl glass-subcard col-span-2 sm:col-span-1">
                <p className="text-lg font-black text-emerald-600">%{successRate}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Net İsabet Oranı</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Right Column - span 1 */}
        <div className="space-y-6">
          
          {/* Daily Checklist Targets */}
          <div className="rounded-2xl glass-panel p-6 shadow-sm">
            <div className="flex items-center gap-2.5 pb-3 border-b border-black/5 dark:border-white/5 mb-4">
              <Target className="h-5 w-5 text-red-600" />
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Günlük Hedef Defteri</h3>
            </div>

            <div className="space-y-4">
              {/* Target 1 */}
              <div className="flex items-center justify-between p-1">
                <div>
                  <p className="text-sm font-semibold text-neutral-800">Günlük Soru Çözümü</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Hedef: {targets.dailyQuestionsTarget} soru</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${stats.totalQuestionsSolved >= targets.dailyQuestionsTarget ? 'bg-emerald-100 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
                    {stats.totalQuestionsSolved} / {targets.dailyQuestionsTarget}
                  </span>
                </div>
              </div>

              {/* Target 2 */}
              <div className="flex items-center justify-between p-1">
                <div>
                  <p className="text-sm font-semibold text-neutral-800">Çalışma Süresi</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Hedef: {targets.dailyActiveMinutesTarget} dakika</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${stats.totalStudyTimeMinutes >= targets.dailyActiveMinutesTarget ? 'bg-emerald-100 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
                    {stats.totalStudyTimeMinutes} / {targets.dailyActiveMinutesTarget} dk
                  </span>
                </div>
              </div>

              {/* Camp Progress Mini view */}
              <div className="bg-red-50/40 rounded-xl p-3 border border-red-50 text-xs text-neutral-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-red-800 flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5 text-red-600" />
                    Son 1 Ay Kampı İlerlemesi
                  </span>
                  <button 
                    onClick={() => onNavigate('camp')} 
                    className="font-bold text-[10px] text-red-600 hover:underline"
                  >
                    Kampa Git
                  </button>
                </div>
                <p className="text-neutral-500">Hazırlık kampınızın ilk günlerini tamamlayarak pratik yaparak konu unutmama reflekslerinizi en üst seviyede tutun.</p>
              </div>
            </div>
          </div>

          {/* Badges and Milestones */}
          <div className="rounded-2xl glass-panel p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Tarih Rozetleri</h3>
              </div>
              <span className="text-xs font-bold text-slate-400">{activeBadges.length} / 6</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'bronze', label: 'Bronz Tarihçi', emoji: '🥉', desc: 'İlk soruyu çöz!' },
                { id: 'silver', label: 'Gümüş Tarihçi', emoji: '🥈', desc: '50 soru çöz!' },
                { id: 'gold', label: 'Altın Tarihçi', emoji: '🥇', desc: '100+ soru çöz!' },
                { id: 'osmanli', label: 'Osmanlı Uzmanı', emoji: '🕌', desc: 'Osmanlı konularını bitir.' },
                { id: 'cumhuriyet', label: 'Cumhuriyetçi', emoji: '🇹🇷', desc: 'Atatürk ilkelerini kavra.' },
                { id: 'champion', label: 'KPSS Şampiyonu', emoji: '👑', desc: 'Deneme sınavından 85+ al.' }
              ].map(badge => {
                const isUnlocked = activeBadges.includes(badge.id);
                return (
                  <div 
                    key={badge.id}
                    title={`${badge.label}: ${badge.desc}`}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-300 ${isUnlocked ? 'bg-amber-500/10 border-amber-500/30 text-slate-800 dark:text-slate-200 scale-100 shadow-md' : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-350 dark:text-slate-650 opacity-50'}`}
                  >
                    <span className="text-2xl mb-1 filter drop-shadow-sm">{isUnlocked ? badge.emoji : '🔒'}</span>
                    <span className="text-[10px] font-bold tracking-tight truncate w-full">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
