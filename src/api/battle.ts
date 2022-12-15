import axios from 'axios';
import { apiBaseUrl } from './apiBase';

export interface Battle {
  id?: string;
  battleCode: string;
  createdDateTime: Date;
}

const createBattle = async (battle: Battle) => {
  const results = await axios.post(`${apiBaseUrl}/api/battle`, battle);
  if (results.status === 201) {
    return results.data as Battle;
  }
  throw new Error(results.data);
};

const fetchBattleByCode = async (battleCode: string) => {
  const results = await axios.get(`${apiBaseUrl}/api/battle/s/${battleCode}`);
  if (results.status === 200) {
    return results.data as Battle;
  }
  throw new Error(results.data);
};

export { createBattle, fetchBattleByCode };
