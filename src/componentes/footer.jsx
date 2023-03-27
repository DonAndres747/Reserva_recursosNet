import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from '../theme.js'

export default function Footer({ margin }) {
    const marginStyle = [
        styles.view,
        margin != 'false' && styles.margins
    ]
    return (
        <View style={marginStyle}>
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
            alignItems: 'center',
        },
        margins: {
            marginTop: 40,
            marginBottom: 30,
        },
        text: {
            fontSize: theme.fontSizes.subText,
            color: theme.colors.azulNet,
        }
    })