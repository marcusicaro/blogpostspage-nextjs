'use client';
import Link from 'next/link';
import useSWR from 'swr';
import AdminForm from '@/utils/components/AdminForm';
import { userAdminStatusFetcher } from '@/utils/fetches';
import FailedComponentLoad from '@/utils/components/FailedComponentLoad';
import Loading from '@/utils/components/Loading';
import { usersRoute } from '@/utils/routes';

export default function Page() {
  const { data, error, isLoading } = useSWR(
    usersRoute.getAdminUrl().href,
    userAdminStatusFetcher
  );

  if (error) return <FailedComponentLoad error={error} />;
  if (isLoading) return <Loading />;
  if (data) {
    if (data.token === false)
      return (
        <div className='flex flex-col gap-2 h-screen align-middle items-center justify-center'>
          <p>Você precisa estar logado</p>
          <Link
            className='mx-auto w-max h-min text-white bg-red-500 px-2 py-1 rounded-md'
            href={'/signin'}
          >
            Login
          </Link>
        </div>
      );
    const { admin } = data;
    return admin === true ? <div>Already an admin!</div> : <AdminForm />;
  }

  return <div>Não foi possível carregar os dados</div>;
}
