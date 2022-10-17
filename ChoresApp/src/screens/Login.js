import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {COLORS} from '../colors';
import {
  init,
  loginCheckParent,
  loginCheckChild,
  all,
} from '../../database/db.js';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Heading from '../components/Heading';
import MainContainer from '../components/MainContainer';
import Input from '../components/Input';
import Container from '../components/Container';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const Login = props => {
  const [accountType, setAccountType] = useState('child');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function checkLogin() {
    try {
      let dbResult = null;
      if (accountType === 'parent') {
        dbResult = await loginCheckParent(username, password);
      } else {
        dbResult = await loginCheckChild(username, password);
      }

      if (dbResult === 'Ok') {
        alert('Login ok!');
        props.navigation.navigate('ChildForm');
      } else if (dbResult === 'No ok') {
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
      const dbResult = await all();
      console.log('dbResult: ' + dbResult); //For debugging purposes to see the data in the console screen
    } catch (err) {
      console.log(err);
    } finally {
      //No need to do anything
    }
  }

  return (
    <MainContainer style={{justifyContent: 'center'}}>
      <Container>
        <Text style={styles.logo}>Chores</Text>
        <Heading>Login</Heading>
        <View style={styles.accountTypeContainer}>
          <AppText style={{flex: 1}}>I'm a</AppText>
          <AppButton
            onPress={() => setAccountType('child')}
            style={{
              marginRight: 10,
              backgroundColor:
                accountType === 'child' ? COLORS.darkBlue : COLORS.primary,
            }}>
            child
          </AppButton>
          <AppButton
            onPress={() => setAccountType('parent')}
            style={{
              backgroundColor:
                accountType === 'parent' ? COLORS.darkBlue : COLORS.primary,
            }}>
            adult
          </AppButton>
        </View>
        <AppText>Username:</AppText>
        <Input onChangeText={text => setUsername(text)} />
        <AppText>Password:</AppText>
        <Input
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.submitButtonContainer}>
          <AppText style={styles.link}>Create an account</AppText>
          <AppButton onPress={() => checkLogin()}>Login</AppButton>
          <Button title="Save" onPress={() => parent()} />
        </View>
      </Container>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  accountTypeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  logo: {
    fontFamily: 'fuzzybubbles',
    fontSize: 60,
    marginBottom: 24,
  },
  link: {
    color: 'red',
    flex: 2,
  },
  submitButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 25,
  },
});

export default Login;
