'use client';
import React from 'react';
import { IGameData } from '@/types/home';
import {
  BsWindows,
  BsXbox,
  BsPlaystation,
  BsNintendoSwitch,
  BsAndroid2,
  BsApple,
} from 'react-icons/bs';
import styled from 'styled-components';
import { SiLinux, SiMacos } from 'react-icons/si';
import { months } from '@/constants/constants';

interface Props {
  data: IGameData;
}

const genresList = ({ data }: Props) => {
  return (
    <ul className="list-inline">
      {data.genres.map((item: any, index: number) => (
        <li className="list-inline-item" key={index}>
          <button className="btn btn-outline-info">{item.name}</button>
        </li>
      ))}
    </ul>
  );
};

function formatDate(inputDate: string) {
  const [year, month, day] = inputDate.split('-');
  const formattedDate = `${parseInt(day, 10)} ${
    months[parseInt(month, 10) - 1]
  } ${year}`;

  return formattedDate;
}

const BackImage = styled.div<{ backgroundImage: string }>`
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
`;

const GameOverview = ({ data }: Props) => {
  const {
    name,
    background_image,
    metacritic,
    publishers,
    parent_platforms,
    description_raw,
  } = data;
  const formattedReleasedDate = data.released ? formatDate(data.released) : '';
  return (
    <>
      <div className="col text-center" style={{ padding: '0' }}>
        <BackImage
          backgroundImage={background_image}
          className="back-img-game"
        />
        <div
          className="carousel-caption"
          style={{
            textAlign: 'center',
            fontSize: 35,
            backgroundColor: 'rgba(21,28,38,0.6)',
          }}
        >
          {name}
        </div>
      </div>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '50% 30% 20%' }}>
          <div>
            <div className="row mt-3">
              <div className="col">
                <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>GENRE</p>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">{genresList({ data })}</div>
            </div>
          </div>
          <div>
            <div className="row mt-3">
              <div className="col">
                <p
                  style={{
                    color: '#5a606b',
                    fontWeight: 'bolder',
                    marginBottom: '5px',
                  }}
                >
                  PLATFORMS
                </p>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <ul className="list-inline">
                  {parent_platforms.map((platformData: any, index: any) => {
                    let platformIcon = null;
                    switch (platformData.platform.slug) {
                      case 'pc':
                        platformIcon = <BsWindows />;
                        break;
                      case 'playstation':
                        platformIcon = <BsPlaystation />;
                        break;
                      case 'xbox':
                        platformIcon = <BsXbox />;
                        break;
                      case 'nintendo':
                        platformIcon = <BsNintendoSwitch />;
                        break;
                      case 'android':
                        platformIcon = <BsAndroid2 />;
                        break;
                      case 'linux':
                        platformIcon = <SiLinux />;
                        break;
                      case 'ios':
                        platformIcon = <BsApple />;
                        break;
                      case 'mac':
                        platformIcon = <SiMacos />;
                        break;
                      default:
                        platformIcon = null;
                    }
                    return (
                      <li
                        className="list-inline-item"
                        key={index}
                        style={{
                          fontWeight: 'bolder',
                          marginBottom: '0px',
                          marginLeft: '10px',
                          color: 'white',
                          fontSize: '30px',
                        }}
                      >
                        {platformIcon}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="row mt-3">
              <div className="col">
                <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>RATING</p>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <p
                  style={{
                    backgroundColor: 'green',
                    padding: '3px 5px',
                    display: 'inline-block',
                    color: 'white',
                  }}
                >
                  {metacritic ? metacritic : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-3">
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>
              DATA RELEASED
            </p>
            <p style={{ color: '#f4c10f' }}>{formattedReleasedDate}</p>
          </div>
          <div className="col-md-3">
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>CREATORS</p>
            <p style={{ color: 'white' }}>{publishers[0].name}</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="mt-3">
              <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>OVERVIEW</p>
              <p style={{ color: 'white' }}>{description_raw}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOverview;
