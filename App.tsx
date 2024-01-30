import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStackScreen from './app/screens/stack';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import axios from 'axios';
import { navigationRef } from './RootNavigation';
import SimpleSnackbarUI from '~/components/common/toast';
import { useApiError } from '~/hooks/useApiError';
import { getStorage } from '~/assets/util/storage';
import { AppStateComponent } from '~/observers/app-state';
import 'react-native-gesture-handler';
import { TOKEN_STORAGE_KEY } from 'assets/util/constants';

if (__DEV__) {
  import('./reactotron.config').then(() =>
    console.log('Reactotron Configured'),
  );
}

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = 'https://422c-121-130-216-253.ngrok-free.app';

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={RootStackScreen} />
    </Stack.Navigator>
  );
}

axios.interceptors.request.use(
  async (config) => {
    const token = await getStorage(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use((response) => {
  console.log('@@ AXIOS RESPONSE', response.data.data);
  return response.data.data;
});

export default function App() {
  const { handleError } = useApiError();

  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
            <AppStateComponent />
            <SimpleSnackbarUI.Portal />
          </NavigationContainer>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
