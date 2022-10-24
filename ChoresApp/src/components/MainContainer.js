import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

const MainContainer = ({children, style}) => {
  return <ImageBackground source={require('../assets/img/bg.png')} resizeMode="cover" style={[styles.image, style]}>{children}</ImageBackground>;
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
});

export default MainContainer;
