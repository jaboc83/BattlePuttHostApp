import { generateNewCode } from './../codeGenerator';
import { createBattle, fetchBattleByCode } from '../api';

export const useBattle = () => {
  return {
    createBattle: () =>
      createBattle({
        battleCode: generateNewCode(8),
        createdDateTime: new Date(),
      }),
    getBattleByCode: fetchBattleByCode,
  };
};
