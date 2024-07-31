import axios, { Axios, AxiosRequestConfig } from 'axios';
import { AxiosResponse, CustomResponse } from '~/types/modules';
import { get, getStorage } from '~/assets/util/storage';
import { SERVER_URL, TOKEN_STORAGE_KEY } from '~/assets/util/constants';
import { useLogin } from '~/hooks/login/login';

export const AxiosConfig = () => {
  axios.defaults.baseURL = SERVER_URL;
  // const { setToken, get, set, serviceToken } = useLogin();

  axios.interceptors.request.use(
    async (config) => {
      const token = await get();
      console.log('@@@ interceptors', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response: AxiosResponse<CustomResponse<any>>) => {
      // console.log('@@ AXIOS RESPONSE 123', response);
      return response.data.data;
    },
  );

  return null;
};
