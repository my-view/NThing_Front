import React from 'react';
import { Row } from 'components/common/layout';
import { Text } from 'react-native';
import { Icon, IconName } from 'components/common/icon';
import { ChatListType, ChatStatus } from 'types/chat';

// 타입변환을 위한 함수
function capitalizeFirstLetter(str: string) {
  // 첫 글자를 대문자로 변환
  const firstLetter = str.charAt(0).toUpperCase();

  // 나머지 글자를 소문자로 변환
  const restOfString = str.slice(1).toLowerCase();

  // 변환된 문자열을 합쳐서 반환
  return `F_${firstLetter + restOfString}` as IconName;
}

type colorChipType = {
  color: '#34C185' | '#F44F48' | '#8F95A2' | '';
  backgroundColor: '#EFFDF7' | '#FFF3F2' | '#F7F8FB' | '';
};

const convertChatStatusColor = (status: string) => {
  const colorChip: colorChipType = {
    color: '',
    backgroundColor: '',
  };

  switch (status) {
    case 'EXPECT':
      colorChip.color = '#34C185';
      colorChip.backgroundColor = '#EFFDF7';
      break;
    case 'RECRUIT':
      colorChip.color = '#F44F48';
      colorChip.backgroundColor = '#FFF3F2';
      break;
    default:
      colorChip.color = '#8F95A2';
      colorChip.backgroundColor = '#F7F8FB';
      break;
  }

  return colorChip;
};

export const TradeStaus: React.FC<{
  data: ChatListType;
}> = ({ data }) => {
  return (
    <Row
      style={[
        convertChatStatusColor(data.trade_status),
        {
          borderRadius: 4,
          gap: 4,
          padding: 4,
        },
      ]}
    >
      <Icon name={capitalizeFirstLetter(data.trade_status)} size={12} />
      <Text
        style={[
          convertChatStatusColor(data.trade_status),
          {
            lineHeight: 12,
            fontSize: 11,
            fontWeight: '700',
          },
        ]}
      >
        {ChatStatus[data.trade_status]}
      </Text>
    </Row>
  );
};
