import React from 'react';
import {Pressable, StyleSheet, View, Alert} from 'react-native';
import {COLORS} from '../colors';
import AppButton from './AppButton';
import AppText from './AppText';

const logout=()=> {
    
}

const BottomBar = ({navigation, text, money}) => {
  return (
    <View style={styles.bar}>
      <Pressable style={styles.money}>
        <AppText>Money: {money} €</AppText>
      </Pressable>
      <AppButton style={styles.account} onPress={() => 
            Alert.alert("","Do you want to log out?",[
            {text: "Yes", onPress:()=> navigation.navigate('Login')},
            {text: "No"}
    ])}>{text}</AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  account: {
    borderRadius: 0,
    flex: 1,
    padding: 15,
  },
  bar: {
    flexDirection: 'row',
    justifySelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  money: {
    backgroundColor: COLORS.secondary,
    flex: 2,
    textAlignVertical: 'center',
    padding: 15,
  },
});

export default BottomBar;
