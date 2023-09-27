'use client';
import React, {
  ContextType,
  PropsWithChildren,
  ReactNode,
  useState,
  createContext,
} from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/utils/components/Navbar';

export const UserDataContext = createContext<UserDataController>({
  data: {
    isLoggedIn: false,
    username: '',
  },
  setData: () => {},
});

interface UserData {
  isLoggedIn: boolean;
  username: string;
}

interface UserDataController {
  data: UserData;
  setData: (newValue: UserData) => void;
}

const MyContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    username: '',
  });

  const updateValue = (newValue: UserData) => {
    setUserData(newValue);
  };

  return (
    <UserDataContext.Provider value={{ data: userData, setData: updateValue }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className='w-full h-screen flex bg-transparent flex flex-col justify-center max-w-screen-xl m-auto'
        style={{ background: 'none' }}
      >
        <MyContextProvider>
          <Navbar />
          {children}
        </MyContextProvider>
      </body>
    </html>
  );
}
