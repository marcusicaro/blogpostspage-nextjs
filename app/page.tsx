'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
// import { GET } from './api/route';

// console.log(GET());

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  let a = 0;
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  const { data, error, isLoading } = useSWR(
    'http://localhost:3002/posts',
    fetcher
  );

  if (error)
    return (
      <div>
        <Link href='/[postId]' as='/posts'>
          Go to Post
        </Link>
        <p>Error fetching data: {error.message}</p>
      </div>
    );
  if (isLoading) return <p>Loading...</p>;
  console.log(data.posts);
  return (
    <div>
      <p>aaaaa</p>
      {data.posts.map((el: any) => {
        a++;
        return (
          <div key={a}>
            <Link
              href={{ pathname: '/posts', query: { id: el._id } }}
              as={'/posts' + '?id=' + el._id}
            >
              {el.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
