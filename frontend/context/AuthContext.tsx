import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
type AuthContextType = {
  user: {
    realname: string,
    gender: string,
    birthday: string,
    email: string,
    friend: {
      realname: string,
      gender: string,
      birthday: string,
      relation: [{
        summary:string,
        question:string,
        answer:string
      }]
    },
    self:[{
      summary:string,
      question:string,
      answer:string
    }]
  } | null;
  signIn: (user: { realname: string, gender: string, birthday: string, email: string, friend: { realname: string, gender: string, birthday: string, relation: [{summary:string,question:string,answer:string}] },self:[{summary:string,question:string,answer:string}] }) => void;
  signOut: () => void;
  scaleFont: (size: number) => number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ realname: string, gender: string, birthday: string, email: string, friend: { realname: string, gender: string, birthday: string, relation: [{summary:string,question:string,answer:string}] },self:[{summary:string,question:string,answer:string}] } | null>(null);

  const signIn = (user: { realname: string, gender: string, birthday: string, email: string, friend: { realname: string, gender: string, birthday: string, relation: [{summary:string,question:string,answer:string}] },self:[{summary:string,question:string,answer:string}] }) => setUser(user);
  const signOut = () => setUser(null);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

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
    <AuthContext.Provider value={{ user, signIn, signOut, scaleFont }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
