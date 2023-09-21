import { useRouter } from 'next/router';
import { useEffect } from 'react';

const UserHome = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.postid) {
      console.log('querying');
      router.push(`/posts/${router.query.postid}`);
    } else {
      console.log('not querying');
      router.push('/');
    }
  }, [router.query.postId]);

  return <>Redirecting...</>;
};

export default UserHome;
