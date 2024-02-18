import axios, { Axios, AxiosRequestConfig } from 'axios';
import { AxiosResponse, CustomResponse } from '~/types/modules';
import { getStorage } from '~/assets/util/storage';
import { TOKEN_STORAGE_KEY } from '~/assets/util/constants';

const client: Axios = axios.create({
  baseURL: 'https://422c-121-130-216-253.ngrok-free.app', // 프론트 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<CustomResponse<T>> => {
  try {
    const response = await client.get<CustomResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const postData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<CustomResponse<T>> => {
  try {
    const response = await client.post<CustomResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
