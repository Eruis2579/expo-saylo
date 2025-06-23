import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
type AppStateContextType = {
    isForeground: boolean,
};
const AppStateContext = createContext<AppStateContextType | undefined>(undefined);
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
    const appState = useRef<AppStateStatus>(AppState.currentState);
    const [isForeground, setIsForeground] = useState<boolean>(true);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            const wasInBackground = appState.current.match(/inactive|background/) &&
                nextAppState === 'active';

            if (wasInBackground) {
                // 🔄 App moved from background to foreground
                console.log("App resumed, maybe refresh or mark chat as read");
                // 🔁 Do your refresh here (e.g., fetch data or mark chat read)
            }

            appState.current = nextAppState;
            setIsForeground(nextAppState === 'active');
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <AppStateContext.Provider value={{ isForeground }}>
            {children}
        </AppStateContext.Provider>
    );
}
export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) throw new Error('useAppState must be used within AppStateProvider');
    return context;
};

