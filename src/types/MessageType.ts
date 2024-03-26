export type MessageType = {
  text?: string;
  role?: 'user' | 'model';
  conversationId?: string;
  error?: string;
  isLoading?: boolean;
};
