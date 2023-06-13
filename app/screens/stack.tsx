import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableWithoutFeedback } from 'react-native';
import RootScreen from 'screens';
import UniversityScreen from 'screens/university';
import UniversityMapModal from 'screens/modal/university-map-modal';
import MainScreen from './main';

const Stack = createNativeStackNavigator();

const RootStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerShadowVisible: false,
        headerTitle: '',
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name='RootScreen' component={RootScreen} />
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='UniversityScreen' component={UniversityScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          headerShown: false,
          contentStyle: { backgroundColor: 'rgba(0,0,0,0.8)' },
        }}
      >
        <Stack.Screen
          name='UniversityMapModal'
          component={UniversityMapModal}
          options={{ animation: 'none' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStackScreen;
