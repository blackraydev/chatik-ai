import { ChangeEventHandler, useState } from 'react';
import { MessageType } from './types';
import { openai } from './api';
import { Message } from './components';
import './App.css';

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userMessage, setUserMessage] = useState('');

  const handleGetResponse = async () => {
    if (!userMessage) return;

    setMessages((prev) => [
      ...prev,
      { initiator: 'User', message: userMessage },
      { initiator: 'Bot', message: '' },
    ]);
    setUserMessage('');

    const stream = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'pai-001',
      stream: true,
    });

    for await (const chunk of stream) {
      const message = chunk.choices[0]?.delta?.content || '';

      setMessages((prev) => {
        const newMessages = [...prev];
        const messagesCount = newMessages.length - 1;
        const lastBotMessage = newMessages[messagesCount];
        const newBotMessage = { ...lastBotMessage, message: lastBotMessage.message + message };

        newMessages[messagesCount] = newBotMessage;

        return newMessages;
      });
    }
  };

  const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserMessage(e.target.value);
  };

  return (
    <div className="app">
      <div className="conversation">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
      <div className="interaction">
        <input
          className="user-input"
          placeholder="Message Chatik..."
          value={userMessage}
          onChange={handleChangeMessage}
        />
        <button className="send-btn" onClick={handleGetResponse}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
