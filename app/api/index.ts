import axios, { Axios, AxiosRequestConfig } from 'axios';
import { CustomResponse } from '~/types/modules';

const client: Axios = axios.create({
  baseURL: 'https://ecce-121-130-216-253.ngrok-free.app', // 서버 URL
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
