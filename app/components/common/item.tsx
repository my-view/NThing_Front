import React, { useState, useEffect } from 'react';
import { css } from '@emotion/native';
import styled from '@emotion/native';
import { View, Text, Pressable, Image } from 'react-native';
import { itemType } from '@assets/mock/item-list';
import { Font15W500, Font16W600, Font12W400 } from './text';
import { Icon, IconButton } from '@components/common/button';
import Reset from '~/assets/image/Reset.svg';

export const Item = ({
  data,
  index,
  listLength,
}: {
  data: itemType;
  index: number;
  listLength: number;
}) => {
  const { title, price, place, n, person, time, islike } = data;
  const [lineCount, setLineCount] = useState(1);

  const singleLine = 16;
  const multiLine = 24;

  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    setLineCount(lines.length);
  };

  const [like, setLike] = useState<boolean>(islike);
  const handleLikeButton = () => {
    console.log('handleLikeButton');
    setLike(!like);
  };

  return (
    <>
      <Box>
        <ItemBox>
          <ItemImg />
          <InfoBox>
            <Title
              style={{
                lineHeight: lineCount >= 1 ? singleLine : multiLine,
              }}
              numberOfLines={2}
              onTextLayout={handleTextLayout}
            >
              {title}
            </Title>
            <TradeInfo>
              {place} · {time}
            </TradeInfo>
            <PricePersonBox>
              <Price>{price}원</Price>
              <Person>
                <N>{n}</N>/{person}명
              </Person>
            </PricePersonBox>
          </InfoBox>
        </ItemBox>
        {like ? (
          <IconButton onPress={handleLikeButton}>
            <Icon name='FillHeart' size={20} />
          </IconButton>
        ) : (
          <IconButton onPress={handleLikeButton}>
            <Icon name='Heart' size={20} />
          </IconButton>
        )}
      </Box>
      <Divider
        style={{
          borderBottomWidth: index === listLength ? 0 : 1,
        }}
      />
    </>
  );
};

const Box = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 15px;
`;
const ItemBox = styled.View`
  flex-direction: row;
`;

const IconBox = styled.Pressable`
  padding: 4px;
  border-radius: 4px;
`;

const Divider = styled.View`
  /* border-bottom-width: 1px;/ */
  border-bottom-color: ${(p) => p.theme.palette.gray01};
`;

const ItemImg = styled.View`
  width: 90px;
  height: 90px;
  border-radius: 4px;
  background: #d9d9d9;
`;

const InfoBox = styled.View`
  margin-left: 14px;
  gap: 7px;
`;

const Title = styled(Font15W500)`
  max-width: 183px;
`;

const TradeInfo = styled(Font12W400)`
  color: ${(p) => p.theme.palette.gray03};
`;

//
const PricePersonBox = styled.View`
  flex-direction: row;
  gap: 20px;
`;
const Price = styled(Font16W600)``;
const Person = styled(Font16W600)``;
const N = styled.Text`
  color: ${(p) => p.theme.palette.primary};
`;
//
