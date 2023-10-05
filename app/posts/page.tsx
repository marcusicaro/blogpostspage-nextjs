'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import useSWR, { Fetcher } from 'swr';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import parse from 'html-react-parser';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import Comments from '@/utils/components/Comments';
import { postsRoute, commentsRoute } from '@/utils/routes';
import { Edit, Check } from '@mui/icons-material';
import FailedComponentLoad from '@/utils/components/FailedComponentLoad';
import Loading from '@/utils/components/Loading';
import { UserDataContext } from '@/utils/components/UserContext';

export default function Page() {
  const router = useRouter();
  const loginStatus = useContext(UserDataContext);
  const [loadingMessage, setLoadingMessage] = useState('Carregando...');
  const [commentFormData, setCommentFormData] = useState({
    title: '',
    text: '',
  });
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editeablePostTitle, setEditeablePostTitle] = useState('');
  const [editeablePostContent, setEditeablePostContent] = useState('');
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  function togglePostEdit(username: string) {
    if (
      username !== loginStatus.data.username &&
      loginStatus.data.admin !== true
    )
      return;
    setIsEditingPost(!isEditingPost);
  }
  const { data, error, isLoading } = useSWR(
    postsRoute.getPostsUrl(search!).href,

    fetcher
  );

  if (search === null)
    return (
      <div className='w-full h-screen align-middle items-center justify-center flex'>
        Não foi possível carregar os dados desse post
      </div>
    );

  async function postComment(e: any) {
    e.preventDefault();
    try {
      const response = await fetch(
        commentsRoute.getCommentsOnPostUrl(search!).href,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(commentFormData),
        }
      );

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

  async function editPost() {
    try {
      const response = await fetch(postsRoute.getPostsUrl(search!).href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editeablePostTitle,
          content: editeablePostContent,
        }),
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
            <div className='w-full max-w-3xl justify-center '>
              <p className='text-3xl text-center font-bold'>{post.title}</p>
              {parse(post.content)}
              <p className='font-bold'>
                {capitalizeFirstLetter(post.user.username)}
              </p>
              <Edit
                onClick={() => {
                  togglePostEdit(post.user.username);
                  setEditeablePostTitle(post.title);
                }}
              />
            </div>
          ) : (
            <div className='flex gap-2 flex-col w-full max-w-3xl justify-center '>
              <input
                type='text'
                value={editeablePostTitle}
                onChange={(e) => setEditeablePostTitle(e.target.value)}
              />
              <textarea
                defaultValue={post.content}
                name=''
                id=''
                cols={30}
                rows={10}
                onChange={(e) => setEditeablePostContent(e.target.value)}
              ></textarea>
              <div className='flex justify-between'>
                <p className='font-bold'>
                  {capitalizeFirstLetter(post.user.username)}
                </p>
                <div className='flex gap-2'>
                  <button
                    className='w-max h-min text-white bg-red-500 px-2 py-1 rounded-md'
                    onClick={() => togglePostEdit(post.user.username)}
                  >
                    Cancel
                  </button>
                  <Check
                    onClick={() => {
                      editPost();
                      togglePostEdit(post.user.username);
                    }}
                  />
                </div>
              </div>
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
