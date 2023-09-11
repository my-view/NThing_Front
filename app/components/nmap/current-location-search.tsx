import React from 'react';
import styled from '@emotion/native';
import { Font14W400 } from 'components/common/text';
import { Icon, IconButton } from 'components/common/icon';
import { theme } from '~/../theme';
/**
 * 현재위치검색 버튼 current-location-search
 */
export const CLSButton = () => {
  return (
    <ButtonBox onPress={() => console.log('현재위치검색 버튼')}>
      <IconButton>
        <Icon color={theme.palette.primary} name='S_Reset' size={16} />
      </IconButton>
      <SearchText>현재 위치에서 검색</SearchText>
    </ButtonBox>
  );
};

const ButtonBox = styled.Pressable`
  padding: 10px 13px;
  gap: 7px;
  width: 153px;
  border-radius: 20px;
  border: 1px solid ${(p) => p.theme.palette.gray01};
  background: #fff;
  flex-direction: row;
  // shadow 사용해야함.
`;

const SearchText = styled(Font14W400)`
  line-height: 16px;
  color: ${(p) => p.theme.palette.primary};
`;
