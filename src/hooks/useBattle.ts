import { generateNewCode } from './../codeGenerator';
import { createBattle, fetchBattleByCode } from '../api';

const useBattle = () => {
  return {
    createBattle: () =>
      createBattle({
        battleCode: generateNewCode(8),
        createdDateTime: new Date(),
      }),
    getBattleByCode: fetchBattleByCode,
  };
};

export { useBattle };
