import React from "react";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import theme from "../../theme";
import { useNavigation } from '@react-navigation/native';

export default function HomeSegments({ circleV, tittle, segText, iconSrc, name, firstName, lastName }) {

    const navigation = useNavigation();
    const circle = [
        styles.circle,
        circleV != 'false' && styles.circleColor,
    ]

    return (
        <TouchableWithoutFeedback onPress={() => { [navigation.navigate(name, { name: firstName, lastName: lastName })]}}>
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
        // backgroundColor: 'lightblue',
        width: '33%',
        height: '100%',
        justifyContent: 'center',

        // borderColor: 'black',
        // borderWidth: 1
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
        fontSize: Platform.OS === 'ios' ? '14%' : 16

    },
    segText: {
        paddingLeft: "5%",
        paddingRight: "5%",
        textAlign: 'center',
        fontSize: 13
    }

})