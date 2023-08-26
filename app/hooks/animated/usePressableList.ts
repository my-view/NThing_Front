import React, {useRef} from "react";
import { Animated } from "react-native";


export function UsePressableListAnimated() {

const deepPress = useRef(new Animated.Value(1)).current;


const fadeInConfig = {
toValue: 0.5,
duration: 50,
// delay:10,
useNativeDriver: true,
    };


const fadeOutConfig = {
    toValue: 1,
    duration: 50,
    useNativeDriver: true,
        };

const fadeIn = () => {
    Animated.timing(deepPress,fadeInConfig).start();
};

const fadeOut = () => {
    Animated.timing(deepPress,fadeOutConfig).start();
};

    return{
        deepPress,
        fadeIn,
        fadeOut
    }
};