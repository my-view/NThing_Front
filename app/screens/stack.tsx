import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootScreen from 'screens';
import UniversityScreen from 'screens/university';
import UniversityMapModal from 'screens/modal/university-map-modal';
import MainScreen from 'screens/main';
import SearchScreen from 'screens/search';
import SearchMapScreen from 'screens/search-map';
import TradeScreen from 'screens/trade';
import MyPageEditScreen from 'screens/user-edit';
import TradeMapModal from 'screens/modal/trade-map-modal';
import ChatingScreen from 'screens/chatingScreen';
import TradeRegistScreen from 'screens/trade-regist';
import InterestTradeScreen from 'screens/interest-trade';
import { TradePlace } from 'types/common';
import { PurchaseDetail } from 'types/purchase';

export type RootStackParamList = {
  RootScreen: undefined;
  MainScreen: undefined;
  UniversityScreen: undefined;
  ChatingScreen: undefined;
  SearchScreen: { keyword?: string };
  SearchMapScreen: { keyword: string; isCategory?: boolean };
  TradeRegistScreen: undefined;
  TradeScreen: { data?: PurchaseDetail; id?: number };
  MyPageEditScreen: undefined;
  InterestTradeScreen: undefined;
  UniversityMapModal: { latitude: number; longitude: number };
  TradeMapModal: {
    place: TradePlace;
    updatePlace: (updated: TradePlace) => void;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Screen name='ChatingScreen' component={ChatingScreen} />
        <Stack.Screen
          name='SearchScreen'
          component={SearchScreen}
          options={{ animation: 'none' }}
          initialParams={{ keyword: '' }}
        />
        <Stack.Screen
          name='SearchMapScreen'
          component={SearchMapScreen}
          options={{ animation: 'none' }}
          initialParams={{ keyword: '' }}
        />
        <Stack.Screen name='TradeRegistScreen' component={TradeRegistScreen} />
        <Stack.Screen name='TradeScreen' component={TradeScreen} />
        <Stack.Screen name='MyPageEditScreen' component={MyPageEditScreen} />
        <Stack.Screen
          name='InterestTradeScreen'
          component={InterestTradeScreen}
        />
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
          initialParams={{ latitude: 37.564362, longitude: 126.977011 }}
        />
        <Stack.Screen
          name='TradeMapModal'
          component={TradeMapModal}
          options={{ animation: 'none' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStackScreen;
