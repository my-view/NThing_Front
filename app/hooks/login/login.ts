import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { TOKEN_STORAGE_KEY } from '~/assets/util/constants';
import { TokenState } from '~/state/user';

export const useLogin = () => {
  const [serviceToken, setSeviceToken] = useRecoilState<string>(TokenState); // 우리 서버에서 로그인 되고 나면 저장하려고 했음

  const set = async (value) => {
    try {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(value));
      console.log('Token saved:', value);
    } catch (error) {
      console.log(error);
    }
  };
  // getting data
  const get = async () => {
    try {
      const savedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      console.log('Saved token retrieved:', savedToken); // 추가된 로그

      if (savedToken != null) {
        const token = JSON.parse(savedToken);
        if (token) {
          console.log('Parsed token:', token); // 추가된 로그

          set(token);
          setSeviceToken(token);

          console.log('get token', token);
          return token;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setToken = (token?: string) => {
    if (!token) return;
    setSeviceToken(token);
    set(token);
  };

  return {
    setToken,
    get,
    set,
    serviceToken,
  };
};
