import { createContext, useContext, useEffect, useMemo } from 'react';
import WebApp from '@twa-dev/sdk';
import { useGetUser } from '../api';
import { UserType } from '../types';

type UserScopeProps = {
  children: React.ReactNode;
};

type UserScopeContextType = {
  /**
   * Current user data
   */
  user: UserType | undefined;

  /**
   * Indicates if user data is loading
   */
  isUserLoading: boolean;

  /**
   * Indicates if user data has an error
   */
  isUserError: boolean;
};

const UserContext = createContext<UserScopeContextType>({
  user: undefined,
  isUserLoading: false,
  isUserError: false,
});

export const UserScope = ({ children }: UserScopeProps) => {
  const rawUserData = useMemo(() => {
    return (
      WebApp.initDataUnsafe.user ?? {
        id: 1010101,
        first_name: 'John',
        last_name: 'Doe',
        photo_url: '',
        tariff: 'free',
      }
    );
  }, [WebApp.initDataUnsafe.user]);

  const {
    data: user,
    mutateAsync: getUser,
    isPending: isUserLoading,
    isError: isUserError,
  } = useGetUser();

  useEffect(() => {
    if (rawUserData.id) {
      getUser({
        id: rawUserData.id,
        firstName: rawUserData.first_name,
        lastName: rawUserData.last_name,
        photoURL: rawUserData.photo_url,
      });
    }
  }, [rawUserData]);

  return (
    <UserContext.Provider value={{ user, isUserLoading, isUserError }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserScope = () => useContext(UserContext);
