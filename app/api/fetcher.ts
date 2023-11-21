import axios from 'axios';
import { TOKEN_STORAGE_KEY } from 'assets/util/constants';
import { getStorage } from 'assets/util/storage';

export interface Envelope<T = unknown> {
  status: number;
  data?: T;
  message?: string;
}

export const getRequest = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
) => {
  const token = await getStorage(TOKEN_STORAGE_KEY);
  console.log('token', token);
  return axios.get<Envelope<T>>(path, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
};
