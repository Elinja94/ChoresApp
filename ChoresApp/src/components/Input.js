import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../colors';

const Input = ({style, onChangeText, secureTextEntry}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}></TextInput>
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

export default Input;
