import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { navigationRef } from '~/../RootNavigation';
import { NT_ACCESS_TOKEN, NT_REFRESH_TOKEN } from '~/assets/util/constants';
import { TokenState } from '~/state/user';

// 토큰 저장
export const saveTokens = async (accessToken: string, refreshToken: string) => {
  console.log('saveTokens :: ', accessToken, refreshToken);
  try {
    if (accessToken && refreshToken) {
      // 토큰이 null이나 undefined가 아니면 저장
      await AsyncStorage.setItem(NT_ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(NT_REFRESH_TOKEN, refreshToken);
      navigationRef.current.navigate('MainScreen');
    } else {
      // 토큰이 null이나 undefined이면 제거
      await AsyncStorage.removeItem(NT_ACCESS_TOKEN);
      await AsyncStorage.removeItem(NT_REFRESH_TOKEN);
    }
  } catch (error) {
    console.error('토큰 저장 실패:', error);
  }
};

// 토큰 가져오기
export const loadTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(NT_ACCESS_TOKEN);
    const refreshToken = await AsyncStorage.getItem(NT_REFRESH_TOKEN);

    if (accessToken === null) {
      console.log('AccessToken is null');
    }

    if (refreshToken === null) {
      console.log('RefreshToken is null');
    }

    if (accessToken && refreshToken) {
      console.log('Tokens loaded:', { accessToken, refreshToken });

      return { accessToken, refreshToken };
    } else {
      console.log('No tokens found');
      // 토큰이 없으니까 여기서 로그인화면으로 보내자
      return null;
    }
  } catch (error) {
    console.error('Failed to load tokens:', error);
    return null;
  }
};

// // 토큰 설정 및 이동
export const setToken = async (tokenData: Object) => {
  console.error('setToken -> tokenData', tokenData);

  if (!tokenData) {
    console.error('Invalid tokens provided');
    return;
  }

  const { access_token, refresh_token } = tokenData;
  console.log('이거', access_token, refresh_token);

  try {
    if (access_token && refresh_token) {
      // 토큰이 null이나 undefined가 아니면 저장
      await AsyncStorage.setItem(NT_ACCESS_TOKEN, access_token);
      await AsyncStorage.setItem(NT_REFRESH_TOKEN, refresh_token);
      navigationRef.current.navigate('MainScreen');
    } else {
      // 토큰이 null이나 undefined이면 제거
      // await AsyncStorage.removeItem(NT_ACCESS_TOKEN);
      // await AsyncStorage.removeItem(NT_REFRESH_TOKEN);
    }
  } catch (error) {
    console.error('토큰 저장 실패:', error);
  }
  // navigationRef.current.navigate('MainScreen');
};
