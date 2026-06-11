import React, { useState, useEffect } from 'react';
import { 
  History, 
  Timer, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  Play,
  Award
} from 'lucide-react';
import { TopicModule, Question } from '../types';

interface PracticeExamProps {
  topics: TopicModule[];
  onAddXp: (amount: number, isCorrect: boolean, isFirstTime: boolean) => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean) => void;
}

export default function PracticeExam({ topics, onAddXp, onRecordAnswer }: PracticeExamProps) {
  
  // Setup phase vs Active exam vs Results phase
  const [examState, setExamState] = useState<'setup' | 'active' | 'results'>('setup');
  const [examLength, setExamLength] = useState<30 | 60 | 120>(30);
  
  const [examQuestions, setExamQuestions] = useState<{ question: Question, topicTitle: string, topicId: number }[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: 'A' | 'B' | 'C' | 'D' | 'E' } | null>(null);

  // Chronometer
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins default
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Gather a completely randomized pool of questions from all active modules
  const handleStartExam = () => {
    // Collect all questions
    const allPool: { question: Question, topicTitle: string, topicId: number }[] = [];
    topics.forEach(t => {
      // include questions
      t.questions.forEach(q => {
        allPool.push({ question: q, topicTitle: t.title, topicId: t.id });
      });
      // also include past questions mapped to general structure
      t.pastQuestions.forEach(pq => {
        allPool.push({
          question: {
            id: pq.id,
            difficulty: 'Orta',
            questionText: `[ÖSYM Çıkmış Soru] ${pq.questionText}`,
            options: pq.options,
            correctAnswer: pq.correctAnswer,
            explanation: pq.explanation
          },
          topicTitle: t.title,
          topicId: t.id
        });
      });
    });

    if (allPool.length === 0) {
      alert("Havuzda henüz deneme sorusu bulunmamaktadır.");
      return;
    }

    // Shuffle pool
    const shuffled = [...allPool].sort(() => 0.5 - Math.random());
    // slice
    const selected = shuffled.slice(0, Math.min(examLength, shuffled.length));

    setExamQuestions(selected);
    setUserAnswers({});
    setCurrentIdx(0);
    setTimeLeft(examLength === 30 ? 45 * 60 : examLength === 60 ? 90 * 60 : 135 * 60);
    setTimeSpent(0);
    setExamState('active');
    setTimerActive(true);
  };

  // Timer runner
  useEffect(() => {
    let interval: any = null;
    if (timerActive && examState === 'active') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, examState]);

  const handleSelectAnswer = (option: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (examState !== 'active') return;
    const currentQ = examQuestions[currentIdx].question;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const handleFinishExam = () => {
    setTimerActive(false);
    setExamState('results');

    // Calculate final scores and report
    let correctCount = 0;
    
    examQuestions.forEach(item => {
      const q = item.question;
      const userSel = userAnswers ? userAnswers[q.id] : null;
      const isCorrect = userSel === q.correctAnswer;
      
      onRecordAnswer(q.id, isCorrect);
      if (isCorrect) {
        correctCount++;
      }
    });

    // Award mass XP! (e.g. 100 XP base + 10 XP per correct answer)
    const bonusXp = 100 + (correctCount * 12);
    // Submit
    onAddXp(bonusXp, true, true);
  };

  // Chronometer formatter
  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Results calculation variables
  const totalQuestions = examQuestions.length;
  const answeredCount = userAnswers ? Object.keys(userAnswers).length : 0;
  const blankCount = totalQuestions - answeredCount;
  
  const correctCount = userAnswers ? examQuestions.filter(item => {
    const qId = item.question.id;
    return userAnswers[qId] === item.question.correctAnswer;
  }).length : 0;

  const incorrectCount = answeredCount - correctCount;

  // Compile topic errors from Results to list Weakest Subjects
  const examWeakSubjects = React.useMemo(() => {
    if (examState !== 'results') return [];
    const errorsMap: { [topicTitle: string]: { topicId: number, count: number } } = {};
    
    examQuestions.forEach(item => {
      const q = item.question;
      const userSel = userAnswers ? userAnswers[q.id] : null;
      if (userSel && userSel !== q.correctAnswer) {
        if (!errorsMap[item.topicTitle]) {
          errorsMap[item.topicTitle] = { topicId: item.topicId, count: 0 };
        }
        errorsMap[item.topicTitle].count++;
      }
    });

    return Object.keys(errorsMap).map(title => ({
      title,
      topicId: errorsMap[title].topicId,
      count: errorsMap[title].count
    })).sort((a, b) => b.count - a.count);
  }, [examState, examQuestions, userAnswers]);

  return (
    <div className="space-y-6">
      
      {/* 1. SETUP STATE */}
      {examState === 'setup' && (
        <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 mb-2">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900">KPSS ÖSYM Proba Deneme Sınavı</h2>
            <p className="text-xs text-neutral-400">Tüm tarih müfredatını kapsayan, süre ayarlı gerçekçi sınav simülatörü.</p>
          </div>

          <div className="border-t border-neutral-100 pt-6 space-y-6">
            
            {/* Length selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">Soru Sayısı Seçiniz</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: 30, desc: "Hızlı Tarama (45 dk)" },
                  { size: 60, desc: "Yarım Deneme (90 dk)" },
                  { size: 120, desc: "Sınav Probası (135 dk)" }
                ].map(opt => (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={() => setExamLength(opt.size as any)}
                    className={`p-4 rounded-2xl border text-center transition cursor-pointer select-none ${examLength === opt.size ? 'border-red-600 bg-red-50/20 text-red-700 font-bold' : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300'}`}
                  >
                    <span className="text-lg block mb-0.5">{opt.size} Soru</span>
                    <span className="text-[10px] text-neutral-400 font-medium block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* High level tips banner */}
            <div className="p-4 bg-amber-50 rounded-2xl text-xs text-amber-900 border border-amber-100 space-y-1.5 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600" />
                <span>Simülasyon Bilgileri</span>
              </div>
              <p className="text-xs">
                * Sorular tüm KPSS ünitelerinden tesadüfi olarak seçilir.<br />
                * Yanlış cevaplarınız kaydedilerek <strong>zayıf konularınız</strong> anlık tespit edilecektir.<br />
                * Sınav esnasında sayfadan çıkmamanız veya yenilememeniz önerilmektedir.
              </p>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-2xl tracking-wider text-sm uppercase shadow-md hover:scale-101 active:scale-99 transition flex items-center justify-center gap-2"
              id="start-exam-trigger"
            >
              <Play className="h-4.5 w-4.5 fill-white" /> Sınavı Başlat
            </button>
          </div>
        </div>
      )}

      {/* 2. ACTIVE EXAM STATE */}
      {examState === 'active' && examQuestions.length > 0 && (
        <div className="bg-white rounded-3xl border border-neutral-100 p-6 md:p-8 shadow-sm space-y-6">
          
          {/* Exam Status Header HUD */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1">
              <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Gerçek Zamanlı Deneme
              </span>
              <h3 className="font-bold text-neutral-800 text-base flex items-center gap-1.5 mt-1">
                <span>Ünite:</span> 
                <span className="text-red-600 truncate max-w-xs">{examQuestions[currentIdx].topicTitle}</span>
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold shrink-0">
              {/* Chrono wrapper */}
              <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border ${timeLeft < 180 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-neutral-50 border-neutral-200 text-neutral-700'}`}>
                <Timer className="h-4 w-4" />
                <span className="font-bold font-mono text-sm">{formatTime(timeLeft)}</span>
              </div>

              <div className="px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700">
                Soru: <span className="font-bold">{currentIdx + 1} / {examQuestions.length}</span>
              </div>
            </div>
          </div>

          {/* Soru İçeriği */}
          <div className="space-y-5">
            <div className="p-5 bg-neutral-50 border border-neutral-100 rounded-2xl">
              <p className="text-xs text-neutral-400 font-mono">SORU {currentIdx + 1}</p>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-800 leading-relaxed mt-2">
                {examQuestions[currentIdx].question.questionText}
              </h4>
            </div>

            {/* Answer select list */}
            <div className="grid grid-cols-1 gap-2.5">
              {Object.entries(examQuestions[currentIdx].question.options).map(([key, val]) => {
                const isSelected = userAnswers ? userAnswers[examQuestions[currentIdx].question.id] === key : false;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectAnswer(key as any)}
                    className={`w-full flex items-start gap-3 p-3.5 border transition text-left rounded-xl text-xs ${isSelected ? 'border-red-600 bg-red-50 text-red-800 font-bold' : 'border-neutral-200 bg-white hover:border-neutral-300'}`}
                  >
                    <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${isSelected ? 'bg-red-600 text-white' : 'bg-neutral-100 text-neutral-400'}`}>
                      {key}
                    </span>
                    <span className="leading-relaxed">{val}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controllers */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-100 pt-5">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {examQuestions.map((_, i) => {
                const isCurrent = currentIdx === i;
                const isAnswered = userAnswers && userAnswers[examQuestions[i].question.id];
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-6.5 h-6 rounded text-[9px] font-bold shrink-0 transition ${isCurrent ? 'bg-red-600 text-white' : isAnswered ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="px-3.5 py-2.5 border border-neutral-200 text-xs font-bold rounded-xl hover:bg-neutral-50 disabled:opacity-40 transition"
              >
                Geri
              </button>

              {currentIdx < examQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition"
                >
                  Sonraki
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishExam}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold rounded-xl transition shadow-xs cursor-pointer"
                  id="exam-finish-trigger"
                >
                  Sınavı Bitir
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* 3. RESULTS STATE */}
      {examState === 'results' && (
        <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm space-y-8">
          
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 mb-2">
              <Award className="h-6 w-6 animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-neutral-950">Deneme Sınavı Tamamlandı!</h2>
            <p className="text-xs text-neutral-400">Sonuçlarınız özetlendi, yapay zeka analiz raporunuz aşağıda listelenmiştir.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50 text-center border border-emerald-100">
              <span className="text-xs text-emerald-800 font-bold block uppercase tracking-wide">Doğru Sayısı</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">{correctCount}</span>
            </div>
            <div className="p-4 rounded-2xl bg-red-50 text-center border border-red-100">
              <span className="text-xs text-red-800 font-bold block uppercase tracking-wide">Yanlış Sayısı</span>
              <span className="text-2xl font-black text-red-600 mt-1 block">{incorrectCount}</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 text-center border border-neutral-150">
              <span className="text-xs text-neutral-500 font-bold block uppercase tracking-wide">Boş Soru</span>
              <span className="text-2xl font-black text-neutral-800 mt-1 block">{blankCount}</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 text-center border border-neutral-150">
              <span className="text-xs text-neutral-500 font-bold block uppercase tracking-wide">Çözüm Süresi</span>
              <span className="text-2xl font-black text-neutral-800 mt-1 block font-mono">{formatTime(timeSpent)}</span>
            </div>
          </div>

          {/* Weak subject reporting derived from actual missed exam questions */}
          <div className="border-t border-neutral-100 pt-6 space-y-4">
            <h3 className="font-extrabold text-neutral-800 text-base">Zayıf Konu Tespit Raporu</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Sınavda en çok yanlış yaptığınız konular aşağıda sıralanmıştır. Bu kısımlar <strong>Öğrenme Algoritması</strong> kapsamında hafıza kartı havuzlarına daha yüksek gösterim oranıyla otomatik olarak eklenecektir.
            </p>

            {examWeakSubjects.length > 0 ? (
              <div className="space-y-2">
                {examWeakSubjects.map((sub, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-neutral-100 bg-neutral-50/50 rounded-xl">
                    <span className="text-xs font-bold text-neutral-700">{sub.title}</span>
                    <span className="text-xs font-bold text-red-600 bg-red-100/50 px-2.5 py-0.5 rounded-md">
                      {sub.count} Hata
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-emerald-50 rounded-xl p-4 text-xs text-emerald-900 border border-emerald-100 font-medium">
                Tebrikler! Sınavda kritik bir hata odağı birikmedi, mükemmel başarı!
              </div>
            )}
          </div>

          {/* Action trigger */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => setExamState('setup')}
              className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="h-4 w-4" /> Yeni Sınav Başlat
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
