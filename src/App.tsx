import { ChangeEventHandler, useEffect, useState } from 'react';
import { MessageType } from './types';
import { Message } from './components';
import { SendIcon } from './icons';
import { askChatik } from './api';
import './App.css';

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [botMessage, setBotMessage] = useState<MessageType | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed && botMessage) {
      setMessages((prev) => {
        const newMessages = [...prev, botMessage];
        localStorage.setItem('history', JSON.stringify(newMessages));

        return newMessages;
      });
      setBotMessage(null);
      setCompleted(false);
    }
  }, [completed]);

  const handleGetResponse = async () => {
    if (!userMessage) return;

    setMessages((prev) => [...prev, { role: 'user', message: userMessage }]);
    setUserMessage('');
    setBotMessage({
      role: 'model',
      isLoading: true,
    });

    try {
      const historyJSON = localStorage.getItem('history');
      const history: MessageType[] = historyJSON ? JSON.parse(historyJSON) : [];

      const stream = await askChatik({ history, message: userMessage });
      const decoder = new TextDecoder();

      if (!stream) {
        throw new Error('No stream found');
      }

      for await (const chunk of stream) {
        const decodedChunk = decoder.decode(chunk);

        setBotMessage((prev) => ({
          ...prev,
          message: (prev?.message || '') + decodedChunk,
          isLoading: false,
        }));
      }
    } catch (e) {
      setBotMessage((prev) => ({
        ...prev,
        error: 'Something went wrong',
      }));
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
          <div className="greeting">
            <p>Welcome to Chatik AI Chatbot</p>
            <span>How can I help you?</span>
          </div>
        )}
        {botMessage && <Message {...botMessage} />}
      </div>
      <div className="interaction">
        <input
          className="user-input"
          placeholder="Send a message..."
          value={userMessage}
          onChange={handleChangeMessage}
        />
        <button className="send-btn" disabled={botMessage?.isLoading} onClick={handleGetResponse}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default App;
