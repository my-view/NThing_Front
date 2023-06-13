import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, TouchableWithoutFeedback} from 'react-native';
import RootScreen from 'screens';
import TestScreen from 'screens/test';
import UniversityScreen from 'screens/university';

const Stack = createNativeStackNavigator();

const RootStackScreen = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerShadowVisible: false,
        headerTitle: '',
      }}>
      <Stack.Group>
        <Stack.Screen name="RootScreen" component={RootScreen} />
        <Stack.Screen name="testScreen" component={TestScreen} />
        <Stack.Screen name="universityScreen" component={UniversityScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStackScreen;
