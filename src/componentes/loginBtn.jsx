import React from "react";
import { View, Alert, TouchableWithoutFeedback } from "react-native";
import ButtonStyle from '../componentes/buttonsStyle.jsx';
import { useNavigation } from '@react-navigation/native';


const LoginBtn = ({ }) => {
    {
        const navigation = useNavigation();
        return (

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')} >
                <View >
                    <ButtonStyle container='container'>
                        Login
                    </ButtonStyle>
                </View>
            </TouchableWithoutFeedback>
        );
    }
};

const LoginBtn2 = ({ }) => {
    {
        return (

            <TouchableWithoutFeedback onPress={() => Alert.alert('funk')}>
                <View>
                    <ButtonStyle container='container'>
                        Login
                    </ButtonStyle>
                </View>
            </TouchableWithoutFeedback>
        );
    }
};


export { LoginBtn, LoginBtn2 }