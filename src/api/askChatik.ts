import { API_URL } from '../consts';
import '../polyfills/readableStream';

type AskChatikParams = {
  conversationId: string;
  userMessage: string;
};

export const askChatik = async ({ conversationId, userMessage }: AskChatikParams) => {
  const response = await fetch(`${API_URL}/askChatik`, {
    method: 'POST',
    body: JSON.stringify({ conversationId, userMessage }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.body;
};
