import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from '../colors';
import AppButton from './AppButton';
import AppText from './AppText';

const BottomBar = ({navigation, text}) => {
  return (
    <View style={styles.bar}>
      <Pressable
        style={styles.money}
        onPress={() => navigation.navigate('AddMoney')}>
        <AppText>Money: 0.00€</AppText>
      </Pressable>
      <AppButton
        style={styles.account}
        onPress={() => navigation.navigate('AccountSettings')}>
        {text}
      </AppButton>
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
