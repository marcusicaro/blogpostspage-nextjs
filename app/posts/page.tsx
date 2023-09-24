'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import parse from 'html-react-parser';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import Cookies from 'js-cookie';
import Comments from '../components/Comments';
import { postsRoute, commentsRoute } from '@/utils/routes';

export default function Page() {
  const router = useRouter();
  const [commentFormData, setCommentFormData] = useState({
    title: '',
    text: '',
  });
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  let a = 0;
  const token = Cookies.get('token');
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  const { data, error, isLoading } = useSWR(
    postsRoute + search,

    fetcher
  );

  async function postComment(e: any) {
    e.preventDefault();

    const response = await fetch(commentsRoute + search, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(commentFormData),
    });

    const data = await response.json();
    if (data.message) {
      alert(data.message);
    } else {
      alert('Invalid credentials');
    }
  }

  if (error)
    return (
      <div>
        <Link href='/[postId]' as='/posts'>
          Go to Post
        </Link>
        <p>Error fetching data: {error.message}</p>
      </div>
    );
  if (isLoading)
    return (
      <div className='w-full h-screen align-middle items-center justify-center flex'>
        <div className='w-full h-full align-middle items-center justify-center flex'>
          <svg
            aria-hidden='true'
            className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <p>Carregando...</p>
        </div>
      </div>
    );
  const { post } = data;
  if (search === null)
    return (
      <div className='w-full h-screen align-middle items-center justify-center flex'>
        <div className='w-full h-full align-middle items-center justify-center flex'>
          <p>Not Found</p>
        </div>
      </div>
    );
  return (
    <div className='w-full h-screen  flex-col flex'>
      <div className='w-full align-middle justify-center flex'>
        <div className='w-full justify-center max-w-screen-xl'>
          <p className='text-3xl font-bold'>{post.title}</p>
          {parse(post.content)}
          <p>{capitalizeFirstLetter(post.user.username)}</p>
        </div>
      </div>
      <div className='max-w-3xl w-full flex mx-auto'>
        {token ? (
          <div className='flex flex-col justify-center items-center w-full'>
            <Comments query={search} />
            <form
              onSubmit={postComment}
              className='flex max-w-2xl gap-2 w-full flex-col'
            >
              <input
                onChange={(e) =>
                  setCommentFormData({
                    ...commentFormData,
                    title: e.target.value,
                  })
                }
                type='text'
                name='title'
                placeholder='Título'
                className='rounded-sm border-2 border-black-600'
              />
              <textarea
                onChange={(e) =>
                  setCommentFormData({
                    ...commentFormData,
                    text: e.target.value,
                  })
                }
                name='text'
                placeholder='Conteúdo'
                className='resize-none rounded-sm border-2 border-black-600'
              />
              <button
                className='ms-auto w-max h-min text-white bg-red-500 px-2 py-1 rounded-md'
                type='submit'
              >
                Post Comment
              </button>
            </form>
          </div>
        ) : (
          <div
            className='cursor-pointer w-max px-2 py-1 rounded-md bg-gray-500 text-white mx-auto'
            onClick={() => router.push('/signin')}
          >
            Sign in to comment
          </div>
        )}
      </div>
    </div>
  );
}
