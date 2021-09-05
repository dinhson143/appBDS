import React, {useState,useEffect} from 'react';

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

import {View , ActivityIndicator,AsyncStorage} from 'react-native';
import {URL} from './../global';
//KeyboardAvoidingView
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// API
import axios from 'axios';

const Login =({navigation})=>{
    const [hidePassword , setHidePassword] =useState(true);
    const [message,setMessage] = useState();
    const [messageType,setMessageType] = useState();
    const [userLogin,setUserLogin] = useState();
    

    const handleLogin = (credentials,setSubmitting) =>{
        handleMessage(null);
        // login
        const url = URL+'auth/login';
         console.log(credentials);
        axios
            .post(url,credentials)
            .then((response) =>{
                const result = response.data;
                const {success,message,accessToken} = result;
                if(success===false){
                    handleMessage(message,success);
                }
                else{
                    // get user
                    const url = URL + 'user/'+credentials.Email;
                    axios
                        .get(url,
                            {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            }
                        )
                        .then((response) =>{
                            const result = response.data;
                            setUserLogin(result[0]);
                            // save();
                            navigation.navigate('Welcome',{...result[0]});
                        })
                        .catch(error =>{
                        console.log(error);
                        setSubmitting(false);
                        handleMessage("An error occurred. Check your network and try again");
                    });                   
                }
                setSubmitting(false);
            })
            .catch(error =>{
            console.log(error);
            setSubmitting(false);
             handleMessage("An error occurred. Check your network and try again");
        });
    };

    const handleMessage =(message,type = false) =>{
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/images/logo.png')}/>
                    <PageTitle>8xland</PageTitle>
                    <SubTitle></SubTitle>

                    <Formik 
                        initialValues ={{Email:'',Password:''}}
                        onSubmit={(values, {setSubmitting})=>{
                            if(values.Email==''||values.Password=='')
                            {
                                handleMessage("Please fill all the fields");
                                setSubmitting(false);
                            }else{
                                handleLogin(values,setSubmitting);
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <StyledFormArea>
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
                                label="Password"
                                icon="lock"
                                placeholder="* * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Password')}
                                onBlur={handleBlur('Password')}
                                value={values.Password}
                                // ***
                                secureTextEntry ={hidePassword}
                                isPassword={true}
                                //  icon eye ẩn password
                                hidePassword={hidePassword}
                                // click
                                setHidePassword = {setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                            
                            {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>)}
                            
                            {isSubmitting && (<StyledButton disabled={true}>
                                <ActivityIndicator size="large" color="primary" />
                            </StyledButton>)}

                            <Line/>

                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={primary} size={25}/>   
                                <ButtonText google={true}>Sign in with Google</ButtonText>
                            </StyledButton>                      

                            <ExtraView>
                                <ExtraText>Don't have an account already ?</ExtraText>
                                <TextLink onPress={() => navigation.navigate('Signup')}>
                                    <TextLinkContent>Sign up</TextLinkContent>
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

        {/* fields còn lai */}
        <StyledTextInput {...props}/>
        
        {isPassword && (
            <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
            </RightIcon>
        )}
    </View>
   ) ;
};

export default Login;