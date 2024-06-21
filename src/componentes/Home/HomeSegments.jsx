import React from "react";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Alert } from "react-native";
import theme from "../../theme";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { rolesConfig, rolesDefinition } from "../../helpers/rolesConfig";

export default function HomeSegments({ circleV, tittle, segText, iconSrc, name }) {

    const navigation = useNavigation();
    const circle = [
        styles.circle,
        circleV != 'false' && styles.circleColor,
    ]



    const Action = async () => {
        try {
            const [user] = await Promise.all([
                AsyncStorage.getItem("result").then(JSON.parse)
            ]);

            if (!name) {
                console.log("No route provided");
            } else if (rolesConfig[user.rol_id]?.includes(name)) {
                navigation.navigate(name);
            } else {
                Alert.alert(`El modulo no se encuentra habilidata para el rol ${rolesDefinition[user.rol_id]} por el momento`);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Action()}>
            <View style={[styles.container]}>
                <View style={circle}>
                    <Image source={iconSrc} style={[styles.icon]} >
                    </Image>
                </View>
                <Text style={[styles.segTittle]}>
                    {tittle}
                </Text>
                <Text style={[styles.segText]}>
                    {segText}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}




const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '33%',
        height: '100%',
        justifyContent: 'center',
    },
    circle: {
        width: '65%',
        height: '37%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleColor: {
        backgroundColor: 'lightgray'
    },
    icon: {
        width: '60%',
        height: '50%'
    },
    segTittle: {
        fontWeight: theme.fontWeight.bold,
        marginTop: 10,
        marginBottom: 5,
        fontSize: Platform.OS === 'ios' ? 14 : 16

    },
    segText: {
        paddingLeft: "5%",
        paddingRight: "5%",
        textAlign: 'center',
        fontSize: 13
    }

})