import { Match } from '../api';
import { useInterval } from './useInterval';
import { useMatch } from './useMatch';

export const useWatchMatch = (
  match: Match | undefined,
  setMatch: (m: Match) => void,
) => {
  const { getMatch } = useMatch();
  useInterval(async () => {
    if (match?.id) {
      const m = await getMatch(match.id);
      setMatch(m);
    }
  }, 5000);
};
