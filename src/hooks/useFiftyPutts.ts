import { fetchFiftyPutts } from '../api';

export const useFiftyPutts = () => {
  return {
    getFiftyPutts: fetchFiftyPutts,
  };
};
