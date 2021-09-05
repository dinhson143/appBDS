import React, {useState,useEffect} from 'react';
import {Alert,Dimensions,FlatList,Pressable,ImageBackground,SafeAreaView, ScrollView,ImageBackgroundSafeAreaView, StyleSheet,View,Text,Image } from 'react-native';
import { Colors }   from './../components/style';
const {blue,brand,grey,dark,light, darkLight, primary,white, red} = Colors;

import Icon from 'react-native-vector-icons/MaterialIcons'
import {URL} from './../global'
import axios from 'axios';

import BDS from './../constants/bds';
const {width} = Dimensions.get('screen'); 
const DetailBDS = ({navigation, route})=>{

    const obj = route.params;
    const user = obj[0];
    const bds = obj[1];
    const img = bds.Image;
    var newArr = img.map( (img) =>{
        let tam ={
            img: img
        }
        return tam;
    })


    function isEmptyObject(obj){
        return JSON.stringify(obj) === '{}';
    }
    function kiemtraLike(arr){
        for (let i = 0; i < arr.length; i++) {
            if(!isEmptyObject(arr[i])){
                return true;
            }
        }
        return false;
    }
    const [BDSmark, setdataBDSmark] = React.useState( [] );
    const [Loading, setLoad] = useState("");

    const newArr2 = [];
    for (let i = 0; i < BDSmark.length; i++) {
            if(strcmp(BDSmark[i].IDuser, user._id) === 0) {
                newArr2.push(BDSmark[i]);
            }
    }


    useEffect(() => {
        const getDataBDSmark = async () =>{
                const response = await axios(URL + "BDSmark");
                setdataBDSmark(response.data);  
                // console.log("a....");         
        }
        getDataBDSmark(); 
        if(BDSmark.length ==0){
            setLoad("");
        }
    },[Loading])

    function strcmp(a, b)
    {   
        return (a<b?-1:(a>b?1:0));  
    }
    // console.log(newArr);

    const InteriorImage = ({image}) =>{
        return (
            <Image source={{uri:image.item.img}} style={style.interiorImage} />           
        )
    };
    return (
        <SafeAreaView style={{flex: 1, backgroundColor:white}}>
            <ScrollView>
                 <View style={style.backgroundImageContainer}>
                    <ImageBackground style={style.backgroundImage}
                        source={{uri:bds.Image[0]}}
                    >
                        <View style={style.header}>

                            {/* back */}
                            <View style={style.headerBtn}>
                                <Icon name="arrow-back-ios" color={white} size={20}
                                    onPress={navigation.goBack}
                                />
                            </View>

                            {/* thêm vào list favorite */}
                            <Pressable onPress={()=>{
                                const kiemtra = newArr2.map((item)=>{
                                    return (item.IDbds==bds._id ? item : {});
                                })
                                // console.log(kiemtra)                           
                                if(kiemtraLike(kiemtra)==true){
                                    Alert.alert(
                                        "Note",
                                        "Đã có trong danh sách yêu thích của bạn !!!",
                                        [
                                            {
                                            text: "Cancel",
                                            onPress: () => {},
                                            style: "cancel"
                                            },
                                            { text: "OK", onPress: () => {} }
                                        ]
                                    );
                                }
                                else{
                                    const tam = {};
                                    tam["IDuser"]=user._id;
                                    tam["IDbds"]= bds._id;  
                                    console.log(tam);
                                    const url = URL+'BDSmark';
                                    axios
                                        .post(url,tam)
                                        .then((response) =>{
                                            const result = response.data;
                                            const {bds} = result;
                                            Alert.alert(
                                                "Successful",
                                                "Đã thêm vào trong danh sách yêu thích của bạn !!!",
                                                [
                                                    {
                                                    text: "Cancel",
                                                    onPress: () => {
                                                        navigation.navigate("Home",user)
                                                    },
                                                    style: "cancel"
                                                    },
                                                    { text: "OK", onPress: () => {
                                                        navigation.navigate("Home",user)
                                                    } }
                                                ]
                                            );
                                        })
                                        .catch(error =>{
                                            console.log(error); 
                                            Alert.alert(
                                                "Failed",
                                                "Lỗi khi thêm vào trong danh sách yêu thích của bạn !!!",
                                                [
                                                    {
                                                    text: "Cancel",
                                                    onPress: () => {},
                                                    style: "cancel"
                                                    },
                                                    { text: "OK", onPress: () => {} }
                                                ]
                                            );                                  
                                    });
                                }                               
                            }}>
                                <View style={style.headerBtn}>
                                    <Icon name="favorite" color={red} size={20}
                                    />
                                </View>
                            </Pressable>


                        </View>
                        
                    </ImageBackground>
                    <View style={style.virtualTag}>
                        <Text style={{color: 'white'}}>Image</Text>
                    </View>
                </View> 
                <View style={style.detailContainer}>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize:20,fontWeight: 'bold'}}>{bds.Name}</Text>
                        <View style={style.status}>
                            <Text style={{fontSize:15,fontWeight: 'bold',color: red}}>{bds.Status}</Text>
                        </View>
                    </View>

                    <Text style={{fontSize:16, color: grey}}>
                        {bds.Mota}
                    </Text>

                    <View style={{marginTop:20, flexDirection:'row'}}>
                        <View style={style.facility}>
                            <Icon name="location-on" size={18}/>
                            <Text style={style.facilityText}>{bds.Vitri}</Text>
                        </View>
                        <View style={style.facility}>
                            <Icon name="mood" size={18}/>
                            <Text style={style.facilityText}>Có thể {bds.Status}</Text>
                        </View>
                        <View style={style.facility}>
                            <Icon name="pages" size={18}/>
                            <Text style={style.facilityText}>{bds.Dientich} (hecta/m2)</Text>
                        </View>
                    </View>

                    <FlatList 
                        contentContainerStyle={{marginTop:20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={newArr}
                        renderItem={(item)=> <InteriorImage image={item}/>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={style.Footer}>
                        <View>
                            <Text style={{color:blue,fontWeight:"bold",fontSize:18}}>$ {bds.Gia}</Text>
                            <Text style={{color:grey,fontWeight:"bold",fontSize:12}}>Price</Text>
                        </View>
                         <Pressable onPress={()=>navigation.navigate("Datlich",obj)}>
                            <View style={style.datlichBtn}>
                                <Text style={{color:white}}>Hẹn Lịch</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>         
        </SafeAreaView>
    )
};
const style = StyleSheet.create({
    backgroundImageContainer:{
        elevation:20,
        marginHorizontal:20,
        marginTop:20,
        alignItems: 'center',
        height:350,
    },
    backgroundImage:{
        borderRadius:20,
        height:'100%',
        width:'100%',
        overflow: 'hidden',
    },
    header:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:10,
    },
    headerBtn:{
        height:50,
        width:50,
        backgroundColor:grey,
        borderRadius:5,
        justifyContent: 'center',
        alignItems:'center'
    },
    virtualTag:{
        top:-20,
        width:120,
        backgroundColor:dark,
        paddingHorizontal:20,
        height:40,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:'center',
    },
    detailContainer:{
        flex:1, 
        paddingHorizontal:20,
        marginTop:40,
    },
    status:{
        height:30,
        width:45,
        backgroundColor:blue,
        borderRadius:5,
        justifyContent: 'center',
        alignItems:'center',
    },
    facility:{
        flexDirection:'row',
        marginRight:15,
    },
    facilityText:{
        marginLeft:5,
        color:grey,
    }, 
    interiorImage:{
        width:width/3 -20,
        height:80,
        marginRight:10,
        borderRadius:10,
    },
    Footer:{
        height:70,
        backgroundColor:light,
        borderRadius:10,
        paddingHorizontal:20,
        marginVertical:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    datlichBtn:{
        height:50,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:dark,
        borderRadius:10,
        paddingHorizontal:20,
    }
});
export default DetailBDS;