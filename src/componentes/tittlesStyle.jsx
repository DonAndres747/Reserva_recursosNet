import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import theme from '../theme.js'




export default function TittleStyle({ children, text, fontColor, RestOfProps }) {
    const TittleStyle = [ 
        text == 'tittle' && styles.tittle,
        text == 'subtittle' && styles.subtittle,
        fontColor == 'Orange' && styles.fontColorN,
        fontColor == 'blue' && styles.fontColorA
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
        marginBottom: theme.margin.margin,
        marginLeft:theme.margin.marginLeft
    },
    subtittle:{
        fontSize: theme.fontSizes.subtittle,
        marginTop: theme.margin.margin,
        marginLeft:theme.margin.marginLeft
    },
    fontColorA:{
        color: theme.colors.azulNet
    },
    fontColorN:{
        color: theme.colors.naranjaNet
    }
})