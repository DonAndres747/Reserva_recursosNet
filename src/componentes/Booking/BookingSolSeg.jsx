import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView } from "react-native";
import TittleStyle from "../tittlesStyle";
import theme from "../../theme";
import BookingList from "./BookingList";

const BookingSolSeg = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.solText}>
                Solucion(es)
            </Text>
            <BookingList data={array} />
        </View >
    )
}

const array = [
    {
        name: "BY WMS",
        id: "WMS"
    },
    {
        name: "BY TMS",
        id: "TMS"
    },
    {
        name: "BY TPD",
        id: "TPD"
    },
];


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: 145,
        marginLeft: 15,
    },
    list: {
        height: 20,
    },
    listText: {
        fontSize: 20
    },
    solText: {
        textAlign: "left",
        marginBottom: 7
    }
})

export default BookingSolSeg;