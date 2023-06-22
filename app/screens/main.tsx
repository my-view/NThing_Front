import React from 'react';
import HomeScreen from './home';
import ChatingScreen from './chating';
import MyPageScreen from './my-page';
import TradeRegistScreen from './trade-regist';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TradeRegist from '@assets/image/TradeRegist.svg';
import Home from '@assets/image/Home.svg';
import MyPage from '@assets/image/MyPage.svg';
import Chat from '@assets/image/Chat.svg';
import FillTradeRegist from '@assets/image/FillTradeRegist.svg';
import FillHome from '@assets/image/FillHome.svg';
import FillMyPage from '@assets/image/FillMyPage.svg';
import FillChat from '@assets/image/FillChat.svg';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Tab.Group>
        <Tab.Screen
          name='홈'
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 10,
                  color: '#000000',
                }}
              >
                홈
              </Text>
            ),
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FillHome width={24} height={24} color={'#000000'} />
              ) : (
                <Home width={24} height={24} color={'#000000'} />
              ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name='TradeRegist'
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 10,
                  color: '#000000',
                }}
              >
                거래 등록
              </Text>
            ),
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FillTradeRegist width={24} height={24} color={'#000000'} />
              ) : (
                <TradeRegist width={24} height={24} color={'#000000'} />
              ),
          }}
          component={TradeRegistScreen}
        />
        <Tab.Screen
          name='Chating'
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 10,
                  color: '#000000',
                }}
              >
                채팅
              </Text>
            ),
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FillChat width={24} height={24} color={'#000000'} />
              ) : (
                <Chat width={24} height={24} color={'#000000'} />
              ),
          }}
          component={ChatingScreen}
        />
        <Tab.Screen
          name='Mypage'
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 10,
                  color: '#000000',
                }}
              >
                My
              </Text>
            ),
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FillMyPage width={24} height={24} color={'#000000'} />
              ) : (
                <MyPage width={24} height={24} color={'#000000'} />
              ),
          }}
          component={MyPageScreen}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default MainScreen;
