import React, { useState } from 'react';
import styled from '@emotion/native';
import { Font15W500, Font16W600, Font12W400 } from 'components/common/text';
import { formatPrice, convertToRelativeTime } from 'assets/util/format';
import { PurchaseItemType } from 'types/common';
import { HeartButton } from './heart-button';
import { View, Pressable, Alert } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from 'axios';
import { getStorage } from '~/assets/util/storage';
import { TOKEN_STORAGE_KEY } from '~/assets/util/constants';
import { navigationRef } from '~/../RootNavigation';

export const Item = ({
  data,
  index,
  listLength,
  useHeartButton = true,
}: {
  data: PurchaseItemType;
  index: number;
  listLength: number;
  useHeartButton?: boolean;
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
    image,
  } = data;
  const [lineCount, setLineCount] = useState(1);

  const singleLine = 16;
  const multiLine = 24;

  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    setLineCount(lines.length);
  };

  return (
    <>
      <Pressable
        onPress={async () => {
          const token = await getStorage(TOKEN_STORAGE_KEY);
          if (token)
            return navigationRef.current.navigate('TradeScreen', { id });
          Alert.alert('로그인 후 이용해주세요!');
          navigationRef.current.navigate('RootScreen');
        }}
      >
        <Box>
          <ItemBox>
            <ItemImg source={{ uri: image }} />
            <InfoBox>
              <Title
                style={{ lineHeight: lineCount >= 1 ? singleLine : multiLine }}
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
          {useHeartButton && (
            <HeartButton
              isLike={liked}
              onClick={(isLiked) => {
                console.log('좋아요', isLiked);
                axios.post(`/purchase/${id}/like`, {
                  value: isLiked,
                });
                // .then((res) => {
                //   // 여기서 좋아요 해제하면 맵에가면 좋아요 최신화해야하는데 키를 날릴까
                //   // 아니면 화면 잡히면 refetch를 해야하나..
                //   // queryClient.invalidateQueries(removeLikeKey);
                // });
              }}
            />
          )}
        </Box>
      </Pressable>
      <Divider style={{ borderBottomWidth: index === listLength ? 0 : 1 }} />
    </>
  );
};

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
