import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AlertPopup from 'react-native-global-components/components/AlertPopup/AlertPopup';
import { Envelope, SocialLoginRoute } from 'types/common';
import { navigationRef } from '~/../RootNavigation';
import { NT_REFRESH_TOKEN } from '~/assets/util/constants';
import { clearStorage, get } from '~/assets/util/storage';

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
  console.log('[postLogin]', route, params);

  // TODO: 사실 이 부분은 api가 통합되어야 할 듯 => 수정될 것 같음
  return axios.post(`/login/${route}`, params);
};

// WIP 에러코드랑 토큰 보내느 형식 다시 맞춰야할듯
let cached: any = null;
let lastCall = 0;
const maxAge = 1000; // 캐시 유지 기간 (밀리초)

export const refreshTokenAPI = async () => {
  // console.group('refreshTokenAPI 시작 =>');
  // const now = Date.now();

  // if (cached !== null && now - lastCall < maxAge) {
  //   return cached; // 캐시된 결과 반환
  // }

  // lastCall = now; // 호출 시간 업데이트

  try {
    const refresh_token = await AsyncStorage.getItem(NT_REFRESH_TOKEN);
    console.log('refresh_token  =>', refresh_token);

    const response = await axios.post(
      `/user/reToken`,
      {}, // 요청 본문이 필요 없다면 빈 객체를 전달합니다.
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      },
    );
    console.log('response  =>', response);

    cached = response.data; // 응답 캐시

    return cached;
  } catch (error) {
    cached = null; // 오류 발생 시 캐시 초기화

    console.log('!!error', error);
    // 리프레쉬 토큰도 만료되었다면?
    // 리프레시 토큰 만료 처리 로직
    if (error) {
      // 리프레시 토큰도 만료됨으로써 로그인페이지로 리다이렉트 처리해야함
      // AsyncStorage.clear();
      navigationRef.current.navigate('RootScreen');
    }
  }
};
