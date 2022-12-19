import axios from 'axios';
import { apiBaseUrl } from './apiBase';

export interface MatchPlayer {
  username: string;
  score: number;
}

export interface Match {
  matchId: string;
  battleCode: string;
  gameSlug: string;
  matchCode: string;
  matchCreated: Date;
  matchStart?: Date;
  matchComplete?: Date;
  players: Array<MatchPlayer>;
  hostPlayerUsername?: string;
  lastUpdate: Date;
}

export interface CreateMatch {
  battleCode: string;
  gameSlug: string;
}

export const createMatch = async (match: CreateMatch) => {
  const results = await axios.post(`${apiBaseUrl}/api/match`, match);
  if (results.status === 201) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export const fetchMatch = async (matchId: string, lastUpdate?: Date) => {
  let url = `${apiBaseUrl}/api/match/${matchId}`;
  if (lastUpdate) {
    url += `?lastUpdate=${encodeURIComponent(lastUpdate.toString())}`;
  }
  const results = await axios.get(url);
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};
