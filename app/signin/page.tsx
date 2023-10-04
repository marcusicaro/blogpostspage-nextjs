'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import PasswordField from '../../utils/components/PasswordField';
import Cookies from 'js-cookie';
import { usersRoute } from '@/utils/routes';
import Loading from '@/utils/components/Loading';
import Redirect from '@/utils/components/Redirect';
import { UserDataContext } from '@/utils/components/Context';

export default function Page() {
  const loginStatus = useContext(UserDataContext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchedToken: any = Cookies.get('token');
    setToken(fetchedToken);
    setisLoading(false);
    if (loginStatus.data.isLoggedIn) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(usersRoute.getSigninUrl().href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.token) {
        Cookies.set('token', data.token, { expires: 1 / 24 });
        loginStatus.setData({ isLoggedIn: true, username: formData.username });
        router.push('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert(error);
    }
  };

  if (token) return <Redirect />;
  if (isLoading) return <Loading />;

  return (
    <form className='flex gap-3 flex-col h-max m-auto' onSubmit={handleSubmit}>
      <div className='container flex gap-2 flex-col h-min'>
        <div className='flex flex-col gap-1 h-min'>
          <label htmlFor='username'>Username:</label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className='h-min rounded-sm border-2 border-black-600'
            type='text'
            name='username'
            id='username'
          />
        </div>
        <PasswordField
          onChangePasswordField={(e: any) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div className='flex align-middle items-center'>
        <a href='/signup' className='text-sm underline'>
          Don't have an account?
        </a>
        <button
          className='ms-auto w-max h-min text-white bg-red-500 px-2 py-1 rounded-md'
          type='submit'
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
