import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import theme from '../theme.js'




export default function TittleStyle({ children, text, fontColor, fontWeight, RestOfProps, margin }) {
    const TittleStyle = [
        text == 'tittle' && styles.tittle,
        text == 'subtittle' && styles.subtittle,
        fontColor == 'Orange' && styles.fontColorN,
        fontColor == 'blue' && styles.fontColorA,
        fontColor == 'white' && styles.fontColorW,
        fontWeight == "bold" && styles.fontWeight,
        margin != "false" && styles.margins
    ] 
    return (
        <Text style={TittleStyle}{...RestOfProps}>
            {children}
        </Text>
    )
}



const styles = StyleSheet.create({
    tittle: {
        fontSize: theme.fontSizes.tittle,
        fontWeight: theme.fontWeight.bold,
    },
    subtittle: {
        fontSize: theme.fontSizes.subtittle,
    },
    fontColorA: {
        color: theme.colors.azulNet
    },
    fontColorN: {
        color: theme.colors.naranjaNet
    },
    fontColorW: {
        color: "white"
    },
    fontWeight: {
        fontWeight: theme.fontWeight.bold,
    },
    margins: {
        marginLeft: theme.margin.marginLeft,
        marginTop: theme.margin.margin,
    }
})