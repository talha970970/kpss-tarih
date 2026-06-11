import { TopicModule } from '../types';

export const KPSS_TOPICS: TopicModule[] = [
  {
    id: 1,
    title: "İslamiyet Öncesi Türk Tarihi",
    summary: "İslamiyet öncesi dönem, Orta Asya coğrafyasında şekillenen konar-göçer Türk kültürünün temellerini oluşturur. Hunlar, Göktürkler ve Uygurlar gibi devletlerin idari, askeri ve kültürel yapıları KPSS tarih sorularının vazgeçilmezidir. Bu dönemde kut inancı, ikili teşkilat ve töre hukuku devlet yönetiminin temel direkleridir.",
    keyNotes: [
      "Asya Hun Devleti: Tarihte bilinen ilk Türk devletidir. Teoman kurucusu, METE HAN en parlak dönemidir (Onlu askeri sistem yerleşti).",
      "Kavimler Göçü (375): Roma İmparatorluğu ikiye ayrıldı, Avrupa Hun Devleti kuruldu, derebeylik ortaya çıktı.",
      "I. Göktürk Devleti: Türk adını resmi devlet ismi olarak kullanan İLK devlettir. Bumin Kağan kurucusudur.",
      "II. Göktürk (Kutluk) Devleti: Vezir Tonyukuk ve Bilge Kağan dönemleri. ORHUN ABİDELERİ bu dönemde yazıldı (İlk Türkçe yazılı belgeler).",
      "Uygur Devleti: Yerleşik hayata geçen ilk Türk devletidir. Maniheizm dinini kabul etmeleriyle savaşçılık özelliklerini kaybedip tarım ve sanata yöneldiler."
    ],
    logicMap: [
      {
        cause: "Orta Asya coğrafyasının sert ve kurak bozkır iklim şartları",
        effect: "Türklerin göçebe (konar-göçer) bir yaşam tarzı benimsemesi, hayvancılıkla ilgilenmesi",
        impact: "Savaşçı ve dinamik birlik özellikleri, taşınabilir sanat eserleri yapma zorunluluğu"
      },
      {
        cause: "Uygur hakanı Bögü Kağan'ın Maniheizm dinini kabul etmesi",
        effect: "Et yemenin ve savaşmanın yasaklandığı yeni bir dini inancın topluma yerleşmesi",
        impact: "Türklerin yerleşik hayata geçmesi, tapınaklar yapması, tarım ve matbaanın gelişmesi"
      }
    ],
    chronology: [
      { year: "MÖ 220", event: "Asya Hun Devleti'nin Bilinen Tarihi Başlangıcı" },
      { year: "375", event: "Kavimler Göçü ve Hunların Avrupa'ya İlerlemesi" },
      { year: "552", event: "I. Göktürk Devleti'nin Ötüken Merkezli Kurulması" },
      { year: "744", event: "Uygur Devleti'nin Karabalasagun Merkezli Kurulması" },
      { year: "840", event: "Uygur Devleti'nin Kırgızlar Tarafından Yıkılışı" }
    ],
    mnemonics: [
      {
        title: "Kendi Parasını Bastıran Türk Devletleri",
        phrase: "BÜG - Bagatarkan (Türgişler) ve Uygurlar / Göktürkler",
        explanation: "Tarihte kendi adına para bastıran Türk devlet adamı Türgiş hükümdarı Bagatarkan'dır. Para basımı bağımsızlık alametidir."
      }
    ],
    flashcards: [
      { id: "fc1_1", front: "Orhun Abideleri kimlerin adına dikilmiştir?", back: "Vezir Tonyukuk, Kültigin ve Bilge Kağan adına dikilmiştir." },
      { id: "fc1_2", front: "Tarihte yerleşik hayata geçen ilk Türk devleti hangisidir?", back: "Uygurlar (Maniheizm etkisiyle yerleşik yaşama geçtiler)." },
      { id: "fc1_3", front: "Eski Türklerde devlet işlerinin görüşüldüğü meclise ne ad verilir?", back: "Kurultay (Toy ya da Kengeş olarak da adlandırılır)." }
    ],
    questions: [
      {
        id: "q1_1",
        difficulty: "Kolay",
        questionText: "Aşağıdaki Türk devletlerinden hangisi Maniheizm inancını benimseyerek yerleşik hayata geçmiştir?",
        options: {
          A: "Asya Hun Devleti",
          B: "Uygurlar",
          C: "Göktürkler",
          D: "Türgişler",
          E: "Kırgızlar"
        },
        correctAnswer: "B",
        explanation: "Uygurlar, Bögü Kağan döneminde Maniheizm dinini kabul ederek tarım alanları oluşturmuş, tapınaklar kurmuş ve yerleşik hayata geçen ilk Türk devleti olmuştur."
      },
      {
        id: "q1_2",
        difficulty: "Orta",
        questionText: "Orhun Yazıtları'nda kullanılan üslup ve verilen mesajlar dikkate alındığında, bu abidelerin aşağıdaki devletlerden hangisinin döneminde yazıldığı görülür?",
        options: {
          A: "Asya Hun Devleti",
          B: "Uygur Devleti",
          C: "Karahanlı Devleti",
          D: "Kutluk (II. Göktürk) Devleti",
          E: "Büyük Selçuklu Devleti"
        },
        correctAnswer: "D",
        explanation: "Orhun Yazıtları, İkinci Göktürk (Kutluk) Devleti döneminde Bilge Kağan, Kültigin ve Vezir Tonyukuk adına dikilmiş, Türk tarihinin ilk yazılı belgeleridir."
      }
    ],
    pastQuestions: [
      {
        id: "pq1_1",
        year: "KPSS 2021",
        questionText: "Eski Türklerde hükümdarın eşine 'Hatun' denilirdi. Kurultaya katılır, diplomatik kabullerde bulunurdu. Bu bilgiye dayanarak hangisine ulaşılabilir?",
        options: {
          A: "Kadının yönetimde söz sahibi olduğuna",
          B: "Saltanat sisteminin kesinlikle bittiğine",
          C: "Askeri teşkilatlanmada öncü olduğuna",
          D: "Hukuk kurallarının hatunlarca yazıldığına",
          E: "Din işlerinin hatunlara bağlı olduğuna"
        },
        correctAnswer: "A",
        explanation: "Hatunun (Katun) kurultaya katılması ve heyetleri kabul etmesi, devlet yönetiminde kadının siyasi yetkiye ve söz hakkına sahip olduğunu gösterir."
      }
    ],
    engineInfo: {
      sebep: "Asya'da boylar arasındaki mücadele ve Çin baskısı",
      sonuc: "Batıya doğru kitlesel göçler ve yeni coğrafyalarda kalıcı devletlerin kurulması",
      etki: "Türk kültürü geniş bir coğrafyaya yayıldı, dünya askeri taktikleri etkilendi",
      kpssPronePercent: 95,
      benzerOlaylar: ["Moğol İstilası", "Kavimler Göçü"]
    }
  },
  {
    id: 2,
    title: "İlk Türk İslam Devletleri",
    summary: "Karahanlılar, Gazneliler ve Büyük Selçuklu Devleti bu dönemin temelini oluşturur. Türk kültürünün İslamiyet ile sentezi ilk kez bu dönemde gerçekleşmiştir.",
    keyNotes: [
      "Karahanlılar (940-1212): Orta Asya'da kurulan ilk Müslüman Türk devletidir. Resmi dili Türkçedir.",
      "Gazneliler (963-1186): Alp Tigin kurdu. En parlak dönem Sultan Mahmut'tur (Hindistan'a 17 sefer düzenledi).",
      "Büyük Selçuklu Devleti: Tuğrul ve Çağrı beyler kurdu. Pasinler Savaşı (1048) Bizans'la ilk savaştır.",
      "Divan-ı Lügati't-Türk (Kaşgarlı Mahmut) ve Kutadgu Bilig (Yusuf Has Hacib) ilk Türk-İslam edebi eserleridir."
    ],
    logicMap: [
      {
        cause: "751 Talas Savaşı'nda Türklerin Çinliler'e karşı Müslüman Arapları desteklemesi",
        effect: "Türk-Arap dostluğunun başlaması ve Türklerin kitleler halinde İslamiyet'i kabul etmesi",
        impact: "Orta Asya'da İslam medeniyetinin yayılması ve Türk-İslam sentezinin temellerinin atılması"
      }
    ],
    chronology: [
      { year: "751", event: "Talas Savaşı" },
      { year: "840", event: "Karahanlı Devleti'nin Kurulması" },
      { year: "1040", event: "Dandanakan Savaşı (Büyük Selçuklu Kuruldu, Gazneliler Zayıfladı)" },
      { year: "1048", event: "Pasinler Savaşı (Bizans ile İlk Karşılaşma)" },
      { year: "1071", event: "Malazgirt Savaşı (Anadolu'nun Kapıları Türklere Açıldı)" }
    ],
    mnemonics: [
      {
        title: "İlk Türk İslam Edebi Eserleri",
        phrase: "KADı - Kutadgu Bilig, Atabetü'l Hakayık, Divan-ı Lügati't-Türk, Divan-ı Hikmet",
        explanation: "Bu eserler 11. ve 12. yüzyıllarda Karahanlılar döneminde hakaniye lehçesiyle yazılmış başyapıtlardır."
      }
    ],
    flashcards: [
      { id: "fc2_1", front: "Sultan unvanını kullanan ilk Türk hükümdarı kimdir?", back: "Gazneli Mahmut (Abbasi halifesini koruduğu için bu unvanı almıştır)." },
      { id: "fc2_2", front: "İslamiyet'i kabul eden ilk Türk boyu hangisidir?", back: "Karluklar (751 Talas savaşı sonrası Müslüman oldular)." }
    ],
    questions: [
      {
        id: "q2_1",
        difficulty: "Orta",
        questionText: "Aşağıdakilerden hangisi Büyük Selçuklu Devleti ile Bizans İmparatorluğu arasında yapılan ilk savaştır?",
        options: {
          A: "Dandanakan Savaşı",
          B: "Pasinler Savaşı",
          C: "Malazgirt Savaşı",
          D: "Katvan Savaşı",
          E: "Miryokefalon Savaşı"
        },
        correctAnswer: "B",
        explanation: "1048 Pasinler Savaşı, Büyük Selçuklu Devleti ile Bizans ve Gürcü ittifakı arasında yapılan ilk muharebedir ve Selçuklular galip gelmiştir."
      }
    ],
    pastQuestions: [
      {
        id: "pq2_1",
        year: "KPSS 2022",
        questionText: "Karahanlılar Devleti'nin resmi dil olarak Türkçe'yi kullanması ve ulusal benliğini koruma çabası hangisiyle doğrudan çelişmez?",
        options: {
          A: "İdari işlerde Arapça'yı benimsemeleri",
          B: "Milliyetçi karakteristiklerini sürdürmeleri",
          C: "Türk askerlerini İran'dan seçmeleri",
          D: "Edebiyatta tamamen Farsça'ya yönelmeleri",
          E: "Sarayda sadece Hintçe konuşulması"
        },
        correctAnswer: "B",
        explanation: "Karahanlılar'ın resmi dilde Türkçe ısrarı, onların ulusal (milliyetçi) karakterlerini koruduklarının doğrudan kanıtıdır."
      }
    ],
    engineInfo: {
      sebep: "Abbasi Halifesinin Büveyhoğulları baskısı altında kalması",
      sonuc: "Selçuklu hükümdarı Tuğrul Bey'in Bağdat Seferi ile halifeyi kurtarması",
      etki: "Siyasi yetkinin Türklere, dini liderliğin halifede kalmasıyla laik yönetim ayrımının ilk nüvesi",
      kpssPronePercent: 90,
      benzerOlaylar: ["Yavuz Sultan Selim'in Mısır Seferi"]
    }
  },
  {
    id: 3,
    title: "Türkiye Selçuklu Devleti",
    summary: "Süleyman Şah tarafından İznik merkezli kurulan devlet, Anadolu'nun Türkleşmesini tamamlamış, ticari yollar inşa etmiş ve haçlılarla mücadele etmiştir.",
    keyNotes: [
      "Kurucu: Kutalmışoğlu Süleyman Şah (Merkez İznik, Haçlı Seferleri sonucu Konya'ya taşındı).",
      "Miryokefalon Savaşı (1176): Anadolu'nun kesin olarak Türk yurdu olduğu tescillendi (Yurt tutan savaş).",
      "Kösedağ Savaşı (1243): Moğol İlhânlı devletiyle yapılan bu savaş kaybedilerek Anadolu Selçuklu Devleti fiilen yıkılış sürecine girdi."
    ],
    logicMap: [
      {
        cause: "II. Kılıç Arslan'ın Miryokefalon Savaşı'nda Bizans ordusunu pusuya düşürüp mağlup etmesi",
        effect: "Bizans'ın Anadolu'yu geri alma ümidinin tamamen sona ermesi ve savunmaya çekilmesi",
        impact: "Avrupa kaynaklarında Anadolu'ya ilk defa 'Turchia' (Türkiye) adının verilmeye başlanması"
      }
    ],
    chronology: [
      { year: "1077", event: "Türkiye Selçuklu Devleti'nin İznik'te Kurulması" },
      { year: "1176", event: "Miryokefalon Savaşı (Bizans Taarruzu Kırıldı)" },
      { year: "1230", event: "Yassıçemen Savaşı (Harzemşahların yenilmesi tampon bölgeyi yok etti)" },
      { year: "1243", event: "Kösedağ Savaşı (Moğol İstilası)" }
    ],
    mnemonics: [
      {
        title: "Anadolu Tapu Savaşları Sıralaması",
        phrase: "MaMiK - Malazgirt (Kapı), Miryokefalon (Tapu), Kösedağ (Moğol İstilası)",
        explanation: "Malazgirt ile girdik, Miryokefalon ile tapusunu aldık, Kösedağ ile yıkım yaşadık."
      }
    ],
    flashcards: [
      { id: "fc3_1", front: "Yurt-tutan savaşı olarak bilinen Anadolu Selçuklu savaşı hangisidir?", back: "Miryokefalon Savaşı (1176)." },
      { id: "fc3_2", front: "Anadolu'da sigortacılık sistemini başlatan devlet hangisidir?", back: "Türkiye Selçuklu Devleti (Uluslararası ticareti geliştirmek için)." }
    ],
    questions: [
      {
        id: "q3_1",
        difficulty: "Zor",
        questionText: "Anadolu Selçuklu Devleti'nde gümrük vergilerinin düşürülmesi, kervansaraylar yapılması ve sigortacılık sisteminin getirilmesinin ortak amacı nedir?",
        options: {
          A: "Devletin askeri gücünü artırmak",
          B: "Uluslararası ticareti canlandırmak",
          C: "Merkezi otoriteyi tamamen eyaletlere yaymak",
          D: "Feodal beylikleri ortadan kaldırmak",
          E: "Tarım üretimini yarı yarıya azaltmak"
        },
        correctAnswer: "B",
        explanation: "Gümrük vergisini düşürmek, kervansaraylar yapmak ve tüccarların mallarını sigortalamak doğrudan transit ve uluslararası ticareti canlandırma gayretidir."
      }
    ],
    pastQuestions: [],
    engineInfo: {
      sebep: "Yassıçemen Savaşı ile Harzemşahların ortadan kaldırılması",
      sonuc: "Selçuklu ile Moğollar arasındaki tampon bölgenin yok olması",
      etki: "Moğol istilasının kolaylaşması ve Kösedağ hezimeti",
      kpssPronePercent: 88,
      benzerOlaylar: []
    }
  },
  {
    id: 4,
    title: "Beylikler Dönemi",
    summary: "1243 Kösedağ Savaşı'ndan sonra Anadolu'da Türk siyasi birliği bozulmuş ve II. Dönem Anadolu Beylikleri ortaya çıkmıştır.",
    keyNotes: [
      "Osmanoğulları: Söğüt ve Domaniç çevresinde kuruldu. Jeopolitik konumu nedeniyle hızla büyüdü.",
      "Karamanoğulları: Konya çevresinde kuruldu. Türkçe'yi resmi dil ilan eden beyliktir (Karamanoğlu Mehmet Bey).",
      "Karesioğulları: Balıkesir-Çanakkale çevresinde kuruldu. Denizci beyliktir ve Osmanlı'ya ilk katılan beyliktir."
    ],
    logicMap: [
      {
        cause: "Karesioğulları Beyliği'nin Osmanlı idaresine geçmesi",
        effect: "Osmanlı Devleti'nin hazır bir deniz gücüne ve donanmaya kavuşması",
        impact: "Rumeli'ye (Avrupa yakasına) geçişin kolaylaşması ve ilk denizcilik faaliyetlerinin başlaması"
      }
    ],
    chronology: [
      { year: "1243", event: "Kösedağ Savaşı sonrası 2. Beyliklerin kurulmaya başlanması" },
      { year: "1277", event: "Karamanoğlu Mehmet Bey'in Türkçeyi resmi dil beyan etmesi" },
      { year: "1345", event: "Karesioğulları'nın Osmanlıya katılması" }
    ],
    mnemonics: [
      {
        title: "Denizci Beylikler",
        phrase: "KaMaSı - Karesioğulları, Menteşeoğulları, Saruhanoğulları, Aydınoğulları",
        explanation: "Bu beylikler Ege ve Güney Marmara sahillerinde denizcilikle uğraşmışlardır."
      }
    ],
    flashcards: [
      { id: "fc4_1", front: "Osmanlı'ya katılan ilk beylik hangisidir?", back: "Karesioğulları (İlk donanma ve deniz gücü bu yolla edinildi)." },
      { id: "fc4_2", front: "Kendini Anadolu Selçuklu'nun varisi gören en güçlü beylik hangisidir?", back: "Karamanoğulları (Konya merkezli kuruldukları için)." }
    ],
    questions: [],
    pastQuestions: [],
    engineInfo: {
      sebep: "Merkezi gücün yok olması",
      sonuc: "Bölgesel bağımsız beyliklerin kuruluşu",
      etki: "Anadolu'nun yeniden fetih ruhu kazanması, Osmanlı'nın canlanması",
      kpssPronePercent: 85,
      benzerOlaylar: []
    }
  },
  {
    id: 5,
    title: "Osmanlı Kuruluş Dönemi",
    summary: "Söğüt'ten Balkanlar'a uzanan büyüme hikayesi. Bizans'ın zayıflığı, İskan ve İstimalet politikaları ile beyliklerin kendi aralarındaki mücadelelere karışmama (Baza siyaseti) devleti imparatorluğa taşıdı.",
    keyNotes: [
      "Osman Bey: İlk Osmanlı parası (Bakır), ilk vergi (Bac)." ,
      "Orhan Bey: Yaya ve Müsellem ordusu (İlk düzenli ordu), Divan teşkilatı kuruldu. İznik başkent oldu.",
      "I. Murad: Tımar sistemi kuruldu. Pençik sistemi ve Yeniçeri Ocağı kuruldu. Savaş alanında şehit düşen tek padişahtır (I. Kosova).",
      "I. Bayezid (Yıldırım): İstanbul'u ilk kuşatan Osmanlı padişahıdır. Ankara Savaşı (1402) sebebiyle Fetret Devri başladı."
    ],
    logicMap: [
      {
        cause: "Ankara Savaşı'nda Yıldırım Bayezid'in Timur'a esir düşmesi",
        effect: "Osmanlı ülkesinde padişahsız geçen 11 yıllık kriz (Fetret Devri) dönemi",
        impact: "Anadolu beyliklerinin bağımsızlığını geri kazanarak beyliklerin yeniden canlanması"
      }
    ],
    chronology: [
      { year: "1299", event: "Osmanlı'nın Tarih Sahnesine Çıkışı (Kuruluş)" },
      { year: "1326", event: "Bursa'nın Fethi ve Başkent Yapılması (Orhan Bey)" },
      { year: "1353", event: "Çimpe Kalesi'nin Alınması (Rumeli'de ilk toprak parçası)" },
      { year: "1402", event: "Ankara Savaşı ve Fetret Devri Başlangıcı" }
    ],
    mnemonics: [
      {
        title: "Kuruluş Padişahları Sıralaması",
        phrase: "O-O-M-B-M-M - Osman, Orhan, Murat, Bayezid, Mehmet (Çelebi), Murat",
        explanation: "Fetret Devri'ni sonlandırdığı için I. Mehmet (Çelebi) devletin ikinci kurucusu sayılır."
      }
    ],
    flashcards: [
      { id: "fc5_1", front: "Osmanlı Devleti'nin Rumeli'deki ilk üssü neresidir?", back: "Çimpe Kalesi (Orhan Bey döneminde Bizans'a askeri yardım karşılığı alındı)." },
      { id: "fc5_2", front: "Fetret Devrine son vererek 'Devletin İkinci Kurucusu' unvanını alan kimdir?", back: "I. Mehmet (Çelebi Mehmet)." }
    ],
    questions: [
      {
        id: "q5_1",
        difficulty: "Orta",
        questionText: "Aşağıdaki padişahlardan hangisi Osmanlı Devleti'nde ilk kez divan teşkilatını kurmuş ve ilk düzenli orduyu oluşturmuştur?",
        options: {
          A: "Osman Bey",
          B: "Orhan Bey",
          C: "I. Murat",
          D: "Yıldırım Bayezid",
          E: "Çelebi Mehmet"
        },
        correctAnswer: "B",
        explanation: "Orhan Bey döneminde devlet teşkilatlanmasına büyük önem verilmiş; ilk kez divan teşkilatı kurulmuş, Yaya ve Müsellem adıyla ilk düzenli ordular kurulmuştur."
      }
    ],
    pastQuestions: [],
    engineInfo: {
      sebep: "Bizans iç karışıklıkları ve Balkanlardaki feodal bölünmüşlük",
      sonuc: "Gaza ve cihad anlayışıyla batı yönünde hızlı ve kalıcı yayılma",
      etki: "Osmanlı'nın kısa sürede imparatorluk boyutuna ulaşması",
      kpssPronePercent: 92,
      benzerOlaylar: []
    }
  },
  {
    id: 6,
    title: "Osmanlı Yükselme Dönemi",
    summary: "İstanbul'un fethinden Sokullu Mehmet Paşa'nın ölümüne kadar süren ihtişam dönemi. Cihan şümul bir cihan devletinin inşası.",
    keyNotes: [
      "II. Mehmet (Fatih): İstanbul'un Fethi (1453), Orta Çağ kapandı. Karadeniz Türk gölü haline geldi (Kırım'ın fethi).",
      "I. Selim (Yavuz): Doğu seferleri. Mercidabık ve Ridaniye savaşlarıyla Memlükler yıkıldı, Halifelik Osmanlı'ya geçti.",
      "I. Süleyman (Kanuni): En uzun süre tahtta kalan padişah. Belgrad ve Rodos'un fethi, Mohaç Meydan Muharebesi."
    ],
    logicMap: [
      {
        cause: "Mısır Seferi ile Memlük Devleti'nin tamamen ortadan kaldırılması",
        effect: "Baharat Yolu üzerindeki ticaret kontrolünün ve Halifelik makamının Osmanlı'ya geçmesi",
        impact: "Osmanlı İmparatorluğu'nun İslam dünyasının hem siyasi hem de dini lideri haline gelmesi"
      }
    ],
    chronology: [
      { year: "1453", event: "İstanbul'un Fethi ve Bizans'ın Sonu" },
      { year: "1517", event: "Ridaniye Savaşı ve Halifeliğin Alınması" },
      { year: "1526", event: "Mohaç Meydan Muharebesi (Dünyanın en kısa süren meydan savaşı)" },
      { year: "1571", event: "İnebahtı Deniz Mağlubiyeti (İlk kez donanma yakıldı)" }
    ],
    mnemonics: [
      {
        title: "Kırım'ın Fethi Önemi",
        phrase: "K-K (Kırım Karadeniz)",
        explanation: "Kırım'ın fethi ile Karadeniz bir iç deniz/Türk gölü haline gelmiştir."
      }
    ],
    flashcards: [
      { id: "fc6_1", front: "Osmanlı'da halifelik makamı hangi padişah döneminde geçmiştir?", back: "Yavuz Sultan Selim (Mısır Seferi neticesinde)." },
      { id: "fc6_2", front: "Preveze Deniz Zaferi hangi tarihte ve kime karşı kazanılmıştır?", back: "1538 yılında Andrea Doria komutasındaki Haçlı donanmasına karşı (Barbaros Hayrettin komutasında)." }
    ],
    questions: [],
    pastQuestions: [],
    engineInfo: {
      sebep: "İstanbul'un coğrafi konumu ve Bizans'ın kışkırtmaları",
      sonuc: "İstanbul fethedildi, Bizans yıkıldı",
      etki: "Coğrafi Keşiflerin başlaması, Avrupa'da derebeyliğin yıkılış sürecine girmesi",
      kpssPronePercent: 96,
      benzerOlaylar: []
    }
  },
  {
    id: 7,
    title: "Osmanlı Duraklama Dönemi",
    summary: "İç kargaşalar, kapitülasyonlar ve merkezi otoritenin sarsılmasıyla sınırların zirvesinde genişlemenin yavaşlaması.",
    keyNotes: [
      "Yeniçeri İsyanları: Celali isyanları tarımsal yapıyı bozdu (Büyük Kaçgun).",
      "Ekber ve Erşed Sistemi: Taht kavgalarını önlemek adına en yaşlı ve tecrübeli hanedan üyesinin başa geçmesi kuralı.",
      "II. Viyana Kuşatması (1683): Merzifonlu Kara Mustafa Paşa komutasındaki kuşatma başarısız oldu, kutsal ittifak kuruldu."
    ],
    logicMap: [
      {
        cause: "Saray kadınlarının ve yeniçerilerin yönetim işlerine müdahale etmesi",
        effect: "Merkezi otoritenin bozulması, liyakatsiz sadrazamların ve valilerin atanması",
        impact: "Eyaletlerde Celali adıyla büyük isyanların patlak vermesi ve asayişin çökmesi"
      }
    ],
    chronology: [
      { year: "1579", event: "Sokullu Mehmet Paşa'nın ölümü ve Duraklama Başlangıcı" },
      { year: "1603", event: "Ekber ve Erşed Sisteminin İlan Edilmesi" },
      { year: "1683", event: "II. Viyana Kuşatması Başarısızlığı" },
      { year: "1699", event: "Karlofça Antlaşması (Büyük çapta ilk toprak kaybı)" }
    ],
    mnemonics: [
      {
        title: "Karlofça Antlaşması'nı İmzalayan Devletler",
        phrase: "LeMaN - Lehistan, Malta, Venedik, Avusturya (ve Rusya ile İstanbul ant.)",
        explanation: "Osmanlı'nın karşısındaki Kutsal İttifak devletleridir."
      }
    ],
    flashcards: [
      { id: "fc7_1", front: "Osmanlı'da ilk modern denk bütçeyi hazırlayan devlet adamı kimdir?", back: "Tarhuncu Ahmet Paşa." },
      { id: "fc7_2", front: "Bağdat Fatihi olarak anılan Duraklama dönemi padişahı?", back: "IV. Murat (Yasaklar ve askeri disipliniyle tanınır)." }
    ],
    questions: [],
    pastQuestions: [],
    engineInfo: {
      sebep: "Coğrafi keşifler ve paranın enflasyona uğraması",
      sonuc: "Osmanlı maliyesinin açık vermesi, ordunun bozulması",
      etki: "Köklü olmayan ıslahat girişimlerine ihtiyaç duyulması",
      kpssPronePercent: 82,
      benzerOlaylar: []
    }
  },
  {
    id: 8,
    title: "Osmanlı Gerileme Dönemi",
    summary: "Lale devri ile başlayan batılılaşma hareketleri ve kaybedilen toprakları geri alma ümidinin sona ermesi.",
    keyNotes: [
      "Lale Devri (1718-1730): Savaşsızlık, eğlence ve batılılaşma dönemi. İlk geçici elçilikler (28. Çelebi Mehmet), çiçek aşısı.",
      "Patrona Halil İsyanı: Lale Devri'ni sonlandıran kanlı isyandır.",
      "Küçük Kaynarca Antlaşması (1774): Kırım bağımsız oldu, ilk kez halkı tamamen Müslüman olan bir toprak kaybedildi."
    ],
    logicMap: [
      {
        cause: "Pasarofça Antlaşması ile batının üstünlüğünün ilk defa kabul edilmesi",
        effect: "Osmanlı'da Lale Devri adı verilen barışçı diplomatik ve kültürel dönemin başlaması",
        impact: "Fransa ve Avusturya gibi batılı başkentlere ilk elçilerin gönderilerek batı tarzı ıslahat yapılması"
      }
    ],
    chronology: [
      { year: "1718", event: "Pasarofça Antlaşması ve Lale Devri Başlangıcı" },
      { year: "1730", event: "Patrona Halil İsyanı" },
      { year: "1774", event: "Küçük Kaynarca Antlaşması" }
    ],
    mnemonics: [
      {
        title: "Lale Devri Yenilikleri",
        phrase: "ÇİT - Çiçek Aşısı, İtfaiye (Tulumbacılar), Tulumbacılar İtfaiyesi",
        explanation: "Matbaa, kütüphaneler ve kağıt fabrikası da bu dönemdedir."
      }
    ],
    flashcards: [
      { id: "fc8_1", front: "Osmanlı'da ilk kez batı tarzında askeri ıslahat yapan padişah kimdir?", back: "I. Mahmut (Humbaracı Ahmet Paşa'yı getirdi)." },
      { id: "fc8_2", front: "İlk geçici elçimiz kimdir ve nereye gitmiştir?", back: "Yirmisekiz Çelebi Mehmet Efendi, Paris'e gitmiştir. ('Sefaretname' eserini yazdı)." }
    ],
    questions: [],
    pastQuestions: [],
    engineInfo: {
      sebep: "Askeri mağlubiyetlerin süreklilik kazanması",
      sonuc: "Batıdan uzman getirilmesi ve askeri okulların (Hendesehane) açılması",
      etki: "Yönetimde askeri kökenli aydın kesimin oluşması",
      kpssPronePercent: 86,
      benzerOlaylar: []
    }
  },
  {
    id: 9,
    title: "Osmanlı Dağılma Dönemi",
    summary: "En uzun yüzyıl. Milliyetçilik isyanları, sömürgecilik yarışı, Tanzimat, Islahat fermanları ve I. Dünya Savaşı'na giden sancılı süreç.",
    keyNotes: [
      "II. Mahmut: Yeniçeri Ocağını kaldırdı (Vaka-i Hayriye), memura kıyafet zorunluluğu, pasaport ve muhtarlıklar kuruldu.",
      "Tanzimat Fermanı (1839): Mustafa Reşit Paşa okudu. Kanun üstünlüğü ilk kez kabul edildi.",
      "I. Meşrutiyet (1876): İlk anayasa (Kanun-ı Esasi) yürürlüğe girdi. Meclis-i Mebusan açıldı.",
      "II. Abdülhamid Dönemi: Duyun-u Umumiye (Dış borçlar idaresi) kuruldu."
    ],
    logicMap: [
      {
        cause: "1789 Fransız İhtilali'nin yaydığı milliyetçilik ve hürriyet fikirleri",
        effect: "Osmanlı topraklarındaki Sırp, Yunan, Ermeni gibi unsurların isyan başlatması",
        impact: "Balkan topraklarının birer birer kaybedilmesi ve Osmanlıcılık fikir akımının iflas etmesi"
      }
    ],
    chronology: [
      { year: "1808", event: "Sened-i İttifak (Ayanlarla anlaşma, padişah yetkileri ilk kez sınırlandı)" },
      { year: "1826", event: "Vaka-i Hayriye (Yeniçeri Ocağının kaldırılması)" },
      { year: "1839", event: "Tanzimat Fermanı'nın İlanı" },
      { year: "1876", event: "I. Meşrutiyet ve Kanun-ı Esasi" },
      { year: "1908", event: "II. Meşrutiyet'in İlanı" }
    ],
    mnemonics: [
      {
        title: "Demokratikleşme Adımları Kronolojik Sıralaması",
        phrase: "SeTaI - Sened-i İttifak -> Tanzimat -> Islahat -> I. Meşrutiyet",
        explanation: "Padişah yetkilerindeki değişim ve halkın yönetime katılması süreci."
      }
    ],
    flashcards: [
      { id: "fc9_1", front: "Padişahın yetkilerini kendi rızasıyla ilk defa sınırladığı belge hangisidir?", back: "Sened-i İttifak (1808, II. Mahmut ve Ayanlar arasında)." },
      { id: "fc9_2", front: "Kanun üstünlüğünü getiren ve padişahın da uyacağına yemin ettiği ferman?", back: "Tanzimat Fermanı (1839)." }
    ],
    questions: [],
    pastQuestions: [],
    engineInfo: {
      sebep: "Yabancı devletlerin azınlık haklarını bahane edip iç işlerimize karışması",
      sonuc: "Tanzimat ve Islahat fermanları ile eşit yurttaşlık oluşturma gayretleri",
      etki: "Devletin dağılmasını engellemek yerine bağımsızlık taleplerini hızlandırması",
      kpssPronePercent: 94,
      benzerOlaylar: []
    }
  },
  {
    id: 10,
    title: "Kurtuluş Savaşı Muharebeler",
    summary: "Sevr'i yırtıp Lozan'ı imzalatan, Doğu, Güney ve Batı cephelerindeki destansı mücadeleyi temsil eden askeri ve siyasi dönemdir.",
    keyNotes: [
      "Doğu Cephesi: Kazım Karabekir ve 15. Kolordu Ermenileri yendi (Gümrü Barış Antlaşması imzalandı, ilk askeri zafer).",
      "Güney Cephesi: Kuva-yı Milliye ve halk direnişi (Maraş, Urfa, Antep) Fransızları durdurdu (Ankara Antlaşması).",
      "Batı Cephesi: Düzenli ordunun zaferleri. I. ve II. İnönü cepheleri, Kütahya-Eskişehir (tek yenilgi), Sakarya Meydan Muharebesi (Melhame-i Kübra), Büyük Taarruz."
    ],
    logicMap: [
      {
        cause: "Kütahya-Eskişehir muharebelerinde düzenli ordunun Sakarya nehrinin doğusuna çekilmek zorunda kalması",
        effect: "Başkomutanlık Kanunu'nun çıkarılarak Mustafa Kemal'e geniş yasama-yürütme yetkileri devredilmesi",
        impact: "Tekâlif-i Milliye emirlerinin yayınlanarak ordunun ihtiyaçlarının doğrudan halktan karşılanması"
      }
    ],
    chronology: [
      { year: "1919", event: "Samsun'a Çıkış (19 Mayıs) ve Direniş Kıvılcımı" },
      { year: "1920", event: "TBMM'nin Kurulması ve Gümrü Antlaşması" },
      { year: "1921", event: "Sakarya Meydan Muharebesi" },
      { year: "1922", event: "Büyük Taarruz ve Başkomutanlık Meydan Muharebesi" },
      { year: "1923", event: "Lozan Barış Antlaşması'nın İmzalanması" }
    ],
    mnemonics: [
      {
        title: "Batı Cephesi Savaşları",
        phrase: "1-2-K-S-B (Bir, İki, Kütahya, Sakarya, Büyük Taarruz)",
        explanation: "Ortadaki Kütahya-Eskişehir tek yenilgi, diğerleri büyük zaferlerdir."
      }
    ],
    flashcards: [
      { id: "fc10_1", front: "Mustafa Kemal'e Gazilik unvanı ve Mareşallik rütbesi hangi savaştan sonra verilmiştir?", back: "Sakarya Meydan Muharebesi sonrası (1921)." },
      { id: "fc10_2", front: "TBMM'nin imzaladığı ilk uluslararası antlaşma ve ilk siyasi zafer nedir?", back: "Gümrü Antlaşması (Ermenistan ile, 1920)." }
    ],
    questions: [
      {
        id: "q10_1",
        difficulty: "Zor",
        questionText: "TBMM Hükümeti'nin kazandığı I. İnönü Savaşı'ndan sonra yaşanan iç ve dış gelişmeler göz önüne alındığında, aşağıdakilerden hangisi uluslararası bir etkiye örnek gösterilemez?",
        options: {
          A: "Londra Konferansı'nın düzenlenmesi",
          B: "Teşkilat-ı Esasiye Kanunu'nun (Anayasa) kabul edilmesi",
          C: "Moskova Dostluk Antlaşması'nın imzalanması",
          D: "Afganistan ile Dostluk Antlaşması yapılması",
          E: "İtilaf Devletleri'nin TBMM'yi barış masasına çağırması"
        },
        correctAnswer: "B",
        explanation: "Teşkilat-ı Esasiye Kanunu'nun kabul edilmesi iç politikayla (ulusal) ilgili bir gelişmedir, uluslararası (diplomatik) bir gelişme değildir."
      }
    ],
    pastQuestions: [],
    engineInfo: {
      sebep: "Yunan güçlerinin İtilaf destekli Anadolu işgali",
      sonuc: "Mudanya Ateşkesi ve Lozan Barış Antlaşması",
      etki: "Sömürge altındaki diğer mazlum milletlere bağımsızlık ümidi aşılaması",
      kpssPronePercent: 98,
      benzerOlaylar: []
    }
  },
  {
    id: 11,
    title: "TBMM Dönemi",
    summary: "23 Nisan 1920'de açılan kurucu meclis, ihtilalci yapısı ve milli egemenlik inancıyla hem orduyu kurmuş hem de saltanatı kaldırmıştır.",
    keyNotes: [
      "I. TBMM (1920-1923): Savaş meclisidir, kurucudur, demokratiktir, güçler birliği ilkesini benimsemiştir.",
      "II. TBMM (1923-1927): İnkılapçı meclisidir. Lozan'ı onaylayan ve reformları hayata geçiren meclistir.",
      "Hıyanet-i Vataniye Kanunu ve İstiklal Mahkemeleri: İç isyanları bastırmak ve asker kaçaklarını önlemek için kuruldu."
    ],
    logicMap: [
      {
        cause: "Mebusan Meclisi'nin İstanbul'da işgale uğraması ve Misak-ı Milli kabulü sonrası kapatılması",
        effect: "Ankara'da fevkalade yetkilere sahip yeni bir meclisin (TBMM) açılması ihtiyacı",
        impact: "Milli egemenliğin halk eliyle hayata geçirilmesi ve meclis hükümeti sisteminin kurulması"
      }
    ],
    chronology: [
      { year: "1920", event: "23 Nisan TBMM'nin Açılışı" },
      { year: "1921", event: "Teşkilat-ı Esasiye (İlk anayasa kabulü)" },
      { year: "1922", event: "Saltanatın Kaldırılması (1 Kasım, Laikliğin ilk somut adımı)" }
    ],
    mnemonics: [
      {
        title: "Olağanüstü İstiklal Mahkemeleri Özelliği",
        phrase: "Ü-S-Ü (Üyeleri milletvekillerinden, Süratli yargılama, Temyizsiz kesin kararlar)",
        explanation: "Meclisin yargı yetkisini kullandığının en açık göstergesidir."
      }
    ],
    flashcards: [
      { id: "fc11_1", front: "I. TBMM'nin çıkardığı ilk kanun hangisidir?", back: "Ağnam Vergisi Kanunu (Hayvancılık vergisi artırımı)." },
      { id: "fc11_2", front: "Yeni Türk devletinin ilk anayasası hangi tarihlidir?", back: "1921 Anayasası (Teşkilat-ı Esasiye)." }
    ],
    questions: [],
    pastQuestions: [],
    engineInfo: {
      sebep: "Milli mücadeleye karşı hilafet yanlısı ve bölgesel isyanlar",
      sonuc: "Hıyanet-i Vataniye kanunu ve sert adli önlemler",
      etki: "Meclisin yasama ve yargı otoritesinin tüm yurtta kurulması",
      kpssPronePercent: 91,
      benzerOlaylar: []
    }
  },
  {
    id: 12,
    title: "Atatürk İlkeleri",
    summary: "Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık ilkeleriyle modern Türkiye'nin fikri temelleri.",
    keyNotes: [
      "Cumhuriyetçilik: Siyasi egemenlik halktadır. Seçimler, çok partili yaşam, TBMM, Saltanatın kaldırılması anahtar kelimeleridir.",
      "Milliyetçilik: Türk milletinin birliği, bağımsızlık, dil-tarih çalışmaları (Türk Tarih ve Dil kurumları), Kabotaj Kanunu.",
      "Halkçılık: Kanun önünde eşitlik, imtiyazsız toplum, Aşar vergisinin kaldırılması, Soyadı kanunu.",
      "Devletçilik: Ekonomide devlet yatırımları, Karma ekonomi, Sümerbank, I. Beş Yıllık Sanayi Planı.",
      "Laiklik: Akılcılık ve bilim, din ve devlet işlerinin ayrılması, Halifeliğin kaldırılması, Tevhid-i Tedrisat.",
      "İnkılapçılık: Çağdaşlaşma, sürekli gelişim, eski kurumların yerine yenilerinin açılması, takvim, saat reformları."
    ],
    logicMap: [
      {
        cause: "Mustafa Kemal'in toplumsal kalkınmayı, eşitliği ve milli egemenliği hedeflemesi",
        effect: "Birbiriyle uyumlu ve birbirini tamamlayan 6 temel Atatürk İlkesinin geliştirilmesi",
        impact: "Topluma modern, laik ve eşitlikçi bir vatandaşlık kimliğinin kazandırılması"
      }
    ],
    chronology: [
      { year: "1924", event: "Halifeliğin Kaldırılması (Laiklik ve Milliyetçilik)" },
      { year: "1925", event: "Aşar Vergisinin Kaldırılması (Halkçılık)" },
      { year: "1926", event: "Kabotaj Kanunu (Milliyetçilik)" },
      { year: "1933", event: "I. Beş Yıllık Kalkınma Planı (Devletçilik)" }
    ],
    mnemonics: [
      {
        title: "Cumhuriyetçilik Şifresi",
        phrase: "Seçim, Meclis, Sandık, Egemenlik, Oy kullanma",
        explanation: "Halkın yönetime doğrudan katıldığı her yenilik bu ilkeyle eşleşir."
      }
    ],
    flashcards: [
      { id: "fc12_1", front: "Kabotaj Kanunu doğrudan hangi ilkelerle ilişkilidir?", back: "Milliyetçilik (Türk denizlerinde ticaret tekelinin Türklere verilmesi)." },
      { id: "fc12_2", front: "Aşar vergisinin kaldırılması doğrudan hangi ilkeyle ilgilidir?", back: "Halkçılık (Köylünün üzerindeki ağır ekonomik yükü kaldırıp eşitliği sağladığı için)." }
    ],
    questions: [
      {
        id: "q12_1",
        difficulty: "Orta",
        questionText: "Yeni Türk Devleti'nde medeni kanunun kabul edilmesi, şeriyye courts (mahkemelerinin) kapatılması ve eğitim birliğinin sağlanması aşağıdaki Atatürk ilkelerinden en çok hangisinin hayata geçirilmesidir?",
        options: {
          A: "Devletçilik",
          B: "Laiklik",
          C: "Cumhuriyetçilik",
          D: "Federalizm",
          E: "Milli bağımsızlık"
        },
        correctAnswer: "B",
        explanation: "Şer'i kuralların hukuktan arındırılıp laik hukuk kurallarının (Medeni Kanun) getirilmesi ve şeriyye mahkemelerinin kapatılması doğrudan laiklik ilkesinin en temel gerekleridir."
      }
    ],
    pastQuestions: [],
    engineInfo: {
      sebep: "Feodal, dine dayalı ve monarşik düzenden çağdaş bir yapı oluşturulması",
      sonuc: "6 temel Atatürk ilkesinin anayasaya girmesi (1937)",
      etki: "Türkiye Cumhuriyeti'nin değişmeyen temel karakterinin oluşması",
      kpssPronePercent: 100,
      benzerOlaylar: []
    }
  },
  {
    id: 13,
    title: "İnkılaplar (Tarihi Reformlar)",
    summary: "Eğitimden hukuka, kılık kıyafetten iktisadi hayata kadar Türk milletini çağdaş medeniyet seviyesine ulaştıran devrimler bütünü.",
    keyNotes: [
      "Hukuk: Medeni Kanun (1926): Kadın-erkek eşitliği sağlandı (Siyasi haklar YOKTUR; siyasi haklar 1930, 33, 34'tedir).",
      "Eğitim: Tevhid-i Tedrisat (1924, Eğitim birliği), Maarif Teşkilatı Kanunu, Harf Devrimi (1928), Millet Mektepleri.",
      "Sosyal: Şapka Kanunu, Tekke ve Zaviyelerin Kapatılması, Miladi Takvim, Ölçü birimleri, Soyadı Kanunu."
    ],
    logicMap: [
      {
        cause: "1926 Türk Medeni Kanunu'nun İsviçre'den uyarlanarak kabul edilmesi",
        effect: "Tek eşlilik, resmi nikah, mahkemede şahitlik, miras ve boşanmada eşitliğin getirilmesi",
        impact: "Kadınların sosyal ve ekonomik hayatta erkeklerle tam eşitliğe kavuşması (Seçme seçilme hakkı hariç)"
      }
    ],
    chronology: [
      { year: "1924", event: "Tevhid-i Tedrisat Kanunu" },
      { year: "1926", event: "Türk Medeni Kanunu (17 Şubat)" },
      { year: "1928", event: "Yeni Türk Harflerinin Kabulü" },
      { year: "1934", event: "Kadınlara Milletvekili Seçme ve Seçilme Hakkı" }
    ],
    mnemonics: [
      {
        title: "Kadınların Siyasi Hak Alış Sırası",
        phrase: "0-3-4 B-M-V - 1930 Belediye, 1933 Muhtarlık, 1934 Vekillik (BMW)",
        explanation: "Türk kadını siyasi haklarını bu sırayla (Belediye, Muhtar, Vekil) elde etmiştir."
      }
    ],
    flashcards: [
      { id: "fc13_1", front: "1926 Medeni Kanunda kadınlara hangi haklar verilmemiştir?", back: "Seçme-Seçilme (Siyasi) hakları verilmemiştir. Siyasi haklar 1930'dan sonra parça parça verildi." },
      { id: "fc13_2", front: "Eğitimde birliği ve devlet kontrolünü sağlayan yasa hangisidir?", back: "Tevhid-i Tedrisat Kanunu (3 Mart 1924)." }
    ],
    questions: [],
    pastQuestions: [],
    engineInfo: {
      sebep: "Çift anayasalılık ve çift hukukluluğun (Şer'i-Örfi / Medrese-Modern Okul) yarattığı karışıklık",
      sonuc: "Hukuk ve eğitim kurumlarının tamamen tekilleştirilmesi ve modernleştirilmesi",
      etki: "Toplumsal ayrışmaların önüne geçilmesi ve birleşik ulus ruhunun inşası",
      kpssPronePercent: 97,
      benzerOlaylar: []
    }
  },
  {
    id: 14,
    title: "Atatürk Dönemi Dış Politika",
    summary: "1923-1939 yılları arasında 'Yurtta sulh, cihanda sulh' prensibiyle yürütülen ittifaklar, antlaşmalar ve sınırların güvenceye alınması siyasetidir.",
    keyNotes: [
      "Lozan'dan Kalan Sorunlar (1923-1930): Nüfus Mübadelesi (Yunanistan ile, barışla çözüldü), Musul (Irak Sınırı, aleyhimize çözüldü), Yabancı Okullar (iç sorun sayıldı).",
      "Güvenlik Paktları: Balkan Antantı (1934, Batı sınırı güvenlik altına alındı), Sadabat Paktı (1937, Doğu sınırı).",
      "Montrö Boğazlar Sözleşmesi (1936): Boğazlar Komisyonu kaldırıldı, egemenlik tamamen Türkiye'ye geçti.",
      "Hatay'ın Ana Vatana Katılması (1939): Atatürk'ün çabalarıyla (şahsi meselesi), ölümünden sonra katılmıştır."
    ],
    logicMap: [
      {
        cause: "Almanya ve İtalya'nın yayılmacı ve saldırgan politikalarının başlaması",
        effect: "Türkiye'nin sınır güvenliğini korumak üzere bölgesel paktlar düzenlemesi",
        impact: "Balkan Antantı (Batıda) ve Sadabat Paktı (Doğuda) kurularak sınırların emniyete alınması"
      }
    ],
    chronology: [
      { year: "1926", event: "Ankara Antlaşması (Musul İngiliz himayesindeki Irak'a bırakıldı)" },
      { year: "1932", event: "Türkiye'nin Milletler Cemiyeti'ne Üye Olması" },
      { year: "1934", event: "Balkan Antantı'nın Kurulması" },
      { year: "1936", event: "Montrö Boğazlar Sözleşmesi" },
      { year: "1939", event: "Hatay'ın Türkiye Cumhuriyeti'ne Katılması" }
    ],
    mnemonics: [
      {
        title: "Balkan Antantı Kurucu Ülkeleri",
        phrase: "TaYYaR - Türkiye, Yugoslavya, Yunanistan, Romanya",
        explanation: "Batı sınırımızı tehditlere karşı garantiye almak için katılan ülkeler."
      },
      {
        title: "Sadabat Paktı Üyeleri",
        phrase: "Atİİ (AT-İİ) - Afganistan, Türkiye, Irak, İran",
        explanation: "Suriye sınır anlaşmazlıkları nedeniyle bu pakta KATILMAMIŞTIR."
      }
    ],
    flashcards: [
      { id: "fc14_1", front: "Boğazlardaki komisyon kaldırılıp egemenliği tamamen Türkiye'ye veren pakt hangisidir?", back: "Montrö Boğazlar Sözleşmesi (1936)." },
      { id: "fc14_2", front: "Atatürk'ün 'Şahsi meselem' dediği, ancak ölümünden sonra anavatana katılan yer?", back: "Hatay (1939 yılında anavatana katılmıştır)." }
    ],
    questions: [],
    pastQuestions: [],
    engineInfo: {
      sebep: "Boğazların askersizleştirilmesi ve komisyon varlığının güvenlik zafiyeti yaratması",
      sonuc: "Montrö sözleşmesiyle haklarımızın iade edilmesi",
      etki: "Karadeniz ve Akdeniz arasında tam askeri ve siyasi denetim",
      kpssPronePercent: 93,
      benzerOlaylar: []
    }
  },
  {
    id: 15,
    title: "Çağdaş Türk ve Dünya Tarihi",
    summary: "II. Dünya Savaşı, Soğuk Savaş dönemi, yumuşama (Detant), küreselleşme ve Ortadoğu ile Kıbrıs gibi güncel krizlerin Türk dış politikasına etkileri.",
    keyNotes: [
      "II. Dünya Savaşı (1939-1945): Türkiye fiili savaşa girmedi (Denge politikası), savaş sonu Birleşmiş Milletler kurucu üyesi oldu.",
      "Soğuk Savaş: Türkiye NATO'ya girdi (Kore'ye asker göndererek, 1952). Truman Doktrini ve Marshall Planı.",
      "Kıbrıs Sorunu: 1974 Kıbrıs Barış Harekatı, Bülent Ecevit ve Necmettin Erbakan dönemi. KKTC kuruluşu."
    ],
    logicMap: [
      {
        cause: "Sovyetler Birliği'nin savaştan sonra Kars-Ardahan'ı ve Boğazlarda üs talep etmesi",
        effect: "Türkiye'nin Sovyet tehdidine karşı Batı Blokuna (NATO) yanaşması",
        impact: "Kore savaşına asker gönderilmesi ve neticede 1952 yılında resmi NATO üyeliği edinilmesi"
      }
    ],
    chronology: [
      { year: "1945", event: "II. Dünya Savaşı'nın Sona Ermesi ve BM'nin Kurulması" },
      { year: "1952", event: "Türkiye'nin NATO'ya Kabul Edilmesi" },
      { year: "1974", event: "Kıbrıs Barış Harekâtı'nın Düzenlenmesi" },
      { year: "1983", event: "Kuzey Kıbrıs Türk Cumhuriyeti'nin (KKTC) İlan Edilmesi" }
    ],
    mnemonics: [
      {
        title: "II. Dünya Savaşında Cumhurbaşkanı",
        phrase: "İkinci Dünya Savaşı - İkinci Adam (İsmet İnönü)",
        explanation: "II. Dünya Savaşı boyunca Türkiye'nin Cumhurbaşkanı olan 'İkinci Adam' İsmet İnönü'dür."
      }
    ],
    flashcards: [
      { id: "fc15_1", front: "Yunanistan ile yaşanan 'Kardak Kayalıkları Krizi' hangi yıldadır?", back: "1996 yılında iki ülkeyi savaşın eşiğine getiren krizdir." },
      { id: "fc15_2", front: "Kıbrıs Barış Harekatı sırasında görev yapan Cumhurbaşkanı ve Başbakan kimlerdir?", back: "Cumhurbaşkanı Fahri Korutürk, Başbakan Bülent Ecevit'tir." }
    ],
    questions: [],
    pastQuestions: [],
    engineInfo: {
      sebep: "Kıbrıs Rumlarının (EOKA) Türklere yönelik şiddet eylemleri",
      sonuc: "Türkiye'nin garantörlük hakkını kullanıp Kıbrıs çıkarmasını yapması",
      etki: "ABD silah ambargosu konması ve yerli askeri sanayinin (ASELSAN) kurulması",
      kpssPronePercent: 89,
      benzerOlaylar: []
    }
  }
];
