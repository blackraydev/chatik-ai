import { ChangeEventHandler, useState } from 'react';
import { MessageType } from './types';
import { geminiPro } from './api';
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

    const geminiStream = await geminiPro.generateContentStream(userMessage);

    for await (const chunk of geminiStream.stream) {
      const message = chunk.text();
      console.log(message)

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
