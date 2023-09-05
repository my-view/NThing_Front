import axios from 'axios';

/**
 * 카카오 로그인 API
 */
export const kakaoTokenAPI = async (params: any) => {
  return axios.post(`/login/kakao`, params);
};