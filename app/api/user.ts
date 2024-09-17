import axios from 'axios';
import { loadTokens } from '~/hooks/login/login';
import { TOKEN_ERROR_STATUS, userInfoType } from '~/types/user';

export const getUserInfoAPI = async () => {
  const { accessToken } = await loadTokens(); // 비동기적으로 토큰 로드

  return await axios
    .get('/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log('res', res);
      return res;
    })
    .catch((err) => {
      // console.error('err', err);
      // //  토큰 관련 에러
      // if (err.status == 401) {
      //   switch (err.message) {
      //     case TOKEN_ERROR_STATUS.ACCESS_TOKEN_EXPIRED:
      //       // 액세스 토큰 만료 시
      //       // user/reToken API에 리프레쉬 토큰을 담아 호출하여, 토큰 재발급 후 다시 요청하게끔.
      //       '';
      //     case TOKEN_ERROR_STATUS.REFRESH_TOKEN_EXPIRED:
      //       // 리프레쉬 토큰 만료 시
      //       // 액세스와 리프레쉬 토큰 둘 다 만료임으로, 로그인 화면으로 리다이렉트 시킨다.
      //       '';
      //   }
      // }
      // console.log('err', err);
    });
};

export const patchUserInfoAPI = (form: FormData) =>
  axios.patch<userInfoType>('/user', form);
