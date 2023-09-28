import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import theme from '../theme.js'




export default function ButtonStyle({ children, view, RestOfProps }) {
    const buttonStyle = [
        view == null && styles.container,
        view == 'action' && styles.action
    ]
    return (
        <View style={[buttonStyle.container, buttonStyle.iosText]}>
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
        ...Platform.select({
            ios: {
                padding: 5
            }
        })

    },
    action: {
        width: theme.width.buttonAction,
        height: theme.height.buttonCont, 
        borderRadius: 5,
        borderWidth:1,
        borderColor:"grey",
        color: theme.colors.azulNet,
        textAlign: theme.alingment.center,
        textAlignVertical: theme.alingment.center,
        fontSize: theme.fontSizes.buttons,
        marginBottom: theme.margin.margin,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                padding: 5
            }
        })

    }

})