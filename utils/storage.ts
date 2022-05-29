import AsyncStorage from '@react-native-async-storage/async-storage'

interface Product{
    name:string
    desc:string
    price:number
    createTime:any
    img:number
    userId:any
}
interface OrderData{
    productId:number
    userId:number
    createTime:any
}

interface UserData{
    userId:number
    userName:string
    phoneNumber:string
    address:string
}

export async function getProductList(){
    const data = await AsyncStorage.getItem('productList')
    if (data){
        return JSON.parse(data)
    }else{
        return []
    }
}

export async function setProductList(data:Product){
     await  AsyncStorage.setItem('productList',JSON.stringify(data))
}


export async function getOrderList(){
    const data = await AsyncStorage.getItem('orderList')
    if (data){
        return JSON.parse(data)
    }else{
        return []
    }
}

export async function setOrderList(data:OrderData){
    await  AsyncStorage.setItem('orderList',JSON.stringify(data))
}


export async function getUserList(){
    const data = await AsyncStorage.getItem('userList')
    if (data){
        return JSON.parse(data)
    }else{
        return []
    }
}

export async function setUserList(data:UserData){
    await  AsyncStorage.setItem('userList',JSON.stringify(data))
}



export async function getUserInfo(){
    const data = await AsyncStorage.getItem('userInfo')
    if (data){
        return JSON.parse(data)
    }else{
        return null
    }
}

export async function setUserInfo(data:UserData){
    await  AsyncStorage.setItem('userInfo',JSON.stringify(data))
}

