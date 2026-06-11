import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", firebaseAvailable: false, geminiAvailable: !!ai });
});

// 2. API: AI Coach & Historian Engine (Yapay Zekâ Koçu & Tarih Motoru)
app.post("/api/gemini/coach", async (req, res) => {
  const { topicTitle, action, userMessage } = req.body;

  if (!ai) {
    return res.status(503).json({
      error: "Yapay zekâ anahtarı bulunamadı. Lütfen AI Studio panelinden Secrets kısmına GEMINI_API_KEY tanımlayınız."
    });
  }

  try {
    let prompt = "";
    let systemInstruction = "Sen deneyimli bir KPSS tarih alanı uzmanı, akademisyen ve cana yakın bir eğitim koçusun. Amacın öğrenciye ezberletmek değil, her olayın sebep-sonuç-etki döngüsünü mantık çerçevesinde öğretmektir. Yanıtlarını Türkçe vermeli, önemli noktaları kalın karakterlerle vurgulamalı ve çok süslü olmayan, tamamen KPSS odaklı, net ve şık bir dille yazmalısın.";

    if (action === "ask") {
      prompt = `Ünite: "${topicTitle}". Öğrencinin sorusu: "${userMessage}". Bu ünite kapsamında öğrencinin sorusunu KPSS Tarih mantığında neden-sonuç-etki ilişkilerini kurarak detaylıca anlat, sınav taktikleri ver ve KPSS'de nasıl çıkabileceğini açıkla. Maksimum 3-4 paragrafta özetle.`;
    } else if (action === "summary") {
      prompt = `Ünite: "${topicTitle}". Bu ünite hakkında KPSS müfredatına en uygun, sınavda mutlaka bilinmesi gereken 'altın bilgileri' içeren, maddeler halinde yapılandırılmış bir "A4 Konu Özeti" çıkar. Sınav yapımcılarının (ÖSYM) nereden ters köşe yapabileceğini vurgula.`;
    } else if (action === "generate_question") {
      // We request a JSON or structured format so the frontend can read the question or display it gracefully.
      prompt = `Ünite: "${topicTitle}". Bu ünite kapsamından ÖSYM'nin KPSS tarzına tam uyumlu, orta veya zor seviyede 1 adet çoktan seçmeli soru hazırlat. Soru metni, A, B, C, D, E şıkları ve doğru cevabı ile birlikte 'Ayrıntılı Çözüm ve Analizini' sağla. Lütfen aşağıdaki JSON biçiminde kesin yanıt ver, başka hiçbir şey yazma:
      {
        "questionText": "Soru metni buraya",
        "options": {
          "A": "A şıkkı metni",
          "B": "B şıkkı metni",
          "C": "C şıkkı metni",
          "D": "D şıkkı metni",
          "E": "E şıkkı metni"
        },
        "correctAnswer": "A veya B veya C veya D veya E",
        "explanation": "Detaylı çözümlü analiz metni buraya"
      }`;
    } else if (action === "engine") {
      prompt = `Senden "Yapay Zeka Tarih Motoru" olarak davranmanı istiyorum. Konu: "${topicTitle}". Bu konuyu tarihsel döngüyle analiz et. Lütfen şu başlıkları detaylıca açıkla:
      1. SEBEP: Olayın patlak vermesindeki arka plan.
      2. SONUÇ: Somut antlaşmalar veya askeri neticeler.
      3. ETKİ: Sonraki yüzyıllara veya olaylara tesiri.
      4. KPSS ODAK VE ÇIKMA İHTİMALİ: ÖSYM bu konuyu hangi kelimeyle yakalar.
      5. ANALOJİ / BENZER OLAYLAR: Dünya ve Türk tarihinde benzerlik gösteren diğer iki olayla kıyasla.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2, // low temperature for precise academic facts
        ...(action === "generate_question" ? { responseMimeType: "application/json" } : {})
      }
    });

    const reply = response.text;
    if (action === "generate_question") {
      try {
        const parsed = JSON.parse(reply || "{}");
        return res.json({ success: true, payload: parsed });
      } catch (jsonErr) {
        console.error("Failed to parse generated question JSON, returning as raw text");
        return res.json({ success: true, text: reply });
      }
    }

    return res.json({ success: true, text: reply });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({ error: "Yapay zekâ yanıt oluşturamadı: " + err.message });
  }
});

// Vite middleware or production static serving setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KPSS Tarih Master server is running on http://localhost:${PORT}`);
  });
}

startServer();
