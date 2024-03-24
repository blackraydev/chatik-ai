import { createContext, useContext, useState } from 'react';

type DrawerVisibilityScopeProps = {
  children: React.ReactNode;
};

type DrawerVisibilityContextType = {
  isDrawerVisible: boolean;
  showDrawer: () => void;
  hideDrawer: () => void;
};

const DrawerVisibilityContext = createContext<DrawerVisibilityContextType>({
  isDrawerVisible: false,
  showDrawer: () => {},
  hideDrawer: () => {},
});

export const DrawerVisibilityScope = ({ children }: DrawerVisibilityScopeProps) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const hideDrawer = () => setDrawerVisible(false);

  return (
    <DrawerVisibilityContext.Provider value={{ isDrawerVisible, showDrawer, hideDrawer }}>
      {children}
    </DrawerVisibilityContext.Provider>
  );
};

export const useDrawerVisibilityScope = () => useContext(DrawerVisibilityContext);
