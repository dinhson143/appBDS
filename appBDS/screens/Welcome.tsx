import React, {useState, useEffect} from 'react';

import {Formik} from 'formik';
import { StatusBar } from 'expo-status-bar';

import {AsyncStorage, View,StyleSheet,ImageBackground} from 'react-native';
import { 
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
    Colors
}   from './../components/style';
const {blue,brand,grey,dark, darkLight, primary,white, red,transparent} = Colors;

import Icon from 'react-native-vector-icons/MaterialIcons'
const Welcome =({navigation, route})=>{
    const user = route.params;

    const [userLogin,setUserLogin] = useState();
    const [userEmail,setUserEmail] = useState();

    const load = async() =>{
        try {
           let us =  await AsyncStorage.getItem("Name")          
           if(us !== null){       
                setUserLogin(JSON.parse(us));           
                setUserEmail(userLogin.UserInfor.Name);
                // console.log(userLogin);
           }
        } catch (error) {
            setUserEmail("");
            console.log("Get user Storage");
        }
    }

    useEffect(() => {
        load();
    },[userEmail])

    // const remove = async() =>{
    //     try {
    //         await AsyncStorage.removeItem("Name")  
    //         console.log("Remove user Storage");        
    //     } catch (error) {
    //         console.log("Remove user Storage Failed");
    //     }
    // }
    return (
        <>
            {/* <StatusBar style="dark"/> */}
            <View style={style.backgroundImageContainer}>
                <ImageBackground style={style.backgroundImage}
                        source={require('./../assets/images/welcome.jpg')}
                    >
                <View style={style.header}>               
                    <View style={style.headerBtn}>
                        <Icon name="arrow-back-ios" color={dark} size={20}
                            onPress={navigation.goBack}
                        />
                    </View>
                </View>
                </ImageBackground>
            </View>
            <InnerContainer>
                
                <WelcomeContainer>                  
                    {/* <PageTitle welcome={true}>Welcome! 8xland</PageTitle> */}
                    <SubTitle>{user.UserInfor.Name || 'The land that time forgot'}</SubTitle>  
                    <SubTitle>{user.Email || 'sonson@gmai.com'}</SubTitle>                    
                    <StyledFormArea>   
                        <Avatar resizeMode="cover" source={require('./../assets/images/logo.png')}/>     
                        <Line/>  
                        <StyledButton onPress={() => navigation.navigate('Home',user)}>
                            <ButtonText>View Lands</ButtonText>
                        </StyledButton>           
                        <StyledButton onPress={
                                () => {
                                    // remove();
                                    navigation.navigate('Login')
                                }
                            }>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>                
                    </StyledFormArea>
                </WelcomeContainer>
                   
            </InnerContainer>
        </>
    );
}
const style = StyleSheet.create({
    header:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:10,
    },
    backgroundImageContainer:{
        elevation:20,
        marginTop:20,
        height:350,
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
export default Welcome;