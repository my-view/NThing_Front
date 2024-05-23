import React, { useCallback } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import styled from '@emotion/native';
import { getHeightRatio } from 'assets/util/layout';
import { CustomHeader } from '~/components/common/header';
import { useOpenTrade } from '~/hooks/open-trade/list';
import { Item } from '~/components/common/item';

const OpenedTradeScreen = ({ navigation }: any) => {
  const { openTradeList } = useOpenTrade();

  const renderItem = useCallback(
    (item: any, index: number) => (
      <Item
        data={item}
        index={index}
        listLength={openTradeList?.data?.length - 1}
        useHeartButton={false}
      />
    ),
    [],
  );
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <CustomHeader
          title='내가 연 거래'
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
          {openTradeList?.data ? (
            openTradeList?.data?.map(renderItem)
          ) : (
            <Text>내가 연 거래 글이 없습니다.</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Container = styled(View)`
  /* padding: ${getHeightRatio(0)} 20px; */
  padding: 0;
  height: 100%;
  background-color: #ffffff;
`;

export default OpenedTradeScreen;
