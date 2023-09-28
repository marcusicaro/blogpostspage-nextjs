'use client';
import React, {
  PropsWithChildren,
  useState,
  createContext,
  useEffect,
} from 'react';
import './globals.css';
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

export const MyContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
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