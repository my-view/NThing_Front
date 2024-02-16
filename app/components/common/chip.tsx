import styled from '@emotion/native';
import React from 'react';
import { Font13W500 } from './text';

export const Chip: React.FCC<{ isSelected: boolean; onSelect: () => void }> = ({
  isSelected,
  onSelect,
  children,
}) => {
  return (
    <ChipWrapper isSelected={isSelected} onPress={onSelect}>
      <ChipText isSelected={isSelected}>{children}</ChipText>
    </ChipWrapper>
  );
};

const ChipWrapper = styled.Pressable<{ isSelected: boolean }>`
  padding: 8px 12px;
  border: 1px solid;
  border-color: ${(p) =>
    p.isSelected ? p.theme.palette.primary : p.theme.palette.gray01};
  border-radius: 26px;
  background-color: ${(p) =>
    p.isSelected ? p.theme.palette.primary : p.theme.palette.white};
`;

const ChipText = styled(Font13W500)<{ isSelected: boolean }>`
  color: ${(p) =>
    p.isSelected ? p.theme.palette.white : p.theme.palette.gray05};
`;
