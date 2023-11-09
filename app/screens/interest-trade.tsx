import React, { useCallback } from 'react';
import { SafeAreaView, View, ScrollView, Pressable } from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import { getHeightRatio } from 'assets/util/layout';
import { CustomHeader } from 'components/common/header';
import { PURCHASE_ITEM_LIST } from '~/assets/mock/purchase-item-list';
import { Item } from '~/components/common/item';

const InterestTradeScreen = ({ navigation }: any) => {
  const renderItem = useCallback(
    (item: any, index: number) => (
      <Pressable key={index} onPress={() => navigation.navigate('TradeScreen')}>
        <Item
          data={item}
          index={index}
          listLength={PURCHASE_ITEM_LIST.length - 1}
        />
      </Pressable>
    ),
    [],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <CustomHeader
        title='관심 거래'
        navigation={navigation}
        bottomBorder={false}
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
          // paddingTop: 20,
        }}
      >
        {PURCHASE_ITEM_LIST.map(renderItem)}
      </ScrollView>
      {/* <FlatList data={PURCHASE_ITEM_LIST} renderItem={renderItem} /> */}
    </SafeAreaView>
  );
};

const Container = styled(View)`
  padding: ${getHeightRatio(0)} 20px;
  height: 100%;
  background-color: #ffffff;
`;

export default InterestTradeScreen;
