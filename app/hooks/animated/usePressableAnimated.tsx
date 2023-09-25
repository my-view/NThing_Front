import { Gesture } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

export const usePressableAnimated = (customStyle?: Object) => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onFinalize(() => {
      offset.value = withSpring(0);
      isPressed.value = false;
    });
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      {
        scale: withTiming(isPressed.value ? 0.945 : 1, {
          duration: 220,
          easing: Easing.inOut(Easing.quad),
        }),
      },
    ],

    backgroundColor: isPressed.value
      ? 'rgba(225, 229, 236, 0.5)'
      : 'rgba(225, 229, 236, 0)',
    paddingHorizontal: isPressed.value ? 22 : 0,
    paddingVertical: isPressed.value ? 7 : 4,
    borderRadius: isPressed.value ? 8 : 0,
    ...customStyle,
  }));

  return { pan, animatedStyles };
};
