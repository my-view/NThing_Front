import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStackScreen from './app/screens/stack';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import 'react-native-gesture-handler';
import axios, { HeadersDefaults } from 'axios';
import { navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

axios.defaults.baseURL = 'https://75c6-1-225-155-14.ngrok-free.app';

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={RootStackScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
