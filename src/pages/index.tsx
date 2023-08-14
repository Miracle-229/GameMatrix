import { getNewGamesData, getRatingGamesData } from '@/api/api';
import Layout from '@/components/layouts/Layout';
import Carousel from '@/pageSections/home/Carousel';
import GameRow from '@/pageSections/home/GameRow';

import { IGameData } from '@/types/home';

interface HomePageProps {
  nowPlayingData: IGameData[];
  topRateData: IGameData[];
}

const HomePage = ({ nowPlayingData, topRateData }: HomePageProps) => (
  <Layout>
    <Carousel data={nowPlayingData} />
    <div className="container">
      <GameRow data={nowPlayingData} />
      <GameRow data={topRateData} />
    </div>
  </Layout>
);

export default HomePage;

export const getServerSideProps = async () => {
  try {
    const nowPlayingResponse = await getNewGamesData();
    const topRateResponse = await getRatingGamesData();
    return {
      props: {
        nowPlayingData: nowPlayingResponse.results || [],
        topRateData: topRateResponse.results || [],
      },
    };
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return {
      props: {
        data: [],
      },
    };
  }
};
