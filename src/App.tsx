import { ChangeEventHandler, Fragment, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { MessageType } from './types';
import { Drawer, Header, Message, Spinner } from './components';
import { SendIcon } from './icons';
import { askChatik } from './api';
import { useConversationsScope, useMessagesScope, useUserScope } from './scopes';
import './App.css';

function App() {
  const { userId } = useUserScope();
  const { conversationId, createConversation } = useConversationsScope();
  const { messages, isMessagesLoading, addMessage } = useMessagesScope();

  const [userMessage, setUserMessage] = useState('');
  const [botMessage, setBotMessage] = useState<MessageType | null>(null);
  const [completed, setCompleted] = useState(false);

  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationRef.current?.scroll({
      top: conversationRef.current?.scrollHeight ?? 0,
      behavior: 'smooth',
    });
  }, [messages, botMessage]);

  useEffect(() => {
    if (completed && botMessage) {
      addMessage(botMessage);
      setBotMessage(null);
      setCompleted(false);
    }
  }, [completed]);

  const handleGetResponse = async () => {
    if (!userMessage) return;

    addMessage({ role: 'user', text: userMessage });

    setUserMessage('');
    setBotMessage({
      role: 'model',
      isLoading: true,
    });

    try {
      const targetConversationId = conversationId || v4();
      const stream = await askChatik({ conversationId: targetConversationId, userMessage });
      const decoder = new TextDecoder();

      if (!stream) {
        throw new Error('No stream found');
      }

      for await (const chunk of stream) {
        const decodedChunk = decoder.decode(chunk);

        setBotMessage((prev) => ({
          ...prev,
          text: (prev?.text || '') + decodedChunk,
          isLoading: false,
        }));
      }

      if (userId && !conversationId) {
        await createConversation({ userId, conversationId: targetConversationId });
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

  const renderConversation = () => {
    if (isMessagesLoading) {
      return (
        <div className="center">
          <Spinner size="big" />
        </div>
      );
    }

    if (!messages.length) {
      return (
        <div className="greeting">
          <p>Welcome to Chatik AI Chatbot</p>
          <span>How can I help you?</span>
        </div>
      );
    }

    return (
      <Fragment>
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
        {botMessage && <Message {...botMessage} />}
      </Fragment>
    );
  };

  return (
    <div className="app">
      <Header />
      <Drawer />
      <div className="conversation" ref={conversationRef}>
        {renderConversation()}
      </div>
      <div className="interaction">
        <input
          className="user-input"
          placeholder="Send a message..."
          value={userMessage}
          onChange={handleChangeMessage}
        />
        <button
          className="send-btn"
          disabled={!userMessage || botMessage?.isLoading}
          onClick={handleGetResponse}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default App;
