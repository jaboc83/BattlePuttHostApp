import { createMatch, fetchMatchByCode, fetchMatch } from './../api';
import { generateNewCode } from '../codeGenerator';

export const useMatch = () => {
  return {
    createMatch: (battleCode: string, gameId: string) => {
      return createMatch({
        battleCode,
        gameId,
        matchCode: generateNewCode(4),
        matchCreated: new Date(),
      });
    },
    getMatch: fetchMatch,
    getMatchByCode: fetchMatchByCode,
  };
};
