import axios from 'axios';
import { apiBaseUrl } from './apiBase';
import { Player } from './players';

export interface Match {
  id?: string;
  gameId: string;
  players?: Array<Player>;
  matchCreated?: Date;
  matchStart?: Date;
  matchComplete?: Date;
  matchCode: string;
  hostPlayerId?: string;
  battleId: string;
  playersWhoConfirmedScore?: Array<string>;
}

const createMatch = async (match: Match) => {
  const results = await axios.post(`${apiBaseUrl}/api/match`, match);
  if (results.status === 201) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export { createMatch };
