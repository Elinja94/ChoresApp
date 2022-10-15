import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppButton from './AppButton';
import Heading from './Heading';

const Navigation = ({title}) => {
  return (
    <View style={styles.navigation}>
      <AppButton style={styles.button}>◀</AppButton>
      <Heading style={styles.heading}>{title}</Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 40,
  },
  heading: {
    flex: 1,
    marginBottom: 0,
    marginRight: 50,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
    padding: 14,
    width: '100%',
  },
});

export default Navigation;
