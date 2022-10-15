import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../colors';

const MainContainer = ({children, style}) => {
  return <View style={[styles.background, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    height: '100%',
  },
});

export default MainContainer;
