import { getGame, getScreenshots } from '@/api/api';
import { GetServerSidePropsContext } from 'next';
import Layout from '@/components/layouts/Layout';
import { IGameData } from '@/types/home';
import React from 'react';
import GameOverview from '@/pageSections/[slug]/GameOverview';
import GameScreenshots from '@/pageSections/[slug]/GameScreenshots';

interface SlugPageProps {
  game: IGameData;
  screenshots: {
    image: string;
  }[];
}

const GamePage = ({ game, screenshots }: SlugPageProps) => {
  return (
    <Layout title='Game'>
      <GameOverview data={game} />
      <div className="container">
        <GameScreenshots data={screenshots} />
      </div>
    </Layout>
  );
};

export default GamePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const slug = context.params?.slug as string;
    const game = await getGame(slug);
    const screenshotsResponse = await getScreenshots(slug);
    return {
      props: {
        game,
        screenshots: screenshotsResponse.results || [],
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
