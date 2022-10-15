import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {COLORS} from '../colors';
import {init, loginCheck, addParent} from '../../database/db.js';
import MainContainer from '../components/MainContainer';
import AppButton from '../components/AppButton';
import Heading from '../components/Heading';
import Input from '../components/Input';
import AppText from '../components/AppText';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const Login = () => {
  const [accountType, setAccountType] = useState('child');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function checkLogin() {
    try {
      const dbResult = await loginCheck(username, password);
      if (dbResult === 'Ok') {
        alert('Login ok!');
      }

      if (dbResult === 'No ok') {
        alert('Login not ok!');
      } else {
        alert('Login no ac!');
      }
    } catch (err) {
      console.log(err);
    } finally {
      //No need to do anything
    }
  }

  async function parent() {
    try {
      const dbResult = await addParent('test', 'test');
      console.log('dbResult: ' + dbResult); //For debugging purposes to see the data in the console screen
    } catch (err) {
      console.log(err);
    } finally {
      //No need to do anything
    }
  }

  return (
    <MainContainer>
      <View style={styles.container}>
        <Text style={styles.logo}>Chores</Text>
        <Heading>Login</Heading>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <AppText style={{flex: 1}}>I'm a</AppText>
          <AppButton
            onPress={() => setAccountType('child')}
            style={{
              marginRight: 10,
              backgroundColor:
                accountType === 'child' ? '#268696' : COLORS.primary,
            }}>
            child
          </AppButton>
          <AppButton
            onPress={() => setAccountType('adult')}
            style={{
              backgroundColor:
                accountType === 'adult' ? '#268696' : COLORS.primary,
            }}>
            adult
          </AppButton>
        </View>
        <AppText>Username</AppText>
        <Input onChangeText={text => setUsername(text)} />
        <AppText>Password</AppText>
        <Input
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={styles.link}>Create an account</Text>
          <AppButton onPress={() => checkLogin()}>Login</AppButton>
          <Button title="Save" onPress={() => parent()} />
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    width: '70%',
  },
  logo: {
    fontFamily: 'fuzzybubbles',
    fontSize: 60,
    marginBottom: 24,
  },
  link: {
    color: 'red',
    flex: 2,
    fontSize: 18,
    marginLeft: 6,
  },
});

export default Login;
