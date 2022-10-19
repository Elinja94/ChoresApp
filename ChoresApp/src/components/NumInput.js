import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../colors';

const NumInput = ({style, onChangeText, secureTextEntry}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChangeText}
      keyboardType="numeric"></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.white,
    marginTop: 3,
    marginBottom: 12,
    width: '100%',
  },
});

export default NumInput;
