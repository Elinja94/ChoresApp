// Sonja and Jenna
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import AccountSettings from './src/screens/AccountSettings';
import ChildForm from './src/screens/ChildForm';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ParentHomeScreen from './src/screens/ParentHomeScreen';
import AddMoney from './src/screens/AddMoney';
import AddChore from './src/screens/AddChore';

// These are needed for the navigation system
const Stack = createNativeStackNavigator();
export const UserContext = React.createContext();

const App = () => {
  // To set username, so information can be used when logged in
  const [user, setUser] = useState('Reed');
  // The navigation system, no header and login to be default screen
  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login">
            {props => <Login {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ParentHomeScreen" component={ParentHomeScreen} />
          <Stack.Screen name="AddChore" component={AddChore} />
          <Stack.Screen name="AddMoney" component={AddMoney} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="ChildForm" component={ChildForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
