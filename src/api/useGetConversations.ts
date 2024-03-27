import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../consts';

type UseGetConversationsParams = {
  userId?: number;
};

export const useGetConversations = ({ userId }: UseGetConversationsParams) => {
  return useQuery({
    queryKey: ['conversations', userId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/conversations?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { conversations } = await response.json();

      return conversations;
    },
    enabled: Boolean(userId),
  });
};
