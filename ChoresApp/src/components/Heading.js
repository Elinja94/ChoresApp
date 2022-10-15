import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Heading = ({children}) => {
  return <Text style={styles.heading}>{children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    width: '70%',
  },
  heading: {
    fontSize: 28,
    marginBottom: 22,
  },
});

export default Heading;
