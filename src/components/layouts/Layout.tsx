import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
};

export default Layout;
