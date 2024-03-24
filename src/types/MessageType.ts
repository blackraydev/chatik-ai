export type MessageType = {
  message?: string;
  role?: 'user' | 'model';
  error?: string;
  isLoading?: boolean;
};
