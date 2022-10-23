import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {UserContext} from '../../App.js';
import {
  addChild,
  addChildParentConnection,
  getChildID,
} from '../../database/db.js';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Input from '../components/Input';
import MainContainer from '../components/MainContainer';
import Navigation from '../components/Navigation';

const AddChild = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = React.useContext(UserContext);

  async function child() {
    if (!username || !password) {
      alert('Invalid username or password');
      return;
    }

    try {
      const dbResult = await addChild(username, password);
      console.log('dbResult: ' + dbResult);

      if (dbResult === 'Username already taken') {
        alert('Username already taken');
      }
      if (dbResult === 'Ok') {
        const {childID} = await getChildID(username);
        const parentID = user.parentID;
        await addChildParentConnection(childID, parentID);
        props.navigation.navigate('AccountSettings');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MainContainer>
      <Navigation title="Add child" navigation={props.navigation} />
      <Container>
        <AppText>Username:</AppText>
        <Input onChangeText={text => setUsername(text)} />
        <AppText>Password:</AppText>
        <Input
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <AppButton style={styles.button} onPress={() => child()}>
          Add
        </AppButton>
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
});

export default AddChild;
