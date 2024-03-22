import { ChangeEventHandler, useEffect, useState } from 'react';
import { MessageType } from './types';
import { geminiPro } from './api';
import { Message } from './components';
import './App.css';

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [botMessage, setBotMessage] = useState<MessageType | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed && botMessage) {
      setMessages((prev) => [...prev, botMessage]);
      setBotMessage(null);
      setCompleted(false);
    }
  }, [completed]);

  const handleGetResponse = async () => {
    if (!userMessage) return;

    setMessages((prev) => [...prev, { initiator: 'User', message: userMessage }]);
    setUserMessage('');
    setBotMessage({
      initiator: 'Bot',
      isLoading: true,
    });

    try {
      const geminiStream = await geminiPro.generateContentStream(userMessage);

      for await (const chunk of geminiStream.stream) {
        const message = chunk.text();

        setBotMessage((prev) => ({
          ...prev,
          message: (prev?.message || '') + message,
          isLoading: false,
        }));
      }
    } catch (e) {
      const error = e as Error;

      if (error.message?.includes('400')) {
        setBotMessage((prev) => ({
          ...prev,
          error: 'Please, turn on VPN to use this bot',
        }));
      }
    } finally {
      setBotMessage((prev) => ({
        ...prev,
        isLoading: false,
      }));
      setCompleted(true);
    }
  };

  const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserMessage(e.target.value);
  };

  return (
    <div className="app">
      <div className="conversation">
        {messages.length > 0 ? (
          messages.map((message, index) => <Message key={index} {...message} />)
        ) : (
          <p className="greeting">How can I help you?</p>
        )}
        {botMessage && <Message {...botMessage} />}
      </div>
      <div className="interaction">
        <input
          className="user-input"
          placeholder="Message Chatik..."
          value={userMessage}
          onChange={handleChangeMessage}
        />
        <button className="send-btn" disabled={botMessage?.isLoading} onClick={handleGetResponse}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
