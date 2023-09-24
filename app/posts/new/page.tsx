'use client';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const editorRef = useRef<any | null>(null);
  const [title, setTitle] = React.useState('');
  const router = useRouter();

  const postArticle = async () => {
    try {
      const response = fetch('http://localhost:3002/posts', {
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
      console.log(err);
    }
  };
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
}
