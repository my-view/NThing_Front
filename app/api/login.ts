import axios from 'axios';
import { Envelope, SocialLoginRoute } from 'types/common';

interface TokenParams {
  id_token: string;
}

type tokenResponseType = {
  message: string;
  access_token: string;
  refresh_token: string;
};

// 소셜 토큰 이용해서 우리 서버에 로그인
export const postLogin = async (
  route: SocialLoginRoute,
  params: TokenParams,
) => {
  console.log(route, params);

  // TODO: 사실 이 부분은 api가 통합되어야 할 듯 => 수정될 것 같음
  return axios.post(`/login/${route}`, params);
};
