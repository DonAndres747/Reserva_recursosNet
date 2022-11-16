import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from '../theme.js'

export default function Footer() {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>
                Todos los derechos reservados. Bogota, Marzo 2022
            </Text>
            <Text style={styles.text}>
                netLogistik Colombia
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        marginTop:40,
        marginBottom:30,
        alignItems: 'center',
    },
    text: {
        fontSize: theme.fontSizes.subText,
        color: theme.colors.azulNet,
    }
})