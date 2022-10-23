// Sonja and Jenna
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {init} from './database/db.js';
import React, {useState} from 'react';
import AccountSettings from './src/screens/AccountSettings';
import AddChild from './src/screens/AddChild';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ParentHomeScreen from './src/screens/ParentHomeScreen';
import ChildHomeScreen from './src/screens/ChildHomeScreen';
import MoneyForm from './src/screens/MoneyForm';
import AddChore from './src/screens/AddChore';
import EditChild from './src/screens/EditChild';

// To create and check connection to database
init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

// These are needed for the navigation system
const Stack = createNativeStackNavigator();
export const UserContext = React.createContext();

const App = () => {
  // To set username, so information can be used when logged in
  const [user, setUser] = useState({});
  // The navigation system, no header and login to be default screen
  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login">
            {props => <Login {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ParentHomeScreen" component={ParentHomeScreen} />
          <Stack.Screen name="ChildHomeScreen" component={ChildHomeScreen} />
          <Stack.Screen name="AddChore" component={AddChore} />
          <Stack.Screen name="MoneyForm" component={MoneyForm} />
          <Stack.Screen name="AccountSettings">
            {props => <AccountSettings {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="AddChild" component={AddChild} />
          <Stack.Screen name="EditChild" component={EditChild} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
