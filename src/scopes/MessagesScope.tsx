import { createContext, useContext, useEffect, useState } from 'react';
import { useGetMessages } from '../api';
import { useConversationsScope } from '.';
import { MessageType } from '../types';

type MessagesScopeProps = {
  children: React.ReactNode;
};

type MessagesScopeContextType = {
  /**
   * List of current conversation messages
   */
  messages: MessageType[];
  /**
   * Indicates if messages are loading
   */
  isMessagesLoading: boolean;
  /**
   * Add new message to current conversation
   */
  addMessage: (message: MessageType) => void;
  /**
   * Clear all current conversation messages
   */
  clearMessages: () => void;
  /**
   * Bot's current response
   */
  botMessage: MessageType | null;
  /**
   * Change bot's current response
   */
  setBotMessage: React.Dispatch<React.SetStateAction<MessageType | null>>;
};

const MessagesContext = createContext<MessagesScopeContextType>({
  messages: [],
  isMessagesLoading: false,
  addMessage: () => {},
  clearMessages: () => {},
  botMessage: null,
  setBotMessage: () => {},
});

export const MessagesScope = ({ children }: MessagesScopeProps) => {
  const { conversationId, conversationCreated } = useConversationsScope();
  const {
    data: fetchedMessages = [],
    refetch: fetchMessages,
    isFetching: isMessagesLoading,
  } = useGetMessages({
    conversationId,
  });

  const [messages, setMessages] = useState<MessageType[]>(fetchedMessages);
  const [botMessage, setBotMessage] = useState<MessageType | null>(null);

  useEffect(() => {
    if (conversationCreated) {
      setMessages([]);
      fetchMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    if (fetchedMessages?.length) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  const addMessage = (message: MessageType) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessagesLoading,
        addMessage,
        clearMessages,
        botMessage,
        setBotMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesScope = () => useContext(MessagesContext);
