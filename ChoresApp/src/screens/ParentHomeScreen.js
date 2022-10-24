// Made by Sonja and Jenna
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../colors';
import {UserContext} from '../../App.js';
import {
  getAllChildrenForParent,
  getChild,
  getAllChore,
  getAllChildChore,
  updateMoney,
  updateChildMoney,
} from '../../database/db';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Heading from '../components/Heading';
import MainContainer from '../components/MainContainer';
import PaymentModal from '../components/PaymentModal';

const ParentHomeScreen = props => {
  const user = React.useContext(UserContext);
  const isFocused = useIsFocused();
  const [children, setChildren] = useState([]);
  const [chores, setChore] = useState([]);
  const [childChores, setChildChore] = useState([]);
  const [everything, setEverything] = useState([]);
  const [modalProps, setModalProps] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // Getting all the parent's children by Jenna
  async function getChildren() {
    try {
      const childIDs = await getAllChildrenForParent(user.parentID);
      const childrenList = [];

      for (id of childIDs) {
        const child = await getChild(id);
        childrenList.push(child);
      }

      setChildren(childrenList);
    } catch (err) {
      console.log(err);
    }
  }

  // Getting information for chores
  async function getChore() {
    try {
      const chore = await getAllChore();
      setChore(chore);
    } catch (err) {
      console.log(err);
    }
  }

  // Getting children's chores
  async function getChildChore() {
    try {
      const chore = await getAllChildChore();
      setChildChore(chore);
    } catch (err) {
      console.log(err);
    }
  }

  // Setting new array to use on flatlist
  function setAll() {
    const eveythingList = [];
    let childChoreid = 0;
    let child = '';
    let chore = '';
    let done = 0;
    for (cc of childChores) {
      for (c of chores) {
        if (cc.chore == c.choreID) {
          for (ch of children) {
            if (ch.childID == cc.child) {
              childChoreid = cc.childchoreID;
              child = ch.childUsername;
              chore = c.choreInfo;
              done = cc.done;
              chorecost = c.choreCost;
              childID = ch.childID;
              childMoney = ch.childMoney;
            }
          }
        }
      }
      eveythingList.push({
        childchoreid: childChoreid,
        child: child,
        chore: chore,
        done: done,
        chorecost: chorecost,
        childID: childID,
        childMoney: childMoney,
      });
    }
    setEverything(eveythingList);
  }

  const handleModal = item => {
    if (!modalVisible) {
      setModalVisible(true);
    }

    setModalProps({
      child: item.child,
      choreCost: item.chorecost,
      chore: item.chore,
    });
  };

  async function makePayment(childID, childMoney, paymentAmount) {
    const updatedParentMoney = user.parentMoney - paymentAmount;
    const updatedChildMoney = childMoney + paymentAmount;

    try {
      await updateMoney(user.parentID, updatedParentMoney);
      await updateChildMoney(childID, updatedChildMoney);
      user.parentMoney = updatedParentMoney;
      setModalVisible(false);
      setAll();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isFocused) {
      getChildren();
      getChore();
      getChildChore();
      setAll();
      user;
    }
  }, [isFocused]);

  // The visual part
  return (
    <MainContainer>
      <View style={styles.container}>
        <AppButton style={styles.refreshButton} onPress={() => setAll()}>
          ↺
        </AppButton>
        <Heading style={styles.heading}>Chores List</Heading>
        <AppButton
          style={styles.button}
          onPress={() => props.navigation.navigate('AddChore')}>
          +
        </AppButton>
      </View>
      <Container style={{width: '80%', height: '85%'}}>
        <AppText style={{textAlign: 'center'}}>
          Green = done Red = notdone
        </AppText>
        <FlatList
          data={everything}
          keyExtractor={item => item.childchoreid}
          renderItem={i =>
            i.item.done == 0 ? (
              <View style={styles.choresContainer}>
                <AppText style={styles.chore}>
                  {i.item.child}: {i.item.chore}
                </AppText>
                <AppText style={styles.notdone}>●</AppText>
              </View>
            ) : (
              <TouchableOpacity onPress={() => handleModal(i.item)}>
                <PaymentModal
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  makePayment={() =>
                    makePayment(
                      i.item.childID,
                      i.item.childMoney,
                      i.item.chorecost,
                    )
                  }
                  {...modalProps}
                />
                <View style={styles.choresContainer}>
                  <AppText style={styles.chore}>
                    {i.item.child}: {i.item.chore}
                  </AppText>
                  <AppText style={styles.done}>●</AppText>
                </View>
              </TouchableOpacity>
            )
          }
          style={{width: '100%'}}></FlatList>
        <AppText></AppText>
      </Container>
      <BottomBar
        money={user.parentMoney}
        text={user.parentUsername}
        navigation={props.navigation}
      />
    </MainContainer>
  );
};
// Style
const styles = StyleSheet.create({
  refreshButton: {
    height: 40,
    width: 40,
    marginRight: 50,
  },

  button: {
    height: 40,
    width: 40,
    marginLeft: 70,
  },

  chore: {
    backgroundColor: COLORS.white,
    flex: 3,
    fontSize: 22,
    marginRight: 5,
    paddingLeft: 5,
    textAlignVertical: 'center',
  },

  done: {
    flex: 0.2,
    fontSize: 22,
    marginRight: 5,
    paddingLeft: 5,
    textAlignVertical: 'center',
    color: 'green',
  },

  notdone: {
    flex: 0.2,
    fontSize: 22,
    marginRight: 5,
    paddingLeft: 5,
    textAlignVertical: 'center',
    color: 'red',
  },

  container: {
    flexDirection: 'row',
    height: 50,
    marginTop: 5,
  },

  choresContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    minHeight: 50,
    marginTop: 5,
  },

  heading: {
    alignSelf: 'flex-start',
    marginBottom: 3,
    marginTop: 5,
  },

  input: {
    flex: 3,
    height: '100%',
    marginRight: 5,
    marginTop: 0,
  },
});

export default ParentHomeScreen;
