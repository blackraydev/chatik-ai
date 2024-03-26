import { Fragment, useEffect, useRef } from 'react';
import { useMessagesScope } from '../../scopes';
import { Spinner } from '../Spinner';
import { Message } from './Message';
import './Conversation.css';

export const Conversation = () => {
  const { messages, isMessagesLoading, botMessage } = useMessagesScope();
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationRef.current?.scroll({
      top: conversationRef.current?.scrollHeight ?? 0,
      behavior: 'smooth',
    });
  }, [messages, botMessage]);

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
    <div className="conversation" ref={conversationRef}>
      {renderConversation()}
    </div>
  );
};
