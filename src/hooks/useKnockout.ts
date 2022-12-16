import { fetchKnockout, updateKnockout } from '../api';

export const useKnockout = () => {
  return {
    getKnockout: fetchKnockout,
    startKnockout: async (
      matchId: string,
      distance: number,
      numberOfDiscs: number,
    ) => {
      const currentMatch = await fetchKnockout(matchId);
      currentMatch.distance = distance;
      currentMatch.numberOfDiscs = numberOfDiscs;
      const randomPlayerIndex = Math.floor(
        Math.random() * (currentMatch?.players?.length || 0),
      );
      currentMatch.matchStart = new Date();
      if (currentMatch.players) {
        currentMatch.currentPlayer =
          currentMatch.players[randomPlayerIndex].playerUsername;
      }
      return updateKnockout(currentMatch);
    },
  };
};
