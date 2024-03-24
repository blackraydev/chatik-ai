import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../consts';

export type UseCreateConversationParams = {
  userId: number;
  conversationId: string;
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, conversationId }: UseCreateConversationParams) => {
      return fetch(`${API_URL}/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, conversationId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
      });
    },
  });
};
