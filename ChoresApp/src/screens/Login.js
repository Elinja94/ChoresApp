// Sonja and Jenna
import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {COLORS} from '../colors';
import {
  init,
  loginCheckParent,
  loginCheckChild,
  getParentUser,
  getChildUser
} from '../../database/db.js';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Heading from '../components/Heading';
import MainContainer from '../components/MainContainer';
import Input from '../components/Input';
import Container from '../components/Container';

// To create and check connection to database
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

  // Checking the login mostly by Sonja
  async function checkLogin() {
    try {
      let dbResult = null;
      // Checking if parent
      if (accountType === 'parent') {
        dbResult = await loginCheckParent(username, password);
      } 
      // Checking if chlid
      else {
        dbResult = await loginCheckChild(username, password);
      }
      // If login was a success
      if (dbResult === 'Ok') {
        // Parent
        if (accountType === 'parent') {
          const user = await getParentUser(username);
          props.setUser(user);
          props.navigation.navigate('ParentHomeScreen');
        }
        else {
          const user = await getChildUser(username);
          props.setUser(user);
          props.navigation.navigate('ChildHomeScreen');
        }
      } 
      // If infomration didn't match
      else if (dbResult === 'No ok') {
        alert('Username or password is incorrect');
      } 
      // If username is not in database
      else {
        alert('No username '+username);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  }
  // The visual part
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
            parent
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
          <Pressable style={styles.link} onPress={() => props.navigation.navigate("Register")}>
            <AppText style={styles.link}>Create an account</AppText>
          </Pressable>
          <AppButton onPress={() => checkLogin()}>Login</AppButton>
        </View>
      </Container>
    </MainContainer>
  );
};
// Style
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
