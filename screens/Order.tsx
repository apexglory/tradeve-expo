import { StyleSheet,Image } from 'react-native';

import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getProductList, getOrderList, getUserInfo} from "../utils/storage";
import * as React from "react";
import {useFocusEffect} from "@react-navigation/native";

export default function Order({navigation}) {
  const [data, setData] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [productList, setProductList] = useState([])
  const imgList=[
    require('../assets/images/product/1.png'),
    require('../assets/images/product/2.png'),
    require('../assets/images/product/3.png'),
    require('../assets/images/product/4.png'),
  ]
  useEffect(() => {
    const focus = navigation.addListener('focus',()=>{
      getData()
    })
    return focus
  }, [navigation])
  function getData(){
    getUserInfo().then(res => {
      setUserInfo(res)
      getOrderList().then(res2 => {
        if (!res2){
          return
        }
        let arr:any=[]
        res2.forEach(e=>{
          if(e.userId===res.userId){
            arr.push(e)
          }
        })
        setData(arr)
      })
    })

    getProductList().then(res => {
      setProductList(res)
    })

  }
  return (
    <View style={styles.container}>
      {data.map((e,i)=>{
        const product=productList[e.productId]
      //  console.log('product',product)
        return (
            <View key={i} style={styles.orderCard}>
              <Image style={styles.productImage} resizeMode={"cover"} source={imgList[product.img||0]}/>
              <View style={{marginLeft:180,justifyContent:"space-around",}}>
                <Text>{product.name}</Text>
                <Text style={{fontWeight:'bold'}}>Bought</Text>
                <Text style={{fontWeight:'bold',color:'red'}}>${product.price}</Text>
              </View>
            </View>
          )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  orderCard:{
    borderWidth:1,
    borderColor:'#000',
    padding:16,
    flexDirection:'row',
    marginBottom:20,
  },
  productImage:{
      height:80,
      width:80
  }
});
