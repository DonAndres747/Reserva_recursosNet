import React from "react";
import { View, TouchableWithoutFeedback} from "react-native";
import ButtonStyle from '../componentes/buttonsStyle.jsx';
import {useNavigation} from '@react-navigation/native';

export default function RegisterBtn() {
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


