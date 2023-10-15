import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import { getHeightRatio } from 'assets/util/layout';
import { CustomHeader } from 'components/common/header';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OpenedTradeScreen from './opened-trade';
import ParticipationTradeScreen from './participation-trade';
const Tab = createMaterialTopTabNavigator();

const ChatingScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <CustomHeader
        title='채팅'
        // useLeftButton={false}
        navigation={navigation}
        bottomBorder={false}
        // renderRightButton={() => {
        //   return (
        //     <Pressable onPress={() => console.log('123')}>
        //       <Text>rightButton</Text>
        //     </Pressable>
        //   );
        // }}
      />

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, fontWeight: '700' },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#C5CAD3',
          tabBarIndicatorStyle: {
            width: '50%',
            backgroundColor: '#000000',
          },
        }}
      >
        <Tab.Screen
          name='openedTrade'
          options={{
            title: '참여한 거래',
          }}
          component={OpenedTradeScreen}
        />
        <Tab.Screen
          name='participationTrade'
          options={{
            title: '개설한 거래',
          }}
          component={ParticipationTradeScreen}
        />
      </Tab.Navigator>
      {/* <Container></Container> */}
    </SafeAreaView>
  );
};

export default ChatingScreen;
