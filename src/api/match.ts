import axios from 'axios';
import { apiBaseUrl } from './apiBase';

export interface MatchPlayer {
  id?: string;
  playerUsername?: string;
  score?: number;
}

export interface Match {
  id?: string;
  gameId: string;
  players?: Array<MatchPlayer>;
  matchCreated?: Date;
  matchStart?: Date;
  matchComplete?: Date;
  matchCode: string;
  hostPlayerUsername?: string;
  battleCode: string;
  playersWhoConfirmedScore?: Array<string>;
}

export const createMatch = async (match: Match) => {
  const results = await axios.post(`${apiBaseUrl}/api/match`, match);
  if (results.status === 201) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export const fetchMatch = async (id: string) => {
  const results = await axios.get(`${apiBaseUrl}/api/match/${id}`);
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export const fetchMatchByCode = async (code: string) => {
  const results = await axios.get(`${apiBaseUrl}/api/match/s/${code}`);
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};
