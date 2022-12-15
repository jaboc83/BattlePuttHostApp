import axios from 'axios';
import { apiBaseUrl } from './apiBase';

export interface Game {
  id: string;
  name: string;
  maxNumberOfPlayers: number;
  minNumberOfPlayers: number;
  allowTeams: boolean;
  slug: string;
}

const fetchAllGames = async () => {
  const results = await axios.get(`${apiBaseUrl}/api/game`);
  if (results.status === 200) {
    return results.data as Array<Game>;
  }
  throw new Error(results.data);
};

const fetchGameById = async (id: string) => {
  const results = await axios.get(`${apiBaseUrl}/api/game/${id}`);
  if (results.status === 200) {
    return results.data as Game;
  }
  throw new Error(results.data);
};

const fetchGameBySlug = async (id: string) => {
  const results = await axios.get(`${apiBaseUrl}/api/game/s/${id}`);
  if (results.status === 200) {
    return results.data as Game;
  }
  throw new Error(results.data);
};

export { fetchAllGames, fetchGameById, fetchGameBySlug };
