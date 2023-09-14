import { BASE_URL } from '@/constants/constants';
import { IGameData } from '@/types/home';
import axios from 'axios';



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
        key: process.env.API_KEY,
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

export const handleSearch = async (
  query: string,
  setIsLoading: (value: boolean) => void,
  setOptions: (options: any[]) => void
) => {
  const page = 1; // Ваша текущая страница
  const pageSize = 20; // Количество результатов на странице
  setIsLoading(true);
  try {
    const response = await axios.get(
      `${BASE_URL}?search=${query}&key=${process.env.API_KEY}&page=${page}&page_size=${pageSize}`
    );
    const data = await response.data;
    const parsedData = data.results.map((game: IGameData) => ({
      poster: game.background_image,
      date: game.released,
      label: game.name,
      rating: game.metacritic || 'N/A',
      slug: game.slug,
      platforms: game.parent_platforms
        .map((platform) => platform.platform.slug)
        .join(', '),
    }));
    setOptions(parsedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    setOptions([]);
  } finally {
    setIsLoading(false);
  }
};

export async function getGenres() {
  const GENRE_URL = 'https://api.rawg.io/api/genres';
  try {
    const response = await axios.get(GENRE_URL, {
      params: {
        key: process.env.API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}

export async function filterGamesByGenres(genres: number[]) {
  try {
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
    const gamesData = await getGamesData(options); // Получаем все игры по заданным параметрам

    // Фильтруем игры по выбранным жанрам
    const filteredGames = gamesData.results.filter((game: any) => {
      const gameGenres = game.genres.map((genre: any) => genre.id);
      return genres.every((genreId) => gameGenres.includes(genreId));
    });

    return filteredGames;
  } catch (error) {
    console.error('Ошибка при фильтрации игр по жанрам:', error);
    return [];
  }
}
