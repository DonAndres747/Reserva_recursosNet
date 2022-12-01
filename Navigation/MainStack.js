
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../src/screens/MainScreen.jsx";
import LoginScreen from '../src/screens/loginScreen.jsx';
import RegistryScreen from "../src/screens/RegistryScreen.jsx";
import RecoverScreen from "../src/screens/RecoverScreen.jsx";
import HomeScreen from "../src/screens/Home.jsx";
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
                    screenOptions={{ headerShown:false }}
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
                    />    
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default MainStack;
