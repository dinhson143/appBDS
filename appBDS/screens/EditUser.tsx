import React, {useState} from 'react';

import {Formik} from 'formik';
import { StatusBar } from 'expo-status-bar';

//icons
import {Octicons , Ionicons, Fontisto} from '@expo/vector-icons';

import { 
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledTextInput,
    StyledInputLabel,
    LeftIcon,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
}   from './../components/style';

// Colors
const {blue,brand, darkLight, primary} = Colors;

import {View, ActivityIndicator} from 'react-native';

import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper'

// API
import axios from 'axios';
import {URL} from './../global';

const Signup =({navigation,route})=>{
    const user = route.params;
    // console.log(user);
    const [hidePassword , setHidePassword] =useState(true);
    const [message,setMessage] = useState();
    const [messageType,setMessageType] = useState(true);

    const handleSignup = (credentials,setSubmitting) =>{
        handleMessage(null);
        // console.log(credentials);
        const url1 = URL+'user/'+user._id;
        axios
            .put(url1,credentials)
            .then((response) =>{
                const result = response.data;
                const {success,message,accessToken} = result;
                if(success===false){
                    handleMessage(message,success);
                }
                else{

                        const url2 = URL+'userInfor/'+user.UserInfor._id;
                        axios
                            .put(url2,credentials)
                            .then((response) =>{
                                const result = response.data;
                                const {success,message,accessToken} = result;
                                if(success===false){
                                    handleMessage(message,success);
                                }
                                else{
                                    handleMessage("Save tài khoản thành công !!!. Vui lòng đăng nhập lại"); 
                                    setMessageType(true);
                                    setTimeout(function(){
                                        navigation.navigate("Login")
                                    }, 2000);        
                                }
                                setSubmitting(false);
                            })
                            .catch(error =>{
                            setSubmitting(false);
                            handleMessage("An error occurred. Check your network and try again");
                            setMessageType(false);
                        });        
                }
                setSubmitting(false);
            })
            .catch(error =>{
            setSubmitting(false);
            handleMessage("An error occurred. Check your network and try again");
            setMessageType(false);
        });
    };

    const handleMessage =(message,type = false) =>{
        setMessage(message);
        setMessageType(type);
    }


    // console.log(messageType);
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style="dark"/>
                <InnerContainer>
                    <PageTitle>Thông Tin Cá Nhân</PageTitle>
                    {/* <SubTitle>Signup</SubTitle> */}
                    <Formik 
                        initialValues ={{Name:user.UserInfor.Name,Address:user.UserInfor.Address,Email:user.Email,Phone:user.UserInfor.Phone,Password:'', Role:'customer'}}
                        onSubmit={(values, {setSubmitting})=>{
                            const validator = require('validator');
                            if(values.Email==''||values.Password==''||values.Name==''||values.Phone==''||values.Address=='')
                            {
                                handleMessage("Please fill all the fields");
                                setSubmitting(false);
                            }
                            else if(validator.isEmail(values.Email)==false){
                                handleMessage("Valid email address !!!");
                                setSubmitting(false);
                            }
                            else if(values.Phone.length!=10){
                                handleMessage("Phone number have 10 characters !!!");
                                setSubmitting(false);
                            }                          
                            else{
                                handleSignup(values,setSubmitting);
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values,isSubmitting}) => (<StyledFormArea>
                            <MyTextInput
                                label="Full Name"
                                icon="person"
                                placeholder="Dinh Son"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Name')}
                                onBlur={handleBlur('Name')}
                                value={values.Name}
                            />

                            <MyTextInput
                                label="Address"
                                icon="info"
                                placeholder="HCM"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Address')}
                                onBlur={handleBlur('Address')}
                                value={values.Address}
                            />
                        
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="dinhson14399@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Email')}
                                onBlur={handleBlur('Email')}
                                value={values.Email}
                                keyboardType ="email-address"
                            />

                            <MyTextInput
                                label="Phone"
                                icon="megaphone"
                                placeholder="+84 xxxxxxxx"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Phone')}
                                onBlur={handleBlur('Phone')}
                                value={values.Phone}
                                keyboardType ="numeric"
                            />
                        
                        
                            <MyTextInput
                                label="Password"
                                icon="lock"
                                placeholder="* * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Password')}
                                onBlur={handleBlur('Password')}
                                value={values.Password}
                                secureTextEntry ={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword = {setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>

                            {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                <ButtonText>Save</ButtonText>
                            </StyledButton>)}

                            {isSubmitting && (<StyledButton disabled={true}>
                                <ActivityIndicator size="large" color="primary" />
                            </StyledButton>)} 

                            <StyledButton onPress={()=>{
                                navigation.navigate("Welcome",user)
                            }}>
                                <ButtonText>Logout</ButtonText>
                            </StyledButton>                     

                            <Line/>                     
                        </StyledFormArea>) }
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput =({label, icon,isPassword, hidePassword,setHidePassword, ...props}) =>{
   return(
    <View>
        <LeftIcon>
            <Octicons name={icon} size={30} color={blue}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props}/>
        {isPassword && (
            <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
            </RightIcon>
        )}
    </View>
   ) ;
};

export default Signup;