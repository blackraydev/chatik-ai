import { createContext, useContext, useEffect, useState } from 'react';
import { useGetMessages } from '../api';
import { useConversationsScope } from '.';
import { MessageType } from '../types';

type MessagesScopeProps = {
  children: React.ReactNode;
};

type MessagesScopeContextType = {
  messages: MessageType[];
  isMessagesLoading: boolean;
  addMessage: (message: MessageType) => void;
  clearMessages: () => void;
};

const MessagesContext = createContext<MessagesScopeContextType>({
  messages: [],
  isMessagesLoading: false,
  addMessage: () => {},
  clearMessages: () => {},
});

export const MessagesScope = ({ children }: MessagesScopeProps) => {
  const { conversationId } = useConversationsScope();
  const { data: fetchedMessages = [], isLoading: isMessagesLoading } = useGetMessages({
    conversationId,
  });

  const [messages, setMessages] = useState<MessageType[]>(fetchedMessages);

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
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesScope = () => useContext(MessagesContext);
