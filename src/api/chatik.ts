import '../polyfills/readableStream';
import { MessageType } from '../types';

type AskChatikParams = {
  history: MessageType[];
  message: string;
};

export const askChatik = async ({ history, message }: AskChatikParams) => {
  const response = await fetch('https://chatik-ai-proxy.onrender.com/askChatik', {
    method: 'POST',
    body: JSON.stringify({ history, message }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.body;
};
