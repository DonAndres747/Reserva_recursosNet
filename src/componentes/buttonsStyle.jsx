import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import theme from '../theme.js'




export default function ButtonStyle({ children, view, RestOfProps }) {
    const buttonStyle = [
        styles.container,
        view == 'container' && styles.container
    ]
    return (
        <View style={buttonStyle.container}>
            <Text style={buttonStyle}{...RestOfProps}>
                {children}
            </Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: theme.width.buttonCont,
        height: theme.height.buttonCont,
        backgroundColor: theme.colors.azulNet,
        borderRadius: 20,
        color: theme.colors.blanco,
        textAlign: theme.alingment.center,
        textAlignVertical: theme.alingment.center,
        fontSize: theme.fontSizes.buttons,
        marginBottom: theme.margin.margin, 
        overflow: 'hidden',
    }
})