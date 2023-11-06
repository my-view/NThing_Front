import React from 'react';
import styled from '@emotion/native';
import { Row } from 'components/common/layout';
import { getWidthRatio } from 'assets/util/layout';
import { Icon } from 'components/common/icon';
import { View, Pressable, Image } from 'react-native';
import { Font16W600, Font12W500 } from 'components/common/text';
import { theme } from '~/../theme';

type HeaderType = {
  title: string;
  useLeftButton?: boolean;
  leftButton?: () => void;
  renderRightButton?: any;
  navigation: any;
  bottomBorder?: boolean;
  subTitle?: string;
  image?: string;
};

export const CustomHeader = ({
  navigation,
  title,
  useLeftButton,
  renderRightButton,
  bottomBorder,
  subTitle,
  image,
}: HeaderType) => {
  const defaultUseLeftBtn = useLeftButton ?? true;
  const defaultUseBottomBorder = bottomBorder ?? true;

  return (
    <HeaderWrap
      style={{
        borderBottomWidth: defaultUseBottomBorder ? 1 : 0,
        height: subTitle ? 66 : 56,
      }}
    >
      {defaultUseLeftBtn && (
        <Pressable
          onPress={navigation.goBack}
          style={{ position: 'absolute', left: getWidthRatio(20) }}
        >
          {({ pressed }) => (
            <View style={{ opacity: pressed ? 0.3 : 1 }}>
              <Icon name='S_Left' color={theme.palette.black} size={24} />
            </View>
          )}
        </Pressable>
      )}
      {subTitle ? (
        <Row style={{ gap: 10 }}>
          <Image
            source={require('../../assets/image/item-example.png')}
            style={{ width: 30, height: 30, borderRadius: 4 }}
          />
          <View style={{ gap: 8 }}>
            <Font16W600 style={{ maxWidth: 240 }} numberOfLines={1}>
              {title}
            </Font16W600>
            <Font12W500 style={{ color: theme.palette.gray03 }}>
              {subTitle}
            </Font12W500>
          </View>
        </Row>
      ) : (
        <Font16W600>{title}</Font16W600>
      )}
      {renderRightButton && (
        <View style={{ position: 'absolute', right: getWidthRatio(20) }}>
          {renderRightButton()}
        </View>
      )}
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
