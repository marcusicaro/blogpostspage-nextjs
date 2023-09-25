'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usersLogoutRoute, usersSignupRoute } from '@/utils/routes';
import Cookies from 'js-cookie';
import Loading from '@/utils/components/Loading';
import Redirect from '@/utils/components/Redirect';

export default function Page() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    Cookies.remove('token');
    setisLoading(false);
    router.push('/');
  }, []);

  if (isLoading) Loading();

  return Redirect();
}
