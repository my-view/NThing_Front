import React, { useState, useRef } from 'react';
import styled from '@emotion/native';
import { Row } from 'components/common/layout';
import { Icon } from './button';
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  //   Animated,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { theme } from '../../../theme';

type menuListType = {
  id: number;
  title: string;
  icon: string;
  navigate: string;
};
export const ListItem = ({ data }: menuListType) => {
  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    // .onChange((event) => {
    //   offset.value = event.translationX; // 이거 사용하면 채팅방 옆으로 슬라이드시 적용가능할듯
    // })
    .onFinalize(() => {
      offset.value = withSpring(0);
      pressed.value = false;
    });
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      {
        scale: withTiming(pressed.value ? 0.945 : 1, {
          duration: 220,
          easing: Easing.inOut(Easing.quad),
        }),
      },
    ],
    backgroundColor: pressed.value
      ? 'rgba(225, 229, 236, 0.5)'
      : 'rgba(225, 229, 236, 0)',
    borderRadius: pressed.value ? 8 : 0,
  }));

  return (
    <>
      <GestureHandlerRootView>
        <GestureDetector gesture={pan}>
          <Animated.View style={[animatedStyles]}>
            <Pressable>
              {({ pressed }) => (
                <Animated.View
                  style={[
                    {
                      height: 56,
                      paddingHorizontal: 20,
                    },
                  ]}
                >
                  <Row
                    style={{
                      borderRadius: 8,
                      paddingVertical: pressed ? 10 : 18,
                      marginTop: pressed ? 8 : 0,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Row>
                      <Icon
                        name={`${data.icon}`}
                        size={20}
                        color={theme.palette.black}
                      />
                      <Text
                        style={{
                          marginLeft: 12,
                          fontSize: 16,
                          fontWeight: '500',
                        }}
                      >
                        {data?.title}
                      </Text>
                    </Row>
                    <Pressable
                      style={{
                        transform: [{ rotate: '180deg' }],
                      }}
                    >
                      <Icon
                        name='S_Left'
                        size={16}
                        color={theme.palette.black}
                      />
                    </Pressable>
                  </Row>
                </Animated.View>
              )}
            </Pressable>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
};
