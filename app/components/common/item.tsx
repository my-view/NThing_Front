import React, { useState } from 'react';
import styled from '@emotion/native';
import { Font15W500, Font16W600, Font12W400 } from 'components/common/text';
import { formatPrice, convertToRelativeTime } from 'assets/util/format';
import { PurchaseItemType } from 'types/common';
import { HeartButton } from './heart-button';
import { Image, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { tradeQueryKeys } from '~/key/map';
import { UsefetchMapTrade } from '~/hooks/map';

export const Item = ({
  data,
  index,
  listLength,
  removeLikeKey,
}: {
  data: PurchaseItemType;
  index: number;
  listLength: number;
  removeLikeKey?: any;
}) => {
  const {
    title,
    place,
    date,
    price,
    numerator,
    denominator,
    liked,
    id,
    latitude,
    longitude,
    status,
    image,
  } = data;
  const queryClient = useQueryClient();
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
          <ItemImg source={{ uri: image }} />

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
              {place} · {convertToRelativeTime(date)}
            </TradeInfo>
            <PricePersonBox>
              <Price>{formatPrice(price)}원</Price>
              <Person>
                <N>{numerator}</N>/{denominator}명
              </Person>
            </PricePersonBox>
          </InfoBox>
        </ItemBox>

        <HeartButton
          isLike={liked}
          onClick={(isLiked) => {
            console.log('좋아요', isLiked);
            axios
              .post(`/purchase/${id}/like`, {
                value: isLiked,
              })
              .then((res) => {
                // 여기서 좋아요 해제하면 맵에가면 좋아요 최신화해야하는데 키를 날릴까
                // 아니면 화면 잡히면 refetch를 해야하나..
                // queryClient.invalidateQueries(removeLikeKey);
              });
          }}
        />
      </Box>
      <Divider
        style={{
          borderBottomWidth: index === listLength ? 0 : 1,
        }}
      />
    </>
  );
};

//
//
export const LoadingItem = () => {
  return (
    <>
      <View style={{ marginVertical: 15 }}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection='row'>
            <SkeletonPlaceholder.Item width={90} height={90} borderRadius={4} />
            <SkeletonPlaceholder.Item marginLeft={14}>
              <SkeletonPlaceholder.Item width={180} height={20} />
              <SkeletonPlaceholder.Item
                marginTop={10}
                width={100}
                height={14}
              />
              <SkeletonPlaceholder.Item flexDirection='row' marginTop={10}>
                <SkeletonPlaceholder.Item width={75} height={18} />
                <SkeletonPlaceholder.Item
                  marginLeft={7}
                  width={30}
                  height={18}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
      <Divider
        style={{
          borderBottomWidth: 1,
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

const ItemImg = styled.Image`
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

const PricePersonBox = styled.View`
  flex-direction: row;
  gap: 20px;
`;

const Price = styled(Font16W600)``;

const Person = styled(Font16W600)``;

const N = styled.Text`
  color: ${(p) => p.theme.palette.primary};
`;
