'use client';
import { useContext, useEffect } from 'react';
import { UserDataContext } from '@/app/layout';
import Link from 'next/link';
import { userGetInfoRoute } from '../routes';

export default function Navbar() {
  const loginStatus = useContext(UserDataContext);

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
        <div>
          <div className='logo-container'>
            <Link href='/'></Link> blog do marquinhos
          </div>
          <Link href='/signin'>Sign in</Link>
        </div>
      )}
    </div>
  );
}
