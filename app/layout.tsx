'use client';
import React, {
  ContextType,
  PropsWithChildren,
  ReactNode,
  useState,
  createContext,
  useEffect,
} from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/utils/components/Navbar';
import { userGetInfoRoute } from '@/utils/routes';
import Cookies from 'js-cookie';

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

  useEffect(() => {
    const token = Cookies.get('token');
    console.log(token);
    if (token) {
      const getUserData = async function (): Promise<void> {
        const response = await fetch(userGetInfoRoute, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        updateValue({ isLoggedIn: true, username: data.username });
      };
      getUserData();
    }
  }, []);

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
