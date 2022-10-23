import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {UserContext} from '../../App';
import {updateChildPassword} from '../../database/db';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Input from '../components/Input';
import MainContainer from '../components/MainContainer';
import Navigation from '../components/Navigation';

const EditChild = props => {
  const user = React.useContext(UserContext);
  const {childID, childUsername} = props.route.params;
  const [password, setPassword] = useState('');

  async function changePassword() {
    if (!password) {
      alert('Invalid password');
    }

    try {
      const dbResult = await updateChildPassword(childID, password);
      console.log('dbResult: ', dbResult);

      if (dbResult === 'Ok') {
        alert('Password changed');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MainContainer>
      <Navigation
        title={`Edit ${childUsername}`}
        navigation={props.navigation}
      />
      <Container style={{width: '80%'}}>
        <AppText>New password:</AppText>
        <View style={styles.container}>
          <Input
            style={styles.input}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <AppButton style={styles.button} onPress={() => changePassword()}>
            Change
          </AppButton>
        </View>
      </Container>
      <BottomBar text={user.parentUsername} navigation={props.navigation} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    flex: 1,
    margin: 3,
  },
  container: {
    flexDirection: 'row',
    height: 50,
    marginTop: 5,
  },
  input: {
    flex: 3,
    height: '100%',
    marginRight: 5,
    marginTop: 0,
  },
});

export default EditChild;
