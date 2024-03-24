import { createContext, useContext, useMemo } from 'react';
import WebApp from '@twa-dev/sdk';

type UserScopeProps = {
  children: React.ReactNode;
};

type UserDataType = (typeof WebApp)['initDataUnsafe']['user'];

type UserScopeContextType = {
  userId: number;
};

const UserContext = createContext<UserScopeContextType>({
  userId: 1234,
});

export const UserScope = ({ children }: UserScopeProps) => {
  const userData: UserDataType = useMemo(() => {
    return WebApp.initDataUnsafe.user;
  }, [WebApp.initDataUnsafe.user]);

  return (
    <UserContext.Provider
      value={{
        userId: userData?.id || 1234,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserScope = () => useContext(UserContext);
