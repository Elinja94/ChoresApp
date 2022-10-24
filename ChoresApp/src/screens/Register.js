// Made by Sonja
import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {COLORS} from '../colors';
import {addParent} from '../../database/db.js';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Heading from '../components/Heading';
import MainContainer from '../components/MainContainer';
import Input from '../components/Input';
import Container from '../components/Container';

const Register = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Checking if registeration was a success
  async function registerCheck() {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }
    try {
      dbResult = await addParent(username, password);
      // If account was created
      if (dbResult === 'Ok') {
        alert('Account created!');
        props.navigation.navigate("Login");
      }
      // If both fields were not filled
      else if (dbResult === 'Empty') {
        alert('Please enter username and password');
      } 
      // If username is already taken
      else {
        alert('Username is already used!');
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
            <Heading>Register</Heading>
            <AppText>Username:</AppText>
            <Input onChangeText={text => setUsername(text)} />
            <AppText>Password:</AppText>
            <Input
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            />
            <View style={styles.submitButtonContainer}>
                <Pressable style={styles.link} onPress={() => props.navigation.navigate("Login")}>
                    <AppText style={styles.link}>Back to login</AppText>
                </Pressable>
                <AppButton onPress={() => registerCheck()}>Register</AppButton>
            </View>
        </Container>
    </MainContainer>
  );
};
// Styles
const styles = StyleSheet.create({
  logo: {
    fontFamily: 'fuzzybubbles',
    fontSize: 60,
    marginBottom: 24,
    color: COLORS.logo
  },
  link: {
    color: COLORS.link,
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
