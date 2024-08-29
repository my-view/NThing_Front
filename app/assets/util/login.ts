import NaverLogin, { NaverLoginRequest } from '@react-native-seoul/naver-login';
import { postLogin } from '~/api/login';
import { SocialLoginRoute } from '~/types/common';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  googleWebClientId,
  naverLoginKeys,
  NT_ACCESS_TOKEN,
  NT_REFRESH_TOKEN,
} from './constants';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '~/hooks/login/login';

interface loginResponseType {
  data: { message: string; access_token: string; refresh_token: string };
  message: null;
  status: number;
  code: null;
}

export const getServiceToken = async (
  social: SocialLoginRoute,
  idToken: string,
) => {
  try {
    console.log('getServiceToken ::', social, idToken);
    const res: loginResponseType = await postLogin(social, {
      id_token: idToken,
    });

    console.log('응답', res);
    return res;
  } catch (error) {
    console.error('Token retrieval failed:', error);
    throw error;
  }
};

export const naverLogin = async () => {
  const NAVER_LOGIN_KEY: NaverLoginRequest = naverLoginKeys;
  try {
    const { successResponse } = await NaverLogin.login(NAVER_LOGIN_KEY);
    console.log('네이버 토큰', successResponse?.accessToken);
  } catch (e) {
    console.warn(e);
  }
};

export const kakaoLogin = async () => {
  try {
    const { accessToken } = await KakaoLogin.login();
    // console.log('카카오 토큰', accessToken);

    const token = await getServiceToken('kakao', accessToken);
    console.log('getServiceToken카카오 토큰', token);
    setToken(token);

    return token;
  } catch (e) {
    console.log('kakaoLogin Error', e);
  }
};

export const googleLogin = async () => {
  GoogleSignin.configure({
    webClientId: googleWebClientId,
  });
  try {
    const { idToken } = await GoogleSignin.signIn();
    // console.log('구글 토큰', idToken);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const firebaseToken = await auth()
      .signInWithCredential(googleCredential)
      .then(({ user }) => user.getIdToken());
    // console.log('새로 받은 토큰', firebaseToken);
    const token = await getServiceToken('google', firebaseToken);
    return token;
  } catch (e) {
    console.warn(e);
  }
};
