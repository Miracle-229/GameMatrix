import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Providers } from '@/pageSections/Providers';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <section>
        <Header />
        {children}
        <Footer />
      </section>
    </Providers>
  );
};

export default Layout;
