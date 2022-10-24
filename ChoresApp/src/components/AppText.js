import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../colors';

const AppText = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    width: '100%',
    color: COLORS.black,
  },
});

export default AppText;
