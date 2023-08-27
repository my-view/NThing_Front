import React, { useState } from 'react';
import { Icon, IconButton } from '@components/common/button';

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
      <Icon name='FillHeart' size={20} />
    </IconButton>
  ) : (
    <IconButton onPress={() => handleLikeButton(true)}>
      <Icon name='Heart' size={20} />
    </IconButton>
  );
};
