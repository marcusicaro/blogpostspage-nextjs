'use client';
import { useContext, useEffect } from 'react';
import { UserDataContext } from '@/utils/components/UserContext';
import Link from 'next/link';

export default function Navbar() {
  const loginStatus = useContext(UserDataContext);

  return (
    <div className='flex justify-between p-2 border-b-2'>
      <Link
        href='/'
        className='cursor-pointer logo-container flex justify-center items-center'
      >
        blog do marquinhos
      </Link>
      {loginStatus.data.isLoggedIn ? (
        <>
          <div className='flex gap-4'>
            <div>Logged in as: {loginStatus.data.username}</div>
            <div>
              <Link
                className=' w-max h-min text-white bg-red-500 px-2 py-1 rounded-md'
                href='/posts/new'
              >
                New Post
              </Link>
            </div>
            <Link href='/logout'>Logout</Link>
          </div>
        </>
      ) : (
        <>
          <Link
            className=' w-max h-min text-white bg-red-500 px-2 py-1 rounded-md'
            href='/signin'
          >
            Sign in
          </Link>
        </>
      )}
    </div>
  );
}
