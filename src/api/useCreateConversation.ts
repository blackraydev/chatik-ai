import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../consts';

export type UseCreateConversationParams = {
  userId?: number;
  conversationId: string;
  prompt: string;
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, conversationId, prompt }: UseCreateConversationParams) => {
      return fetch(`${API_URL}/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, conversationId, prompt }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
      });
    },
  });
};
