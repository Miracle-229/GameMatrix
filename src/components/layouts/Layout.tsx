import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useTranslations } from 'next-intl';

type Props = {
  children?: ReactNode;
  title: string;
};

const Layout = ({children, title}: Props) => {
  const t = useTranslations('PageLayout');
  return (
    <>
      <Head>
        <title>{[title, t('pageTitle')].join(' - ')}</title>
      </Head>
      <section
        style={{
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        {children}
        <Footer />
      </section>
    </>
  );
};

export default Layout;
