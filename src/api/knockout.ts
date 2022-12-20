import client, { apiBaseUrl } from './apiBase';
import { Match } from './match';

export interface Knockout extends Match {
  distance: number;
  numberOfDiscs: number;
  currentPlayer?: string;
  remainingPutters: { [key: string]: number };
  winningScore: number;
}

export const fetchKnockout = async (matchId: string, lastUpdate?: Date) => {
  let url = `${apiBaseUrl}/api/knockout/${matchId}`;
  if (lastUpdate) {
    url += `?lastUpdate=${encodeURIComponent(lastUpdate.toISOString())}`;
  }
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as Knockout;
  }
  throw new Error(results.data);
};

export const updateKnockout = async (ko: Knockout) => {
  const results = await client.put(`${apiBaseUrl}/api/knockout`, ko);
  if (results.status === 200) {
    return results.data as Knockout;
  }
  throw new Error(results.data);
};
