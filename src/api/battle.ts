import client, { apiBaseUrl } from './apiBase';

export interface Battle {
  battleCode: string;
  battleCreated: Date;
}

export const createBattle = async () => {
  const results = await client.post(`${apiBaseUrl}/api/battle`);
  if (results.status === 201) {
    return results.data as Battle;
  }
  throw new Error(results.data);
};

export const fetchBattle = async (battleCode: string) => {
  const results = await client.get(`${apiBaseUrl}/api/battle/${battleCode}`);
  if (results.status === 200) {
    return results.data as Battle;
  }
  throw new Error(results.data);
};
