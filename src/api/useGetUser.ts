import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../consts';
import { UserType } from '../types';

type UseGetUserParams = {
  id: number;
  firstName: string;
  lastName?: string;
  photoURL?: string;
};

export const useGetUser = () => {
  return useMutation({
    mutationFn: async (body: UseGetUserParams): Promise<UserType> => {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const { user } = await response.json();

      return user;
    },
  });
};
