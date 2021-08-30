import React, {useState, useEffect} from 'react';

import { StatusBar } from 'expo-status-bar';

import { Colors }   from './../components/style';
import Icon from 'react-native-vector-icons/MaterialIcons'
const {grey,blue,dark,light,brand, darkLight, primary,white,transparent,red} = Colors;

import {AsyncStorage, View,StyleSheet,ImageBackground,ScrollView,Text,FlatList,Pressable} from 'react-native';
import {URL} from './../global';
import axios from 'axios';
import { 
    MsgBox
}   from './../components/style';

const Schedule =({navigation,route})=>{
    const user = route.params;
    
    const [lich, setdataLich] = React.useState( [] );
    const [bds, setdataBDS] = React.useState( [] );
    const [status, setStatus] = React.useState( [] );
    const [userLogin,setUserLogin] = useState();
    const [userEmail,setUserEmail] = useState();
    const [Loading, setLoad] = useState("");


    const newArr = [];
    for (let i = 0; i < lich.length; i++) {
            if(strcmp(lich[i].IDuser, user._id) === 0) {
                newArr.push(lich[i]);
            }
    }


    useEffect(() => {
        const getDataLich = async () =>{
            const response = await axios(URL + "Lich");
            setdataLich(response.data);
            //  console.log(response.data)
        }
         getDataLich();

         const getDataBDS = async () =>{
            const response = await axios(URL + "bds");
            setdataBDS(response.data);
            // console.log(response.data)
        }
         getDataBDS();
         if(lich.length ==0 || bds.length == 0){
            setLoad("");
        }
    },[Loading])

    function strcmp(a, b)
    {   
        return (a<b?-1:(a>b?1:0));  
    }
    function getnameBDS(id) {
        for (let i = 0; i < bds.length; i++) {
            if(strcmp(bds[i]._id, id) === 0) {
                return bds[i].Name;
            }
        }
    }

    const Card =({lich,index})=>{
        const nameBDS= getnameBDS(lich.IDbds);
        return (
            <View style={{flex:1, backgroundColor:index %2 ==0 ? blue : dark, borderRadius:10}}>
                <Text style={style.textlich}>Email : {lich.Email || "Email"}</Text>
                <Text style={style.textlich}>SDT   : {lich.Sdt || "SDT"}</Text>
                <Text style={style.textlich}>Note  : {lich.Message || "Message"}</Text>
                <Text style={style.textlich}>Date  : {lich.Date || "Date"}</Text>
                <Text style={style.textlich}>Du án : {nameBDS || "Tên BDS"}</Text>
                <Text style={style.textlich}>Status : {lich.Xacnhan==true ? "Xác nhận" :" Chưa Xác nhận"}</Text>
                <Pressable onPress={()=>{
                    if(lich.Xacnhan==false){
                        const cancelLich = async () =>{
                            axios.delete(URL + "Lich/"+ lich._id)
                                .then(() => setStatus('Delete successful'))
                                .catch(error => {
                                    setStatus(error.message);
                                    console.error('There was an error!', error);
                                });
                            lich.length =0;
                            bds.length = 0;                                 
                            setLoad("a");
                        }
                        cancelLich();
                    }
                }}>
                    <View style={style.BocbtnCancel}>
                        <Text  style={style.btnCancel}>{lich.Xacnhan==true ? "Done" : "Cancel"}</Text>
                    </View>
                </Pressable>
            </View>
        )
    }
     if (lich.length>0 && bds.length>0) {
         return(
            <>
                <View style={style.backgroundImageContainer}>
                    <View style={style.header}>               
                        <View style={style.headerBtn}>
                            <Icon name="arrow-back-ios" color={dark} size={20}
                                onPress={navigation.goBack}
                            />                     
                        </View>
                    </View>
                </View>
                <View style={style.BocbtnCancel}>
                    <Text style={style.title}>LỊCH HẸN CỦA BẠN</Text>
                </View>
                <MsgBox type={true}>{status}</MsgBox>
                <FlatList
                contentContainerStyle={{paddingLeft:10,paddingRight:10, paddingVertical:20}} 
                    showsHorizontalScrollIndicator={false}
                    data={newArr} 
                    renderItem={({item,index})=> <Card lich={item} index={index}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </>
        )}
    return (
        <>
            <View style={style.backgroundImageContainer}>
                <View style={style.header}>               
                    <View style={style.headerBtn}>
                        <Icon name="arrow-back-ios" color={dark} size={20}
                            onPress={navigation.goBack}
                        />                     
                    </View>
                </View>
            </View>
            <View style={style.BocbtnCancel}>
                <Text style={style.title}>LỊCH HẸN CỦA BẠN</Text>
            </View>
            <MsgBox type={true}>Loading...</MsgBox>
        </>
    );
}
const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: white,
        backgroundColor:blue,
    },
    textlich:{
        color:white,
        padding:10,
        fontSize:16,
    },
    title:{
        fontSize:20,
        color: dark,
        fontWeight:'bold',
    }
    ,
    BocbtnCancel:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnCancel:{
        width:100,
        borderRadius:10,
        backgroundColor:grey,
        color:red,
        padding:10,
        fontSize:20, 
        fontWeight:'bold',
        textAlign: 'center',       
    },
    header:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:10,
    },
    backgroundImageContainer:{
        elevation:20,
        marginTop:10,
        height:80,
    },
    backgroundImage:{
        borderRadius:10,
        height:'100%',
        width:'100%',
        overflow: 'hidden',
    },
    headerBtn:{
        height:50,
        width:50,
        backgroundColor:transparent,
        borderRadius:5,
        justifyContent: 'center',
        alignItems:'center'
    }
});

export default Schedule;