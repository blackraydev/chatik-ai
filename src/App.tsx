import { ChangeEventHandler, useEffect, useState } from 'react';
import { MessageType } from './types';
import { Message } from './components';
import { SendIcon } from './icons';
import { askMeetik } from './api';
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
      const botMessage = await askMeetik(userMessage);

      setBotMessage((prev) => ({
        ...prev,
        message: botMessage,
        isLoading: false,
      }));
    } catch (e) {
      const error = e as Error;
      let errorMessage = error.message;

      if (errorMessage.includes('400')) {
        errorMessage = 'Please, turn on VPN to use this bot';
      } else {
        errorMessage = 'Something went wrong';
      }

      setBotMessage((prev) => ({
        ...prev,
        error: errorMessage,
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
            <p>Welcome to Meetik AI Chatbot</p>
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
