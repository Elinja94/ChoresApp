import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {UserContext} from '../../App.js';
import {COLORS} from '../colors.js';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import MainContainer from '../components/MainContainer';
import Navigation from '../components/Navigation';

const AddChore = props => {
  const [chore, setChore] = useState('');
  const [child, setChild] = useState('');
  const user = React.useContext(UserContext);

  const children = ['a', 'b', 'c'];
  const chores = ['wash dishes', 'do laundry', 'take the trash out'];

  return (
    <MainContainer>
      <Navigation title="Add chore" navigation={props.navigation} />
      <Container>
        <AppText>Chore:</AppText>
        <ModalDropdown
          options={chores}
          style={styles.modalDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdown}
          dropdownTextStyle={styles.dropdownText}
          defaultValue="Select chore"
          onSelect={index => setChore(chores[index])}
        />
        <AppText>Child:</AppText>
        <ModalDropdown
          options={children}
          style={styles.modalDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdown}
          dropdownTextStyle={styles.dropdownText}
          defaultValue="Select child"
          onSelect={index => setChild(children[index])}
        />
        <AppButton style={styles.button}>Add</AppButton>
      </Container>
      <BottomBar text={user.parentUsername} navigation={props.navigation} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  modalDropdown: {
    backgroundColor: COLORS.white,
    height: 40,
    marginBottom: 10,
    padding: 8,
    width: '100%',
  },
  dropdown: {
    fontSize: 20,
    marginTop: 8,
    width: 200,
  },
  dropdownText: {
    fontSize: 18,
  },
});

export default AddChore;
