import React from 'react';
import {Pressable, SafeAreaView, StyleSheet,View,Text,Image,StatusBar } from 'react-native';
import { Colors }   from './../components/style';
const {grey,dark,blue,brand, darkLight, primary,white, transparent} = Colors;

import Icon from 'react-native-vector-icons/MaterialIcons'
import BDS from './../constants/bds';

const OnBoard = ({navigation,route})=>{
    const user = route.params;
    console.log(user);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: white}}>
            <StatusBar  translucent backgroundColor={transparent}/>
            <Image 
                source={require('./../assets/images/onboardImage.jpg')}
                style={style.image} 
            />
            <View style={style.indicatorContainer} >
                <View style={[style.indicator,, style.indicatorActive]} />
                <View style={style.indicator} />
                <View style={style.indicator} />
            </View> 
            <View style={{paddingHorizontal:20, paddingTop:20}}>
                <View>
                    <Text style={style.title}>Find Your</Text>
                    <Text style={style.title}>Lands</Text>
                </View>
                 <View style={{marginTop:10}}>
                    <Text style={style.textStyle}>
                        Best Invest on left earth is as aproductsable !
                    </Text>
                 </View>
            </View>
            <View style={{flex:1,justifyContent: 'flex-end',paddingBottom:40}}>
                <Pressable onPress={()=>navigation.navigate('Home',user)}>
                    <View style={style.btn}>
                        <Text style={{color: white}}>Get Started</Text>
                    </View>
                </Pressable>      
            </View>
        </SafeAreaView>
    )
};
const style = StyleSheet.create({
    image:{
        height:420,
        width:'100%',
        borderBottomLeftRadius: 100,
    },
    indicatorContainer:{
        height:20,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    indicator:{
       height:3,
       width:30,
       backgroundColor: grey,
       borderRadius:5,
        marginHorizontal: 5
    },
    indicatorActive:{
        backgroundColor:dark,

    },
    title:{
        fontSize:32,
        fontWeight:'bold',

    },
    textStyle:{
       fontSize:16,
        color:grey,
    },
    btn:{
        height:60,
        marginHorizontal:20, 
        backgroundColor:dark,
        borderRadius:15,
        justifyContent: 'center',
        alignItems:'center',

    }
});
export default OnBoard;