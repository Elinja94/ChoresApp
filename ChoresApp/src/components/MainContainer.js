import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../colors';

const MainContainer = ({children}) => {
  return <View style={styles.background}>{children}</View>;
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    height: '100%',
    justifyContent: 'center',
  },
});

export default MainContainer;
