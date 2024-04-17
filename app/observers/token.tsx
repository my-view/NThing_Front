import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { TOKEN_STORAGE_KEY } from '~/assets/util/constants';
import { getStorage } from '~/assets/util/storage';
import { userAppState } from '~/state/app';
import { navigationRef } from '~/../RootNavigation';
import { refreshTokenAPI } from '~/api/login';

export const TokenObservers = () => {
  const appState = useRecoilValue(userAppState);

  useEffect(() => {
    // 이미 로그인 했을 때(토큰이 저장되어 있을 때)
    getStorage(TOKEN_STORAGE_KEY).then((data) => {
      if (data && appState == 'active') {
        console.log('@@ TokenObservers', data);
        // navigationRef.current.navigate('MainScreen');
      }
    });
  }, [appState]);

  return null;
};
