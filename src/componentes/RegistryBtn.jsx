import React from "react";
import { View, Alert, TouchableWithoutFeedback} from "react-native";
import ButtonStyle from '../componentes/buttonsStyle.jsx';

export default function RegisterBtn() {
    return (

        <TouchableWithoutFeedback onPress={() => Alert.alert('funk')} >
            <View>
                <ButtonStyle container='container'>
                    Register
                </ButtonStyle>
            </View>
        </TouchableWithoutFeedback>
    );
}


