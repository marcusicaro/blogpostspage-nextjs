'use client';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { postsRoute, usersAdminRoute } from '@/utils/routes';
import { userAdminStatusFetcher } from '@/utils/fetches';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import Link from 'next/link';

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

  if (error)
    return (
      <div>
        <p>Erro carregando os dados: {error.message}</p>
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
