import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import {COLORS} from '../colors';
import {init, loginCheck, addParent} from '../../database/db.js';

init()
.then(()=>{
    console.log('Database creation succeeded!');
}).catch((err)=>{
  console.log('Database IS NOT initialized! '+err);
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function checkLogin(){
    try{
      const dbResult = await loginCheck(username, password);
      if (dbResult === "Ok"){
        alert("Login ok!");
      }

      if (dbResult === "No ok"){
        alert("Login not ok!");
      }

      else {
        alert("Login no ac!");
      }
    }
    catch(err){
      console.log(err);
    }
    finally{
      //No need to do anything
    }
  };

  async function parent(){
    try{
      const dbResult = await addParent("test", "test");
      console.log("dbResult: "+dbResult);//For debugging purposes to see the data in the console screen
    }
    catch(err){
      console.log(err);
    }
    finally{
      //No need to do anything
    }
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.logo}>Chores</Text>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.text}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setUsername(text)}></TextInput>
        <Text style={styles.text}>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}></TextInput>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={styles.link}>Create an account</Text>
          <TouchableOpacity style={styles.button} onPress={()=>checkLogin()}>
            <Text style={{color: COLORS.white, fontSize: 20}}>Login</Text>
          </TouchableOpacity>
          <Button title="Save" onPress={()=>parent()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 7,
  },
  container: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    width: '70%',
  },
  heading: {
    fontSize: 28,
    marginBottom: 22,
  },
  input: {
    backgroundColor: COLORS.white,
    marginTop: 3,
    marginBottom: 12,
    width: '100%',
  },
  logo: {
    fontSize: 40,
    marginBottom: 24,
  },
  link: {
    color: 'red',
    flex: 2,
    fontSize: 18,
    marginLeft: 6,
  },
  text: {
    fontSize: 18,
    width: '100%',
  },
});

export default Login;
