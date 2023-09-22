'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// import { GET } from './api/route';

// console.log(GET());

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  let a = 0;
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  const { data, error, isLoading } = useSWR(
    'http://localhost:3002/posts/' + search,

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
  console.log(data);
  const { post } = data;
  if (search === null)
    return (
      <div className='w-100 justify-center flex'>
        <div>
          <p>Not Found</p>
        </div>
      </div>
    );
  return (
    <div className='w-100 justify-center flex'>
      <div>
        <p>{post.title}</p>
        <p>{post.content}</p>
        <p>{post.user.username}</p>
      </div>
    </div>
  );
}
