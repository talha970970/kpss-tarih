import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  GitMerge, 
  History, 
  Compass, 
  HelpCircle, 
  MessageSquareCode, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw, 
  Plus, 
  Sparkles, 
  HelpCircle as QuestionIcon,
  ChevronDown,
  Info
} from 'lucide-react';
import { TopicModule, Flashcard, Question, PastQuestion } from '../types';

interface TopicViewProps {
  topic: TopicModule;
  onAddXp: (amount: number, isCorrect: boolean, isFirstTime: boolean) => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean) => void;
  storageData: any;
  onSaveCustomFlashcard: (card: Flashcard) => void;
}

export default function TopicView({ 
  topic, 
  onAddXp, 
  onRecordAnswer, 
  storageData, 
  onSaveCustomFlashcard 
}: TopicViewProps) {
  
  // Tab indexing
  const [activeTab, setActiveTab] = useState<number>(0);

  // Reset inner tab states when topic change
  useEffect(() => {
    setActiveTab(0);
    setFlashcardIndex(0);
    setCardFlipped(false);
    setSelectedDifficulty('Orta');
    setQuizAnsweredId(null);
    setSelectedAnswer(null);
    setAiOutput('');
    setAiLoading(false);
    setAiQuestionActive(null);
    setAiQuestionUserAnswer(null);
  }, [topic]);

  const tabs = [
    { label: "Konu Anlatımı", icon: BookOpen },
    { label: "Mantık Haritası", icon: GitMerge },
    { label: "Kronoloji", icon: History },
    { label: "Ezber Kolaylaştırıcı", icon: Compass },
    { label: "Flashcards", icon: RefreshCw },
    { label: "Soru Bankası", icon: HelpCircle },
    { label: "Çıkmış Sorular", icon: CheckCircle2 },
    { label: "Yapay Zeka Koçu", icon: MessageSquareCode },
  ];

  // ----------------------------------------------------
  // TAB 5: FLASHCARD STATE
  // ----------------------------------------------------
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [customFront, setCustomFront] = useState('');
  const [customBack, setCustomBack] = useState('');
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  // Merge built-in flashcards with user created custom flashcards
  const allFlashcards = React.useMemo(() => {
    const builtIn = topic.flashcards;
    const customs = storageData.customFlashcards || [];
    // Just a clean merge of user custom cards that might tag this topic (or general ones)
    return [...builtIn, ...customs];
  }, [topic, storageData.customFlashcards]);

  const handleNextCard = () => {
    setCardFlipped(false);
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev + 1) % (allFlashcards.length || 1));
    }, 200);
  };

  const handlePrevCard = () => {
    setCardFlipped(false);
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev === 0 ? (allFlashcards.length - 1) : prev - 1));
    }, 200);
  };

  const handleCreateCustomCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFront.trim() || !customBack.trim()) return;

    const newCard: Flashcard = {
      id: `custom_${Date.now()}`,
      front: customFront.trim(),
      back: customBack.trim()
    };

    onSaveCustomFlashcard(newCard);
    setCustomFront('');
    setCustomBack('');
    setShowAddCardModal(false);
    onAddXp(15, true, true); // give XP for creating cards
  };

  // ----------------------------------------------------
  // TAB 6: SORU BANKASI (LOCAL MULTIPLE CHOICE)
  // ----------------------------------------------------
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Kolay' | 'Orta' | 'Zor'>('Orta');
  const [quizAnsweredId, setQuizAnsweredId] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(null);

  // Filtered Questions list
  const filteredQuestions = React.useMemo(() => {
    const list = topic.questions.filter(q => q.difficulty === selectedDifficulty);
    if (list.length === 0 && topic.questions.length > 0) {
      // Fallback if this precompiled topic doesn't have that exact difficulty
      return topic.questions;
    }
    return list;
  }, [topic.questions, selectedDifficulty]);

  const [questionPointer, setQuestionPointer] = useState(0);

  // Ensure pointer doesn't overflow if filtered list changes
  useEffect(() => {
    setQuestionPointer(0);
    setQuizAnsweredId(null);
    setSelectedAnswer(null);
  }, [selectedDifficulty]);

  const activeQuestion = filteredQuestions[questionPointer];

  const handleAnswerSubmit = (option: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (quizAnsweredId) return; // already answered
    setSelectedAnswer(option);
    setQuizAnsweredId(activeQuestion.id);

    const isCorrect = option === activeQuestion.correctAnswer;
    onRecordAnswer(activeQuestion.id, isCorrect);
    onAddXp(isCorrect ? 25 : 5, isCorrect, true); // Correct gives 25 XP, incorrect gives 5 XP
  };

  const handleNextQuestion = () => {
    setQuizAnsweredId(null);
    setSelectedAnswer(null);
    setQuestionPointer((prev) => (prev + 1) % filteredQuestions.length);
  };

  // ----------------------------------------------------
  // TAB 7: ÇIKMİŞ SORULAR
  // ----------------------------------------------------
  const [pastAnsweredId, setPastAnsweredId] = useState<string | null>(null);
  const [pastSelectedAnswer, setPastSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(null);
  const [pastPointer, setPastPointer] = useState(0);

  const activePastQuestion = topic.pastQuestions && topic.pastQuestions.length > 0 
    ? topic.pastQuestions[pastPointer] 
    : null;

  const handlePastAnswerSubmit = (option: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (!activePastQuestion || pastAnsweredId) return;
    setPastSelectedAnswer(option);
    setPastAnsweredId(activePastQuestion.id);

    const isCorrect = option === activePastQuestion.correctAnswer;
    onRecordAnswer(activePastQuestion.id, isCorrect);
    onAddXp(isCorrect ? 30 : 10, isCorrect, true); // past questions yield high XP
  };

  // ----------------------------------------------------
  // TAB 8: YAPAY ZEKA KOÇU (SERVER API CHAT)
  // ----------------------------------------------------
  const [aiMessage, setAiMessage] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);

  // Artificial generated exam question holder
  const [aiQuestionActive, setAiQuestionActive] = useState<any | null>(null);
  const [aiQuestionUserAnswer, setAiQuestionUserAnswer] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(null);

  const callAiCoachAPI = async (actionType: 'ask' | 'summary' | 'generate_question' | 'engine', messageContent?: string) => {
    setAiLoading(true);
    setAiOutput('');
    try {
      const response = await fetch("/api/gemini/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicTitle: topic.title,
          action: actionType,
          userMessage: messageContent || ""
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Geri akış hatası oluştu.");
      }

      if (actionType === 'generate_question') {
        if (data.payload && data.payload.questionText) {
          setAiQuestionActive(data.payload);
          setAiQuestionUserAnswer(null);
          setAiOutput("İşte yapay zeka tarafından senin için üretilen benzersiz KPSS sorusu:");
        } else {
          setAiOutput(data.text || "Soru üretilemedi, lütfen tekrar deneyiniz.");
        }
      } else {
        setAiOutput(data.text);
        if (actionType === 'ask' && messageContent) {
          setChatHistory(prev => [
            ...prev,
            { role: 'user', text: messageContent },
            { role: 'assistant', text: data.text }
          ]);
        }
      }
    } catch (err: any) {
      setAiOutput(`⚠️ Yapay Zeka Hatası: ${err.message || "Bilinmeyen bir hata gerçekleşti."}`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSendCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    const msg = aiMessage.trim();
    setAiMessage('');
    callAiCoachAPI('ask', msg);
  };

  return (
    <div className="glass-panel rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[580px]">
      
      {/* Side Tabs Rail */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 bg-white/10 dark:bg-slate-950/10 p-4 shrink-0 space-y-1">
        <div className="px-3.5 py-3 mb-2">
          <span className="text-[10px] font-bold text-red-650 dark:text-red-400 block uppercase tracking-wider font-mono">Modül İçeriği</span>
          <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 line-clamp-2 mt-0.5" title={topic.title}>{topic.title}</h2>
        </div>

        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1 pb-2 md:pb-0 scrollbar-none">
          {tabs.map((tab, idx) => {
            const IconComponent = tab.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-3 w-full px-3.5 py-3 rounded-xl font-bold text-xs transition whitespace-nowrap md:whitespace-normal select-none cursor-pointer ${isSelected ? 'glow-button text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <IconComponent className={`h-4.5 w-4.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Stage */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between" id="learning-stage-view">
        
        {/* Tab content switch */}
        <div className="flex-1">
              {/* TAB 1: KONU ANLATIMI */}
          {activeTab === 0 && (
            <div className="space-y-6">
              <div className="prose max-w-none">
                <span className="text-xs font-bold text-red-650 tracking-wider block uppercase">Akademik Ders Notu</span>
                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 leading-snug">{topic.title}</h3>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed mt-4 text-base antialiased font-semibold">
                  {topic.summary}
                </p>
              </div>

              {/* Colorful Sınav Kutuları */}
              <div className="space-y-4 pt-4">
                <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-red-605"></span>
                  ÖSYM Sınavı Altın Notları (Kurşun Bilgiler)
                </h4>

                <div className="grid grid-cols-1 gap-3.5">
                  {topic.keyNotes.map((note, idx) => {
                    const colorClasses = [
                      "border-l-4 border-red-500 bg-red-500/5 text-slate-800 dark:text-slate-200",
                      "border-l-4 border-amber-500 bg-amber-500/5 text-slate-800 dark:text-slate-200",
                      "border-l-4 border-rose-500 bg-rose-500/5 text-slate-800 dark:text-slate-200",
                      "border-l-4 border-emerald-500 bg-emerald-500/5 text-slate-800 dark:text-slate-200",
                    ];
                    const selectedColor = colorClasses[idx % colorClasses.length];
                    
                    return (
                      <div key={idx} className={`p-4 rounded-xl text-xs font-semibold leading-relaxed border border-black/5 dark:border-white/5 backdrop-blur-xs ${selectedColor}`}>
                        <div className="flex items-start gap-2.5">
                          <span className="font-extrabold text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded shadow-3xs shrink-0 select-none">TÜYO {idx + 1}</span>
                          <span>{note}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANTIK HARİTASI */}
          {activeTab === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-red-650 tracking-wider block uppercase">Öğrenme Kolaylaştırıcı</span>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">Olayların Sebep - Sonuç ve Etki Döngüleri</h3>
                <p className="text-xs text-slate-400 mt-1">KPSS soruları doğrudan olayların mantıksal sıralamasını ve analizini test eder.</p>
              </div>

              <div className="relative border-l-2 border-dashed border-red-500/20 pl-6 ml-4 space-y-8 py-4">
                {topic.logicMap.map((flow, index) => (
                  <div key={index} className="relative">
                    {/* Circle badge */}
                    <span className="absolute -left-10 top-0.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:text-red-400 font-extrabold text-xs">
                      {index + 1}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Cause */}
                      <div className="glass-subcard border border-black/5 dark:border-white/5 rounded-xl p-4">
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1 font-mono">Sebep</span>
                        <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">{flow.cause}</p>
                      </div>

                      {/* Effect */}
                      <div className="glass-subcard border border-red-500/10 rounded-xl p-4">
                        <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-1 font-mono">Sonuç (Gelişme)</span>
                        <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">{flow.effect}</p>
                      </div>

                      {/* Impact */}
                      <div className="bg-red-500/10 border border-red-500/25 rounded-xl p-4">
                        <span className="text-[10px] font-bold text-red-650 dark:text-red-400 uppercase tracking-widest block mb-1 font-mono">KPSS Odak Noktası (Etki)</span>
                        <p className="text-xs text-slate-800 dark:text-slate-100 font-extrabold leading-relaxed">{flow.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: KRONOLOJİ */}
          {activeTab === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-red-650 tracking-wider block uppercase">Zaman Çizelgesi</span>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">Tarihsel Kronoloji Akışı</h3>
                <p className="text-xs text-slate-400 mt-1">Olayların oluş sırası hafızayı güçlendirir ve karşılaştırmalı sorularda kazandırır.</p>
              </div>

              {topic.chronology && topic.chronology.length > 0 ? (
                <div className="space-y-3 pt-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-none">
                  {topic.chronology.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-3.5 glass-subcard rounded-xl hover:border-red-500/30 transition-all"
                    >
                      <span className="w-24 shrink-0 text-sm font-bold text-red-650 dark:text-red-400 bg-red-500/15 px-3 py-1.5 rounded-lg text-center select-none shadow-3xs font-mono">
                        {item.year}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 glass-panel rounded-2xl border border-black/5 dark:border-white/5">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Bu üniteye özel kronoloji maddeleri güncellenmektedir.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EZBER KOLAYLAŞTIRICI */}
          {activeTab === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-red-650 tracking-wider block uppercase">Hafıza Teknikleri</span>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">Sınav Akrostişleri ve Kodlamalar</h3>
                <p className="text-xs text-slate-400 mt-1">Kalıcı öğrenme için karmaşık kelime kümelerini akılda kalıcı formüllere dönüştürün.</p>
              </div>

              {topic.mnemonics && topic.mnemonics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topic.mnemonics.map((mne, index) => (
                    <div 
                      key={index} 
                      className="glass-panel border border-black/5 dark:border-white/5 rounded-xl p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="inline-flex items-center gap-1 bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded mb-3 font-mono">
                          <Info className="h-3 w-3" /> Akrostiş Şifre
                        </div>
                        <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">{mne.title}</h4>
                        
                        <div className="my-3.5 p-3.5 bg-red-500/10 text-red-600 dark:text-red-400 font-extrabold text-xs rounded-lg text-center tracking-wide shadow-sm border border-red-500/20 uppercase font-mono">
                          &quot;{mne.phrase}&quot;
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed pt-2 border-t border-dashed border-black/5 dark:border-white/5 mt-2 font-semibold">
                        {mne.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 glass-panel rounded-2xl border border-black/5 dark:border-white/5">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Bu üniteye özel ek akrostiş kodlaması bulunmuyor. Yeni kodlamanızı Flashcard bölümünden yaratabilirsiniz!</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: FLASHCARD */}
          {activeTab === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-red-650 tracking-wider block uppercase">Hızlı Soru Cevap</span>
                  <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">Etkin Geri Çağırma Kartları</h3>
                  <p className="text-xs text-slate-450 mt-1">Karta tıklayarak cevabını çevirin, hafızanızı anlık test edin.</p>
                </div>

                <button 
                  onClick={() => setShowAddCardModal(true)} 
                  className="px-3.5 py-2 glow-button text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Kart Ekle
                </button>
              </div>

              {allFlashcards.length > 0 ? (
                <div className="flex flex-col items-center py-2 max-w-md mx-auto">
                  {/* Card perspective view */}
                  <div 
                    onClick={() => setCardFlipped(!cardFlipped)}
                    className="w-full h-56 relative cursor-pointer select-none flip-card-container"
                  >
                    <div className={`w-full h-full rounded-2xl border p-6 flex flex-col justify-between items-center text-center transition-all duration-300 shadow-sm relative overflow-hidden ${cardFlipped ? 'bg-red-600/90 text-white border-red-700 backdrop-blur-md' : 'glass-panel text-slate-800 dark:text-slate-100 border-black/5 dark:border-white/5'}`}>
                      {/* Card side badge */}
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${cardFlipped ? 'bg-red-800/80 text-red-200' : 'bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-350'}`}>
                        {cardFlipped ? "Cevap" : "Soru"}
                      </span>

                      {/* BodyText */}
                      <p className={`text-base font-bold leading-relaxed px-2 transition-all ${cardFlipped ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                        {cardFlipped ? allFlashcards[flashcardIndex].back : allFlashcards[flashcardIndex].front}
                      </p>

                      {/* Footer Info */}
                      <span className="text-[10px] font-medium opacity-65">
                        {cardFlipped ? "Geri dönmek için tıkla" : "Cevabı görmek için tıkla"}
                      </span>
                    </div>
                  </div>

                  {/* Controller */}
                  <div className="flex items-center justify-between w-full mt-5">
                    <button 
                      onClick={handlePrevCard} 
                      className="p-2.5 rounded-full border border-black/5 dark:border-white/5 bg-white/20 dark:bg-slate-900/20 hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                      title="Önceki"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 select-none font-mono">
                      {flashcardIndex + 1} / {allFlashcards.length}
                    </span>

                    <button 
                      onClick={handleNextCard} 
                      className="p-2.5 rounded-full border border-black/5 dark:border-white/5 bg-white/20 dark:bg-slate-900/20 hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                      title="Sonraki"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 glass-panel rounded-2xl border border-black/5 dark:border-white/5">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium font-mono">Şu an gösterilecek kart bulunmuyor. Kendi kartınızı ekleyebilirsiniz!</p>
                </div>
              )}

              {/* Popup modal to add custom flashcards */}
              {showAddCardModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
                  <div className="glass-panel border border-black/5 dark:border-white/5 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
                    <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-100">Özel Hafıza Kartı Ekle</h4>
                    <p className="text-xs text-slate-450">Bu kısımdan ünite kapsamında dilediğin soruyu ve cevabını ekleyebilirsin.</p>
                    
                    <form onSubmit={handleCreateCustomCard} className="space-y-4.5">
                      <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Kartın Önü (Soru veya Kavram)</label>
                        <input 
                          type="text" 
                          required 
                          value={customFront}
                          onChange={(e) => setCustomFront(e.target.value)}
                          placeholder="Örn: Sened-i İttifak kiminle yapıldı?"
                          className="w-full text-xs glass-input rounded-xl p-2.5 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Kartın Arkası (Cevap veya Açıklama)</label>
                        <textarea 
                          rows={2} 
                          required
                          value={customBack}
                          onChange={(e) => setCustomBack(e.target.value)}
                          placeholder="Örn: II. Mahmut ve Ayanlar arasında."
                          className="w-full text-xs glass-input rounded-xl p-2.5 focus:outline-none resize-none"
                        ></textarea>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        <button 
                          type="button" 
                          onClick={() => setShowAddCardModal(false)}
                          className="px-3.5 py-2 text-xs font-bold text-slate-500 dark:text-slate-450 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg cursor-pointer"
                        >
                          İptal
                        </button>
                        <button 
                          type="submit" 
                          className="px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer transition shadow-xs"
                        >
                          Kartı Kaydet
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SORU BANKASI */}
          {activeTab === 5 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 dark:border-white/5 pb-3">
                <div>
                  <span className="text-xs font-bold text-red-650 tracking-wider block uppercase">Öğrenme Optimizasyonu</span>
                  <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">Geliştirici Soru Bankası</h3>
                </div>

                {/* Difficulty tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {(["Kolay", "Orta", "Zor"] as const).map(diff => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition text-nowrap select-none cursor-pointer ${selectedDifficulty === diff ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20' : 'bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400'}`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {activeQuestion ? (
                <div className="space-y-5">
                  <div className="p-4 glass-subcard rounded-2xl border border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded">SORU {questionPointer + 1} / {filteredQuestions.length}</span>
                      <span className="text-[10px] text-slate-450 font-semibold font-mono">Düzey: {activeQuestion.difficulty}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
                      {activeQuestion.questionText}
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {Object.entries(activeQuestion.options).map(([key, value]) => {
                      const optKey = key as 'A' | 'B' | 'C' | 'D' | 'E';
                      const isAnswered = quizAnsweredId !== null;
                      const isCorrectAnswer = optKey === activeQuestion.correctAnswer;
                      const isUserSelection = optKey === selectedAnswer;

                      // Decide style classes
                      let buttonStyle = "border-black/5 bg-white/5 dark:bg-white/2 hover:border-red-500/40 text-slate-700 dark:text-slate-200";
                      
                      if (isAnswered) {
                        if (isCorrectAnswer) {
                          buttonStyle = "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 font-bold";
                        } else if (isUserSelection) {
                          buttonStyle = "border-red-500/30 bg-red-500/10 text-red-650 dark:text-red-450 font-bold";
                        } else {
                          buttonStyle = "border-black/5 bg-transparent text-slate-400 opacity-40";
                        }
                      }

                      return (
                        <button
                          key={key}
                          disabled={isAnswered}
                          onClick={() => handleAnswerSubmit(optKey)}
                          className={`w-full flex items-start gap-3 p-3.5 border transition text-left rounded-xl text-xs cursor-pointer ${buttonStyle}`}
                        >
                          <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${isAnswered && isCorrectAnswer ? 'bg-emerald-600 text-white' : isAnswered && isUserSelection ? 'bg-red-600 text-white' : 'bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                            {key}
                          </span>
                          <span className="leading-relaxed font-semibold">{value}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanatory solution block */}
                  {quizAnsweredId !== null && (
                    <div className="p-4 border border-emerald-550/20 bg-emerald-500/5 dark:bg-emerald-500/8 backdrop-blur-md rounded-2xl space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-450 font-extrabold">
                        <CheckCircle2 className="h-4.5 w-4.5" />
                        <span>Ayrıntılı Çözüm ve KPSS Analizi</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                        {activeQuestion.explanation}
                      </p>

                      <div className="flex justify-end pt-3">
                        <button 
                          onClick={handleNextQuestion} 
                          className="px-4 py-2 glow-button text-white font-bold rounded-lg transition cursor-pointer"
                        >
                          Sıradaki Soruya Geç
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-10 glass-panel rounded-2xl border border-black/5 dark:border-white/5">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Bu düzeyde hazırlanmış soru bulunamadı. Yapay Zeka tabından anlık soru ürettirebilirsiniz!</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: ÇIKMIŞ SORULAR */}
          {activeTab === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-red-650 tracking-wider block uppercase">ÖSYM Arşivi</span>
                <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">ÖSYM Tarzı Çıkmış Sorular</h3>
                <p className="text-xs text-slate-450 mt-1">Gerçek KPSS sınavlarında benzer kurgularla çıkmış soruları tecrübe edin.</p>
              </div>

              {activePastQuestion ? (
                <div className="space-y-5">
                  <div className="p-4 glass-subcard rounded-2xl border border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] bg-red-650 text-white font-extrabold px-2.5 py-0.5 rounded">{activePastQuestion.year}</span>
                      <span className="text-[10px] text-slate-450 font-semibold font-mono">Çıkmış Soru {pastPointer + 1}/{topic.pastQuestions.length}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
                      {activePastQuestion.questionText}
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {Object.entries(activePastQuestion.options).map(([key, value]) => {
                      const optKey = key as 'A' | 'B' | 'C' | 'D' | 'E';
                      const isAnswered = pastAnsweredId !== null;
                      const isCorrectAnswer = optKey === activePastQuestion.correctAnswer;
                      const isUserSelection = optKey === pastSelectedAnswer;

                      let buttonStyle = "border-black/5 bg-white/5 dark:bg-white/2 hover:border-red-500/40 text-slate-700 dark:text-slate-200";
                      
                      if (isAnswered) {
                        if (isCorrectAnswer) {
                          buttonStyle = "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 font-bold";
                        } else if (isUserSelection) {
                          buttonStyle = "border-red-500/30 bg-red-500/10 text-red-650 dark:text-red-450 font-bold";
                        } else {
                          buttonStyle = "border-black/5 bg-transparent text-slate-400 opacity-40";
                        }
                      }

                      return (
                        <button
                          key={key}
                          disabled={isAnswered}
                          onClick={() => handlePastAnswerSubmit(optKey)}
                          className={`w-full flex items-start gap-3 p-3.5 border transition text-left rounded-xl text-xs cursor-pointer ${buttonStyle}`}
                        >
                          <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${isAnswered && isCorrectAnswer ? 'bg-emerald-600 text-white' : isAnswered && isUserSelection ? 'bg-red-600 text-white' : 'bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                            {key}
                          </span>
                          <span className="leading-relaxed font-semibold">{value}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Solution block */}
                  {pastAnsweredId !== null && (
                    <div className="p-4 border border-emerald-555/20 bg-emerald-500/5 dark:bg-emerald-500/8 backdrop-blur-md rounded-2xl space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-605 dark:text-emerald-450 font-extrabold">
                        <CheckCircle2 className="h-4.5 w-4.5" />
                        <span>KPSS Analiz ve ÖSYM Çözüm Yorumu</span>
                      </div>
                      <p className="text-slate-705 dark:text-slate-300 leading-relaxed font-semibold">
                        {activePastQuestion.explanation}
                      </p>

                      <div className="flex justify-end pt-3">
                        <button 
                          onClick={() => {
                            setPastAnsweredId(null);
                            setPastSelectedAnswer(null);
                            setPastPointer((prev) => (prev + 1) % topic.pastQuestions.length);
                          }} 
                          className="px-4 py-2 glow-button text-white font-bold rounded-lg transition cursor-pointer"
                        >
                          Sıradaki Soruya Geç
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-10 glass-panel rounded-2xl border border-black/5 dark:border-white/5">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Bu üniteye özel çıkmış soru şablonları hazırlanmaktadır. Diğer modüllerdeki çıkmış soruları oynamayı deneyin!</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: YAPAY ZEKA KOÇU */}
          {activeTab === 7 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-650 to-rose-650 p-5 rounded-2xl text-white shadow-sm border border-red-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-amber-200" />
                  <h3 className="font-extrabold text-base">Tarih Bilgi Motoru & Yapay Zeka Koçu</h3>
                </div>
                <p className="text-xs text-red-50 leading-relaxed font-semibold">
                  Şu an çalışılan ünite: <strong className="text-white underline decoration-dashed">{topic.title}</strong>. 
                  Üniteyle ilgili aklındaki tüm soruları yapay zekaya sorabilir, konu özeti çıkmasını isteyebilir veya sınav analizi yapacak tarih motorunu ateşleyebilirsin.
                </p>

                {/* AI Action Quick Actions */}
                <div className="flex flex-wrap gap-2.5 mt-4">
                  <button 
                    disabled={aiLoading}
                    onClick={() => callAiCoachAPI('summary')}
                    className="bg-white/95 dark:bg-slate-900/95 text-red-650 dark:text-red-300 hover:bg-neutral-50 disabled:opacity-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition shadow-xs"
                  >
                    Konu Özeti Çıkar
                  </button>

                  <button 
                    disabled={aiLoading}
                    onClick={() => callAiCoachAPI('engine')}
                    className="bg-red-800 text-white hover:bg-red-900 disabled:opacity-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer border border-red-700 transition"
                  >
                    Yapay Zekâ Tarih Motoru
                  </button>

                  <button 
                    disabled={aiLoading}
                    onClick={() => callAiCoachAPI('generate_question')}
                    className="bg-amber-500 text-neutral-905 hover:bg-amber-600 disabled:opacity-50 text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition"
                  >
                    Yeni Soru Türet
                  </button>
                </div>
              </div>

              {/* Interaction Panel */}
              <div className="space-y-4">
                
                {/* Loader status */}
                {aiLoading && (
                  <div className="flex items-center gap-2 justify-center py-6 glass-panel border border-dashed border-black/10 dark:border-white/10 rounded-2xl">
                    <span className="animate-spin text-lg">⏳</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold animate-pulse">Yapay Zeka Tarih Uzmanı analizini derinleştiriyor, lütfen bekleyin...</p>
                  </div>
                )}

                {/* Generated AI Question block */}
                {!aiLoading && aiQuestionActive && (
                  <div className="p-5 border border-amber-500/20 bg-amber-500/5 backdrop-blur-md rounded-2xl space-y-4 shadow-sm" id="ai-generated-quiz">
                    <div>
                      <span className="text-[9px] bg-amber-500 text-neutral-950 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Yapay Zekâ Sorusu</span>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed mt-2.5">
                        {aiQuestionActive.questionText}
                      </p>
                    </div>

                    {/* Dynamic choices */}
                    <div className="grid grid-cols-1 gap-2.5">
                      {Object.entries(aiQuestionActive.options || {}).map(([choiceKey, choiceValue]: [string, any]) => {
                        const optKey = choiceKey as 'A' | 'B' | 'C' | 'D' | 'E';
                        const isAnswered = aiQuestionUserAnswer !== null;
                        const isCorrect = optKey === aiQuestionActive.correctAnswer;
                        const isUserSelection = optKey === aiQuestionUserAnswer;

                        let style = "border-black/5 bg-white/5 dark:bg-white/2 hover:border-amber-400 text-slate-700 dark:text-slate-200";
                        if (isAnswered) {
                          if (isCorrect) style = "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 font-extrabold";
                          else if (isUserSelection) style = "border-red-500/30 bg-red-500/10 text-red-650 dark:text-red-450 font-extrabold";
                          else style = "border-black/5 bg-transparent text-slate-400 opacity-45";
                        }

                        const optionSubmit = () => {
                          if (isAnswered) return;
                          setAiQuestionUserAnswer(optKey);
                          const isCorrectAns = optKey === aiQuestionActive.correctAnswer;
                          onAddXp(isCorrectAns ? 45 : 10, isCorrectAns, true); // large XP for AI questions!
                        };

                        return (
                          <button
                            key={choiceKey}
                            disabled={isAnswered}
                            onClick={optionSubmit}
                            className={`w-full flex items-start gap-3 p-3 border transition text-left rounded-xl text-xs cursor-pointer ${style}`}
                          >
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-[10px] font-bold">
                              {choiceKey}
                            </span>
                            <span className="font-semibold">{choiceValue}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanatory solution */}
                    {aiQuestionUserAnswer !== null && (
                      <div className="p-4 border border-emerald-555/20 bg-emerald-500/5 dark:bg-emerald-500/8 backdrop-blur-md rounded-xl space-y-1.5 text-xs">
                        <p className="font-extrabold text-emerald-650 dark:text-emerald-400 flex items-center gap-1">🎖️ Yapay Zeka Hızlı Çözüm Odaklı Analizi</p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                          {aiQuestionActive.explanation}
                        </p>
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => {
                              setAiQuestionActive(null);
                              setAiQuestionUserAnswer(null);
                              setAiOutput("Soru tamamlandı. Soru türet butonuna basıp yeni bir soru ürettirebilirsin!");
                            }}
                            className="px-3.5 py-1.5 bg-neutral-900 dark:bg-slate-800 hover:bg-neutral-800 text-white rounded-lg font-bold cursor-pointer transition shadow-xs"
                          >
                            Kapat
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Plain Text Output block (Formatting support) */}
                {!aiLoading && !aiQuestionActive && aiOutput && (
                  <div className="p-5 glass-subcard rounded-2xl text-xs leading-relaxed space-y-3 prose max-w-none text-slate-800 dark:text-slate-200">
                    <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1 border-b border-black/5 dark:border-white/5 pb-2">
                      <span>🤖 Yapay Zekâ Eğitmeni Diyor ki:</span>
                    </div>
                    {/* Render basic custom line breaks & bold formatting without heavy parser */}
                    <div className="space-y-2 whitespace-pre-wrap font-semibold">
                      {aiOutput.split('\n').map((line, key) => {
                        // Very basic markdown translation for bold texts (e.g. **text**)
                        if (line.includes('**')) {
                          const parts = line.split('**');
                          return (
                            <p key={key}>
                              {parts.map((p, i) => i % 2 !== 0 ? <strong className="font-extrabold text-red-600 dark:text-red-400" key={i}>{p}</strong> : p)}
                            </p>
                          );
                        }
                        return <p key={key}>{line}</p>;
                      })}
                    </div>
                  </div>
                )}

                {/* Custom input ask block */}
                <form onSubmit={handleSendCustomQuestion} className="flex gap-2">
                  <input
                    type="text"
                    disabled={aiLoading}
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    placeholder="Soru yaz: 'Örn: Orhan Bey neden padişah oldu?' veya 'Talas savaşının sonucu nedir?'"
                    className="flex-1 text-xs glass-input p-3 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={aiLoading || !aiMessage.trim()}
                    className="px-4 py-3 glow-button text-white text-xs font-bold rounded-xl transition cursor-pointer shrink-0"
                  >
                    Sor
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
