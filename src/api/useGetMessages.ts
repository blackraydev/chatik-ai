import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../consts';

type UseGetMessagesParams = {
  conversationId: string | null;
};

export const useGetMessages = ({ conversationId }: UseGetMessagesParams) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/messages?conversationId=${conversationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { messages = [] } = await response.json();

      return messages;
    },
    enabled: Boolean(conversationId),
  });
};
