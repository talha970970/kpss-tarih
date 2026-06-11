import React, { useRef } from 'react';
import { 
  TrendingUp, 
  Download, 
  Upload, 
  BarChart2, 
  Compass, 
  CheckCircle, 
  BookOpen, 
  Award, 
  ShieldAlert,
  Trash2
} from 'lucide-react';
import { StorageData, TopicModule } from '../types';

interface AnalysisPanelProps {
  storageData: StorageData;
  topics: TopicModule[];
  onUploadData: (newData: StorageData) => void;
  onResetData: () => void;
  onAddXp: (amount: number, isCorrect: boolean, isFirstTime: boolean) => void;
}

export default function AnalysisPanel({ 
  storageData, 
  topics, 
  onUploadData, 
  onResetData, 
  onAddXp 
}: AnalysisPanelProps) {
  
  const { stats, studyLog, incorrectAnswers } = storageData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completedCount = storageData.completedModules.length;
  const totalCount = topics.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const solvedCount = stats.totalQuestionsSolved;
  const correctCount = stats.correctAnswers;
  const accuracyRate = solvedCount > 0 ? Math.round((correctCount / solvedCount) * 100) : 0;

  // Compile daily study minutes for the last 7 dates or default sample weeks to render custom SVG Sparklines
  const last7DaysLogs = React.useMemo(() => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const isostring = d.toISOString().split('T')[0];
      dates.push({
        label: d.toLocaleDateString('tr-TR', { weekday: 'short' }),
        date: isostring,
        minutes: studyLog[isostring] || 0
      });
    }
    return dates;
  }, [studyLog]);

  const maxMinutes = Math.max(...last7DaysLogs.map(l => l.minutes), 30);

  // Backup handlers
  const handleExportBackup = () => {
    const dataStr = JSON.stringify(storageData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kpss-2026-tarih-master-yedek.json`;
    link.click();
    onAddXp(10, true, true);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed.stats === 'object' && Array.isArray(parsed.completedModules)) {
          onUploadData(parsed);
          alert("✓ Yedek verileriniz başarıyla yüklendi ve entegre edildi!");
          onAddXp(50, true, true);
        } else {
          alert("⚠️ Hatalı veri formatı. KPSS Tarih Master yedek dosyası olduğundan emin olun.");
        }
      } catch (err) {
        alert("⚠️ Yedek dosyası okunamadı veya JSON geçersiz.");
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      
      {/* Title & backup toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 tracking-wider block uppercase">İstatistik Merkezi</span>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">Öğrenme ve Süreç Analizi</h2>
        </div>

        {/* Export & Import actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportBackup} 
            accept=".json" 
            className="hidden" 
          />
          <button
            onClick={triggerFileInput}
            className="px-4 py-2 glass-pill hover:bg-red-600/10 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition select-none"
          >
            <Upload className="h-4 w-4" /> Yedeği Geri Yükle
          </button>
          
          <button
            onClick={handleExportBackup}
            className="px-4 py-2 glow-button text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition shadow-xs select-none"
          >
            <Download className="h-4 w-4" /> Süreci Yedekle
          </button>
        </div>
      </div>

      {/* Accuracy Gauge & Topic completion metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-red-600" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Doğruluk Karnesi</h4>
          </div>

          <div className="flex items-center gap-4">
            {/* Custom SVG ring */}
            <div className="relative h-20 w-20 shrink-0">
              <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-black/5 dark:text-white/5"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-red-550 transition-all duration-700"
                  strokeDasharray={`${accuracyRate}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-800 dark:text-slate-100">
                %{accuracyRate}
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <p className="text-slate-500 dark:text-slate-400 font-medium">Toplam Soru: <span className="font-bold text-slate-800 dark:text-slate-100">{solvedCount}</span></p>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Doğru Cevap: <span className="font-bold text-emerald-600 dark:text-emerald-400">{correctCount}</span></p>
              <span className="text-[10px] bg-red-500/15 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider block w-fit">
                Hatalı: {solvedCount - correctCount}
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-red-600" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Eğitim Alan Kotası</h4>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Tüm Üniteler</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{completedCount} / {totalCount} Modül</span>
            </div>
            
            <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-red-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Müfredatı tamamlamak için <strong className="text-slate-700 dark:text-slate-300">{totalCount - completedCount}</strong> konu anlatım modülünüz daha kalmıştır.</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Deneyim Puanı (XP)</h4>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">Kazanılan Toplam Seviye:</p>
            <p className="text-2xl font-black text-slate-800 dark:text-slate-100">Seviye {stats.level}</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">Unvan: {stats.level >= 5 ? 'Osmanlı Tarih Fatihi' : 'Gelişmekte Olan Tarihçi'}</p>
          </div>
        </div>

      </div>

      {/* SVG Consistency chart Row */}
      <div className="glass-panel rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-4">
          <BarChart2 className="h-5 w-5 text-red-600" />
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">Haftalık Çalışma Tutarlılığı</h3>
            <p className="text-xs text-slate-400">Son 7 günde kaydedilen aktif ders süreleri</p>
          </div>
        </div>

        {/* Premium SVG Bar chart rendering cleanly */}
        <div className="space-y-6">
          <div className="h-44 w-full relative">
            <div className="absolute inset-0 flex items-end justify-between px-2 pt-4">
              {last7DaysLogs.map((log, index) => {
                const heightPercent = Math.round((log.minutes / maxMinutes) * 100);
                return (
                  <div key={index} className="flex flex-col items-center flex-1 space-y-2 group">
                    {/* Tooltip on hover */}
                    <span className="opacity-0 group-hover:opacity-100 transition duration-200 text-[9px] bg-red-650 text-white px-1.5 py-0.5 rounded absolute -translate-y-8 font-bold font-mono shadow-md z-12">
                      {log.minutes} dk
                    </span>

                    {/* Bar */}
                    <div className="w-8 sm:w-12 bg-black/5 dark:bg-white/5 rounded-lg h-32 flex items-end overflow-hidden relative border border-dashed border-black/10 dark:border-white/10">
                      <div 
                        className={`w-full rounded-t-md transition-all duration-500 ${log.minutes > 0 ? 'bg-gradient-to-t from-red-650 to-rose-400' : 'bg-transparent'}`}
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    </div>

                    {/* Label */}
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-450 uppercase">{log.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Critical safety: Reset application button */}
      <div className="p-5 border border-red-550/25 bg-red-500/5 dark:bg-red-500/8 backdrop-blur-md rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-0.5">
          <h4 className="font-bold text-red-800 dark:text-red-400 text-sm flex items-center gap-1">
            <ShieldAlert className="h-4 w-4" /> Kritik İşlemler
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tüm verileri silip platformu fabrika ayarlarına sıfırlar. Bu işlem geri alınamaz.</p>
        </div>

        <button
          onClick={() => {
            if (confirm("⚠️ Tüm KPSS hazırlık süreci verileriniz, çözdüğünüz sorular ve rozetleriniz sıfırlanacaktır. Emin misiniz?")) {
              onResetData();
            }
          }}
          className="px-4 py-2 bg-neutral-200 hover:bg-red-650/20 hover:text-red-500 dark:bg-white/5 dark:hover:bg-red-500/20 dark:text-slate-350 text-neutral-600 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition select-none self-start sm:self-auto"
        >
          <Trash2 className="h-4 w-4" /> Tüm Süreci Sıfırla
        </button>
      </div>

    </div>
  );
}
