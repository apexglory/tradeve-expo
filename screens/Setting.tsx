import {Button, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Login from "../components/Login";
import * as React from "react";
import {useState} from "react";
import {setUserInfo} from "../utils/storage";

export default function Setting() {
  const [showLogin,setShowLogin]=useState(false)
  function logout(){
    setUserInfo(null)
    setShowLogin(true)
  }
  return (
    <View style={styles.container}>
      <Login show={showLogin} close={()=>{
        setShowLogin(false)
      }}/>
    <Button onPress={logout} title={'Logout'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'orange'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
