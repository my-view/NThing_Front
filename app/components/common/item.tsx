import React, { useState, useEffect } from 'react';
import styled from '@emotion/native';
import { itemType } from '@assets/mock/item-list';
import { Font15W500, Font16W600, Font12W400 } from 'components/common/text';
import { formatPrice } from 'assets/util/format';
import { Vibration } from 'react-native';
import { Icon, IconButton } from '@components/common/button';
import Animated, { Keyframe } from 'react-native-reanimated';

export const Item = ({
  data,
  index,
  listLength,
}: {
  data: itemType;
  index: number;
  listLength: number;
}) => {
  const { title, price, place, n, person, time, isLike } = data;

  const enteringAnimation = new Keyframe({
    0: {
      originX: -10,
      originY: 30,
      opacity: 0,
    },
    50: {
      originX: -10,
      originY: -30,
      opacity: 1,
    },
    100: {
      opacity: 0,
    },
  }).duration(1000);
  const enteringAnimation2 = new Keyframe({
    0: {
      originX: 20,
      originY: 20,
      opacity: 0,
    },
    50: {
      originX: 20,
      originY: -20,
      opacity: 1,
    },
    100: {
      opacity: 0,
    },
  }).duration(800);
  const enteringAnimation3 = new Keyframe({
    0: {
      originX: 10,
      originY: 40,
      opacity: 0,
    },
    50: {
      originX: 10,
      originY: -10,
      opacity: 1,
    },
    100: {
      opacity: 0,
    },
  }).duration(500);

  // .withCallback(opacity:0)
  const [lineCount, setLineCount] = useState(1);

  const singleLine = 16;
  const multiLine = 24;

  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    setLineCount(lines.length);
  };

  const [like, setLike] = useState<boolean>(isLike);
  const handleLikeButton = () => {
    console.log('handleLikeButton');
    setLike(!like);
  };

  useEffect(() => {
    if (like) Vibration.vibrate(10 * 1000);
  }, [like]);

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
              <Price>{formatPrice(price)}원</Price>
              <Person>
                <N>{n}</N>/{person}명
              </Person>
            </PricePersonBox>
          </InfoBox>
        </ItemBox>
        {like ? (
          <IconButton onPress={handleLikeButton}>
            <Icon name='FillHeart' size={20} />
            <Animated.View
              entering={enteringAnimation}
              style={{
                position: 'absolute',
                zIndex: 9999,
              }}
            >
              <Icon name='FillHeart' size={16} />
            </Animated.View>
            <Animated.View
              entering={enteringAnimation2}
              style={{
                position: 'absolute',
                zIndex: 9999,
              }}
            >
              <Icon name='FillHeart' size={18} />
            </Animated.View>
            <Animated.View
              entering={enteringAnimation3}
              style={{
                position: 'absolute',
                zIndex: 9999,
              }}
            >
              <Icon name='FillHeart' size={12} />
            </Animated.View>
          </IconButton>
        ) : (
          <IconButton onPress={handleLikeButton}>
            <Icon name='Heart' size={20} fill={'#000'} />
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

const Divider = styled.View`
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
