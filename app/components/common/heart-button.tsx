import React, { useState } from 'react';
import { Icon, IconButton } from '@components/common/button';
import { theme } from '~/../theme';

export const HeartButton: React.FC<{
  isLike: boolean;
  onClick?: (_isLike: boolean) => void;
}> = ({ isLike, onClick }) => {
  const [isFilled, setIsFilled] = useState(isLike);
  const handleLikeButton = (_isLike: boolean) => {
    setIsFilled(_isLike);
    onClick?.(_isLike);
  };
  return isFilled ? (
    <IconButton onPress={() => handleLikeButton(false)}>
      <Icon name='F_Heart' size={20} color={theme.palette.error} />
    </IconButton>
  ) : (
    <IconButton onPress={() => handleLikeButton(true)}>
      <Icon name='S_Heart' size={20} color={theme.palette.black} />
    </IconButton>
  );
};
