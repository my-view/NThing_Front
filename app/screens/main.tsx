import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import HomeScreen from './home';
import ChatingScreen from './chating';
import MyPageScreen from './my-page';
import TradeRegistScreen from './trade-regist';
import TestScreen from '../components/Test';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainScreen = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}>
      <Tab.Group>
        <Tab.Screen
          name="홈"
          options={{
            title: '홈',
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="TradeRegist"
          options={{
            title: '거래 등록',
          }}
          component={TradeRegistScreen}
        />
        <Tab.Screen
          name="Chating"
          options={{
            title: '채팅',
          }}
          component={ChatingScreen}
        />
        <Tab.Screen
          name="Mypage"
          options={{
            title: 'MY',
          }}
          component={MyPageScreen}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default MainScreen;
