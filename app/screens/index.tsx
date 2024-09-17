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
import { NT_ACCESS_TOKEN, NT_REFRESH_TOKEN } from 'assets/util/constants';


import { RootStackParamList } from './stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { googleLogin, kakaoLogin, naverLogin } from '~/assets/util/login';
import { getUserInfoAPI } from '~/api/user';
import AlertPopup from 'react-native-global-components/components/AlertPopup/AlertPopup';
import { loadTokens } from '~/hooks/login/login';

type Props = NativeStackScreenProps<RootStackParamList, 'RootScreen'>;

const RootScreen = ({ navigation }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // useEffect(() => {
  //   const autoLogin = async () => {
  //     try {
  //       const { accessToken } = await loadTokens();
  //       console.log('!!token', accessToken);

  //       const isValidToken = await getUserInfoAPI(accessToken);
  //       console.log('@@isValidToken', isValidToken);

  //       if (isValidToken) {
  //         navigation.navigate('MainScreen');
  //       } else {
  //         // Handle invalid token case, maybe navigate to a login screen
  //       }
  //     } catch (error) {
  //       AlertPopup({
  //         message: '다시 로그인해주세요.',
  //       });
  //       console.error('Error fetching data:', error);
  //       // Handle error, perhaps by showing an alert or navigating to an error screen
  //     }
  //   };
  //   autoLogin();
  // }, []);

  useEffect(() => {
    const checkToken = async () => {
      console.group('토큰 불러오기 시작');

      const { accessToken } = await loadTokens(); // loadTokens의 결과를 기다림
      console.log('accessToken', accessToken);

      if (accessToken) {
        try {
          const isValidUser = await getUserInfoAPI();
          console.log('isValidUser', isValidUser);
          if (isValidUser) {
            setIsLoggedIn(true);
            navigation.navigate('MainScreen');
          } else {
            console.log('Invalid token, redirecting to login');
            setIsLoggedIn(false);
            navigation.navigate('RootScreen');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          // await AsyncStorage.removeItem(NT_ACCESS_TOKEN);
          // await AsyncStorage.removeItem(NT_REFRESH_TOKEN);
          setIsLoggedIn(false);
        }
      } else {
        console.log('No valid tokens found, redirecting to login');
        setIsLoggedIn(false);
      }

      console.groupEnd();
    };

    checkToken();
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
