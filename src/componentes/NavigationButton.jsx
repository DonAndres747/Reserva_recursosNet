import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import ButtonStyle from './buttonsStyle.jsx';
import { useNavigation } from '@react-navigation/native';



export default function NavigationButton({ children, name }) {
    {
        const navigation = useNavigation();
        return (

            <TouchableWithoutFeedback onPress={() => [navigation.navigate(name)]} >
                <View >
                    <ButtonStyle container='container'>
                       {children}
                    </ButtonStyle>
                </View>
            </TouchableWithoutFeedback>
        );
    }
};

