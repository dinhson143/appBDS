import React from 'react';


// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Home from './../screens/Home';
import DetailBDS from './../screens/DetailBDS';
import OnBoard from './../screens/OnBoard';
import Schedule from './../screens/Schedule';
import Favorite from './../screens/Favorite';
import Datlich from './../screens/Datlich';
import EditUser from './../screens/EditUser';

import { 
    Colors
}   from './../components/style';

const {tertiary, primary,blue,transparent,white,dark} = Colors;

const Stack = createNativeStackNavigator();
const RootStack = () =>{
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor: 'transparent',
                    },
                    headerShown: false,
                    headerTintColor:white,
                    headerTransparent:true,
                    headerTitle:'',
                    headerLeftContainerStyle:{
                        paddingLeft:20
                    }
                }}
                 initialRouteName="Login"
            >
                 <Stack.Screen name="Login" component={Login} />
                 <Stack.Screen name="Signup" component={Signup} />
                 <Stack.Screen name="Welcome" component={Welcome} />
                 
                 <Stack.Screen   name="Home" component={Home} />
                 <Stack.Screen name="OnBoard" component={OnBoard} />
                 <Stack.Screen name="DetailBDS" component={DetailBDS} />
                 <Stack.Screen name="Schedule" component={Schedule} />
                 <Stack.Screen name="Favorite" component={Favorite} />
                 <Stack.Screen name="Datlich" component={Datlich} />
                 <Stack.Screen name="EditUser" component={EditUser} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;