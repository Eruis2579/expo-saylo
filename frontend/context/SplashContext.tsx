import React, { createContext, ReactNode, useContext, useState } from 'react';

type SplashContextType = {
  splashState: boolean,
  setSplashState: (state: boolean) => void;
};

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export const SplashProvider = ({ children }: { children: ReactNode }) => {
  const [splashState, setSplashState] = useState<boolean>(true);
  return (
    <SplashContext.Provider value={{ splashState, setSplashState }}>
      {children}
    </SplashContext.Provider>
  );
};

export const useSplash = () => {
  const context = useContext(SplashContext);
  if (!context) throw new Error('useSplash must be used within SplashProvider');
  return context;
};
