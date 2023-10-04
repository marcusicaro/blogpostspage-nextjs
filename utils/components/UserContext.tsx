'use client';
import React, {
  PropsWithChildren,
  useState,
  createContext,
  useEffect,
} from 'react';
import { usersRoute } from '@/utils/routes';
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
  admin?: boolean;
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
    if (token) {
      const getUserData = async function (): Promise<void> {
        const response = await fetch(usersRoute.getLoginDataUrl(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        updateValue({
          isLoggedIn: true,
          username: data.username,
          admin: data.admin,
        });
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
