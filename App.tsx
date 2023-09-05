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

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

axios.defaults.baseURL = 'https://75c6-1-225-155-14.ngrok-free.app';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Root' component={RootStackScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
