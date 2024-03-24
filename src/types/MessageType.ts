export type MessageType = {
  text?: string;
  role?: 'user' | 'model';
  error?: string;
  isLoading?: boolean;
};
