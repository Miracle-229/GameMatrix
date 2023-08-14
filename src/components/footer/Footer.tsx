import Image from 'next/image';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
      <div className="container" style={{ color: '#5a606b', padding: '0px' }}>
        <hr className="mt-5" style={{ borderTop: '1px solid #5a606b' }} />
        <Image src="/logo.png" height={59} width={59} alt="GameMatrix" />
        <h3 style={{marginTop:"10px"}}>GAMEMATRIX</h3>
        <p style={{ fontWeight: 'bolder' }}>
          Все игры в одной матрице на GameMatrix!
        </p>
      </div>
  );
};

export default Footer;
