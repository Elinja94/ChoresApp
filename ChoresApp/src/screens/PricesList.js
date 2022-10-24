// Made by Sonja
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Navigation from '../components/Navigation';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS} from '../colors';
import {UserContext} from '../../App.js';
import {getAllChore} from '../../database/db';
import AppText from '../components/AppText';
import Container from '../components/Container';
import MainContainer from '../components/MainContainer';

const ChildHomeScreen = props => {
    const user = React.useContext(UserContext);
    const isFocused = useIsFocused();
    const [price, setPrice] = useState([]);

    // Showing all prices
    async function showPrices(){
        const chores = await getAllChore();
        const chorePriceList = [];
        for (c of chores){
            let chore = c.choreInfo;
            let price = c.choreCost;
            let choreID = c.choreID
            chorePriceList.push({"choreID": choreID,"chore":chore,"price":price});
        }
        setPrice(chorePriceList);
    }

    useEffect(() => {
    if (isFocused) {
        showPrices();
        user;
    }
    }, [isFocused]);

    // The visual part
    return (
        <MainContainer>
            <Navigation title="Chore prices" navigation={props.navigation} />
            <Container style={{width: '80%', height: '85%'}}>
                <FlatList
                data={price}
                keyExtractor={item => item.choreID}
                renderItem={i => (
                    <View style={styles.container}>
                    <AppText style={styles.price}>{i.item.chore} {i.item.price}€</AppText>
                    </View>
                )}
                style={{width: '100%'}}></FlatList>
            </Container>
        </MainContainer>
    );
};
// Style
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        marginTop: 5,
    },

    price: {
        backgroundColor: COLORS.white,
        flex: 3,
        fontSize: 22,
        marginRight: 5,
        paddingLeft: 5,
        textAlignVertical: 'center',
      },
});

export default ChildHomeScreen;
