
import React from "react";
import { NavigationContainer, } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from 'react-native-elements/dist/header/Header';


import MainScreen from "../src/screens/MainScreen.jsx";
import LoginScreen from '../src/screens/loginScreen.jsx';
import RegistryScreen from "../src/screens/RegistryScreen.jsx";
import RecoverScreen from "../src/screens/RecoverScreen.jsx";
import HomeScreen from "../src/screens/HomeScreen.jsx";
import theme from "../src/theme.js";


const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    // headerShown:false
                }}>
                <Stack.Group
                    // screenOptions={{navigationOptions:{ headerLeft: null }, headerStyle: { backgroundColor: theme.colors.naranjaNet }, headerTitleStyle:{color:theme.colors.blanco}, headerTitleAlign: 'center'}} 
                    screenOptions={{ headerShown: false, headerShadowVisible: false }}
                >
                    <Stack.Screen
                        name='Main'
                        component={MainScreen}
                    /*options={{
                        title:'Reserva recursos',
                        color:'white',
                    }}*/
                    />
                    <Stack.Screen
                        name='Login'
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name='Registry'
                        component={RegistryScreen}
                    />
                    <Stack.Screen
                        name='Recover'
                        component={RecoverScreen}
                    />
                </Stack.Group>
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={({ route }) => ({
                        title: route.params.name,
                        headerStyle: {
                            backgroundColor:'#f2f2f2'
                        },
                        headerShadowVisible: false,
                    })}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default MainStack;
