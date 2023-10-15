import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SimpleSnackbarUI,
  SimpleSnackbarProps,
  createPopup,
} from 'react-native-global-components';

const styles: SimpleSnackbarProps['styles'] = StyleSheet.create({
  // override default styles
});

export default createPopup((props: SimpleSnackbarProps) => (
  <SimpleSnackbarUI {...props} styles={styles} />
));
