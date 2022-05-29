import {StyleSheet, Image, TextInput, Button, KeyboardAvoidingView, ScrollView, ToastAndroid} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {useEffect, useState} from "react";
import {getUserInfo, getUserList, setOrderList, setUserInfo, setUserList} from "../utils/storage";
import {Toast} from "antd-mobile";

export default function User() {
  const [data,setData] = useState('')
  const [userInfos,setUserInfos]=useState('')
  const [name,setName]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [address,setAddress]=useState('')

  useEffect(()=>{
    getUserInfo().then(u=>{
      setUserInfos(u)
      setName(u.userName)
      setPhoneNumber(u.phone)
      setAddress(u.address)
    })
  },[])

  function save(){
    let obj = JSON.parse(JSON.stringify(userInfos))
    obj.phoneNumber=phoneNumber
    obj.address=address
    setUserInfo(obj).then(()=>{
      ToastAndroid.show('Save success!',2000)
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <ScrollView style={{flex:1,width:'100%'}}>
      <View style={styles.container} >
        <Image style={styles.avatar} source={require('../assets/images/avatar.png')}/>
        <Text style={{fontSize:40,fontWeight:'bold'}}>Your Account</Text>
        <View style={[styles.inputLabel]}>
          <Text>User Name:</Text>
          <Text style={{fontSize:24,fontWeight:'bold'}}>{name}</Text>
        </View>
        <View style={styles.inputLabel}>
          <Text>Phone Number:</Text><TextInput
            placeholder={'Phone Number'}
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text)
            }} style={styles.input}/>
        </View>
        <View style={[styles.inputLabel,{marginBottom:20}]}>
          <Text>Address:</Text><TextInput
            placeholder={'Address'}
            value={address}
            onChangeText={text => {
              setAddress(text)
            }} style={styles.input}/>
        </View>
        <Button onPress={save} title={'Save'}/>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'orange',
    alignItems:'center',
    paddingHorizontal:30
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
  avatar:{
    marginTop:40,
    marginBottom:40,
    width:160,
    height:160,
    borderRadius:160,
  },
  inputLabel: {
    width:'100%',
    marginTop: 20,
    backgroundColor: 'orange'
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
    height: 40,
    marginTop: 5,
    padding: 8,
    backgroundColor:'#fff'
  },
});
