'use client';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usersAdminRoute } from '@/utils/routes';

export default function AdminForm() {
  const [adminPassword, setAdminPassword] = React.useState('');
  const router = useRouter();
  const postArticle = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(usersAdminRoute, {
        method: 'POST',
        body: JSON.stringify({
          adminPassword: adminPassword,
        }),
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      if (!data.valid) {
        return alert('Senha inválida.');
      }
      return alert('Você agora é um administrador.');
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form onSubmit={postArticle}>
      <div className='container'>
        <label htmlFor='admin-password'>Senha:</label>
        <input
          placeholder='Senha'
          type='password'
          name='admin-password'
          id='admin-password'
          value={adminPassword}
          onChange={(val) => setAdminPassword(val.target.value)}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}
