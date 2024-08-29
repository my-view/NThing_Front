import axios, { Axios, AxiosRequestConfig } from 'axios';
import { AxiosResponse, CustomResponse } from '~/types/modules';
import { getStorage } from '~/assets/util/storage';
import { SERVER_URL } from '~/assets/util/constants';
import { refreshTokenAPI } from '~/api/login';
import { navigationRef } from './RootNavigation';
// import { useLogin } from '~/hooks/login/login';

export const AxiosConfig = () => {
  axios.defaults.baseURL = SERVER_URL;
  // const { setToken, loadTokens, serviceToken } = useLogin();

  // 호출
  // axios.interceptors.request.use(
  //   async (config) => {
  //     const { accessToken } = await loadTokens();
  //     console.log('@@@ interceptors', accessToken);
  //     if (accessToken) {
  //       config.headers.Authorization = `Bearer ${accessToken}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     console.log('axios.interceptors.request', error);
  //     return Promise.reject(error);
  //   },
  // );

  // 응답
  axios.interceptors.response.use(
    (response: AxiosResponse<CustomResponse<any>>) => {
      console.log('@@ AXIOS RESPONSE 123', response.data);
      return response.data.data;
    },
    async (error) => {
      console.error('@@ AXIOS RESPONSE ERROR', error);

      if (error.response) {
        const serverResponse = error.response.data;
        console.error('@@ AXIOS RESPONSE ERROR-serverResponse', serverResponse);

        // api가 /user인 상황에서 Bearer값에 undefined가 들어가면 500값을 뱉음
        // 이때는 일단 RootScreen으로 보내야할듯
        // if (serverResponse.status === 500 && serverResponse.path == '/user') {
        //   navigationRef.current.navigate('RootScreen');
        // }
        // Token 관련 에러
        if (serverResponse.status === 401) {
          // console.error(
          //   '@@ AXIOS RESPONSE ERROR: 인증 오류 (401)',
          //   serverResponse,
          // );
          // 액세스 토큰 만료 시
          if (serverResponse.message === 'ACCESS_TOKEN_EXPIRED') {
            console.error(
              '@@ AXIOS RESPONSE ERROR: 인증 오류 (401)',
              serverResponse,
            );
            // const new_access_token = await refreshTokenAPI();
            // console.log('axiosConfig.ts => new_access_token', new_access_token);
          }
        }

        // 필요하다면 사용자에게 알림 또는 다른 액션
        // alert(serverResponse.message);  // 예시: "ACCESS_TOKEN_EXPIRED" 메시지 표시
      } else {
        console.error('@@ AXIOS RESPONSE ERROR', error);
      }

      // 오류를 그대로 전달
      return Promise.reject(error);
    },
  );

  return null;
};
