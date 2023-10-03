import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert } from "react-native";
import { Dimensions } from 'react-native';
import TittleStyle from "../tittlesStyle";
import ComponentCBSeg from "./ComponentCBSeg";
import ComponentTypSeg from "./ComponentTypSeg";
import ButtonStyle from "../buttonsStyle";


const ComponentsBody = () => {
    return (
        <View style={styles.container}>
            <TittleStyle text='subtittle' fontColor='Orange'>Disponibilidad de recursos{`                      
            `}</TittleStyle>
            <ComponentCBSeg text='Selecciona la solución:' data={array} />
            <ComponentCBSeg text='Selecciona el tipo de Recurso:' data={arrayLevels} />
            <View style={styles.checkbox}>
                <Text >
                    Caracteristicas Adcionales:
                </Text>
                <ComponentTypSeg />
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

const arrayLevels = [
    {
        name: "Ingeniero Junior",
        id: "JR"
    },
    {
        name: "Ingeniero Senior",
        id: "SR"
    },
    {
        name: "Ingeniero Senior",
        id: "LIDER"
    },
];



const autoWidth = (Dimensions.get('window').width * 0.8);
const styles = StyleSheet.create({

    container: {
        alignItems: "center"
    },
    checkbox: {
        marginLeft: "11%",
        marginTop: "5%"
    },
    separator: {
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 2,
        borderStyle: Platform.OS === 'ios' ? 'dashed' : 'dotted',
        overflow: 'visible',
        width: autoWidth,
        marginVertical: 3,
        alignSelf: 'center',
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
    },

})


export default ComponentsBody;