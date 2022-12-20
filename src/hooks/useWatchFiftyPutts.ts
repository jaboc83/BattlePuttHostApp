import { FiftyPutts } from '../api';
import { useInterval } from './useInterval';
import { useFiftyPutts } from './useFiftyPutts';

export const useWatchFiftyPutts = (
  fiftyPutts: FiftyPutts | undefined,
  setMatch: (ko: FiftyPutts) => void,
) => {
  const { getFiftyPutts } = useFiftyPutts();
  useInterval(async () => {
    if (fiftyPutts?.matchId) {
      const m = await getFiftyPutts(fiftyPutts.matchId);
      setMatch(m);
    }
  }, 2000);
};
