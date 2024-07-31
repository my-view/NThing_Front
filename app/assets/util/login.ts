import NaverLogin, { NaverLoginRequest } from '@react-native-seoul/naver-login';
import { postLogin } from '~/api/login';
import { SocialLoginRoute } from '~/types/common';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleWebClientId, naverLoginKeys } from './constants';
import auth from '@react-native-firebase/auth';

export const getServiceToken = (social: SocialLoginRoute, idToken: string) =>
  postLogin(social, {
    id_token: idToken,
  }).then((res) => {
    console.log('응답', res);
    return res.access_token as string;
  });

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
    console.log('카카오 토큰', accessToken);

    const token = await getServiceToken('kakao', accessToken);
    return token;
  } catch (e) {
    console.warn(e);
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
