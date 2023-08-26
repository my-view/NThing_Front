import React, { useState } from 'react';
import styled from '@emotion/native';
import { Row } from 'components/common/layout';
import { getWidthRatio } from 'assets/util/layout';
import { Icon } from './button';
import { Text, TouchableOpacity, View } from 'react-native';
import { Font13W500, Font15W500, Font16W600 } from 'components/common/text';

type HeaderType = {
  title: string;
  useLeftButton?: boolean;
  leftButton?: () => void;
  renderRightButton?: any;
  navigation: any;
  bottomBorder?: boolean;
};

export const CustomHeader = ({
  navigation,
  title,
  useLeftButton,
  renderRightButton,
  bottomBorder,
}: HeaderType) => {
  console.log('useLeftButton', !!useLeftButton);

  const defaultUseLeftBtn = useLeftButton ?? true;
  const defaultUseBottomBorder = bottomBorder ?? true;

  return (
    <HeaderWrap
      style={{
        borderBottomWidth: defaultUseBottomBorder ? 1 : 0,
      }}
    >
      {defaultUseLeftBtn && (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{ position: 'absolute', left: getWidthRatio(20) }}
        >
          <Icon name='Left' fill={'#fff'} size={24} />
        </TouchableOpacity>
      )}
      <Font16W600>{title}</Font16W600>
      {renderRightButton && (
        <View style={{ position: 'absolute', right: getWidthRatio(20) }}>
          {renderRightButton()}
        </View>
      )}
      {/* <TouchableOpacity
          onPress={navigation.goBack}
          style={{ position: 'absolute', right: getWidthRatio(20) }}
        >
          <Text>123123123</Text>
        </TouchableOpacity>
       */}
    </HeaderWrap>
  );
};

const HeaderWrap = styled.View`
  position: relative;
  justify-content: center;
  height: 56px;
  padding: 10px ${getWidthRatio(20)};
  flex-direction: row;
  align-items: center;
  background-color: ${(p) => p.theme.palette.white};
  border-bottom-color: ${(p) => p.theme.palette.gray01};
`;

export const Header = styled(Row)`
  height: 56px;
  padding: 10px ${getWidthRatio(20)};
  justify-content: space-between;
  background-color: ${(p) => p.theme.palette.white};
  border-bottom-width: 1px;
  border-bottom-color: ${(p) => p.theme.palette.gray01};
`;
