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
import { getStorage, setStorage } from 'assets/util/storage';
import { TOKEN_STORAGE_KEY } from 'assets/util/constants';

import { useUser } from 'hooks/user';
import { RootStackParamList } from './stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { googleLogin, kakaoLogin, naverLogin } from '~/assets/util/login';
import { useLogin } from '~/hooks/login/login';

type Props = NativeStackScreenProps<RootStackParamList, 'RootScreen'>;

const RootScreen = ({ navigation }: Props) => {
  const { setToken, get, set, serviceToken } = useLogin();

  // useEffect(() => {
  //   if (!serviceToken) {
  //     getStorage(TOKEN_STORAGE_KEY).then((data) => {
  //       if (!data) return;
  //       setSeviceToken(data);
  //     });
  //     return;
  //   }
  //   console.log('user', userInfo);
  //   // 1. serviceToken으로 user 정보 불러옴 (react query)
  //   // 2-1. 선택한 학교가 없으면 학교 선택 페이지로 이동
  //   // navigation.navigate('UniversityScreen');
  //   // 2-2. 학교가 있으면 (학교 정보와 함께?) 홈으로 이동
  //   navigation.navigate('MainScreen');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [serviceToken]);

  useEffect(() => {
    get().then((token) => {
      console.log('Token after get call:', token);
      navigation.navigate('MainScreen');
    });
  }, []);

  return (
    <SafeAreaView>
      <Container>
        <View style={{ flex: 1 }}>
          <Text>NTHING</Text>
        </View>

        <SocialLoginWrap>
          <SocialSubTitle>sns로 간편 로그인</SocialSubTitle>
          <ButtonWrap>
            <Pressable onPress={() => naverLogin()}>
              <Image source={require('../assets/image/naver-btn.png')} />
            </Pressable>
            <Pressable
              onPress={() => kakaoLogin().then((token) => setToken(token))}
            >
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
