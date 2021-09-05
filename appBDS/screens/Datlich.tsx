import React, {useState,useEffect} from 'react';

import {Formik} from 'formik';
import { StatusBar } from 'expo-status-bar';

//icons
import {Octicons , Ionicons, Fontisto} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons'
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
const {blue,brand, darkLight, primary,transparent,white,grey} = Colors;
//Date time 
import DateTimePicker from '@react-native-community/datetimepicker';

import {View, ActivityIndicator,StyleSheet, TouchableOpacity} from 'react-native';

import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper'

// API
import axios from 'axios';
import {URL} from './../global';


const Datlich =({navigation,route})=>{
    const obj = route.params;
    const user = obj[0];
    const bds = obj[1];

    const [hidePassword , setHidePassword] =useState(true);
    const [message,setMessage] = useState();
    const [messageType,setMessageType] = useState();

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()+ ( 3600 * 1000 * 24*2)));
    const [dob, setDob] = useState('')

    const [lich, setdataLich] = React.useState( [] );
    const [Loading, setLoad] = useState("");

    function strcmp(a, b)
    {   
        return (a<b?-1:(a>b?1:0));  
    }
    function isEmptyObject(obj){
        return JSON.stringify(obj) === '{}';
    }
    function kiemtraLich(arr){
        for (let i = 0; i < arr.length; i++) {
            if(!isEmptyObject(arr[i])){
                return true;
            }
        }
        return false;
    }

    function kiemtraNgay(day){
        for (let i = 0; i < newArr.length; i++) {
            const dateCmp =new Date(newArr[i].Date);
            if((dateCmp.getDay()==day.getDay()) && (dateCmp.getMonth()==day.getMonth()) && (dateCmp.getFullYear()==day.getFullYear())){
                return true;
            }
        }
        return false;
    }
    // load Lich
    useEffect(() => {
        const getDataLich = async () =>{
            const response = await axios(URL + "Lich");
            setdataLich(response.data);
            // console.log("Update");
        }
         getDataLich();
         if(lich.length ==0){
            setLoad("");
        }
    },[Loading])
    const newArr = [];
    for (let i = 0; i < lich.length; i++) {
            if(strcmp(lich[i].IDuser, user._id) === 0  && lich[i].Xacnhan===false) {
                newArr.push(lich[i]);
            }
    }


    const onChange  = (event, selectedDate) =>{
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(selectedDate);
    }
    const showDatePicker = () =>{
        setShow(true);
    }
    const handleSignup = (credentials,setSubmitting) =>{
        handleMessage(null);
        // console.log(newArr);
        const kiemtra = newArr.map((item)=>{
            return (item.IDbds==bds._id ? item : {});
        })

        // console.log(credentials);

        if(kiemtraLich(kiemtra)==true){
            setSubmitting(false);
            setMessageType(false);
             handleMessage("Đã có lịch cho bất động sản này");
             return;
        }
        if(kiemtraNgay(dob)==true){
            setSubmitting(false);
            setMessageType(false);
             handleMessage("Bạn đã có lịch hẹn vào ngày đã chọn");
             return;
        }
        else{
            credentials["Date"] = dob;
            // console.log(credentials);
            const url = URL+'Lich';
            axios
                .post(url,credentials)
                .then((response) =>{
                    const result = response.data;
                    const {success,message,accessToken} = result;
                    if(success===false){
                        handleMessage(message,success);
                    }
                    else{
                        setLoad("update");  
                        handleMessage("Đặt lịch thành công !!!"); 
                        setMessageType(true);   
                    }
                    setSubmitting(false);
                })
                .catch(error =>{
                // console.log(error);
                setSubmitting(false);
                setMessageType(false);
                handleMessage("An error occurred. Check your network and try again");
            });
        }        
    };

    const handleMessage =(message,type = false) =>{
        setMessage(message);
        setMessageType(type);
    }


    // console.log(dob);
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            {/* <StatusBar style="dark"/> */}
            <View style={style.backgroundImageContainer}>
                <View style={style.header}>               
                    <View style={style.headerBtn}>
                        <Icon name="arrow-back-ios" color={white} size={20}
                            onPress={navigation.goBack}
                        />
                    </View>
                </View>
            </View>
                <InnerContainer>
                    <PageTitle>8xland</PageTitle>
                    {/* <SubTitle>Signup</SubTitle> */}
                   
                    <Formik 
                        initialValues ={{IDuser:user._id,IDbds:bds._id,Name:user.UserInfor.Name,Message:'',Email:user.Email,Sdt:user.UserInfor.Phone, Xacnhan:false}}
                        onSubmit={(values, {setSubmitting})=>{
                            const validator = require('validator');
                            if(values.Email==''||values.Message=='' ||values.Name==''||values.Sdt==''||dob=='')
                            {
                                handleMessage("Please fill all the fields");
                                setSubmitting(false);
                            }
                            else if(validator.isEmail(values.Email)==false){
                                handleMessage("Valid email address !!!");
                                setSubmitting(false);
                            }
                            else if(values.Sdt.length!=10){
                                handleMessage("Phone number have 10 characters !!!");
                                setSubmitting(false);
                            }
                            else if(dob.getTime() < new Date(Date.now()+ ( 3600 * 1000 * 24*1)).getTime()){
                                handleMessage("Date phải lớn hơn ngày hiện tại 2 ngày !!!");
                                setSubmitting(false);
                            }                           
                            else{
                                handleSignup(values,setSubmitting);
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values,isSubmitting}) => (<StyledFormArea>
                            <MyTextInput
                                label="Name"
                                icon="person"
                                placeholder="Dinh Son"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Name')}
                                onBlur={handleBlur('Name')}
                                value={values.Name}
                            />

                            <MyTextInput
                                label="Note"
                                icon="info"
                                placeholder="..."
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Message')}
                                onBlur={handleBlur('Message')}
                                value={values.Message}
                            />
                        
                            <MyTextInput
                                label="Email"
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
                                onChangeText={handleChange('Sdt')}
                                onBlur={handleBlur('Sdt')}
                                value={values.Sdt}
                                keyboardType ="numeric"
                            />
                        
                        
                            {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                />
                            )}
                            <MyTextInput
                                label="Date schedule"
                                icon="calendar"
                                placeholder="YYYY -- MM -DD"
                                placeholderTextColor={darkLight}
                                value={dob ? dob.toDateString() : ''}
                                // value={values.Date}                          
                                isDate = {true}
                                editable = {false}
                                showDatePicker= {showDatePicker}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>

                            {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                <ButtonText>Đặt lịch hẹn</ButtonText>
                            </StyledButton>)}

                            {isSubmitting && (<StyledButton disabled={true}>
                                <ActivityIndicator size="large" color="primary" />
                            </StyledButton>)}                        

                            <Line/>                     
                        </StyledFormArea>) }
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput =({label, icon,isPassword, hidePassword,setHidePassword,isDate,showDatePicker, ...props}) =>{
   return(
    <View>
        <LeftIcon>
            <Octicons name={icon} size={30} color={blue}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>

        {!isDate && <StyledTextInput {...props}/>}
        {isDate && <TouchableOpacity onPress={showDatePicker}>
        
        <StyledTextInput {...props}/>
        </TouchableOpacity>}
        {isPassword && (
            <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
            </RightIcon>
        )}
    </View>
   ) ;
};
const style = StyleSheet.create({
    header:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:10,
    },
    backgroundImageContainer:{
        elevation:20,
        height:50,
    },
    backgroundImage:{
        borderRadius:10,
        height:'100%',
        width:'100%',
        overflow: 'hidden',
    },
    headerBtn:{
        height:40,
        width:40,
         backgroundColor:grey,
        borderRadius:5,
        justifyContent: 'center',
        alignItems:'center'
    }
});

export default Datlich;