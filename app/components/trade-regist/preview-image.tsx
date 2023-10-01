import React from 'react';
import { Pressable } from 'react-native';
import styled from '@emotion/native';
import { theme } from '~/../theme';
import { Icon } from 'components/common/icon';
import { Row } from 'components/common/layout';
import { Asset } from 'react-native-image-picker';

export const PreviewImage: React.FC<{
  image: Asset;
  onDelete: (image: Asset) => void;
}> = ({ image, onDelete }) => {
  return (
    <ImageWrapper>
      <ImageContent source={{ uri: image.uri }} />
      <DeleteBtnWrapper onPress={() => onDelete(image)}>
        <ImageDeleteBtn>
          <Icon name='S_Close' size={10} color={theme.palette.black} />
        </ImageDeleteBtn>
      </DeleteBtnWrapper>
    </ImageWrapper>
  );
};

const ImageWrapper = styled.View`
  position: relative;
  height: 82px;
  justify-content: flex-end;
`;

const ImageContent = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 4px;
`;

const DeleteBtnWrapper = styled(Pressable)`
  position: absolute;
  top: 0px;
  right: -7px;
`;

const ImageDeleteBtn = styled(Row)`
  width: 20px;
  height: 20px;
  justify-content: center;
  border: 1px solid ${(p) => p.theme.palette.gray01};
  border-radius: 20px;
  background-color: ${(p) => p.theme.palette.white};
`;
