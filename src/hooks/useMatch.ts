import { createMatch } from '../api';
import { generateNewCode } from '../codeGenerator';

const useMatch = () => {
  return {
    createMatch: (battleId: string, gameId: string) => {
      return createMatch({
        battleId,
        gameId,
        matchCode: generateNewCode(4),
        matchCreated: new Date(),
      });
    },
  };
};

export { useMatch };
