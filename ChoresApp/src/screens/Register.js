// Made by Sonja
import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {init, addParent, all} from '../../database/db.js';
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

const Register = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function registerCheck() {
    try {
      dbResult = await addParent(username, password);
      
      if (dbResult === 'Ok') {
        alert('Register ok!');
        props.navigation.navigate("Login");
      }

      else if (dbResult === 'Empty') {
        alert('Please enter username and password');
      } 

      else {
        alert('Username is already used!');
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

  const login = () => props.navigation.navigate("Login");

  return (
    <MainContainer style={{justifyContent: 'center'}}>
        <Container>
            <Text style={styles.logo}>Chores</Text>
            <Heading>Register</Heading>
            <AppText>Username:</AppText>
            <Input onChangeText={text => setUsername(text)} />
            <AppText>Password:</AppText>
            <Input
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            />
            <View style={styles.submitButtonContainer}>
                <Pressable style={styles.link} onPress={login}>
                    <AppText style={styles.link}>Back to login</AppText>
                </Pressable>
                <AppButton onPress={() => registerCheck()}>Register</AppButton>
                <AppButton title="Save" onPress={() => parent()} />
            </View>
        </Container>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
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

export default Register;
