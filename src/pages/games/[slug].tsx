import { getGame, getScreenshots } from '@/api/api';
import { GetServerSidePropsContext } from 'next';
import Layout from '@/components/layouts/Layout';
import GameOverview from '@/components/screens/[slug]/GameOverview';
import GameScreenshots from '@/components/screens/[slug]/GameScreenshots';
import { IGameData } from '@/types/home';
import React from 'react';

interface SlugPageProps {
  game: IGameData;
  screenshots: {
    image: string;
  }[];
}

const GamePage = ({ game, screenshots }: SlugPageProps) => {
  return (
    <Layout>
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
    console.log(screenshotsResponse.results);
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
