import { getNewGamesData } from '@/api/api';
import Header from '@/components/header/Header';
import { useEffect, useId, useState } from 'react';
import CarouselB from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { IGameData } from '@/types/home';

interface Props {
  data: IGameData[];
}

const Carousel = ({ data }: Props) => {
  const id=useId()
  return (
    <>
      <div style={{ padding: '0px' }} className="col">
        <CarouselB
          prevLabel={null}
          nextLabel={null}
          indicators={false}
          interval={3000}
        >
          {data.map((item) => (
            <CarouselB.Item key={id}>
              <div style={{ height: '80vh', width: '100%' }}>
                <div
                  className="carousel-center"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Image
                    style={{
                      height: '100vh',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                    src={item.background_image}
                    alt={item.name}
                  />
                </div>
              </div>
              <div
                className="carousel-caption"
                style={{
                  textAlign: 'center',
                  fontSize: 35,
                  backgroundColor: 'rgba(21,28,38,0.6)',
                }}
              >
                {item.name}
              </div>
            </CarouselB.Item>
          ))}
        </CarouselB>
      </div>
    </>
  );
};

export default Carousel;
