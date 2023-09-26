'use client';
import React, { useState } from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createContext } from 'react';
import Navbar from '@/utils/components/Navbar';
// import { Providers } from './providers';
// import Navbar from '@/utils/components/Navbar';

export const UserDataContext: any = createContext(null);

const MyContextProvider = ({ children }: any) => {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    username: '',
  });

  const updateValue = (newValue: any) => {
    setUserData(newValue);
  };

  return (
    <UserDataContext.Provider value={{ userData, updateValue }}>
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
        <MyContextProvider className='flex flex-col'>
          <Navbar />
          {children}
        </MyContextProvider>
      </body>
    </html>
  );
}
