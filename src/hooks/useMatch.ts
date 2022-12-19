import { createMatch, fetchMatch } from './../api';

export const useMatch = () => {
  return {
    createMatch: (battleCode: string, gameSlug: string) => {
      return createMatch({
        battleCode,
        gameSlug,
      });
    },
    getMatch: fetchMatch,
  };
};
