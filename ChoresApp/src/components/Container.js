import React from 'react';
import {StyleSheet, View} from 'react-native';

const Container = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
});

export default Container;
