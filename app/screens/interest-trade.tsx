import React, { useCallback } from 'react';
import { SafeAreaView, View, ScrollView, Pressable, Text } from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import { getHeightRatio } from 'assets/util/layout';
import { CustomHeader } from 'components/common/header';
import { PURCHASE_ITEM_LIST } from '~/assets/mock/purchase-item-list';
import { Item } from '~/components/common/item';
import { useLikeTrade } from '~/hooks/like-trade/list';
import { likeTradeKeys } from '~/key/like-trade';
import { tradeQueryKeys } from '~/key/map';

const InterestTradeScreen = ({ navigation }: any) => {
  const { likeTradeList } = useLikeTrade();

  const renderItem = useCallback(
    (item: any, index: number) => (
      <Pressable key={index} onPress={() => navigation.navigate('TradeScreen')}>
        <Item
          data={item}
          index={index}
          listLength={likeTradeList?.data?.length - 1}
          removeLikeKey={likeTradeKeys.all}
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
        {likeTradeList?.data ? (
          likeTradeList?.data?.map(renderItem)
        ) : (
          <Text>관심 거래 글이 없습니다.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  padding: ${getHeightRatio(0)} 20px;
  height: 100%;
  background-color: #ffffff;
`;

export default InterestTradeScreen;
