import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../colors';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Input from '../components/Input';
import MainContainer from '../components/MainContainer';
import Navigation from '../components/Navigation';

const AccountSettings = props => {
  const children = [
    {childID: 1, childUsername: 'child 1'},
    {childID: 2, childUsername: 'child 2'},
  ];

  return (
    <MainContainer>
      <Navigation title="Account Settings" navigation={props.navigation} />
      <Container style={{width: '80%'}}>
        <AppText>New password:</AppText>
        <View style={styles.container}>
          <Input style={styles.input} />
          <AppButton style={styles.button}>Change</AppButton>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ChildForm')}
          style={{alignSelf: 'flex-start'}}>
          <AppText style={{color: 'red', marginTop: 30}}>Add child</AppText>
        </TouchableOpacity>
        <Heading style={styles.heading}>Children list</Heading>
        <FlatList
          data={children}
          renderItem={i => (
            <View style={styles.container}>
              <AppText style={styles.child}>{i.item.childUsername}</AppText>
              <AppButton style={styles.button}>Edit</AppButton>
            </View>
          )}
          keyExtractor={item => item.childID}
          style={{width: '100%'}}></FlatList>
      </Container>
      <BottomBar text="Log out" />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 0,
  },
  child: {
    backgroundColor: COLORS.white,
    flex: 3,
    fontSize: 22,
    marginRight: 5,
    paddingLeft: 5,
    textAlignVertical: 'center',
  },
  container: {
    flexDirection: 'row',
    height: 50,
    marginTop: 5,
  },
  heading: {
    alignSelf: 'flex-start',
    marginBottom: 3,
    marginTop: 5,
  },
  input: {
    flex: 3,
    height: '100%',
    marginRight: 5,
    marginTop: 0,
  },
});

export default AccountSettings;
