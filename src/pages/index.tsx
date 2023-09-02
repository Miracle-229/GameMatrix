import { getNewGamesData, getRatingGamesData } from '@/api/api';
import Layout from '@/components/layouts/Layout';
import Carousel from '@/pageSections/home/Carousel';
import GameRow from '@/pageSections/home/GameRow';
import { GetServerSideProps } from 'next';

import { IGameData } from '@/types/home';
import { useTranslations } from 'next-intl';

interface HomePageProps {
  nowPlayingData: IGameData[];
  topRateData: IGameData[];
}

const HomePage = ({ nowPlayingData, topRateData }: HomePageProps) => {
  const t = useTranslations('Index');
  return (
    <Layout title={t('title')}>
      <Carousel data={nowPlayingData} />
      <div className="container">
        <div
          style={{ display: 'flex', justifyContent: 'center' }}
          className="row mt-5"
        >
          <p className="font-weight-bold" style={{ color: '#5a606b' }}>
            {t('titleRowNew')}
          </p>
        </div>
        <GameRow data={nowPlayingData} />
        <div
          style={{ display: 'flex', justifyContent: 'center' }}
          className="row mt-5"
        >
          <p className="font-weight-bold" style={{ color: '#5a606b' }}>
            {t('titleRowRating')}
          </p>
        </div>
        <GameRow data={topRateData} />
      </div>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  locale,
}) => {
  try {
    const nowPlayingResponse = await getNewGamesData();
    const topRateResponse = await getRatingGamesData();
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return {
      props: {
        nowPlayingData: nowPlayingResponse.results || [],
        topRateData: topRateResponse.results || [],
        messages,
      },
    };
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return {
      props: {
        nowPlayingData: [],
        topRateData: [],
        messages: {},
      },
    };
  }
};
