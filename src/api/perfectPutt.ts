import client, { apiBaseUrl } from './apiBase';
import { Match } from './match';

export interface StationScore {
  username: string;
  madeFirst: boolean;
  madeLast: boolean;
  totalMade: number;
}

export interface PerfectPutt extends Match {
  currentPlayer?: string;
  currentStation: number;
  distances: Array<number>;
  stationScores: Array<Array<StationScore>>;
  winningScore: number;
  numberOfDiscs: number;
}

export const fetchPerfectPutt = async (matchId: string, lastUpdate?: Date) => {
  let url = `${apiBaseUrl}/api/perfectPutt/${matchId}`;
  if (lastUpdate) {
    url += `?lastUpdate=${encodeURIComponent(lastUpdate.toISOString())}`;
  }
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as PerfectPutt;
  }
  throw new Error(results.data);
};

export const updatePerfectPutt = async (ko: PerfectPutt) => {
  const results = await client.put(`${apiBaseUrl}/api/perfectPutt`, ko);
  if (results.status === 200) {
    return results.data as PerfectPutt;
  }
  throw new Error(results.data);
};
