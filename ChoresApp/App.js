// Sonja and Jenna
import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ChildForm from './src/screens/ChildForm';

// The navigation was created by Sonja but Jenna also added more screens
const { Navigator, Screen} = createNativeStackNavigator();

const App=()=>{
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="ChildForm" component={ChildForm} />
      </Navigator>
    </NavigationContainer>
  );
}



export default App;
