import axios from 'axios';

const API_KEY = '9be60daafabb43db8e41e7bff910446b';
const BASE_URL = 'https://api.rawg.io/api/games';

interface IGamesOptions {
  date: {
    start?: string;
    end?: string;
  };
  ordering?: string;
  released?: string;
  endpoint?: string;
}

// Функция для получения данных с API
export async function getGamesData(options: IGamesOptions) {
  try {
    const response = await axios.get(`${BASE_URL}${options.endpoint}`, {
      params: {
        key: API_KEY,
        dates: `${options.date.start},${options.date.end}`,
        ordering: `${options.ordering}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных из API:', error);
    return [];
  }
}

export async function getNewGamesData() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const options: IGamesOptions = {
    date: {
      start: thirtyDaysAgo.toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    ordering: '-added',
    endpoint: '',
  };
  return getGamesData(options);
}

export async function getRatingGamesData() {
  const startDate = new Date(1960, 0, 1);
  const endDate = new Date();

  const options: IGamesOptions = {
    date: {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
    },
    ordering: '-popularity',
    endpoint: '',
  };

  return await getGamesData(options);
}

export async function getGame(slug: string) {
  const screenshotsOptions: IGamesOptions = {
    date: {
      start: '',
      end: '',
    },
    endpoint: `/${slug}`,
  };

  return await getGamesData(screenshotsOptions);
}

export async function getScreenshots(slug: string) {
  const screenshotsOptions: IGamesOptions = {
    date: {
      start: '',
      end: '',
    },
    endpoint: `/${slug}/screenshots`,
  };

  return await getGamesData(screenshotsOptions);
}
