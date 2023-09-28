import React from 'react';
import { Row } from 'components/common/layout';
import { Pressable } from 'react-native';
import styled from '@emotion/native';
import Animated from 'react-native-reanimated';
import { ChatListType } from 'types/common';
import { Font12W500, Font14W600 } from './text';
import { MiddleDot, DotSize } from './divider';
import { TradeStaus } from './trade-status';

export enum chatStatus {
  EXPECT = '거래예정',
  RECRUIT = '모집중',
  CANCEL = '거래취소',
  COMPLETE = '거래완료',
}

export const ChatItem: React.FC<{ data: ChatListType }> = ({ data }) => {
  return (
    <Animated.View
      style={{
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E5EC',
      }}
    >
      <Pressable>
        <Animated.View>
          <Row
            style={{
              borderRadius: 8,
              paddingVertical: 18,
              marginTop: 0,
              justifyContent: 'space-between',
            }}
          >
            <Row>
              <TradeThumbnail
                source={require('../../assets/image/item-example.png')}
              />
              <TradeInfoWrap>
                <TradeTitle>{data?.title}</TradeTitle>
                <Row
                  style={{
                    gap: 6,
                  }}
                >
                  <LastMessage numberOfLines={1}>
                    {data?.last_message}
                  </LastMessage>
                  <MiddleDot size={DotSize.SMALL} />
                  <LastTime>21:13</LastTime>
                </Row>
              </TradeInfoWrap>
            </Row>
            <TradeStaus data={data} />
          </Row>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const TradeInfoWrap = styled.View`
  margin-left: 12px;
  gap: 8px;
`;

const TradeThumbnail = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

const TradeTitle = styled(Font14W600)`
  line-height: 14px;
`;

const LastMessage = styled(Font12W500)`
  line-height: 12px;
  color: #8f95a2;
  max-width: 155px;
`;

const LastTime = styled(Font12W500)`
  line-height: 12px;
  color: #8f95a2;
`;
