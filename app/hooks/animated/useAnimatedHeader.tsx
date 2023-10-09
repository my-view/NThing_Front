import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimatedHeader = (triggerPoint: number) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const animationEnd = triggerPoint + 20;
  const border = scrollY.interpolate({
    inputRange: [triggerPoint, animationEnd, animationEnd + 1],
    outputRange: [0, 1, 1],
  });
  const backgroundColor = scrollY.interpolate({
    inputRange: [triggerPoint, animationEnd],
    outputRange: ['rgba(255, 255, 255, 0)', 'white'],
  });
  const color = scrollY.interpolate({
    inputRange: [triggerPoint, animationEnd],
    outputRange: ['white', 'black'],
  });
  return { scrollY, color, backgroundColor, border };
};
