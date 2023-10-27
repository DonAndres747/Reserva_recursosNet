import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions } from "react-native";

import TittleStyle from "../tittlesStyle";

import ResourceCard from "./ResoceCard";
import theme from "../../theme";
import ButtonStyle from "../buttonsStyle";

function ResourceListBody() {

    return (
        <View style={styles.container}>
            <TittleStyle text="subtittle" fontColor='blue' fontWeight="bold">
                La disponibilidad ha sido confirmada{"   "}
            </TittleStyle>
            <Text style={styles.headerText}>
                Se han identificado varios recursos que concuerdan con su solicitud,. Por favor seleccione el recurso a reservar:
            </Text>
            <ResourceCard />
            <TouchableWithoutFeedback onPress={() => Alert.alert("completado gracias :).")}>
                <View>
                    <ButtonStyle>
                        Completar reserva
                    </ButtonStyle>
                </View>
            </TouchableWithoutFeedback>
        </View >
    );
}

function autoWidth(percentage) {
    return (Dimensions.get('window').width * (percentage / 100));
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerText: {
        color: theme.colors.azulNet,
        width: autoWidth(90),
        alignSelf: "center",
        fontSize: Platform.OS === 'ios' ? "12%" : 14.5,
        marginVertical: 8
    },
});

export default ResourceListBody;
