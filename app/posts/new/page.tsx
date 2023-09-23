'use client';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
export default function Page() {
  const editorRef = useRef(null);
  const [title, setTitle] = React.useState('');
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current);
    }
  };
  const postArticle = () => {
    try {
      fetch('http://localhost:3002/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          content: log,
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
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
      <button onClick={log} className='justify-start flex'>
        Log editor content
      </button>
    </div>
  );
}
