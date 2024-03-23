import '../polyfills/readableStream';

export const askChatik = async (message: string) => {
  const response = await fetch('https://chatik-ai-proxy.onrender.com/askChatik', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.body;
};
