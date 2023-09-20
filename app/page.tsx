'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
import Link from 'next/link';
// import { GET } from './api/route';

// console.log(GET());

export default function Home() {
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
        return (
          <div>
            <p>{el.title}</p>
            <p>{el.content}</p>
          </div>
        );
      })}
    </div>
  );
}
