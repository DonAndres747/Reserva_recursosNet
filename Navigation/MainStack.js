
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../src/screens/MainScreen.jsx";
import LoginScreen from "../src/screens/LoginScreen.jsx";
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
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default MainStack;
