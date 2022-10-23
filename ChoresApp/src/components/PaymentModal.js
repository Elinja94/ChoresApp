import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {COLORS} from '../colors';
import AppButton from './AppButton';
import AppText from './AppText';

const PaymentModal = ({
  modalVisible,
  setModalVisible,
  child,
  choreCost,
  chore,
}) => {
  return (
    <ReactNativeModal isVisible={modalVisible}>
      <View style={styles.container}>
        <AppText
          style={
            styles.text
          }>{`Do you want to pay to ${child} ${choreCost} from chore ${chore}`}</AppText>
        <View style={styles.buttonContainer}>
          <AppButton
            style={styles.button}
            onPress={() => setModalVisible(false)}>
            Yes
          </AppButton>
          <AppButton
            style={styles.button}
            onPress={() => setModalVisible(false)}>
            No
          </AppButton>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    width: 70,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    backgroundColor: COLORS.white,
    height: 120,
    alignSelf: 'center',
    width: 300,
  },
  text: {
    flex: 1.5,
  },
});

export default PaymentModal;
