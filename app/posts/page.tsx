'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import useSWR, { Fetcher } from 'swr';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import parse from 'html-react-parser';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import Cookies from 'js-cookie';
import Comments from '@/utils/components/Comments';
import { postsRoute, commentsRoute } from '@/utils/routes';
import FailedComponentLoad from '@/utils/components/FailedComponentLoad';
import Loading from '@/utils/components/Loading';
import { UserDataContext } from '@/utils/components/Context';

export default function Page() {
  const router = useRouter();
  const loginStatus = useContext(UserDataContext);
  const [commentFormData, setCommentFormData] = useState({
    title: '',
    text: '',
  });
  const [isEditingPost, setIsEditingPost] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  let a = 0;
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  function togglePostEdit(username: string) {
    if (username !== loginStatus.data.username) return;
    setIsEditingPost(!isEditingPost);
  }

  if (search === null)
    return (
      <div className='w-full h-screen align-middle items-center justify-center flex'>
        Não foi possível carregar os dados desse post
      </div>
    );

  const { data, error, isLoading } = useSWR(
    postsRoute + search,

    fetcher
  );

  async function postComment(e: any) {
    e.preventDefault();
    try {
      const response = await fetch(commentsRoute.getCommentsUrl(search!), {
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
        alert('Falha ao postar comentário');
      }
    } catch (error) {
      alert(error);
    }
  }

  async function mutatePostField(e: any) {}

  if (error) return <FailedComponentLoad error={error} />;
  if (isLoading) return <Loading />;
  if (search === null)
    return (
      <div className='w-full h-screen align-middle items-center justify-center flex'>
        <div className='w-full h-full align-middle items-center justify-center flex'>
          <p>Não encontrou nenhum resultado</p>
        </div>
      </div>
    );
  if (data) {
    const { post } = data;
    return (
      <div className='w-full flex-col flex'>
        <div className='w-full align-middle justify-center flex'>
          {!isEditingPost ? (
            <div
              onClick={() => togglePostEdit(post.user.username)}
              className='w-full max-w-3xl justify-center '
            >
              <p className='text-3xl text-center font-bold'>{post.title}</p>
              {parse(post.content)}
              <p className='font-bold'>
                {capitalizeFirstLetter(post.user.username)}
              </p>
            </div>
          ) : (
            <div
              // onClick={() => togglePostEdit()}
              className='flex gap-2 flex-col w-full max-w-3xl justify-center '
            >
              <input type='text' value={post.title} />
              <textarea name='' id='' cols={30} rows={10}>
                {post.content}
              </textarea>
              <p className='font-bold'>
                {capitalizeFirstLetter(post.user.username)}
              </p>
            </div>
          )}
        </div>
        <div className='max-w-3xl w-full flex mx-auto'>
          {loginStatus.data.isLoggedIn ? (
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
}
