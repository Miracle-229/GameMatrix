import { getNewGamesData } from '@/api/api';
import { IGameData } from '@/types/home';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useId, useState } from 'react';
import {
  BsWindows,
  BsXbox,
  BsPlaystation,
  BsNintendoSwitch,
  BsAndroid2,
  BsApple,
} from 'react-icons/bs';
import { SiLinux, SiMacos } from 'react-icons/si';

interface Props {
  data: IGameData[];
}

function getPlatformIcon(platformSlug: string) {
  switch (platformSlug) {
    case 'pc':
      return <BsWindows />;
    case 'playstation':
      return <BsPlaystation />;
    case 'xbox':
      return <BsXbox />;
    case 'nintendo':
      return <BsNintendoSwitch />;
    case 'android':
      return <BsAndroid2 />;
    case 'linux':
      return <SiLinux />;
    case 'ios':
      return <BsApple />;
    case 'mac':
      return <SiMacos />;
    default:
      return null;
  }
}

const GameRow = ({ data }: Props) => {
  const id = useId();
  const gameList = data.slice(0, 8).map((item: IGameData) => {
    return (
      <div style={{ marginTop: '30px' }} className="col-md-3 col-sm-6" key={id}>
        <div className="card" style={{ height: '11em' }}>
          <Link href={`/games/${item.slug}`}>
            <Image fill alt={item.name} src={item.background_image}></Image>
          </Link>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="mt-3"
        >
          <div style={{ display: 'flex' }}>
            {item.parent_platforms.map((platformData: any, index: any) => (
              <p
                key={index}
                style={{
                  fontWeight: 'bolder',
                  marginBottom: '0px',
                  marginLeft: '10px',
                  color: 'white',
                }}
              >
                {getPlatformIcon(platformData.platform.slug)}
              </p>
            ))}
          </div>
          <div>
            {item.metacritic === null ? (
              <p />
            ) : (
              <span
                style={{
                  backgroundColor: 'green',
                  padding: '3px 5px',
                  color: 'white',
                }}
              >
                {item.metacritic}
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="mt-3"
        >
          <p
            style={{
              fontWeight: 'bolder',
              marginBottom: '0px',
              color: 'white',
            }}
          >
            {item.name}
          </p>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="row mt-5">
          <div className="col">
            {data[0].id !== 3498 ? (
              <p className="font-weight-bold" style={{ color: '#5a606b' }}>
                ПОПУЛЯРНЫЕ ИГРЫ НА ЭТОЙ НЕДЕЛЕ
              </p>
            ) : (
              <p className="font-weight-bold" style={{ color: '#5a606b' }}>
                САМЫЕ РЕЙТИНГОВЫЕ ИГРЫ
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="row">{gameList}</div>
    </div>
  );
};

export default GameRow;
