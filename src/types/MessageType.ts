export type MessageType = {
  message?: string;
  initiator?: 'User' | 'Bot';
  error?: string;
  isLoading?: boolean;
};
