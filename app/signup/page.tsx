'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/users/signup', {
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
      <div className='password-container flex flex-col'>
        <label htmlFor='password' className='password'>
          Senha:
        </label>
        <input
          type='text'
          name='password'
          id='password'
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className='h-min rounded-sm border-2 border-black-600'
          required
        />
      </div>
      <div className='email-container flex flex-col'>
        <label htmlFor='email' className='email'>
          Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
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
