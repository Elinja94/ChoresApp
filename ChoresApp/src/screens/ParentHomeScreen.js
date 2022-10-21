// Made by Sonja
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../colors';
import {UserContext} from '../../App.js';
import {getAllChildrenForParent, getChild, getAllChore, getAllChildChore,all} from '../../database/db';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Heading from '../components/Heading';
import MainContainer from '../components/MainContainer';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ParentHomeScreen = props => {
    const user = React.useContext(UserContext);
    const isFocused = useIsFocused();
    const [children, setChildren] = useState([]);
    const [chores, setChore] = useState([]);
    const [childChores, setChildChore] = useState([]);

    // Getting all the parent's children by Jenna
    async function getChildren() {
        try {
          const childIDs = await getAllChildrenForParent(user.parentID);
          const childrenList = [];
    
          for (id of childIDs) {
            const child = await getChild(id);
            childrenList.push(child);
          }
    
          setChildren(childrenList);
        } catch (err) {
          console.log(err);
        }
      }

      async function getChore() {
        try {
            const chore = await getAllChore();
            setChore(chore);
        }
        catch(err) {
            console.log(err);
        }
      }

      async function getChildChore() {
        try {
            const chore = await getAllChildChore();
            setChildChore(chore);
        }
        catch(err) {
            console.log(err);
        }
      }

      async function getAll() {
        try {
            const chore = await all();
        }
        catch(err) {
            console.log(err);
        }
      }

    useEffect(() => {
    if (isFocused) {
        getChildren();
        getChore();
        getChildChore();
        getAll();
        user;
    }
    }, [isFocused]);

    // The visual part
    return (
        <MainContainer>
            <View style={styles.container}>
                <Heading style={styles.heading}>Chores List</Heading>
                <AppButton style={styles.button} onPress={() => props.navigation.navigate("AddChore")}>
                    +
                </AppButton>
            </View>
            <Container style={{width: '80%'}}>
            <FlatList
                data={children}
                keyExtractor={item => item.childID}
                renderItem={i => (
                    <View>
                        <Heading style={styles.heading}>{i.item.childUsername}</Heading>
                        <FlatList
                            data={childChores}
                            keyExtractor={item => item.childchoreID}
                            renderItem={cc => ( 
                            <View>{
                                cc.item.child == i.item.childID ? (
                                    <FlatList
                                        data={chores}
                                        keyExtractor={item => item.choreID}
                                        renderItem={c => ( 
                                            c.item.choreID == cc.item.chore ? (
                                                cc.item.done == 0 ? (
                                                    <AppText style={styles.chore}>{c.item.choreInfo} <AppText style={{color: 'red', textAlign: 'right'}}>●</AppText></AppText>
                                                ) : (
                                                    <AppText style={styles.chore}>{c.item.choreInfo} <AppText style={{color: 'green', textAlign: 'right'}}>●</AppText></AppText>    
                                                )
                                            ) : (null)                                        
                                        )}></FlatList>
                                ):(null)}</View>
                        )}></FlatList>
                    </View>
                )}
                style={{width: '100%'}}></FlatList>
            </Container>
            <BottomBar money={user.parentMoney} text={user.parentUsername} navigation={props.navigation}/>
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
