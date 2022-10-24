import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {COLORS} from '../colors';

const Heading = ({children, style}) => {
  return <Text style={[styles.heading, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    marginBottom: 22,
    textAlign: 'center',
    color: COLORS.black,
  },
});

export default Heading;
