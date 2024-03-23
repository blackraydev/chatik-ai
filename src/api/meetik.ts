export const askMeetik = async (message: string) => {
  const response = await fetch('https://meetik-ai-proxy.onrender.com/askMeetik', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
