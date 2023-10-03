'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Loading from '@/utils/components/Loading';
import Redirect from '@/utils/components/Redirect';
import { UserDataContext } from '@/utils/components/Context';

export default function Page() {
  const loginStatus = useContext(UserDataContext);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    Cookies.remove('token');
    loginStatus.setData({ isLoggedIn: false, username: '' });
    setisLoading(false);
    router.push('/');
  }, []);

  if (isLoading) return <Loading />;

  return <Redirect />;
}
