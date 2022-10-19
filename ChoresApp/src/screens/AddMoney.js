import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {UserContext} from '../../App.js';
import {
  all,
} from '../../database/db.js';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Input from '../components/Input';
import MainContainer from '../components/MainContainer';
import Navigation from '../components/Navigation';

const AddMoney = props => {
  const [money, setMoney] = useState('');
  const user = React.useContext(UserContext);


  return (
    <MainContainer>
      <Navigation title="Add money" navigation={props.navigation} />
      <Container>
        <AppText>Ammount:</AppText>
        <Input />
        <AppButton style={styles.button}>
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

export default AddMoney;
