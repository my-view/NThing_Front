import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { useLogin } from '~/hooks/login/login';
import { userAppState } from '~/state/app';

export const AppStateComponent = () => {
  const appState = useRef(AppState.currentState);
  const setUserAppState = useSetRecoilState(userAppState);
  console.log('@ 현재 상태 appState:', appState);
  const { setToken, get, set, serviceToken } = useLogin();

  useEffect(() => {
    // 사용자가 앱의 상태가 변경 되었을 경우 실행이 된다.
    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState) => {
        console.log('@ 다음 동작 nextAppState', nextAppState);
        handleAppState(nextAppState);
      },
    );

    return () => {
      if (serviceToken) {
        console.log('끄면서 토큰 저장', serviceToken);
        setToken(serviceToken);
      }
      // 사용자가 앱의 상태가 변경 되었을 경우 실행이 된다.
      subscription.remove();
    };
  }, []);

  const handleAppState = (nextAppState: any) => {
    // console.log('@ appState.current ::: ', appState.current);

    // 앱 활성화
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('@ 앱으로 다시 돌아오는 경우 foreground');
    }

    // 앱 비활성화
    if (
      appState.current.match(/inactive|active/) &&
      nextAppState === 'background'
    ) {
      console.log('@ App has come to the background!');
      if (serviceToken) {
        console.log('나가면서 토큰 저장', serviceToken);
        setToken(serviceToken);
      }
    }
    appState.current = nextAppState; // 변경된 상태를 바꿔줌.
    setUserAppState(nextAppState);
  };

  return null;
};
