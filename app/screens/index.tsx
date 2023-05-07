import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {css} from '@emotion/native';

const RootScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={[styles.titleArea, {}]}>
        <Text>Main</Text>
      </View>
      <View style={[styles.loginArea]}>
        <TouchableWithoutFeedback
          onPress={() => {
            // navigation.navigate('UserMainStack');
          }}>
          <View style={[styles.kakaoLoginWrap]}>
            <View style={[styles.kakaoButton]}>
              {/* <Image source={require('../assets/images/kakao-icon.png')} /> */}
              <Text style={[styles.kakaoText]}>카카오톡으로 시작하기</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('testScreen');
          }}>
          <View style={[styles.appleLoginWrap]}>
            <View style={[styles.kakaoButton]}>
              {/* <Image source={require('../assets/images/apple-icon.png')} /> */}
              <Text style={[styles.appleText]}>Apple로 시작하기</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleArea: css`
    align-items: center;
    justify-content: center;
  `,
  title: css`
    font-size: 26px;
    margin-bottom: 51px;
  `,
  loginArea: css`
    align-items: center;
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
  `,
  kakaoLoginWrap: css`
    background-color: #ffe812;
    margin-bottom: 10px;
    width: 100%;
    height: 56px;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
  `,
  kakaoButton: css`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  `,
  kakaoText: css`
    margin-left: 6px;
    font-size: 16px;
  `,
  appleLoginWrap: css`
    background-color: #000;
    margin-bottom: 10px;
    width: 100%;
    height: 56px;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
  `,
  appleText: css`
    margin-left: 6px;
    font-size: 16px;
    color: #fff;
  `,
});

export default RootScreen;
