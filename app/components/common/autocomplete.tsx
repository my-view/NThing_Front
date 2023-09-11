import React from 'react';
import styled from '@emotion/native';
import { Pressable } from 'react-native';
import { WithIdName } from 'types/common';
import { getHeightRatio } from 'assets/util/layout';

export const Autocomplete: React.FC<{
  data: WithIdName[];
  onSelect: (id: number) => void;
}> = ({ data, onSelect }) => {
  return (
    <OptionContainer>
      {data.map((item) => (
        <Pressable key={item.id} onPress={() => onSelect(item.id)}>
          <OptionWrapper>
            <OptionName>{item.name}</OptionName>
          </OptionWrapper>
        </Pressable>
      ))}
    </OptionContainer>
  );
};

const OptionContainer = styled.ScrollView`
  height: ${getHeightRatio(420)};
`;

const OptionWrapper = styled.View`
  width: 100%;
  padding: 15px 20px;
  background-color: ${(p) => p.theme.palette.white};
  border: 1px solid ${(p) => p.theme.palette.gray01};
`;

const OptionName = styled.Text`
  font-weight: 500;
  font-size: 15px;
`;
