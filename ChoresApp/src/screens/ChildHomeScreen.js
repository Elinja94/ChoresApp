// Made by Sonja
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../colors';
import {UserContext} from '../../App.js';
import {getAllChore, getChildChore, updateDone} from '../../database/db';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import ChildBottomBar from '../components/ChildBottomBar';
import Container from '../components/Container';
import Heading from '../components/Heading';
import MainContainer from '../components/MainContainer';

const ChildHomeScreen = props => {
    const user = React.useContext(UserContext);
    const isFocused = useIsFocused();
    const [chores, setChore] = useState([]);
    const [childChores, setChildChore] = useState([]);
    const [everything, setEverything] = useState([]);

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
        }
        catch(err) {
            console.log(err);
        }
    }

    // Setting new array to use on flatlist
    const setAll=()=> {
        const eveythingList = [];
        let childChoreid = 0;
        let child = "";
        let chore = "";
        let done = 0;
        for (cc of childChores) {
            for (c of chores) {
                if (cc.chore == c.choreID){
                    childChoreid = cc.childchoreID;
                    child = user.childUsername;
                    chore = c.choreInfo;
                    done = cc.done;               
                }
            }
            eveythingList.push({"childchoreid": childChoreid, "child": child, "chore": chore, "done": done});
        }
        setEverything(eveythingList);
      }

    // Setting chore done
    async function setDone(id) {
        await updateDone(id, true);
        getChore();
        getChildChores();
        setAll();
    }

    // Setting chore undone
    async function setUndone(id) {
        await updateDone(id, false);
        getChore();
        getChildChores();
        setAll();
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
            <View style={styles.container}>
                <AppButton style={styles.refreshButton} onPress={() => setAll()}>↺</AppButton>
                <Heading style={styles.heading}>Chores List</Heading>
            </View>
            <AppButton onPress={() => props.navigation.navigate('PricesList')}>Prices</AppButton>
            <Container style={{width: '80%', height:'80%'}}>
                <AppText style={{textAlign:'center'}}>Green = done Red = notdone</AppText>
                <FlatList
                    data={everything}
                    keyExtractor={item => item.childchoreid}
                    renderItem={i => (
                        i.item.done == 0 ? ( 
                            <View>
                                <TouchableOpacity
                                    onPress={() => setDone(i.item.childchoreid)}>
                                    <View style={styles.choresContainer}>
                                        <AppText style={styles.chore}>{i.item.chore}</AppText>
                                        <AppText style={styles.notdone}>●</AppText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                            <TouchableOpacity
                                onPress={() => setUndone(i.item.childchoreid)}>
                                <View style={styles.choresContainer}>
                                    <AppText style={styles.chore}>{i.item.chore}</AppText>
                                    <AppText style={styles.done}>●</AppText>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )
                    )}
                    style={{width: '100%'}}></FlatList>
            </Container>
            <ChildBottomBar 
                money={user.childMoney} 
                text={user.childUsername} 
                navigation={props.navigation}
                setUser={() => props.user}/>
        </MainContainer>
    );
};
// Style
const styles = StyleSheet.create({
    refreshButton: {
        height: 40,
        width: 40,
        marginLeft: -60,
        marginRight: 50,
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
        flexDirection: 'row',
        height: 50,
        marginTop: 5,
    },

    choresContainer: {
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
});

export default ChildHomeScreen;
