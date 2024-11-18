import React, { useEffect, useState } from 'react';
import HomeScreen from './home';
import ChatListScreen from 'screens/chat-list';
import MyPageScreen from './my-page';
import TradeRegistScreen from './trade-regist';
import styled from '@emotion/native';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import S_TradeRegist from '@assets/image/icon/S_TradeRegist.svg';
import S_Home from '@assets/image/icon/S_Home.svg';
import S_MyPage from '@assets/image/icon/S_MyPage.svg';
import S_Chat from '@assets/image/icon/S_Chat.svg';
import F_TradeRegist from '@assets/image/icon/F_TradeRegist.svg';
import F_Home from '@assets/image/icon/F_Home.svg';
import F_MyPage from '@assets/image/icon/F_MyPage.svg';
import F_Chat from '@assets/image/icon/F_Chat.svg';
import { MyTabBar } from '@components/common/bottom-tap';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './stack';
import { CompositeScreenProps } from '@react-navigation/native';

export type MainScreenParamList = {
  Home: undefined;
  HomeScreen: { keyword: string; latitude: number; longitude: number };
  TradeRegistScreen: undefined;
  ChatListScreen: undefined;
  MyPageScreen: undefined;
};

const Tab = createBottomTabNavigator<MainScreenParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

// TODO: prop에 무슨 타입 줘야되는지 모르겠음
// type Props = CompositeScreenProps<
//   BottomTabScreenProps<MainScreenParamList>,
//   NativeStackScreenProps<RootStackParamList, 'MainScreen'>
// >;

// TODO: 탭 4개 목록 map하는 방식으로 리팩토링하기
const MainScreen = ({ route, navigation }: Props) => {
  const { params } = route;
  // console.log(params);
  useEffect(() => {
    navigation.navigate('HomeScreen', {
      keyword: '',
      latitude: params.latitude,
      longitude: params.longitude,
    });
  }, [params]);
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
    //     <Tab.Screen name='채팅' component={ChattingScreen} />
    //     <Tab.Screen name='My' component={MyPageScreen} />
    //   </Tab.Group>
    // </Tab.Navigator>
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false, headerShadowVisible: false }}
    >
      <Tab.Group>
        <Tab.Screen
          name='HomeScreen'
          options={{
            tabBarLabel: ({ focused, color }) => <MenuText>홈</MenuText>,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <F_Home width={24} height={24} color={'#000000'} />
              ) : (
                <S_Home width={24} height={24} color={'#000000'} />
              ),
          }}
          component={HomeScreen}
          initialParams={{
            keyword: '',
            latitude: params.latitude,
            longitude: params.longitude,
          }}
        />
        <Tab.Screen
          name='TradeRegistScreen'
          options={{
            tabBarLabel: ({ focused, color }) => <MenuText>거래 등록</MenuText>,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <F_TradeRegist width={24} height={24} color={'#000000'} />
              ) : (
                <S_TradeRegist width={24} height={24} color={'#000000'} />
              ),
          }}
          component={TradeRegistScreen}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('TradeRegistScreen', {});
            },
          })}
        />
        <Tab.Screen
          name='ChatListScreen'
          options={{
            tabBarLabel: ({ focused, color }) => <MenuText>채팅</MenuText>,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <F_Chat width={24} height={24} color={'#000000'} />
              ) : (
                <S_Chat width={24} height={24} color={'#000000'} />
              ),
          }}
          component={ChatListScreen}
        />
        <Tab.Screen
          name='MyPageScreen'
          options={{
            tabBarLabel: ({ focused, color }) => <MenuText>My</MenuText>,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <F_MyPage width={24} height={24} color={'#000000'} />
              ) : (
                <S_MyPage width={24} height={24} color={'#000000'} />
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
