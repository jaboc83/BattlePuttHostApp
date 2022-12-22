import { fetchPerfectPutt } from '../api';

export const usePerfectPutt = () => {
  return {
    getPerfectPutt: fetchPerfectPutt,
  };
};
