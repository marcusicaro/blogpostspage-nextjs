'use client';

import './globals.css';
import Navbar from '@/utils/components/Navbar';
import { MyContextProvider } from '@/utils/components/Context';

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
