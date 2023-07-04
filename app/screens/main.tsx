import React from 'react';
import HomeScreen from './home';
import ChatingScreen from './chating';
import MyPageScreen from './my-page';
import TradeRegistScreen from './trade-regist';
import styled from '@emotion/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TradeRegist from '@assets/image/TradeRegist.svg';
import Home from '@assets/image/Home.svg';
import MyPage from '@assets/image/MyPage.svg';
import Chat from '@assets/image/Chat.svg';
import FillTradeRegist from '@assets/image/FillTradeRegist.svg';
import FillHome from '@assets/image/FillHome.svg';
import FillMyPage from '@assets/image/FillMyPage.svg';
import FillChat from '@assets/image/FillChat.svg';
import { MyTabBar } from '@components/common/bottom-tap';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    // <Tab.Navigator
    //   screenOptions={{
    //     headerShown: true,
    //     headerShadowVisible: false,
    //   }}
    //   tabBar={(props) => <MyTabBar {...props} />}
    // >
    //   <Tab.Group>
    //     <Tab.Screen name='홈' component={HomeScreen} />
    //     <Tab.Screen name='거래등록' component={TradeRegistScreen} />
    //     <Tab.Screen name='채팅' component={ChatingScreen} />
    //     <Tab.Screen name='My' component={MyPageScreen} />
    //   </Tab.Group>
    // </Tab.Navigator>
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Tab.Group>
        <Tab.Screen
          name='HomeScreen'
          options={{
            tabBarLabel: ({ focused, color }) => <MenuText>홈</MenuText>,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FillHome width={24} height={24} color={'#000000'} />
              ) : (
                <Home width={24} height={24} color={'#000000'} />
              ),
          }}
          component={HomeScreen}
          initialParams={{ keyword: '' }}
        />
        <Tab.Screen
          name='TradeRegistScreen'
          options={{
            tabBarLabel: ({ focused, color }) => <MenuText>거래 등록</MenuText>,
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
          name='ChatingScreen'
          options={{
            tabBarLabel: ({ focused, color }) => <MenuText>채팅</MenuText>,
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
          name='MyPageScreen'
          options={{
            tabBarLabel: ({ focused, color }) => <MenuText>My</MenuText>,
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

const MenuText = styled.Text`
  font-weight: 600;
  font-size: 10px;
  color: ${(p) => p.theme.palette.black};
`;
