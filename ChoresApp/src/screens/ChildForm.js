import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Input from '../components/Input';
import MainContainer from '../components/MainContainer';
import Navigation from '../components/Navigation';

const ChildForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <MainContainer>
      <Navigation title="Add child" />
      <Container>
        <AppText>Username:</AppText>
        <Input onChangeText={text => setUsername(text)} />
        <AppText>Password:</AppText>
        <Input
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <AppButton style={{alignSelf: 'flex-end', marginTop: 5}}>Add</AppButton>
      </Container>
      <BottomBar />
    </MainContainer>
  );
};

const styles = StyleSheet.create({});

export default ChildForm;
