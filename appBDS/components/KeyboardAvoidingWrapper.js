import React from 'react';

import { 
    View,
    KeyboardAvoidingView, 
    TextInput, 
    StyleSheet, 
    Text, 
    Platform, 
    TouchableWithoutFeedback, 
    Button, 
    Keyboard,
    ScrollView 
} from 'react-native';
// nhấn vào một textinput, muốn có thể nhấn vào một nơi khác để tắt bàn phím một lần nữa
const KeyboardAvoidingWrapper =({children})=>{
    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView >
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;