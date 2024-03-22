import { GoogleGenerativeAI } from '@google/generative-ai';

const googleGenAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

export const geminiPro = googleGenAI.getGenerativeModel({ model: 'gemini-pro' });
