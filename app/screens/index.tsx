import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import { getHeightRatio } from 'assets/util/layout';
import NaverLogin, { NaverLoginRequest } from '@react-native-seoul/naver-login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

const naverLoginKeys = {
  consumerKey: 'vnH89uX9Nczv8vOeXfQw', // 이거 필요한건가?
  consumerSecret: 'TtWl5HamP7', // 얘도 필요한건가?
  appName: 'nThing',
  serviceUrlScheme: 'naverlogin', // only for iOS
};

const googleWebClientId =
  '141023294009-g5k49bh6cmk0re3c94mnu9esi4ep3gcc.apps.googleusercontent.com';

const RootScreen = ({ navigation }: any) => {
  const [token, setToken] = useState<string>(); // 우리 서버에서 로그인 되고 나면 저장하려고 했음

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
      console.log('구글 토큰', idToken);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <View style={{ flex: 1 }}>
          <Text>NTHING</Text>
        </View>
        <SocialLoginWrap>
          <SocialSubTitle>sns로 간편 로그인</SocialSubTitle>
          <ButtonWrap>
            <TouchableWithoutFeedback
              onPress={() => naverLogin(naverLoginKeys)}
            >
              <Image source={require('../assets/image/naver-btn.png')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                kakaoLogin();
                // navigation.navigate('UniversityScreen');
              }}
            >
              <Image source={require('../assets/image/kakao-btn.png')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => googleLogin()}>
              <Image source={require('../assets/image/google-btn.png')} />
            </TouchableWithoutFeedback>
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
