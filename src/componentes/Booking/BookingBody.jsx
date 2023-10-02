import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert } from "react-native";
import theme from "../../theme";
import { Dimensions } from 'react-native';
import BookingSolSeg from "./BookingSolSeg";
import BookingTextSeg from "./BookingTextSeg";
import BookingSerTypSeg from "./BookingSerTypSeg";
import BookingDatesSeg from "./BookingDatesSeg";
import ButtonStyle from "../buttonsStyle";

const emptySpace = `
`

const BookingBody = () => {
    return (
        <View style={{ alignItems: "center" }}>
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
                <Text style={styles.hrLabel}>
                    Total Horas:
                </Text>
                <BookingTextSeg
                    number='3'
                    text={'Selecciona las fechas en que deseas reservar el servicio. ' + emptySpace} />
                <BookingDatesSeg />
            </View>
            <View style={styles.separator} />
            <TouchableWithoutFeedback onPress={() => Alert.alert("Oli")}>
                <View style={{ marginTop: 8 }}>
                    <ButtonStyle view="action" >Buscar</ButtonStyle>
                </View>
            </TouchableWithoutFeedback>
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
        alignSelf: "center",
        fontSize: Platform.OS === 'ios' ? "12%" : 14
    },
    separator: {
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 2,  
        borderStyle:  Platform.OS === 'ios' ? 'dashed' :'dotted',
        overflow: 'visible',
        width: autoWidth,
        marginVertical: 3,
        alignSelf: 'center',
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    hrLabel: {
        position: "absolute",
        left: '30%',
        top: "68%",
    }

})


export default BookingBody;