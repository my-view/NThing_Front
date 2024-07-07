import React from 'react';
import styled from '@emotion/native';
import { Alert, Pressable, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { RoundedButton } from 'components/common/button';
import { Shadow } from 'react-native-shadow-2';
import { Icon } from 'components/common/icon';
import { theme } from '~/../theme';
import { Row } from 'components/common/layout';
import { Font11W500, Font16W600, Font20W600 } from 'components/common/text';
import { useJoinPurchase } from 'hooks/purchase/purchase-join';

export const Join: React.FC<{
  purchaseId: number;
  numerator: number;
  denominator: number;
  onClose: () => void;
}> = ({ purchaseId, numerator, denominator, onClose }) => {
  const { mutate } = useJoinPurchase();
  const filled = Array(numerator).fill(1);
  return (
    <BottomSheet
      snapPoints={[250]}
      handleIndicatorStyle={{ height: 0 }}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <Shadow style={{ width: '100%' }} startColor='rgba(0, 0, 0, 0.05)'>
        <View
          style={{
            height: '100%',
            paddingHorizontal: 20,
            paddingTop: 4,
            paddingBottom: 32,
            gap: 30,
          }}
        >
          <Row style={{ justifyContent: 'space-between' }}>
            <Font16W600>현재 n띵 달성률</Font16W600>
            <Pressable onPress={onClose}>
              <Icon
                name='S_Close'
                size={16}
                color={theme.palette.black}
                // strokeWidth={1.5} // 적용이 안되는 것 같음
              />
            </Pressable>
          </Row>
          <Row style={{ gap: 20 }}>
            <Row style={{ gap: 1, flex: 1, height: 11 }}>
              <Row style={{ flex: numerator, height: '100%', gap: 1 }}>
                {filled.map((_, index) => (
                  <FilledPiece
                    key={index}
                    style={
                      index === 0
                        ? { borderBottomLeftRadius: 8, borderTopLeftRadius: 8 }
                        : undefined
                    }
                  />
                ))}
              </Row>
              <Row
                style={{
                  flex: denominator - numerator,
                  height: '100%',
                  backgroundColor: theme.palette.gray01,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            </Row>
            <Font20W600 style={{ color: theme.palette.gray02 }}>
              <Text style={{ color: theme.palette.primary }}>{numerator}</Text>/
              {denominator}
            </Font20W600>
          </Row>
          <View style={{ gap: 14, alignItems: 'flex-start' }}>
            <Balloon>
              <Arrow />
              <Icon name='S_Caution' size={13} />
              <Font11W500>
                참여하기를 누르면 바로 참여가 돼요. 댓글로 충분히 문의하세요!
              </Font11W500>
            </Balloon>
            <RoundedButton
              title='참여하기'
              onPress={() =>
                mutate(purchaseId, {
                  onSuccess: () => {
                    // TODO: 채팅방 열렸는지 응답 받아서 적용 & 채팅방으로 이동
                    const isChatOpened = denominator === numerator + 1;
                    Alert.alert(
                      isChatOpened
                        ? 'n띵 거래가 성사되어 채팅방이 열렸어요! 채팅으로 거래를 진행해주세요.'
                        : `${denominator}명 중 ${
                            numerator + 1
                          }명이 모였어요!\n인원이 다 모여 거래가 성사되면 알려드릴게요.`,
                    );
                    onClose();
                  },
                  onError: (e) => {
                    console.warn(e);
                  },
                })
              }
            />
          </View>
        </View>
      </Shadow>
    </BottomSheet>
  );
};

const FilledPiece = styled(Row)`
  flex: 1;
  height: 100%;
  background-color: ${(p) => p.theme.palette.primary};
`;

const Balloon = styled(Row)`
  position: relative;
  padding-horizontal: 12px;
  padding-vertical: 8px;
  gap: 8px;
  background-color: #f7f8fa;
  border-radius: 6px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.06;
  shadow-radius: 2px;
  elevation: 24;
`;

const Arrow = styled.View`
  position: absolute;
  bottom: -8px;
  left: 14px;
  border-top-width: 8px;
  border-top-color: #f7f8fa;
  border-right-width: 6px;
  border-right-color: transparent;
  border-left-width: 6px;
  border-left-color: transparent;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.06;
  shadow-radius: 2px;
  elevation: 24;
`;
