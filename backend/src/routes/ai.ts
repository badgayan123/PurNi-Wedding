import { Router } from "express";
import OpenAI from "openai";

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/generate-invite", async (req, res) => {
  try {
    const { name, familyName, relation } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You write warm, respectful, emotional Indian wedding invitation messages. Keep them personal and heartfelt, 2-4 sentences.",
        },
        {
          role: "user",
          content: `Generate a warm Indian wedding invite message for ${name} ${familyName} and family. Relation: ${relation}. Tone: respectful and emotional.`,
        },
      ],
      max_tokens: 150,
    });
    const message = completion.choices[0]?.message?.content || "";
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate invite" });
  }
});

router.post("/respond-query", async (req, res) => {
  try {
    const { query, eventDetails } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful wedding assistant. Answer guest queries briefly and warmly. Event details: ${JSON.stringify(eventDetails || {})}. Common topics: venue, timing, dress code, parking.`,
        },
        { role: "user", content: query },
      ],
      max_tokens: 200,
    });
    const reply = completion.choices[0]?.message?.content || "";
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate response" });
  }
});

export default router;
