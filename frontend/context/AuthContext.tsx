import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
type UserType = {
  realname: string,
  gender: string,
  birthday: string,
  email: string,
  friend: {
    realname: string,
    gender: string,
    birthday: string,
    relation: [{
      summary: string,
      question: string,
      answer: string
    }]
  },
  self: [{
    summary: string,
    question: string,
    answer: string
  }],
  pairs: [{
    user: {
      realname: String,
      birthday: String,
      email: String
    },
    paid: number
  }],
  authType: String | null
}
type AuthContextType = {
  user: UserType | null;
  signIn: (user: UserType) => void;
  signOut: () => void;
  scaleFont: (size: number) => number;
  requestPair: boolean;
  setRequestPair: (requestPair: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const signIn = (user: UserType) => setUser(user);
  const signOut = () => setUser(null);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [requestPair, setRequestPair] = useState(false);

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number } }) => {
      setScreenWidth(window.width);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const scaleFont = (size: number) => (screenWidth / 375) * size;

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, scaleFont, setRequestPair, requestPair }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
