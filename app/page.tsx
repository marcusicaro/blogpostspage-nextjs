'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
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

  if (error) return <p>Error fetching data: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  console.log(data.posts);
  return (
    <p>
      {data.posts.map((el: any) => {
        return (
          <div>
            <p>{el.title}</p>
            <p>{el.content}</p>
          </div>
        );
      })}
    </p>
  );
}
