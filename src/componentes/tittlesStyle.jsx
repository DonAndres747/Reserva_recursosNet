import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import theme from '../theme.js'




export default function TittleStyle({ children, text, RestOfProps }) {
    const TittleStyle = [
        styles.container,
        text == 'tittle' && styles.tittle
    ]
    return (
        <Text style={TittleStyle}{...RestOfProps}>
            {children}
        </Text>
    )
}



const styles = StyleSheet.create({
    tittle:{
        fontSize: theme.fontSizes.tittle,
        fontWeight: theme.fontWeight.bold,
        color:theme.colors.azulNet,
        marginBottom: theme.margin.margin,
        marginLeft:theme.margin.marginLeft
    }
})