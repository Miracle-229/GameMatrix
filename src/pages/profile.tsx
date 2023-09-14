import Layout from '@/components/layouts/Layout';
import { Providers } from '@/pageSections/Providers';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Image from 'next/image';

const Profile = (title:string) => {
  const user = useSession();
  const t = useTranslations('Index');

  return (
    <Layout title={t('title')}>
      <h1>Profile of {user?.data?.user?.name}</h1>
      {user?.data?.user?.image && (
        <Image width={50} height={50} src={user?.data?.user?.image} alt="" />
      )}
    </Layout>
  );
};

export default Profile;
