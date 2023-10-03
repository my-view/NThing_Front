import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styled from '@emotion/native';
import { getWidthRatio } from 'assets/util/layout';
import { Font18W600 } from 'components/common/text';
import { theme } from '~/../theme';
import { Icon } from 'components/common/icon';

export const MapModal: React.FCC<{
  title?: string;
  subTitle?: string;
  onClose?: () => void;
  onComplete?: () => void;
  completeText?: string;
}> = ({ title, subTitle, onClose, onComplete, completeText, children }) => {
  return (
    <ModalBackground>
      <ModalContent>
        <ModalHeader>
          <View style={{ gap: 10 }}>
            {title && <Font18W600>{title}</Font18W600>}
            <Text style={{ fontSize: 13, color: theme.palette.primary }}>
              {subTitle}
            </Text>
          </View>
          {onClose && (
            <Pressable onPress={onClose}>
              <Icon name={'S_Close'} size={16} color={theme.palette.black} />
            </Pressable>
          )}
        </ModalHeader>
        {children}
        <Pressable style={{ marginTop: 20 }} onPress={onComplete}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: theme.palette.primary,
              textAlign: 'center',
            }}
          >
            {completeText}
          </Text>
        </Pressable>
      </ModalContent>
    </ModalBackground>
  );
};

const ModalBackground = styled.View`
  flex: 1;
  padding-horizontal: ${getWidthRatio(40)};
`;

const ModalContent = styled.View`
  margin: auto 0;
  padding: 20px;
  background-color: ${(p) => p.theme.palette.white};
  border-radius: 10px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 26px;
`;
