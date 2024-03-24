import { createContext, useContext, useState } from 'react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { UseCreateConversationParams, useCreateConversation, useGetConversations } from '../api';
import { ConversationType } from '../types';
import { useUserScope } from '.';

type ConversationsScopeProps = {
  children: React.ReactNode;
};

type ConversationsScopeContextType = {
  conversationId: string | null;
  chooseConversation: (conversationId: string) => void;
  startNewConversation: () => void;
  conversations: ConversationType[];
  createConversation: UseMutateAsyncFunction<Response, Error, UseCreateConversationParams, unknown>;
};

const ConversationsContext = createContext<ConversationsScopeContextType>({
  conversationId: null,
  chooseConversation: () => {},
  startNewConversation: () => {},
  conversations: [],
  createConversation: (() => {}) as any,
});

export const ConversationsScope = ({ children }: ConversationsScopeProps) => {
  const { userId } = useUserScope();
  const [conversationId, setConversationId] = useState<string | null>(null);

  const chooseConversation = (conversationId: string) => {
    setConversationId(conversationId);
  };

  const startNewConversation = () => {
    setConversationId(null);
  };

  const { data: conversations = [] } = useGetConversations({ userId });
  const { mutateAsync: createConversation } = useCreateConversation();

  return (
    <ConversationsContext.Provider
      value={{
        conversationId,
        chooseConversation,
        startNewConversation,
        conversations,
        createConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversationsScope = () => useContext(ConversationsContext);
