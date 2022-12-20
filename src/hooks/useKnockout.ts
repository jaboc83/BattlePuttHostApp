import { fetchKnockout } from '../api';

export const useKnockout = () => {
  return {
    getKnockout: fetchKnockout,
  };
};
