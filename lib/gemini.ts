import { GoogleGenAI } from "@google/genai";
const API_KEY = process.env.GEMINI_API_KEY;

export const gemini = new GoogleGenAI({ apiKey: API_KEY });
