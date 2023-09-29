'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usersSignupRoute } from '@/utils/routes';
import Cookies from 'js-cookie';
import PasswordField from '../../utils/components/PasswordField';
import Loading from '@/utils/components/Loading';
import Redirect from '@/utils/components/Redirect';

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchedToken: any = Cookies.get('token');
    setToken(fetchedToken);
    setisLoading(false);
    if (fetchedToken) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(usersSignupRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.message) {
        alert(data.message);
        return router.push('/signin');
      } else {
        if (data.error) {
          return alert(data.error.message);
        }
        return alert('Invalid credentials');
      }
    } catch (error) {
      alert(error);
    }
  };
  if (token) {
    return <Redirect />;
  }

  if (isLoading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 items-center justify-center'
    >
      <div className='username-container flex flex-col'>
        <label htmlFor='username'>Usuário:</label>
        <input
          type='text'
          name='username'
          id='username'
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className='h-min rounded-sm border-2 border-black-600'
          required
        />
      </div>
      <PasswordField
        onChangePasswordField={(e: any) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />
      <div className='email-container flex flex-col'>
        <label htmlFor='email' className='email'>
          Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className='h-min rounded-sm border-2 border-black-600'
          required
        />
      </div>
      <button
        type='submit'
        className='mx-auto w-max h-min text-white bg-red-500 px-2 py-1 rounded-md'
      >
        Submit
      </button>
    </form>
  );
}
