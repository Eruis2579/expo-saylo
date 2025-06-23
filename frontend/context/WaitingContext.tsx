import Waiting from '@/app/(auth)/waiting';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type WaitingContextType = {
    waiting: {},
    setAllWaiting: (state: object) => void,
    setWaiting: (state: string) => void,
    delWaiting: (state: string) => void;
};

const WaitingContext = createContext<WaitingContextType | undefined>(undefined);

export const WaitingProvider = ({ children }: { children: ReactNode }) => {
    const [waiting, setAllWaiting]: any = useState<object>({});
    const setWaiting = (state: string) => {
        setAllWaiting((waiting: any) => ({
            ...waiting,
            [state]: true
        }))
    }
    const delWaiting = (state: string) => {
        setAllWaiting((waiting: any) => ({
            ...waiting,
            [state]: false
        }))
    }
    return (
        <WaitingContext.Provider value={{ waiting, setWaiting, delWaiting, setAllWaiting }}>
            {children}
            {!!waiting.global && <Waiting />}
        </WaitingContext.Provider>
    );
};

export const useWaiting = () => {
    const context = useContext(WaitingContext);
    if (!context) throw new Error('useWaiting must be used within WaitingProvider');
    return context;
};
