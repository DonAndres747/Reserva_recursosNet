import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useNavigation } from '@react-navigation/native';

import { rolesConfig, rolesDefinition } from "../../helpers/rolesConfig";
import theme from "../../theme";
import contruction from "../../assets/construccion.png"

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
                Alert.alert(`El modulo no se encuentra habilidata para su rol por el momento`);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Action()}>
            <View style={[styles.container, name ? "" : styles.notAvailable]} >
                <Image source={contruction} style={[styles.iconContruccion, name ? styles.notAvailableIcon : ""]} />
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
        justifyContent: 'center'
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
        height: '50%',
        resizeMode: 'contain'
    },
    iconContruccion: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain',
        position: "absolute",
        top: 50,
        zIndex: 1
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
    },
    notAvailableIcon: {
        display: "none"
    },
    notAvailable: {
        opacity: 0.5
    }

})