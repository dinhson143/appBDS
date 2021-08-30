import React, {useState, useEffect} from 'react';

import { StatusBar } from 'expo-status-bar';

import { Colors }   from './../components/style';
import Icon from 'react-native-vector-icons/MaterialIcons'
const {grey,blue,dark,light,brand, darkLight, primary,white,transparent,red} = Colors;

import {Dimensions,AsyncStorage, View,StyleSheet,ImageBackground,ScrollView,Text,FlatList,Pressable,Image} from 'react-native';
import {URL} from './../global';
import axios from 'axios';
import { 
    MsgBox
}   from './../components/style';
const {width} = Dimensions.get('screen'); 

const Favorite =({navigation,route})=>{
    const user = route.params;
    
    const [BDSmark, setdataBDSmark] = React.useState( [] );
    const [bdsfv, setdataBDSfv] = React.useState( [] );
    const [status, setStatus] = React.useState( [] );
    const [mes, setMessage] = React.useState( [] );
    const [Loading, setLoad] = useState("");



    const newArr = [];
    for (let i = 0; i < BDSmark.length; i++) {
            if(strcmp(BDSmark[i].IDuser, user._id) === 0) {
                newArr.push(BDSmark[i]);
            }
    }


    useEffect(() => {
        const getDataBDSmark = async () =>{
                const response = await axios(URL + "BDSmark");
                setdataBDSmark(response.data);  
                // console.log("a....");         
        }
        const getDataBDS = async () =>{
                const response = await axios(URL + "bds");
                setdataBDSfv(response.data);
                // console.log("b....");               
        }  
        getDataBDSmark();
        getDataBDS();  
        if(BDSmark.length ==0 || bdsfv.length == 0){
            setLoad("");
        }
    },[Loading])

    function strcmp(a, b)
    {   
        return (a<b?-1:(a>b?1:0));  
    }
    function getBDS(id) {
        for (let i = 0; i < bdsfv.length; i++) {
            if(strcmp(bdsfv[i]._id, id) === 0) {
                return bdsfv[i];
            }
        }
    }

    const Card =({mark,index})=>{
        const BDS= getBDS(mark.IDbds);
        // console.log(mark);
        return (
                <View style={style.card}>
                        <Image source={{uri:BDS.Image[0]}} style={style.cardImage} />
                        <View style={{flexDirection:"row",justifyContent:"space-between", marginTop:10}}>
                            <Text style={{fontSize:16,fontWeight: 'bold'}}>{BDS.Name}</Text>
                            <Text style={{fontSize:16,fontWeight: 'bold',color: blue}}>$ {BDS.Gia}</Text>
                        </View>
                        <Text style={{fontSize:14,color:grey, marginTop:5}}>{BDS.Name}</Text>
                        <View style={{marginTop:10, flexDirection:'row'}}>
                            <View style={style.facility}>
                                <Icon name="location-on" size={18}/>
                                <Text style={style.facilityText}>{BDS.Vitri}</Text>
                            </View>
                            <View style={style.facility}>
                                <Icon name="mood" size={18}/>
                                <Text style={style.facilityText}>{BDS.Status}</Text>
                            </View>
                            <View style={style.facility}>
                                <Icon name="pages" size={18}/>
                                <Text style={style.facilityText}>{BDS.Dientich} (hecta/m2)</Text>
                            </View>
                        </View> 
                        <Pressable onPress={()=>{
                            const huyLike = async () =>{
                                    axios.delete(URL + "BDSmark/"+ mark._id)
                                        .then(() => setMessage('Delete successful'))
                                        .catch(error => {
                                            setMessage(error.message);
                                            console.error('There was an error!', error + "---"+ URL + "BDSmark/"+ mark._id);
                                        });
                                    BDSmark.length =0;
                                    bdsfv.length = 0;                                 
                                    setLoad("a");
                                }
                                huyLike();
                            }}>
                                <View style={style.BocbtnCancel}>
                                    <Text  style={style.btnCancel}>Hủy</Text>
                                </View> 
                        </Pressable>                                         
                </View>
        )
    }
    
    if (bdsfv.length>0 && BDSmark.length>0) {
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
                    <Text style={style.title}>BDS ĐÃ THÍCH</Text>
                </View>
                <MsgBox type={true}>{mes}</MsgBox>
                <FlatList
                contentContainerStyle={{paddingLeft:10,paddingRight:10, paddingVertical:20}} 
                    showsHorizontalScrollIndicator={false}
                    data={newArr} 
                    renderItem={({item,index})=> <Card mark={item} index={index}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </>
        )
    }
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
                <Text style={style.title}>BDS ĐÃ THÍCH</Text>
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
        marginTop:5,
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
    },
    card:{
       height:250,
       backgroundColor:white, 
       elevation:10,
       width: width -40,
       marginLeft:10,
        padding:15,
        borderRadius:20,
        marginTop:20,
    },
    cardImage:{
        width:'100%',
        height:120,
        borderRadius:15,
    },
    facility:{
        flexDirection:'row',
        marginRight:15,
    },
    facilityText:{
        marginLeft:5,
        color:grey,
    }
});

export default Favorite;