import React from "react";
import { View, TouchableNativeFeedback, Alert} from "react-native";
import ButtonStyle from '../componentes/buttonsStyle.jsx';
import {useNavigation} from '@react-navigation/native';


const LoginBtn = ({})  => {{
    const navigation = useNavigation();
    return (

        <TouchableNativeFeedback onPress={() => navigation.navigate('Login')} >
            <View>
                <ButtonStyle container='container'>
                    Login
                </ButtonStyle>
            </View>
        </TouchableNativeFeedback>
    );
}};

const LoginBtn2 = ({})  => {{
    return (

        <TouchableNativeFeedback onPress={() => Alert.alert('funk')} >
            <View>
                <ButtonStyle container='container'>
                    Login
                </ButtonStyle>
            </View>
        </TouchableNativeFeedback>
    );
}};


export {LoginBtn, LoginBtn2}