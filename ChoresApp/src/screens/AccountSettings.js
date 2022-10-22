import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {UserContext} from '../../App';
import {
  getAllChildrenForParent,
  getChild,
  updatePassword,
} from '../../database/db';
import {COLORS} from '../colors';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Input from '../components/Input';
import MainContainer from '../components/MainContainer';
import Navigation from '../components/Navigation';

const AccountSettings = props => {
  const user = React.useContext(UserContext);
  const isFocused = useIsFocused();
  const [newPassword, setNewPassword] = useState('');
  const [children, setChildren] = useState([]);

  async function getChildren() {
    try {
      const childIDs = await getAllChildrenForParent(user.parentID);
      console.log('dbResult: ' + childIDs);
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

  useEffect(() => {
    if (isFocused) {
      getChildren();
    }
  }, [isFocused]);

  async function changePassword() {
    if (newPassword.length === 0) {
      alert('Password field is empty');
      return;
    }

    try {
      const dbResult = await updatePassword(user.parentID, newPassword);
      console.log('dbResult: ', dbResult);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MainContainer>
      <Navigation title="Account Settings" navigation={props.navigation} />
      <Container style={{width: '80%'}}>
        <AppText>New password:</AppText>
        <View style={styles.container}>
          <Input
            style={styles.input}
            onChangeText={text => setNewPassword(text)}
            secureTextEntry={true}
          />
          <AppButton style={styles.button} onPress={() => changePassword()}>
            Change
          </AppButton>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ChildForm')}
          style={{alignSelf: 'flex-start'}}>
          <AppText style={{color: 'red', marginTop: 30}}>Add child</AppText>
        </TouchableOpacity>
        <Heading style={styles.heading}>Children list</Heading>
        <FlatList
          data={children}
          keyExtractor={item => item.childID}
          renderItem={i => (
            <View style={styles.container}>
              <AppText style={styles.child}>{i.item.childUsername}</AppText>
              <AppButton style={styles.button}>Edit</AppButton>
            </View>
          )}
          style={{width: '100%'}}></FlatList>
      </Container>
      <BottomBar
        text="Log out"
        navigation={props.navigation}
        logout={true}
        setUser={() => props.setUser()}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 0,
  },
  child: {
    backgroundColor: COLORS.white,
    flex: 3,
    fontSize: 22,
    marginRight: 5,
    paddingLeft: 5,
    textAlignVertical: 'center',
  },
  container: {
    flexDirection: 'row',
    height: 50,
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

export default AccountSettings;
