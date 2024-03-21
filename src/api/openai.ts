import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_PAWAN_API_KEY,
  baseURL: 'https://api.pawan.krd/pai-001/v1',
  dangerouslyAllowBrowser: true,
});
