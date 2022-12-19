import axios from 'axios';
import { apiBaseUrl } from './apiBase';

export interface Game {
  name: string;
  maxNumberOfPlayers: number;
  minNumberOfPlayers: number;
  allowTeams: boolean;
  slug: string;
}

export const fetchAllGames = async () => {
  const results = await axios.get(`${apiBaseUrl}/api/game`);
  if (results.status === 200) {
    return results.data as Array<Game>;
  }
  throw new Error(results.data);
};

export const fetchGame = async (slug: string) => {
  const results = await axios.get(`${apiBaseUrl}/api/game/${slug}`);
  if (results.status === 200) {
    return results.data as Game;
  }
  throw new Error(results.data);
};
