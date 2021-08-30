import 'react-native-gesture-handler';
import React, {useState} from 'react';

import RootStack from './navigation/RootStack';
import Home from './screens/Home';
import DetailBDS from './screens/DetailBDS';
import Schedule from './screens/Schedule';
import Datlich from './screens/Datlich';
//App Loading
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
    return (
      <RootStack/>
    );
}
