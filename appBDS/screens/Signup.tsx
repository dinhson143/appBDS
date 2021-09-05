import React, {useState} from 'react';

import {Formik} from 'formik';
import { StatusBar } from 'expo-status-bar';
import {URL} from './../global';
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


const Signup =({navigation})=>{
    const [hidePassword , setHidePassword] =useState(true);
    const [message,setMessage] = useState();
    const [messageType,setMessageType] = useState();

    const handleSignup = (credentials,setSubmitting) =>{
        handleMessage(null);
        console.log(credentials);
        const url = URL+'auth/register';
        console.log(url);
        axios
            .post(url,credentials)
            .then((response) =>{
                const result = response.data;
                const {success,message,accessToken} = result;
                if(success===false){
                    handleMessage(message,success);
                }
                else{
                       handleMessage("Tạo tài khoản thành công !!!",true);         
                }
                setSubmitting(false);
            })
            .catch(error =>{
            console.log(error);
            setSubmitting(false);
             handleMessage("An error occurred. Check your network and try again",false);
        });
    };

    const handleMessage =(message,type) =>{
        setMessage(message);
        setMessageType(type);
    }



    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <InnerContainer>
                    <PageTitle>8xland</PageTitle>
                    {/* <SubTitle>Signup</SubTitle> */}
                    <Formik 
                        initialValues ={{Name:'',Address:'',Email:'',Phone:'',Password:'', Role:'customer'}}
                        onSubmit={(values, {setSubmitting})=>{
                            const validator = require('validator');
                            if(values.Email==''||values.Password==''||values.Name==''||values.Phone==''||values.Address=='')
                            {
                                handleMessage("Please fill all the fields",false);
                                setSubmitting(false);
                            }
                            else if(validator.isEmail(values.Email)==false){
                                handleMessage("Valid email address !!!",false);
                                setSubmitting(false);
                            }
                            else if(values.Phone.length!=10){
                                handleMessage("Phone number have 10 characters !!!",false);
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
                                <ButtonText>Sign up</ButtonText>
                            </StyledButton>)}

                            {isSubmitting && (<StyledButton disabled={true}>
                                <ActivityIndicator size="large" color="primary" />
                            </StyledButton>)}                        

                            <Line/>                     

                            <ExtraView>
                                <ExtraText>Aalready have an account ?</ExtraText>
                                <TextLink onPress={() => navigation.navigate('Login')}>
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>
                            </ExtraView>
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