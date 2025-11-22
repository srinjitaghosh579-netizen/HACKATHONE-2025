import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/summarize", async (req, res) => {
  const { text, type } = req.body;
  let prompt = "";

  if (type === "short") prompt = `Give a short 3–4 line summary of: ${text}`;
  if (type === "bullet") prompt = `Summarize into bullet points: ${text}`;
  if (type === "exam") prompt = `Create exam revision notes with key points, definitions, and formulas from: ${text}`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  res.json({ summary: response.choices[0].message.content });
});

app.listen(3000, () => console.log("SERVER RUNNING ON PORT 3000"));
