import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {UserContext} from '../../App.js';
import {
  addChore,
  getAllChildrenForParent,
  getAllChores,
  getChild,
} from '../../database/db.js';
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
  const [chores, setChores] = useState([]);
  const [children, setChildren] = useState([]);
  const [choreOptions, setChoreOptions] = useState([]);
  const [childOptions, setChildOptions] = useState([]);
  const user = React.useContext(UserContext);

  async function getChores() {
    try {
      const choresList = await getAllChores();
      setChores(choresList);

      const options = [];
      for (c of choresList) {
        options.push(c.choreInfo);
      }

      setChoreOptions(options);
    } catch (err) {
      console.log(err);
    }
  }

  async function getChildren() {
    try {
      const childIDs = await getAllChildrenForParent(user.parentID);
      const childrenList = [];

      for (c of childIDs) {
        const childObject = await getChild(c);
        childrenList.push(childObject);
      }

      setChildren(childrenList);

      const options = [];
      for (c of childrenList) {
        options.push(c.childUsername);
      }

      setChildOptions(options);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getChores();
    getChildren();
  }, []);

  async function saveChore() {
    try {
      if (!chore || !child) {
        alert('Select a chore and a child');
      } else {
        const selectedChore = chores.find(c => c.choreInfo === chore);
        const selectedChild = children.find(c => c.childUsername === child);
        const dbResult = await addChore(
          selectedChild.childID,
          selectedChore.choreID,
        );
        console.log('dbResult: ', dbResult);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MainContainer>
      <Navigation title="Add chore" navigation={props.navigation} />
      <Container>
        <AppText>Chore:</AppText>
        <ModalDropdown
          options={choreOptions}
          style={styles.modalDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdown}
          dropdownTextStyle={styles.dropdownText}
          defaultValue="Select chore"
          onSelect={index => setChore(choreOptions[index])}
        />
        <AppText>Child:</AppText>
        <ModalDropdown
          options={childOptions}
          style={styles.modalDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdown}
          dropdownTextStyle={styles.dropdownText}
          defaultValue="Select child"
          onSelect={index => setChild(childOptions[index])}
        />
        <AppButton style={styles.button} onPress={saveChore}>
          Add
        </AppButton>
      </Container>
      <BottomBar
        text={user.parentUsername}
        navigation={props.navigation}
        money={user.parentMoney}
      />
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
    height: 300,
    width: 250,
  },
  dropdownText: {
    fontSize: 18,
  },
});

export default AddChore;
