import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  Pressable,
  DevSettings,
} from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import { getHeightRatio } from 'assets/util/layout';
import NaverLogin, { NaverLoginRequest } from '@react-native-seoul/naver-login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import auth from '@react-native-firebase/auth';
import { postLogin } from 'api/login';
import { getStorage, setStorage } from 'assets/util/storage';

const naverLoginKeys = {
  consumerKey: 'vnH89uX9Nczv8vOeXfQw', // 이거 필요한건가?
  consumerSecret: 'TtWl5HamP7', // 얘도 필요한건가?
  appName: 'nThing',
  serviceUrlScheme: 'naverlogin', // only for iOS
};

const googleWebClientId =
  '141023294009-g5k49bh6cmk0re3c94mnu9esi4ep3gcc.apps.googleusercontent.com';

const TOKEN_STORAGE_KEY = 'token';

const naverLogin = async (props: NaverLoginRequest) => {
  try {
    const { successResponse } = await NaverLogin.login(props);
    console.log('네이버 토큰', successResponse?.accessToken);
  } catch (e) {
    console.warn(e);
  }
};

const kakaoLogin = async () => {
  try {
    const { accessToken } = await KakaoLogin.login();
    console.log('카카오 토큰', accessToken);
    // const res = await KakaoLogin.getProfile();
    // console.log('카카오 정뵤', res);
    postLogin('kakao', {
      id_token: accessToken,
    }).then((res) => {
      console.log('res', res);
    });
  } catch (e) {
    console.warn(e);
  }
};

const googleLogin = async () => {
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
    // TODO: 이 부분은 따로 함수를 빼서 소셜로그인 공통으로 사용하게 될 듯
    const token = await postLogin('google', { id_token: firebaseToken }).then(
      ({ data }) => {
        // console.log('서버 토큰', data.token);
        return data.token;
      },
    );
    return token as string;
  } catch (e) {
    console.warn(e);
  }
};

const RootScreen = ({ navigation }: any) => {
  const [serviceToken, setSeviceToken] = useState<string>(); // 우리 서버에서 로그인 되고 나면 저장하려고 했음

  const setToken = (token?: string) => {
    if (!token) return;
    setSeviceToken(token);
    setStorage(TOKEN_STORAGE_KEY, token);
  };

  useEffect(() => {
    if (!serviceToken) {
      getStorage(TOKEN_STORAGE_KEY).then((data) => {
        if (!data) return;
        setSeviceToken(data);
      });
      return;
    }
    // 1. serviceToken으로 user 정보 불러옴 (react query)
    // 2-1. 선택한 학교가 없으면 학교 선택 페이지로 이동
    // navigation.navigate('UniversityScreen');
    // 2-2. 학교가 있으면 (학교 정보와 함께?) 홈으로 이동
    navigation.navigate('MainScreen');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceToken]);

  DevSettings.addMenuItem('Go Search Page', () => {
    navigation.navigate('ChatingScreen');
  });

  return (
    <SafeAreaView>
      <Container>
        <View style={{ flex: 1 }}>
          <Text>NTHING</Text>
        </View>
        <SocialLoginWrap>
          <SocialSubTitle>sns로 간편 로그인</SocialSubTitle>
          <ButtonWrap>
            <Pressable onPress={() => naverLogin(naverLoginKeys)}>
              <Image source={require('../assets/image/naver-btn.png')} />
            </Pressable>
            <Pressable onPress={() => kakaoLogin()}>
              <Image source={require('../assets/image/kakao-btn.png')} />
            </Pressable>
            <Pressable
              onPress={() => googleLogin().then((token) => setToken(token))}
            >
              <Image source={require('../assets/image/google-btn.png')} />
            </Pressable>
          </ButtonWrap>
          <Pressable onPress={() => navigation.navigate('MainScreen')}>
            <LaterLogin>나중에 로그인하기</LaterLogin>
          </Pressable>
        </SocialLoginWrap>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  padding: ${getHeightRatio(0)} 20px;
  height: 100%;
`;

const SocialLoginWrap = styled(View)`
  align-items: center;
`;

const SocialSubTitle = styled(Font16W500)`
  margin-bottom: 30px;
  // font-family: ${(props) => props.theme.font[500]};
  // color: ${(props) => props.theme.palette.primary};
`;

const LaterLogin = styled(UnderLine14)`
  margin-top: 20px;
`;

const ButtonWrap = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 22px;
`;

export default RootScreen;
