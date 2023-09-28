import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView } from "react-native";
import TittleStyle from "../tittlesStyle";
import theme from "../../theme";
import { Dimensions } from 'react-native';
import BookingSolSeg from "./BookingSolSeg";
import BookingTextSeg from "./BookingTextSeg";
import BookingSerTypSeg from "./BookingSerTypSeg";

const BookingBody = () => {
    return (
        <View >
            <Text style={styles.headerText}>
                Permitanos ayudarle con su requerimiento en {' '}
                <Text style={{ fontSize: 20 }}>
                    3
                </Text>
                {' '} simples pasos:
            </Text>
            <View style={styles.container}>
                <BookingTextSeg
                    number='1'
                    text='Selecciona la solución o soluciones sobre la cual requieres nuestro apoyo.' />
                <BookingSolSeg />
            </View>
            <View style={styles.separator} />
            <View style={styles.container}>
                <BookingSerTypSeg />
                <BookingTextSeg
                    number='2'
                    text='Selecciona el tipo de servicio que deseas y el nivel de experiencia del recurso requerido.' />
            </View>
            <View style={styles.separator} />
            <View style={styles.container}>
                <BookingTextSeg
                    number='3'
                    text='Selecciona las fechas en que deseas reservar el servicio.' />
                <BookingSolSeg />
            </View>
            <View style={styles.separator} />
        </View >
    )
}



const autoWidth = (Dimensions.get('window').width * 0.8);
const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row"
    },
    headerText: {
        color: theme.colors.azulNet,
        marginVertical: 10,
        alignSelf: "center"
    },
    separator: {
        borderBottomWidth: 2,
        borderStyle: 'dotted',
        width: autoWidth,
        marginVertical: 3,
        alignSelf: 'center',
    },

})


export default BookingBody;