// Made by Sonja
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../colors';
import {UserContext} from '../../App.js';
import {getAllChore, getChildChore, all} from '../../database/db';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Heading from '../components/Heading';
import MainContainer from '../components/MainContainer';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ChildHomeScreen = props => {
    const user = React.useContext(UserContext);
    const isFocused = useIsFocused();
    const [chores, setChore] = useState([]);
    const [childChores, setChildChore] = useState([]);

    // Getting information for chores
    async function getChore() {
        try {
            const chore = await getAllChore();
            setChore(chore);
        }
        catch(err) {
            console.log(err);
        }
    }

    // Getting current child's chores
    async function getChildChores() {
        try {
            const childID = user.childID;
            const chore = await getChildChore(childID);
            setChildChore(chore);
            console.log(childChores.length);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
    if (isFocused) {
        getChore();
        getChildChores();
        user;
    }
    }, [isFocused]);

    // The visual part
    return (
        <MainContainer>
            <View style={{textAlign:'center'}}>
                <Heading style={styles.heading}>Chores List</Heading>
            </View>
            <Container style={{width: '80%'}}>
            <FlatList
            data={chores}
            keyExtractor={item => item.choreID}
            renderItem={(c)=> ( 
                <FlatList
                data={childChores}
                keyExtractor={item => item.childChoreID}
                renderItem={cc => ( 
                    c.item.choreID == cc.item.chore ? (
                        cc.item.done == 0 ? (
                            <View style={styles.container}>
                                <AppText style={styles.chore}>{c.item.choreInfo}</AppText>
                                <AppText style={styles.notdone}>●</AppText>
                            </View>
                        ) : (
                            <View style={styles.container}>
                                <AppText style={styles.chore}>{c.item.choreInfo}</AppText>
                                <AppText style={styles.done}>●</AppText>
                            </View>
                        )
                    ) : (null)                                        
                )}></FlatList> 
            )} style={{width: '100%'}}></FlatList>
            </Container>
            <BottomBar money={user.childMoney} text="Log out" navigation={props.navigation}/>
        </MainContainer>
    );
};
// Style
const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 40,
        marginLeft: 70
    },

    chore: {
        flex: 3,
        fontSize: 22,
        marginRight: 5,
        paddingLeft: 5,
        textAlignVertical: 'center',
    },

    done: {
        flex: 0.2,
        fontSize: 22,
        marginRight: 5,
        paddingLeft: 5,
        textAlignVertical: 'center',
        color: 'green',
    },

    notdone: {
        flex: 0.2,
        fontSize: 22,
        marginRight: 5,
        paddingLeft: 5,
        textAlignVertical: 'center',
        color: 'red',
    },

    container: {
        backgroundColor: COLORS.white,
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

export default ChildHomeScreen;
