import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStackScreen from './app/screens/stack';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import 'react-native-gesture-handler';
import axios from 'axios';
import { navigationRef } from './RootNavigation';
import SimpleSnackbarUI from '~/components/common/toast';
import { useApiError } from '~/hooks/useApiError';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const tokenData = AsyncStorage.getItem('NT-AUTH-TOKEN');

axios.defaults.baseURL = 'http://kkookkss.synology.me/20024';
axios.defaults.headers.common.Authorization = `jwt ${tokenData}`;

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={RootStackScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const { handleError } = useApiError();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: handleError,
      },
      mutations: {
        onError: handleError,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
            <SimpleSnackbarUI.Portal />
          </NavigationContainer>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
