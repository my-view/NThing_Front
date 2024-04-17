import axios, { Axios, AxiosRequestConfig } from 'axios';
import { AxiosResponse, CustomResponse } from '~/types/modules';
import { getStorage } from '~/assets/util/storage';
import { TOKEN_STORAGE_KEY } from '~/assets/util/constants';

export const AxiosConfig = () => {
  axios.defaults.baseURL = 'https://422c-121-130-216-253.ngrok-free.app';

  axios.interceptors.request.use(
    async (config) => {
      const token = await getStorage(TOKEN_STORAGE_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use((response: AxiosResponse<CustomResponse>) => {
    // console.log('@@ AXIOS RESPONSE 123', response);
    return response.data.data;
  });

  return null;
};
