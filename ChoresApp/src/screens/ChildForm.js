import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {UserContext} from '../../App.js';
import {
  addChild,
  addChildParentConnection,
  getChildId,
} from '../../database/db.js';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Input from '../components/Input';
import MainContainer from '../components/MainContainer';
import Navigation from '../components/Navigation';

const ChildForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = React.useContext(UserContext);

  async function child() {
    try {
      const dbResult = await addChild(username, password);
      console.log('dbResult: ' + dbResult);
      const {childID} = await getChildId(username);
      const parentID = user.parentID;
      await addChildParentConnection(childID, parentID);
    } catch (err) {
      console.log(err);
    } finally {
      //No need to do anything
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
      <BottomBar text={user.parentUsername} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default ChildForm;
