import React from 'react';
import styled from '@emotion/native';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetHandleStyle } from '@components/common/bottomSheet-Handle';
import BottomSheet from '@gorhom/bottom-sheet';
import { RoundedButton } from 'components/common/button';
import { Shadow } from 'react-native-shadow-2';
import { Icon } from 'components/common/icon';
import { theme } from '~/../theme';
import { Row } from 'components/common/layout';
import { Font11W500, Font16W600, Font20W600 } from 'components/common/text';

export const Join: React.FC<{
  numerator: number;
  denominator: number;
  onClose: () => void;
}> = ({ numerator, denominator, onClose }) => {
  const filled = Array(numerator).fill(1);
  return (
    <BottomSheet
      snapPoints={[250]}
      handleIndicatorStyle={{ height: 0 }}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
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
              <Row
                style={{
                  flex: numerator,
                  height: '100%',
                  gap: 1,
                }}
              >
                {filled.map((_, index) => (
                  <FilledPiece
                    key={index}
                    style={
                      index === 0
                        ? {
                            borderBottomLeftRadius: 8,
                            borderTopLeftRadius: 8,
                          }
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
              onPress={() => {
                // TODO: POST 요청
                onClose();
              }}
            ></RoundedButton>
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
