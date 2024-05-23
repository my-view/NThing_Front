import React, { useCallback } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import { getHeightRatio } from 'assets/util/layout';
import { CustomHeader } from '~/components/common/header';
import { Item } from '~/components/common/item';
import { useParticipationTrade } from '~/hooks/participation-trade/list';

const ParticipationTradeScreen = ({ navigation }: any) => {
  const { participationTradeList } = useParticipationTrade();

  const renderItem = useCallback(
    (item: any, index: number) => (
      <Pressable
        key={index}
        onPress={() => navigation.navigate('TradeScreen', { id: item.id })}
      >
        <Item
          data={item}
          index={index}
          listLength={participationTradeList?.data?.length - 1}
          useHeartButton={false}
        />
      </Pressable>
    ),
    [],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <CustomHeader
        title='참여한 거래'
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
        {participationTradeList?.data ? (
          participationTradeList?.data?.map(renderItem)
        ) : (
          <Text>참여한 거래 글이 없습니다.</Text>
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

export default ParticipationTradeScreen;
