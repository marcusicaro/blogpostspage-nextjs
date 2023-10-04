'use client';
import React, { useState, useEffect, useContext } from 'react';
import useSWR, { Fetcher } from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { postsRoute } from '../utils/routes';
import { UserDataContext } from '@/utils/components/Context';
import Loading from '@/utils/components/Loading';
import FailedComponentLoad from '@/utils/components/FailedComponentLoad';

export default function Home() {
  let userDataContext = useContext(UserDataContext);
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
    postsRoute.getPostsUrl('').href,
    fetcher
  );

  if (error) return <FailedComponentLoad error={error} />;
  if (isLoading) return <Loading />;
  if (data) {
    return (
      <div className='h-full flex flex-col justify-center items-center'>
        <p>Posts:</p>
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
        <Link
          className='mx-auto mt-2 w-max h-min text-white bg-red-500 px-2 py-1 rounded-md'
          href='/posts/new'
        >
          New Post
        </Link>
      </div>
    );
  }
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      Não foi possível carregar os dados...
    </div>
  );
}
