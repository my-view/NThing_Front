import React, { useState } from 'react';
import styled from '@emotion/native';
import { itemType } from '@assets/mock/item-list';
import { Font15W500, Font16W600, Font12W400 } from 'components/common/text';
import { HeartButton } from 'components/common/heart-button';

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
  const [lineCount, setLineCount] = useState(1);

  const singleLine = 16;
  const multiLine = 24;

  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    setLineCount(lines.length);
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
        <HeartButton isLike={isLike} />
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
