import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../theme";

export default function BookingTextSeg({ number, text }) {
    return (
        <View >
            <View style={styles.container}>
                <Text style={styles.number}>
                    {number}
                </Text>
                <Text style={styles.segText}>
                    {text}
                </Text>
            </View>
        </View >
    )
}



const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row"
    },
    number: {
        fontSize: 100,
        color: theme.colors.azulNet,
    },
    segText: {
        paddingLeft: "5%",
        paddingRight: "5%",
        width: 140,
        fontSize: 14,
    }
})

