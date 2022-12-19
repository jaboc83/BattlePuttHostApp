import { Match } from '../api';
import { useInterval } from './useInterval';
import { useMatch } from './useMatch';

export const useWatchMatch = (
  match: Match | undefined,
  setMatch: (m: Match) => void,
) => {
  const { getMatch } = useMatch();
  useInterval(async () => {
    if (match?.matchId) {
      const m = await getMatch(match.matchId, match.lastUpdate);
      setMatch(m);
    }
  }, 5000);
};
