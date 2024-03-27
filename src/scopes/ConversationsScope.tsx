import { createContext, useContext, useState } from 'react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { UseCreateConversationParams, useCreateConversation, useGetConversations } from '../api';
import { ConversationType } from '../types';
import { useUserScope } from '.';

type ConversationsScopeProps = {
  children: React.ReactNode;
};

type ConversationsScopeContextType = {
  /**
   * The ID of the current conversation
   */
  conversationId: string | null;
  /**
   * Change created conversation ID
   */
  chooseConversation: (conversationId: string) => void;
  /**
   * Initialize new conversation ID
   */
  initializeConversation: (conversationId: string) => void;
  /**
   * Clear conversation ID
   */
  startNewConversation: () => void;
  /**
   * List of user conversations
   */
  conversations: ConversationType[];
  /**
   * Indicates if conversation list is fetching
   */
  isConversationsLoading: boolean;
  /**
   * Indicates if conversation was created
   */
  conversationCreated: boolean;
  /**
   * Set conversation creating indicator
   */
  setConversationCreated: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Async Query - Create new conversation
   */
  createConversation: UseMutateAsyncFunction<Response, Error, UseCreateConversationParams, unknown>;
};

const ConversationsContext = createContext<ConversationsScopeContextType>({
  conversationId: null,
  chooseConversation: () => {},
  initializeConversation: () => {},
  startNewConversation: () => {},
  conversations: [],
  isConversationsLoading: false,
  conversationCreated: false,
  setConversationCreated: () => {},
  createConversation: (() => {}) as any,
});

export const ConversationsScope = ({ children }: ConversationsScopeProps) => {
  const { user } = useUserScope();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationCreated, setConversationCreated] = useState(false);

  const { data: conversations = [], isLoading: isConversationsLoading } = useGetConversations({
    userId: user?.id,
  });
  const { mutateAsync: createConversation } = useCreateConversation();

  const chooseConversation = (conversationId: string) => {
    setConversationId(conversationId);
    setConversationCreated(true);
  };

  const initializeConversation = (conversationId: string) => {
    setConversationId(conversationId);
  };

  const startNewConversation = () => {
    setConversationId(null);
    setConversationCreated(false);
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversationId,
        chooseConversation,
        initializeConversation,
        startNewConversation,
        conversations,
        isConversationsLoading,
        conversationCreated,
        setConversationCreated,
        createConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversationsScope = () => useContext(ConversationsContext);
