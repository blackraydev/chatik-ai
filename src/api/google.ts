import { GoogleGenerativeAI } from '@google/generative-ai';

console.log(import.meta.env)
console.log(import.meta.env.VITE_GOOGLE_API_KEY)

const googleGenAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

export const geminiPro = googleGenAI.getGenerativeModel({ model: 'gemini-pro' });
