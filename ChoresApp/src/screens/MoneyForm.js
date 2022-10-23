import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {UserContext} from '../../App.js';
import {
  updateMoney
} from '../../database/db.js';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import NumInput from '../components/NumInput';
import MainContainer from '../components/MainContainer';
import Navigation from '../components/Navigation';

const MoneyForm = props => {
  const [money, setMoney] = useState('');
  const user = React.useContext(UserContext);

  async function addMoney(){
    if (isNaN(money)){
      alert("Numbers only!");
    }
    else {
      const parentID = user.parentID;
      let newMoney = user.parentMoney + +money;
      await updateMoney(parentID, newMoney);
      user.parentMoney = newMoney;
      props.navigation.navigate('ParentHomeScreen');
    }
  }

  return (
    <MainContainer>
      <Navigation title="Add money" navigation={props.navigation} />
      <Container>
        <AppText>Ammount:</AppText>
        <NumInput onChangeText={text => setMoney(text)}/>
        <AppButton style={styles.button} onPress={() => addMoney()}>
          Add
        </AppButton>
      </Container>
      <BottomBar money={user.parentMoney} text={user.parentUsername} navigation={props.navigation} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default MoneyForm;
