export type IGameData = {
  id: number;
  slug?: string;
  name: string;
  background_image: string;
  metacritic: string;
  released?: string;
  parent_platforms: {
    platform: {
      slug: string;
    };
  }[];
  genres: {
    name: string;
  }[];
  description_raw:string,
  publishers:{
    name:string
  }[]
};
