// Made by Sonja
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../colors';
import {UserContext} from '../../App.js';
import {getAllChildrenForParent, getChild} from '../../database/db';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BottomBar from '../components/BottomBar';
import Container from '../components/Container';
import Heading from '../components/Heading';
import MainContainer from '../components/MainContainer';

const ParentHomeScreen = props => {
    const user = React.useContext(UserContext);
    const isFocused = useIsFocused();
    const [children, setChildren] = useState([]);
    const [chores, setChore] = useState([]);
    const [childChores, setChildChore] = useState([]);

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


    useEffect(() => {
    if (isFocused) {
        getChildren();
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
