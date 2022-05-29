import {
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
    ScrollView,
    Dimensions,
    Image,
    ToastAndroid, TouchableWithoutFeedback
} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useEffect, useState} from "react";
import {getProductList, getUserInfo, setProductList} from "../utils/storage";
import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {Toast} from "antd-mobile";
import ProductDetail from "../components/ProductDetail";
import Login from "../components/Login";
export default function Explore() {
    const [data, setData] = useState([])
    const [userInfo, setUserInfo] = useState()
    const [showPost, setShowPost] = useState(false)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [img,setImg]=useState(1)
    const [detailData,setDetailData]=useState()
    const [showProductDetail,setShowProductDetail]=useState(false)
    const [showLogin,setShowLogin]=useState(false)

    const imgList=[
        require('../assets/images/product/1.png'),
        require('../assets/images/product/2.png'),
        require('../assets/images/product/3.png'),
        require('../assets/images/product/4.png'),
    ]
    useEffect(() => {
        getUserInfo().then(e=>{
            if (!e){
                setShowLogin(true)
            }else{
                setUserInfo(e)
            }
        })
     getData()
    }, [])
    function getData(){
        getProductList().then(res => {
            setData(res)
        })
    }
    function postNew() {
        setShowPost(true)
        setImg(Math.round(Math.random()*4))
    }

    function confirmPost(){
        if (!name||!desc||!price){
            ToastAndroid.show('You have to fill all Blank!',2000)
            return
        }
        const obj={
            name:name,
            desc:desc,
            price:price,
            createTime:new Date(),
            img:img,
            userId:userInfo?.userId,
        }

        // @ts-ignore
        data.push(obj)
        // @ts-ignore
        setProductList(data).then(()=>{
            // Toast.show('Post successful!')
            setShowPost(false)
            getData()
            ToastAndroid.show('Post success!',2000)
            setName('')
            setPrice('')
            setDesc('')
        })
    }

    function showDetail(e:any,i:number){
        e.id=i
        setDetailData(e)
        setShowProductDetail(true)
    }
    return (
        <View style={styles.container}>
            <ProductDetail userInfo={userInfo} show={showProductDetail} data={detailData} close={()=>{
                setShowProductDetail(false)
            }}/>
            <Login show={showLogin} close={()=>{
                setShowLogin(false)
            }}/>
            <Modal animated={true} animationType={"slide"} visible={showPost}>
                <ScrollView style={styles.postModal}>
                    <TouchableOpacity style={styles.close} onPress={() => {
                        setShowPost(false)
                    }}>
                        <Text><FontAwesome size={30} style={{marginBottom: -3}}  name={'close'}/></Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20}}>Post New</Text>
                    <View style={styles.modalForm}>
                        <View style={styles.inputLabel}>
                            <Text>Image:</Text>
                            <Image style={styles.postImg} source={imgList[img]}/>
                        </View>

                        <View style={styles.inputLabel}>
                            <Text>Product Name:</Text><TextInput
                            value={name}
                            onChangeText={text => {
                                setName(text)
                            }} style={styles.input}/>
                        </View>
                        <View style={styles.inputLabel}>
                            <Text>Description:</Text><TextInput   onChangeText={text => {
                            setDesc(text)
                        }}  value={desc} textAlignVertical={"top"} multiline={true}
                                                                style={[styles.input, styles.desc]}/>
                        </View>
                        <View style={styles.inputLabel}>
                            <Text>Price:</Text><TextInput   onChangeText={text => {
                            setPrice(text)
                        }}  value={price} keyboardType={"numeric"}
                                                          style={[styles.input, styles.price]}/>
                        </View>
                    </View>
                   <View style={styles.confirmBtn}><Button title={'Confirm'} onPress={confirmPost}/></View>
                </ScrollView>
            </Modal>
            <TouchableOpacity style={styles.post} onPress={postNew}>
                <Text><FontAwesome size={30} style={{marginBottom: -3}} color={'#333'} name={'plus'}/></Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.productList}>
                    {data.map((e,i)=>{
                        return (<TouchableWithoutFeedback key={i} onPress={()=>{
                            showDetail(e,i)
                        }}>
                            <View key={i} style={styles.productCard}>
                                <Image style={styles.productImage} resizeMode={"cover"} source={imgList[e.img||0]}/>
                                <View style={styles.productCardContent}>
                                    <View style={styles.productCardTitle}>
                                        <Text style={styles.productTitle}>{e.name}</Text>
                                        <Text style={styles.productPrice}>${e.price}</Text>
                                    </View>
                                    <Text ellipsizeMode={'tail'} numberOfLines={2} style={styles.productDesc}>{e.desc}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>)
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:8,
        backgroundColor:'orange',
        paddingTop:20
    },
    postModal: {
        padding: 16,
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalForm: {
        flex:1,
    },
    close: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10
    },
    post: {
        position: "absolute",
        right: 40,
        bottom: 40,
        backgroundColor: '#eee',
        width: 60,
        height: 60,
        borderRadius: 60,
        borderWidth:8,
        borderColor:'#666',
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        height: 40,
        marginTop: 5,
        padding: 8
    },
    inputLabel: {
        marginTop: 20
    },
    desc: {
        height: 80
    },
    price: {
        width: 120
    },
    confirmBtn:{
        marginVertical:50,
        width:"100%",
    },
    productList:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'orange'
    },
    productCard:{
        width:Dimensions.get("window").width/2 - 24,
        marginHorizontal:8,
        height:300,
        borderWidth:1,
        borderColor:'#000',
        marginBottom:24,
        justifyContent:'flex-start',
        paddingTop:0
    },
    productImage:{
        width:'100%',
        height:'70%'
    },
    productCardContent:{
        padding:8,
    },
    productTitle:{
        fontWeight:"bold",
        fontSize:18
    },
    productDesc:{
        marginTop:10,
    },
    productPrice:{
        marginTop:4,
        color:'red'
    },
    productCardTitle:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    postImg:{
        width:'100%',
    }
});
