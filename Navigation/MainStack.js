
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native';

import MainScreen from "../src/screens/MainScreen.jsx";
import LoginScreen from '../src/screens/loginScreen.jsx';
import RegistryScreen from "../src/screens/RegistryScreen.jsx";
import RecoverScreen from "../src/screens/RecoverScreen.jsx";
import HomeScreen from "../src/screens/HomeScreen.jsx";
import BookingScreen from "../src/screens/BookingScreen.jsx";

const EmptyComponent = () => <View style={{ width: 0, height: 0 }} />;

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
                    screenOptions={{ headerShown: false }}
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
                        title: (
                            route.params.name.charAt(0).toUpperCase() + route.params.name.slice(1).toLowerCase() + " " +
                            route.params.lastName.charAt(0).toUpperCase() + route.params.lastName.slice(1).toLowerCase()
                        ),
                        headerStyle: {
                            backgroundColor: '#f2f2f2'
                        },
                        headerShadowVisible: false,
                        headerLeft: () => <EmptyComponent />,
                        // headerRight: () => <Text>asdasd</Text>
                    })}
                />
                <Stack.Screen
                    name='Booking'
                    component={BookingScreen}
                    options={({ route }) => ({
                        title: (
                            route.params.name.charAt(0).toUpperCase() + route.params.name.slice(1).toLowerCase() + " " +
                            route.params.lastName.charAt(0).toUpperCase() + route.params.lastName.slice(1).toLowerCase()
                        ),
                        headerStyle: {
                            backgroundColor: '#f2f2f2'
                        },
                        headerShadowVisible: false,
                        // headerLeft: () => <EmptyComponent />
                    })}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default MainStack;
