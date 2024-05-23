import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStackScreen from './app/screens/stack';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { navigationRef } from './RootNavigation';
import SimpleSnackbarUI from '~/components/common/toast';
import { useApiError } from '~/hooks/useApiError';
import { AppStateComponent } from '~/observers/app-state';
// import { AxiosConfig } from './axiosConfig';
import { EventProvider } from 'react-native-outside-press';
import 'react-native-gesture-handler';
import axios, { AxiosResponse } from 'axios';
import { getStorage } from '~/assets/util/storage';
import { TOKEN_STORAGE_KEY } from '~/assets/util/constants';
import { CustomResponse } from 'types/modules';

//
if (__DEV__) {
  import('./reactotron.config').then(() =>
    console.log('Reactotron Configured'),
  );
}

axios.defaults.baseURL = 'https://bfa2-14-6-187-81.ngrok-free.app';

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

axios.interceptors.response.use(
  (response: AxiosResponse<CustomResponse<any>>) => {
    console.log('@@ AXIOS RESPONSE 123', response);
    return response.data.data;
  },
);

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={RootStackScreen} />
    </Stack.Navigator>
  );
}
export default function App() {
  const { handleError } = useApiError();

  const queryClient = new QueryClient();

  return (
    <EventProvider>
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
    </EventProvider>
  );
}
