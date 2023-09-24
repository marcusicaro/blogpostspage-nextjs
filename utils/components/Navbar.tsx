'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Navbar() {
  const [token, setToken] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchedToken: any = Cookies.get('token');
    setToken(fetchedToken);
    setisLoading(false);
  }, []);
  console.log(token);
  return (
    <nav>
      <p>blog do marquinhos</p>

      {token ? (
        <Link href='/logout'>Logout</Link>
      ) : (
        <Link href='/signin'>Sign in</Link>
      )}
    </nav>
  );
}
