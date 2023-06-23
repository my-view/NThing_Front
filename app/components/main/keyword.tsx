import styled from '@emotion/native';
import { Text } from 'react-native';

export const KeywordInput = styled.TextInput`
  flex: 1;
  height: 100%;
  margin: 0 17px 0 8px;
  padding-horizontal: 14px;
  background-color: ${(p) => p.theme.palette.gray01}4D;
  border-radius: 4px;
  font-weight: 500;
  font-size: 15px;
  color: ${(p) => p.theme.palette.gray06};
`;

export const KeywordBox = KeywordInput.withComponent(Text);
