import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { SortType } from 'types/common';
import { theme } from '~/../theme';
import { AnimatedArrow } from 'components/common/animated-arrow';

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
  borderColor: theme.palette.gray01,
  marginTop: 8,
  height: 146,
};

export const SelectBox: React.FCC<{
  defaultValue: SortType;
  options: SortType[];
  onChange: React.Dispatch<React.SetStateAction<SortType>>;
  margin?: number; // marginRight: 33(3글자) or 10(4글자)
}> = ({ defaultValue, options, onChange, margin }) => {
  return (
    <SelectDropdown
      defaultButtonText={`${defaultValue.nm}`}
      defaultValueByIndex={0}
      data={options}
      onSelect={(selectedItem) => onChange(selectedItem)}
      buttonTextAfterSelection={(selectedItem) => selectedItem.nm}
      rowTextForSelection={(item) => item.nm}
      buttonStyle={{ ...defaultButtonStyle }}
      buttonTextStyle={{ ...defaultTextStyle }}
      rowStyle={{ ...defaultRowStyle }}
      rowTextStyle={{ ...defaultRowTextStyle }}
      dropdownStyle={{ ...defaultDropDownStyle }}
      dropdownOverlayColor='transparent'
      selectedRowTextStyle={{ ...defaultSelectedRowTextStyle }}
      showsVerticalScrollIndicator={false}
      renderDropdownIcon={(isOpen) => (
        <View style={{ marginRight: margin }}>
          <AnimatedArrow isOpen={isOpen} size={14} />
        </View>
      )}
    />
  );
};
