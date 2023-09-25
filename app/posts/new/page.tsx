'use client';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { postsRoute, usersAdminRoute } from '@/utils/routes';
import { userAdminStatusFetcher } from '@/utils/fetches';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Loading from '@/utils/components/Loading';
import FailedComponentLoad from '@/utils/components/FailedComponentLoad';

export default function Page() {
  const editorRef = useRef<any | null>(null);
  const [title, setTitle] = React.useState('');
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchedToken: any = Cookies.get('token');
    setToken(fetchedToken);
    if (!fetchedToken) {
      router.push('/signin');
    }
  }, []);

  const { data, error, isLoading } = useSWR(
    usersAdminRoute,
    userAdminStatusFetcher
  );

  const postArticle = async () => {
    try {
      const response = fetch(postsRoute, {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          content: editorRef.current.getContent(),
        }),
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response;
      alert('Article posted');
      router.push('/');
    } catch (err) {
      alert(err);
    }
  };

  if (!token) {
    return (
      <div className='w-full h-screen align-middle items-center justify-center flex'>
        Redirecionando...
      </div>
    );
  }

  if (error) FailedComponentLoad(error);
  if (isLoading) Loading();
  if (data) {
    if (data.admin === true) {
      return (
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <label htmlFor='title'>Title:</label>
            <input
              value={title}
              onChange={(val) => setTitle(val.target.value)}
              type='text'
              name='title'
              id='title'
            />
          </div>
          <Editor
            id='editor'
            apiKey='z8fg4722m7vi4i7ntjdxl6ouumofczoeac22mtbrybzpfsbi'
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue='<p>This is the initial content of the editor.</p>'
            init={{
              height: 500,
              menubar: false,
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
          <button onClick={postArticle} className='justify-start flex'>
            Post Article
          </button>
        </div>
      );
    } else {
      return (
        <div className='w-full h-screen align-middle items-center justify-center flex flex-col gap-2'>
          <p>
            Você precisas ser um administrador para fazer uma nova postagem.
          </p>
          <Link
            className='mx-auto w-max h-min text-white bg-red-500 px-2 py-1 rounded-md'
            href='/admin'
          >
            Become an admin
          </Link>
        </div>
      );
    }
  }
  return (
    <div className='w-full h-screen align-middle items-center justify-center flex flex-col gap-2'>
      <p>Ocorreu um erro ao baixar os dados.</p>
      <Link className='cursor-pointer' href='/'>
        Retornar mara a home
      </Link>
    </div>
  );
}
