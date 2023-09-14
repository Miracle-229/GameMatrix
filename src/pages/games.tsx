import { getGenres, getNewGamesData, getRatingGamesData } from '@/api/api';
import Header from '@/components/header/Header';
import GameList from '@/pageSections/games/GameList';
import { IGameData, } from '@/types/home';
import React, { useEffect, useId, useState } from 'react';

interface HomePageProps {
  topRateData: any;
  genresData: {
    id: number;
    name: string;
  }[];
}

const GamesPage = ({ topRateData, genresData }: HomePageProps) => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-3">
          <GameList data={topRateData} genresData={genresData} />
        </div>
      </div>
    </>
  );
};
export const getServerSideProps = async () => {
  try {
    const topRateResponse = await getRatingGamesData();
    const genres = await getGenres();
    return {
      props: {
        topRateData: topRateResponse.results || [],
        genresData: genres.results || [],
      },
    };
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return {
      props: {
        topRateData: [],
        genresData: [],
      },
    };
  }
};

export default GamesPage;
