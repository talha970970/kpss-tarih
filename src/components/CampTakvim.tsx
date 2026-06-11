import React, { useState } from 'react';
import { 
  Calendar, 
  CheckSquare, 
  Square, 
  Hourglass, 
  Compass, 
  Flame, 
  Sparkles, 
  Target,
  Edit3
} from 'lucide-react';
import { StorageData, CampDay } from '../types';

interface CampTakvimProps {
  storageData: StorageData;
  onUpdateCampDay: (dayNumber: number, isCompleted: boolean) => void;
  onUpdateTargets: (targets: { dailyActiveMinutesTarget: number, dailyQuestionsTarget: number, weeklyQuestionsTarget: number }) => void;
  onAddXp: (amount: number, isCorrect: boolean, isFirstTime: boolean) => void;
}

export default function CampTakvim({ storageData, onUpdateCampDay, onUpdateTargets, onAddXp }: CampTakvimProps) {
  
  const { campProgress, targets } = storageData;

  const [activeDayIndex, setActiveDayIndex] = useState<number>(1);
  
  // Custom target edit forms
  const [showEditTargets, setShowEditTargets] = useState(false);
  const [inputDailyMins, setInputDailyMins] = useState(targets.dailyActiveMinutesTarget);
  const [inputDailyQ, setInputDailyQ] = useState(targets.dailyQuestionsTarget);
  const [inputWeeklyQ, setInputWeeklyQ] = useState(targets.weeklyQuestionsTarget);

  // Pre-seed 30 Days of study campaign corresponding to 15 modules comfortably spread out over 30 days
  const campSyllabus: CampDay[] = React.useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      let title = "";
      let tasks: string[] = [];
      let moduleRefId = 1;

      if (day === 1) {
        title = "İslamiyet Öncesi Türk Tarihi - Giriş";
        tasks = ["Boylar ve Kültür Merkezleri konu özetini oku", "Göçebeliğin askeri etkilerine dair Mantık Haritasını incele", "15 adet Flashcard tekrarı yap"];
        moduleRefId = 1;
      } else if (day === 2) {
        title = "İslamiyet Öncesi Kültür Medeniyet";
        tasks = ["Devlet yönetimi (Kut, Töre, Kurultay) kavramlarını ezberle", "ÖSYM tarzı 15 soru çöz ve yanlış her soruyu analiz et"];
        moduleRefId = 1;
      } else if (day === 3) {
        title = "İlk Türk İslam Devletleri - Siyasi Süreç";
        tasks = ["Karahanlılar ve Gazneliler ünitesini çalış", "Dandanakan savaşı kronolojisini tekrar et"];
        moduleRefId = 2;
      } else if (day === 4) {
        title = "İlk Türk İslam - Kültür Medeniyet";
        tasks = ["Kaşgarlı Mahmut ve Yusuf Has Hacib edebi eserleri incele", "ÖSYM tarzı 20 soru çöz"];
        moduleRefId = 2;
      } else if (day === 5) {
        title = "Türkiye Selçuklu Devleti - Süreç";
        tasks = ["Miryokefalon savaşı (Yurt-tutan) önemini yaz", "10 adet flashcard çöz"];
        moduleRefId = 3;
      } else if (day === 6) {
        title = "Türkiye Selçuklu - Ticaret ve Sanat";
        tasks = ["Ticari sigortacılık ve kervansaray mimarisini oku", "Divan üyelerini karşılaştır"];
        moduleRefId = 3;
      } else if (day === 7) {
        title = "Anadolu Beylikleri - Siyasi Birlik";
        tasks = ["Denizci beylikleri KaMaSı formülüyle kodla", "Karamanoğlu Mehmet Bey Türkçe fermanını kavra"];
        moduleRefId = 4;
      } else if (day === 8) {
        title = "Osmanlı Kuruluş - Teşkilatlanma";
        tasks = ["İskan ve İstimalet politikası mantık haritasını incele", "Orhan Bey dönemi ilk düzenli ordu örgütlenmesin oku"];
        moduleRefId = 5;
      } else if (day === 9) {
        title = "Osmanlı Kuruluş - Fetret Devri";
        tasks = ["1402 Ankara savaşı ve neden-sonuç analizini çıkar", "Kuruluş padişahları akrostişini çalış"];
        moduleRefId = 5;
      } else if (day === 10) {
        title = "Osmanlı Yükselme - İstanbul'un Fethi";
        tasks = ["Fethi tetikleyen Bizans entrikalarını incele", "Fethin dünya tarihi açısından etkilerine özet çıkar"];
        moduleRefId = 6;
      } else if (day === 11) {
        title = "Osmanlı Yükselme - Halifelik";
        tasks = ["Yavuz Sultan Selim dönemi Mısır Seferi analizini incele", "Yükselme dönemi 20 soru çöz"];
        moduleRefId = 6;
      } else if (day === 12) {
        title = "Osmanlı Duraklama - Islahatçılar";
        tasks = ["Ekber ve Erşed sisteminin veraset etkisini incele", "Duraklama Celali isyanları sebeplerini analiz et"];
        moduleRefId = 7;
      } else if (day === 13) {
        title = "Osmanlı Gerileme - Batılılaşma";
        tasks = ["Lale Devri (1718-1730) batı tarzı ıslahat pencerelerini oku", "Tulumbacılar ve geçici elçilikleri özetle"];
        moduleRefId = 8;
      } else if (day === 14) {
        title = "Osmanlı Dağılma - Tanzimat";
        tasks = ["1839 Kanun üstünlüğü ve Tanzimat Fermanı şemasına çalış", "Padişah yetkilerindeki sınırlamaları incele"];
        moduleRefId = 9;
      } else if (day === 15) {
        title = "Osmanlı Dağılma - Meşrutiyet";
        tasks = ["Kanun-ı Esasi ve parlamento yapısını incele", "İstibdat dönemi kısıtlamalarını oku"];
        moduleRefId = 9;
      } else if (day === 16) {
        title = "Kurtuluş Savaşı - Genelgeler";
        tasks = ["Amasya, Erzurum ve Sivas genelgeleri anahtar kelimelerini çöz", "Meclisin toplanış sebeplerini yaz"];
        moduleRefId = 10;
      } else if (day === 17) {
        title = "Kurtuluş Savaşı - Cepheler";
        tasks = ["Kazım Karabekir ve Ermeni savaşı kronolojisini çalış", "Doğu cephesi Gümrü anlaşmasını oku"];
        moduleRefId = 10;
      } else if (day === 18) {
        title = "Kurtuluş Savaşı - Batı Cephesi";
        tasks = ["İnönü zaferleri ve Londra Konferansı diplomatik bağını çıkar", "Sakarya savaşı Başkomutanlık yetkilerini incele"];
        moduleRefId = 10;
      } else if (day === 19) {
        title = "TBMM - Yasama Yetkileri";
        tasks = ["I. TBMM ve Güçler Birliği anayasal şemasına bak", "Meclis hükümet sistemini oku"];
        moduleRefId = 11;
      } else if (day === 20) {
        title = "Atatürk İlkeleri - Cumhuriyetçilik";
        tasks = ["Egemenlik haklarının halka ve sandığa geçiş tarihleri çalış", "Çok partili denemelere özet çıkar"];
        moduleRefId = 12;
      } else if (day === 21) {
        title = "Atatürk İlkeleri - Milliyetçilik & Halkçılık";
        tasks = ["Kabotaj kanunu ve Türk Tarih Kurumu önemini yaz", "Aşar vergisinin kalkmasının ekonomik etkisini çıkar"];
        moduleRefId = 12;
      } else if (day === 22) {
        title = "Atatürk İlkeleri - Laiklik & Devletçilik";
        tasks = ["Halifeliğin kalkması ve Tevhid-i Tedrisat bağlantısını çiz", "Sümerbank ve 5 yıllık kalkınma planını oku"];
        moduleRefId = 12;
      } else if (day === 23) {
        title = "Atatürk İnkılapları - Medeni Kanun";
        tasks = ["1926 Medeni Kanun'un getirdiği sosyal kadın haklarını ezberle", "BMW formülü ile siyasi hak alma kronolojisini çalış"];
        moduleRefId = 13;
      } else if (day === 24) {
        title = "Atatürk İnkılapları - Eğitim & Sosyal";
        tasks = ["Latin alfabesi kabülü, Millet Mektepleri okuryazarlık hedefini öğren", "Soyadı kanununu çalış"];
        moduleRefId = 13;
      } else if (day === 25) {
        title = "Atatürk Dönemi Dış Politika - Lozan Artıkları";
        tasks = ["Mübadele ve Yabancı Okullar dış pakt çözümünü incele", "Musul sorunu ve Şeyh Sait isyanı aleyhte bağlantısını kur"];
        moduleRefId = 14;
      } else if (day === 26) {
        title = "Atatürk Dönemi Dış Politika - Egemenlik";
        tasks = ["1936 Montrö Boğazlar sözleşmesiyle tam bağımsızlık geçişini analiz et", "TaYYaR ve ATİİ sınır paktlarını çalış"];
        moduleRefId = 14;
      } else if (day === 27) {
        title = "Çağdaş Türk Tarihi - II. Dünya Savaşı";
        tasks = ["İnönü'nün denge politikasını oku", "Ekmek karnesi ve milli korunma yasasını özetle"];
        moduleRefId = 15;
      } else if (day === 28) {
        title = "Çağdaş Türk Tarihi - Soğuk Savaş";
        tasks = ["Kore savaşı ve NATO'ya giriş sürecine çalış", "Marshall planı ekonomik etkilerini oku"];
        moduleRefId = 15;
      } else if (day === 29) {
        title = "Genel Tekrar - Deneme Hazırlığı";
        tasks = ["Kapsamlı bir 30 soruluk simülatör denemesi tamamla", "Tüm yanlışları yapay zekaya analiz ettir"];
        moduleRefId = 1;
      } else {
        title = "Son Gün - Büyük Prova";
        tasks = ["En az 60 soruluk tam KPSS Tarih provası yap", "Hataları tekrar oku, tüyoları gözden geçir"];
        moduleRefId = 12;
      }

      return {
        dayNumber: day,
        title,
        tasks,
        moduleRefId,
        isCompleted: !!campProgress[day]
      };
    });
  }, [campProgress]);

  const activeDay = campSyllabus.find(d => d.dayNumber === activeDayIndex) || campSyllabus[0];

  const handleToggleDay = () => {
    const isNowCompleted = !activeDay.isCompleted;
    onUpdateCampDay(activeDayIndex, isNowCompleted);
    
    if (isNowCompleted) {
      onAddXp(100, true, true); // give a substantial XP bonus for completing training days!
    } else {
      onAddXp(-100, false, false);
    }
  };

  const handleFormTargetsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTargets({
      dailyActiveMinutesTarget: inputDailyMins,
      dailyQuestionsTarget: inputDailyQ,
      weeklyQuestionsTarget: inputWeeklyQ
    });
    setShowEditTargets(false);
    onAddXp(10, true, true);
  };

  const totalCampCompleted = campSyllabus.filter(d => d.isCompleted).length;
  const campPercent = Math.round((totalCampCompleted / 30) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Column 1 & 2: 30 DAYS KAMP DETAILS */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Campaign progress indicator */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 p-6 text-white shadow-lg space-y-3">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-200" />
              <h2 className="font-extrabold text-lg text-white">KPSS Tarih Son 1 Ay Kamptayız</h2>
            </div>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded font-bold uppercase tracking-wide">
              {totalCampCompleted} / 30 Gün Bitti
            </span>
          </div>

          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden relative z-10">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${campPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-red-50 leading-relaxed font-semibold relative z-10">
            30 günlük plan, KPSS Tarih müfredatının tamamını güne böler. Her günün konusunu ve hedefini tamamlayıp bitirildi kutucuğunu işaretleyin, <strong>Günlük XP bonuslarınızı</strong> kapın!
          </p>
        </div>

        {/* Days visual navigator grid */}
        <div className="glass-panel rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Kamp Takvimi Günleri</h3>
          
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {campSyllabus.map(day => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIndex(day.dayNumber)}
                className={`h-11 rounded-xl text-xs font-bold transition flex items-center justify-center relative select-none cursor-pointer border ${day.dayNumber === activeDayIndex ? 'glow-button border-transparent scale-105 z-10 text-white' : day.isCompleted ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/35' : 'glass-pill hover:border-red-500 text-slate-600 dark:text-slate-300'}`}
              >
                {day.dayNumber}
                {day.isCompleted && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-black text-white border border-white">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day View Details Card */}
        <div className="glass-panel rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] bg-red-500/15 text-red-650 dark:text-red-400 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                GÜN {activeDay.dayNumber} HEDEFİ
              </span>
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg leading-tight mt-1.5">{activeDay.title}</h3>
            </div>

            <button
              onClick={handleToggleDay}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${activeDay.isCompleted ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'glow-button text-white'}`}
            >
              {activeDay.isCompleted ? (
                <>✓ Günü Tamamladın</>
              ) : (
                <>Günü Bitir (+100 XP)</>
              )}
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-mono">Bugün Yapılacaklar Listesi:</p>
            
            <div className="space-y-2.5">
              {activeDay.tasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 text-xs">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-3 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                    {index + 1}
                  </span>
                  <p className="text-slate-700 dark:text-slate-200 font-semibold leading-relaxed pt-0.5">{task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Column 3: CALENDAR TARGET PLANNING */}
      <div className="space-y-6">
        
        {/* Dynamic Targets Setup Card */}
        <div className="glass-panel rounded-2xl p-6 shadow-sm space-y-5">
          
          <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-600" />
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Müfredat Hedefleri</h3>
            </div>

            <button 
              onClick={() => {
                setInputDailyMins(targets.dailyActiveMinutesTarget);
                setInputDailyQ(targets.dailyQuestionsTarget);
                setInputWeeklyQ(targets.weeklyQuestionsTarget);
                setShowEditTargets(!showEditTargets);
              }}
              className="p-1.5 hover:bg-red-500/10 rounded text-slate-500 transition cursor-pointer"
              title="Hedefleri Düzenle"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          </div>

          {showEditTargets ? (
            <form onSubmit={handleFormTargetsSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Günlük Süre Hedefi (Dakika)</label>
                <input 
                  type="number" 
                  min={5} 
                  max={480}
                  required
                  value={inputDailyMins}
                  onChange={(e) => setInputDailyMins(parseInt(e.target.value) || 0)}
                  className="w-full text-xs glass-input rounded-xl p-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Günlük Soru Hedefi</label>
                <input 
                  type="number" 
                  min={1} 
                  max={500}
                  required
                  value={inputDailyQ}
                  onChange={(e) => setInputDailyQ(parseInt(e.target.value) || 0)}
                  className="w-full text-xs glass-input rounded-xl p-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Haftalık Soru Hedefi</label>
                <input 
                  type="number" 
                  min={10} 
                  max={5000}
                  required
                  value={inputWeeklyQ}
                  onChange={(e) => setInputWeeklyQ(parseInt(e.target.value) || 0)}
                  className="w-full text-xs glass-input rounded-xl p-2 focus:outline-none"
                />
              </div>

              <div className="flex gap-1.5 justify-end pt-1">
                <button 
                  type="button" 
                  onClick={() => setShowEditTargets(false)} 
                  className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-black/5 dark:bg-white/5 rounded"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  className="px-3.5 py-1.5 text-[10px] font-bold text-white bg-red-600 hover:bg-red-700 rounded transition cursor-pointer"
                >
                  Güncelle
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl glass-subcard">
                <Hourglass className="h-4.5 w-4.5 text-neutral-400" />
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider font-mono">Günlük Min. Çalışma</span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{targets.dailyActiveMinutesTarget} dakika</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl glass-subcard">
                <CheckSquare className="h-4.5 w-4.5 text-neutral-400" />
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider font-mono">Günlük Soru Hedefi</span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{targets.dailyQuestionsTarget} adet</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl glass-subcard">
                <Calendar className="h-4.5 w-4.5 text-neutral-400" />
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider font-mono">Haftalık Soru Hedefi</span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{targets.weeklyQuestionsTarget} adet</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Camp motivators block */}
        <div className="bg-gradient-to-br from-white/30 to-red-500/5 dark:from-white/5 dark:to-red-500/5 rounded-2xl border border-red-550/25 p-5 space-y-3">
          <h4 className="font-bold text-red-800 dark:text-red-400 text-xs flex items-center gap-1.5 font-sans">
            <Flame className="h-4 w-4 text-orange-500" />
            <span>Kazanma Disiplini</span>
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
            KPSS sınavında rakiplerinizin önüne geçmek istiyorsanız her gün düzenli olarak 1 saat kamp planına sadık kalıp 1 ünite derin analiz yapmalısınız. Unutmayın, tarih dersi çalışılmadığı an hızla uçup gider.
          </p>
        </div>

      </div>

    </div>
  );
}
