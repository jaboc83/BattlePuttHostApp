import { fetchHorse } from '../api';

export const useHorse = () => {
  return {
    getHorse: fetchHorse,
  };
};
