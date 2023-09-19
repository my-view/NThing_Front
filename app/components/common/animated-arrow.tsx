import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Icon } from 'components/common/icon';
import { theme } from '~/../theme';

export const AnimatedArrow: React.FC<{
  isOpen: boolean;
  size?: number;
}> = ({ isOpen, size = 16 }) => {
  const [deg, setDeg] = useState<string>('0deg');
  const spinValue = useRef(new Animated.Value(1)).current;

  const open = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    setDeg('360deg');
  };

  const close = () => {
    Animated.timing(spinValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
    setDeg('0deg');
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', deg],
  });

  useEffect(() => {
    if (isOpen) close();
    else open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Animated.View style={[{ transform: [{ rotate: spin }] }]}>
      <Icon name='S_Down' size={size} color={theme.palette.black} />
    </Animated.View>
  );
};
