import React from "react";
import { View, TouchableWithoutFeedback, Alert} from "react-native";
import ButtonStyle from '../componentes/buttonsStyle.jsx';
import {useNavigation} from '@react-navigation/native';

const RegisterBtn = () => {
    const navigation = useNavigation();
    return (

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Registry')}>
            <View>
                <ButtonStyle container='container'>
                    Register
                </ButtonStyle>
            </View>
        </TouchableWithoutFeedback>
    );
}
const RegisterBtn2 = () => {
    const navigation = useNavigation();
    return (

        <TouchableWithoutFeedback onPress={() => Alert.alert('registro pai')}>
            <View>
                <ButtonStyle container='container'>
                    Register
                </ButtonStyle>
            </View>
        </TouchableWithoutFeedback>
    );
}


export {RegisterBtn, RegisterBtn2}