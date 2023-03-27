import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import theme from "../../theme";

export default function HomeSegments({ circleV, tittle, segText, iconSrc }) {
    const circle = [
        styles.circle,
        circleV != 'false' && styles.circleColor,
    ]
   
    return (
        <View style={[styles.container]}>
            <View style={circle}>
                <Image  source={iconSrc} style={[styles.icon]} >
                </Image>
            </View>
            <Text style={[styles.segTittle]}>
                {tittle}
            </Text>
            <Text style={[styles.segText]}>
                {segText}
            </Text>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //backgroundColor: 'lightblue',
        width: 117,
        height: 190,
        justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 1
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleColor:{
        backgroundColor: 'lightgray'
    },
    icon: {
        width: 50,
        height: 40
    },
    segTittle: {
        fontWeight: theme.fontWeight.bold,
        marginTop: 10,
        fontSize: 16
    },
    segText: {
        paddingLeft: 5 ,
        paddingRight: 5 ,
        textAlign: 'center',
        fontSize: 12
    }

})