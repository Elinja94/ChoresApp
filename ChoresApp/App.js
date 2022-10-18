import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import AccountSettings from './src/screens/AccountSettings';
import ChildForm from './src/screens/ChildForm';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();
export const UserContext = React.createContext();

const App = () => {
  const [user, setUser] = useState('Reed');

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login">
            {props => <Login {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="ChildForm" component={ChildForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
