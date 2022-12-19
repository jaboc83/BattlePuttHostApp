import { fetchKnockout, updateKnockout } from '../api';

export const useKnockout = () => {
  return {
    getKnockout: fetchKnockout,
  };
};
