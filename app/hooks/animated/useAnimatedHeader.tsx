import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimatedHeader = (
  triggerPoint: number,
  statusBarHeihgt: number,
) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const animationEnd = triggerPoint + 20;
  const border = scrollY.interpolate({
    inputRange: [triggerPoint, animationEnd, animationEnd + 1],
    outputRange: [0, 1, 1],
  });
  const backgroundColor = scrollY.interpolate({
    inputRange: [triggerPoint, triggerPoint + 1],
    outputRange: ['rgba(255, 255, 255, 0)', 'white'],
  });
  const color = scrollY.interpolate({
    inputRange: [triggerPoint, animationEnd],
    outputRange: ['white', 'black'],
  });
  const paddingTop = scrollY.interpolate({
    inputRange: [triggerPoint, triggerPoint + 1, triggerPoint + 2],
    outputRange: [0, statusBarHeihgt, statusBarHeihgt],
  });
  const minusPaddingTop = scrollY.interpolate({
    inputRange: [
      triggerPoint - 1,
      triggerPoint,
      triggerPoint + 1,
      triggerPoint + 2,
    ],
    outputRange: [0, 0, -statusBarHeihgt, -statusBarHeihgt],
  });
  return {
    scrollY,
    color,
    backgroundColor,
    border,
    paddingTop,
    minusPaddingTop,
  };
};
