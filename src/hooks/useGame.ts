import { fetchAllGames, fetchGame } from '../api';

export const useGame = () => {
  return {
    getGames: fetchAllGames,
    getGame: fetchGame,
  };
};
