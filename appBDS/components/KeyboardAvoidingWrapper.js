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