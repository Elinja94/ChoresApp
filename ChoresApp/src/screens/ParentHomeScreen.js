import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../colors';
import {UserContext} from '../../App.js';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Input from '../components/Input';
import MainContainer from '../components/MainContainer';

const ParentHomeScreen = props => {
    const user = React.useContext(UserContext);

  return (
    <MainContainer>
        <View style={styles.container}>
            <Heading style={styles.heading}>Chores List</Heading>
            <AppButton style={styles.button} onPress={() => props.navigation.navigate("AddChore")}>
                +
            </AppButton>
        </View>
        <Container style={{width: '80%'}}>
            
        </Container>
        <BottomBar text={user.parentUsername} navigation={props.navigation}/>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 40,
        marginLeft: 70
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

export default ParentHomeScreen;
