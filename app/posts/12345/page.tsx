'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const pathname = usePathname();
  const postId = pathname.split('/posts/')[1];

  return (
    <div>
      <p>Current pathname: {postId}</p>;
    </div>
  );
}
