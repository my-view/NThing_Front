import React from 'react';
import HomeScreen from './home';
import ChatingListScreen from './chatingList';
import MyPageScreen from './my-page';
import TradeRegistScreen from './trade-regist';
import styled from '@emotion/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import S_TradeRegist from '@assets/image/icon/S_TradeRegist.svg';
import S_Home from '@assets/image/icon/S_Home.svg';
import S_MyPage from '@assets/image/icon/S_MyPage.svg';
import S_Chat from '@assets/image/icon/S_Chat.svg';
import F_TradeRegist from '@assets/image/icon/F_TradeRegist.svg';
import F_Home from '@assets/image/icon/F_Home.svg';
import F_MyPage from '@assets/image/icon/F_MyPage.svg';
import F_Chat from '@assets/image/icon/F_Chat.svg';
import { MyTabBar } from '@components/common/bottom-tap';

const Tab = createBottomTabNavigator();

// TODO: 탭 4개 목록 map하는 방식으로 리팩토링하기
const MainScreen = ({ navigation }) => {
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
                <F_Home width={24} height={24} color={'#000000'} />
              ) : (
                <S_Home width={24} height={24} color={'#000000'} />
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
                <F_TradeRegist width={24} height={24} color={'#000000'} />
              ) : (
                <S_TradeRegist width={24} height={24} color={'#000000'} />
              ),
          }}
          component={TradeRegistScreen}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('TradeRegistScreen');
            },
          })}
        />
        <Tab.Screen
          name='ChatingListScreen'
          options={{
            tabBarLabel: ({ focused, color }) => <MenuText>채팅</MenuText>,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <F_Chat width={24} height={24} color={'#000000'} />
              ) : (
                <S_Chat width={24} height={24} color={'#000000'} />
              ),
          }}
          component={ChatingListScreen}
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
