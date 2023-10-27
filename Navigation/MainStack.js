import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


//pantallas
import MainScreen from "../src/screens/MainScreen.jsx";
import LoginScreen from '../src/screens/LoginScreen.jsx';
import RegistryScreen from "../src/screens/RegistryScreen.jsx";
import RecoverScreen from "../src/screens/RecoverScreen.jsx";
import HomeScreen from "../src/screens/HomeScreen.jsx";
import BookingScreen from "../src/screens/BookingScreen.jsx";
import ComponentsScreen from "../src/screens/ComponentsScreen.jsx";
import AvailabilityScreen from "../src/screens/AvailabilityScreen.jsx";
import ResourceListScreen from "../src/screens/ResourceListScreen.jsx";


const EmptyComponent = () => <View style={{ width: 0, height: 0 }} />;
const Stack = createNativeStackNavigator()
AsyncStorage.clear()

export default function HomeSegments() {
    const [userData, setUserData] = useState();
    const navigationContainerRef = useNavigationContainerRef();
    navigationContainerRef.addListener()


    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchDataFromAsyncStorage = async () => {
        try {
            const data = await AsyncStorage.getItem("result");
            if (data) {
                setUserData(JSON.parse(data))
                setIsDataLoaded(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchDataFromAsyncStorage();
    }, []);

    function formatName(firstName, lastName) {
        const firstNameParts = firstName.split(' ');
        const lastNameParts = lastName.split(' ');
        const formatedfirstName = firstNameParts[0].charAt(0).toUpperCase() + firstNameParts[0].slice(1).toLowerCase();
        const formattedLastName = lastNameParts[0].charAt(0).toUpperCase() + lastNameParts[0].slice(1).toLowerCase();
        return `${formatedfirstName} ${formattedLastName}`
    }

    return (
        <NavigationContainer ref={navigationContainerRef}>

            <Stack.Navigator
                screenListeners={{
                    state: async (e) => {
                        // console.log(typeof (e.data.state.routes[1]) == "undefined" ? "main" : e.data.state.routes[1].name);
                        // setCurrent(typeof (e.data.state.routes[1]) == "undefined" ? "main" : e.data.state.routes[1].name);

                        fetchDataFromAsyncStorage();
                    }
                }}
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
                <Stack.Group
                    screenOptions={() => ({
                        title: (
                            isDataLoaded ? `${formatName(userData.first_name, userData.last_name)}`
                                : "Cargando..."
                        ),
                        headerStyle: {
                            backgroundColor: '#f2f2f2'
                        },
                        headerShadowVisible: false,
                        headerLeft: () => Platform.OS === 'android' ? <EmptyComponent /> : null,
                        headerBackTitle: '',
                        headerTintColor: "black",

                    })}
                >
                    <Stack.Screen
                        name='Home'
                        component={HomeScreen}
                    />
                    <Stack.Screen
                        name='Booking'
                        component={BookingScreen}
                    />
                    <Stack.Screen
                        name='Components'
                        component={ComponentsScreen}
                    />
                    <Stack.Screen
                        name='Disponibilidad'
                        component={AvailabilityScreen}
                    />
                    <Stack.Screen
                        name='ResourceList'
                        component={ResourceListScreen}
                    // options={({ route }) => (

                    // )}
                    />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

