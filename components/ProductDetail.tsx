import {
    Button,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity
} from "react-native";
import {Text, View} from "./Themed";
import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {useEffect, useState} from "react";
import {getOrderList, setOrderList, setProductList} from "../utils/storage";


interface Props{
    data?:any
    close?:any
    show?:any
    userInfo?:any
}
export default function ProductDetail(props:Props){
    const [data, setData] = useState([])
    const [showPost, setShowPost] = useState(false)
    const imgList=[
        require('../assets/images/product/1.png'),
        require('../assets/images/product/2.png'),
        require('../assets/images/product/3.png'),
        require('../assets/images/product/4.png'),
    ]
    useEffect(()=>{
        getData()
    },[])
    function getData(){
        getOrderList().then(res => {
            setData(res||[])
        })
    }

    function buy(){
        const obj={
            userId:props.userInfo.userId,
            productId:props.data.id,
            createTime:new Date(),
        }

        // @ts-ignore
        data.push(obj)
        // @ts-ignore
        setOrderList(data).then(()=>{
            // Toast.show('Post successful!')
            props.close()
            ToastAndroid.show('Buy success!',2000)
        })
    }

    return <Modal animated={true} animationType={"slide"} visible={props.show}>

        {props?.data&&<ScrollView style={styles.scrollView}>
            <View style={styles.container}>
            <TouchableOpacity style={styles.close} onPress={props.close}>
                <Text><FontAwesome size={30} style={{marginBottom: -3}} name={'arrow-left'}/></Text>
            </TouchableOpacity>
            <View style={{
                alignItems: 'center', backgroundColor: 'orange',
            }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Product detail</Text>
            </View>
            <Image style={styles.img} source={imgList[props.data.img || 0]}/>
           <View style={styles.textContainer}>
               <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.data.name}</Text>
               <Text style={{fontSize: 14,marginTop:50}}>{props.data.desc}</Text>
               <View style={styles.priceContainer}>
                  <Text>Price: <Text style={{fontSize: 20, fontWeight: 'bold',color:'red'}}>${props.data.price}</Text></Text>
                   <Button onPress={buy} title={'  Buy  '}/>
               </View>
           </View>
        </View>
        </ScrollView>}
    </Modal>

}


const styles = StyleSheet.create({
    scrollView:{
        flex:1,
    },
    container: {
        minHeight:Dimensions.get('window').height+16,
        padding: 16,
        flex: 1,
        backgroundColor: 'orange',
        position:'relative',
        alignItems:'center',
    },
    close: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10
    },
    img:{
        width:"80%",
        marginTop:40,
    },
    textContainer:{
        marginTop:40,
        flex:1,
        width:'80%',
        backgroundColor:'orange'
    },
    priceContainer:{
        position:'absolute',
        bottom:40,
        width:'100%',
        backgroundColor:'orange',
        justifyContent:"space-between",
        flexDirection:'row'
    }
})
