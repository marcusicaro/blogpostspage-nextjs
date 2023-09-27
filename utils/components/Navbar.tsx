'use client';
import { useContext, useEffect } from 'react';
import { UserDataContext } from '@/app/layout';
import Link from 'next/link';

export default function Navbar() {
  const loginStatus = useContext(UserDataContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      async function getUserData() {
        const response = await fetch(usersSigninRoute, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      if (token) {
        loginStatus.setData({ isLoggedIn: true, username: 'marquinhos' });
      }
    }
  }, []);

  return (
    <div>
      {loginStatus.data.isLoggedIn ? (
        <div>
          <div className='logo-container'>
            <Link href='/'></Link> blog do marquinhos
          </div>
          <div className='flex gap-2'>
            <div>{loginStatus.data.username}</div>
            <div
              onClick={() =>
                loginStatus.setData({ isLoggedIn: false, username: '' })
              }
            >
              Logout
            </div>
          </div>
        </div>
      ) : (
        <div>Not Logged</div>
      )}
    </div>
  );
}
