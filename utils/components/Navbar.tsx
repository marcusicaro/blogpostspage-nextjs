'use client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserDataContext } from '@/app/layout';

export default function Navbar() {
  const loginStatus = useContext(UserDataContext);
  return (
    <div>
      {loginStatus?.userData.isLoggedIn ? (
        <div>Logged</div>
      ) : (
        <div>Not Logged</div>
      )}
    </div>
  );
}
