import React from "react";
import { View, Text, TouchableNativeFeedback, Alert} from "react-native";
import ButtonStyle from '../componentes/buttonsStyle.jsx';

export default function RegisterBtn() {
    return (

        <TouchableNativeFeedback onPress={() => Alert.alert('funk')} >
            <View>
                <ButtonStyle container='container'>
                    Register
                </ButtonStyle>
            </View>
        </TouchableNativeFeedback>
    );
}


