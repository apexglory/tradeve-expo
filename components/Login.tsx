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
import {useState} from "react";
import {getUserInfo, getUserList, setUserInfo, setUserList} from "../utils/storage";


interface Props{
    data?:any
    close?:any
    show?:any
}
export default function Login(props:Props){
    const [data, setData] = useState([])
    const [showPost, setShowPost] = useState(false)
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    function getData(){
        getUserList().then(res => {
            setData(res)
        })
    }

    function login(){
        if (!name||!password){
            ToastAndroid.show('Please enter user name and password!',2000)
            return
        }
        if (password!='123456'){
            ToastAndroid.show('Username or Password error!',2000)
            return
        }
        let obj:any={}
        data.forEach(e=>{
            if (e.name===name){
                setUserInfo(e)
                props.close()
                return
            }
        })

        obj={
            userId:data.length,
            userName:name,
            phoneNumber:'',
            address:''
        }
        // @ts-ignore
        data.push(obj)
        // @ts-ignore
        setUserList(data).then(()=>{
            // Toast.show('Post successful!')
            setUserInfo(obj)
            props.close()
            ToastAndroid.show('Login Success!',2000)
        })
    }

    return <Modal animated={true} animationType={"slide"} visible={props.show}>

            <View style={styles.container}>
            <View style={{
               backgroundColor: 'orange',marginTop:48
            }}>
                <Text style={{fontSize: 48, fontWeight: 'bold',textAlign:'center'}}>Welcome to IdleTrader</Text>
            </View>
                <View style={styles.inputLabel}>
                    <Text>User Name:</Text><TextInput
                    placeholder={'User name / Email'}
                    value={name}
                    onChangeText={text => {
                        setName(text)
                    }} style={styles.input}/>
                </View>
                <View style={[styles.inputLabel,{marginBottom:40}]}>
                    <Text>Password:</Text><TextInput
                    placeholder={'Use 123456'}
                    value={password}
                    onChangeText={text => {
                        setPassword(text)
                    }} style={styles.input}/>
                </View>
            {/*<Image style={styles.img} source={imgList[props.data.img || 0]}/>*/}
                <Button onPress={login} title={'  Click to Login  '}/>
        </View>

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
    },
    inputLabel: {
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
})
