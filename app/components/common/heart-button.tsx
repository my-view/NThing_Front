import React, { useEffect, useState } from 'react';
import { Icon, IconButton } from '@components/common/icon';
import { theme } from '~/../theme';
import { Vibration } from 'react-native';
import Animated, { Keyframe } from 'react-native-reanimated';

const enteringAnimation = new Keyframe({
  0: {
    originX: -10,
    originY: 30,
    opacity: 0,
  },
  50: {
    originX: -10,
    originY: -30,
    opacity: 1,
  },
  100: {
    opacity: 0,
  },
}).duration(1000);

const enteringAnimation2 = new Keyframe({
  0: {
    originX: 20,
    originY: 20,
    opacity: 0,
  },
  50: {
    originX: 20,
    originY: -20,
    opacity: 1,
  },
  100: {
    opacity: 0,
  },
}).duration(800);

const enteringAnimation3 = new Keyframe({
  0: {
    originX: 10,
    originY: 40,
    opacity: 0,
  },
  50: {
    originX: 10,
    originY: -10,
    opacity: 1,
  },
  100: {
    opacity: 0,
  },
}).duration(500);

export const HeartButton: React.FC<{
  isLike: boolean;
  onClick?: (_isLike: boolean) => void;
}> = ({ isLike, onClick }) => {
  const [isFilled, setIsFilled] = useState(isLike);

  const handleLikeButton = (_isLike: boolean) => {
    setIsFilled(_isLike);
    onClick?.(_isLike);
  };

  useEffect(() => {
    if (isFilled) Vibration.vibrate(10 * 1000);
  }, [isFilled]);

  return isFilled ? (
    <IconButton onPress={() => handleLikeButton(!isFilled)}>
      <Icon name='F_Heart' size={20} color={theme.palette.error} />
      <Animated.View
        entering={enteringAnimation}
        style={{
          position: 'absolute',
          zIndex: 9999,
        }}
      >
        <Icon name='F_Heart' size={16} color={theme.palette.error} />
      </Animated.View>
      <Animated.View
        entering={enteringAnimation2}
        style={{
          position: 'absolute',
          zIndex: 9999,
        }}
      >
        <Icon name='F_Heart' size={18} color={theme.palette.error} />
      </Animated.View>
      <Animated.View
        entering={enteringAnimation3}
        style={{
          position: 'absolute',
          zIndex: 9999,
        }}
      >
        <Icon name='F_Heart' size={12} color={theme.palette.error} />
      </Animated.View>
    </IconButton>
  ) : (
    <IconButton onPress={() => handleLikeButton(!isFilled)}>
      <Icon name='S_Heart' size={20} color={'#000'} />
    </IconButton>
  );
};
