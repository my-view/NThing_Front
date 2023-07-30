import React, { useState, useRef } from 'react';
import { View, StyleProp, ViewStyle, TextStyle, Animated } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { filterType } from '~/types/common';
import Down from '@assets/image/Down.svg';
import { theme } from '~/../theme';

export const SelectBox: React.FCC<{
  value: filterType;
  defaultValue: filterType;
  options: filterType[];
  onChange: React.Dispatch<React.SetStateAction<filterType>>;
}> = ({ defaultValue, options, onChange, value }) => {
  const spinValue = useRef(new Animated.Value(1)).current;
  const [deg, setDeg] = useState<string>('0deg');

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', deg],
  });

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

  /** DropDown 버튼 스타일 */
  const defaultButtonStyle = {
    maxWidth: 101,
    maxHeight: 14,
    width: 'auto',
    backgroundColor: 'white',
    paddingHorizontal: 0,
    paddingVertical: 0,
    // backgroundColor: 'red',
  };

  /** DropDown 버튼 텍스트 스타일 */
  const defaultTextStyle: StyleProp<TextStyle> = {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginLeft: 10,
    paddingRight: 0,
    minWidth: 62,
  };

  /** DropDown 리스트 스타일 */
  const defaultRowStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0,
    height: 14,
    marginTop: 17,
    // marginBottom: '22px',
    // backgroundColor: 'red',
  };

  /** DropDown 리스트 텍스트 스타일 */
  const defaultRowTextStyle: StyleProp<TextStyle> = {
    marginHorizontal: 10,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: theme.palette.gray02,
    textAlign: 'left',
  };

  /** DropDown 선택된 리스트 텍스트 스타일 */
  const defaultSelectedRowTextStyle: StyleProp<TextStyle> = {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '600',
    color: '#000000',
  };

  /** DropDown 컨테이터 스타일 */
  const defaultDropDownStyle: StyleProp<ViewStyle> = {
    // paddingVertical: 17,
    paddingTop: 0,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderTopWidth: 1,
    borderRadius: 4,
    borderColor: theme.palette.gray02,
    marginTop: 8,
    height: 146,
  };

  return (
    <SelectDropdown
      defaultButtonText={`${defaultValue.nm}`}
      defaultValueByIndex={0}
      data={options}
      onSelect={(selectedItem) => {
        onChange(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem) => {
        return selectedItem.nm;
      }}
      rowTextForSelection={(item) => {
        return item.nm;
      }}
      buttonStyle={{ ...defaultButtonStyle }}
      buttonTextStyle={{ ...defaultTextStyle }}
      rowStyle={{ ...defaultRowStyle }}
      rowTextStyle={{ ...defaultRowTextStyle }}
      dropdownStyle={{ ...defaultDropDownStyle }}
      dropdownOverlayColor='transparent'
      selectedRowTextStyle={{ ...defaultSelectedRowTextStyle }}
      showsVerticalScrollIndicator={false}
      renderDropdownIcon={(isOpened) => {
        if (isOpened) {
          close();
        } else {
          open();
        }
        return (
          <View
            style={{
              marginRight: value.nm.length >= 4 ? 10 : 33,
              // marginRight: 33, //3글자
              // marginRight: 10, // 4글자
            }}
          >
            <Animated.View style={[{ transform: [{ rotate: spin }] }]}>
              <Down color={'#000'} width={14} height={14} />
            </Animated.View>
          </View>
        );
      }}
    />
  );
};
