import axios, { AxiosRequestConfig } from 'axios';

export interface Envelope<T = unknown> {
  status: number;
  data?: T;
  message?: string;
}

export const getRequest = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
  options?: AxiosRequestConfig,
) => {
  return axios.get<Envelope<T>>(path, { params, ...options });
};
