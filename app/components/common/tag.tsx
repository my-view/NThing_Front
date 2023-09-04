import React from 'react';
import styled from '@emotion/native';
import Close from '@assets/image/Close.svg';
import { Row } from 'components/common/layout';
import { theme } from '~/../theme';
import { Pressable, TouchableOpacity } from 'react-native';
import { Icon } from './button';
export const Tag: React.FCC<{ onSelect: () => void; onDelete: () => void }> = ({
  onSelect,
  onDelete,
  children,
}) => {
  console.log('Tag');
  return (
    <TouchableOpacity onPress={onSelect}>
      <TagBox>
        <TagText>{children}</TagText>
        <Pressable onPress={onDelete}>
          <Icon name='S_Close' size={12} color={theme.palette.gray03} />
        </Pressable>
      </TagBox>
    </TouchableOpacity>
  );
};

const TagBox = styled(Row)`
  gap: 10px;
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.palette.gray01};
`;

const TagText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.theme.palette.gray04};
`;
