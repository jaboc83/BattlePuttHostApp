import { createBattle, fetchBattle } from '../api';

export const useBattle = () => {
  return {
    createBattle,
    getBattleByCode: fetchBattle,
  };
};
