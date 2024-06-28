import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView, Modal, Platform, Alert } from "react-native";

import theme from "../../theme";
import TittleStyle from "../tittlesStyle";


export default function RequestModal({ data, open, show, onResponse }) {
    const [dataR, setDataR] = useState(data);

    useEffect(() => {
        setDataR(data);
    }, [show])


    const formatDate = (date) => {
        return date?.replaceAll("-", "/").replace("|", "\n")
    }

    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}
                onRequestClose={() => {
                    open();
                }}
            >
                <View style={styles.modelContainer}>
                    <TittleStyle margin="false" text='subtittle' fontColor='Orange' RestOfProps={{ marginBottom: 5 }}>
                        Evaluación de Solicitud
                    </TittleStyle>
                    <View style={styles.modalBody}>
                        <View style={styles.segment}>
                            <Text style={styles.label}>
                                Recurso:
                            </Text>
                            <Text>
                                {dataR.resource_name}
                            </Text>
                        </View>
                        <View style={styles.segment}>
                            <Text style={styles.label}>
                                Fechas a Liberar:
                            </Text>
                            <Text style={styles.reservedDate}>
                                {formatDate(dataR.reserved_date)}
                            </Text>
                        </View>
                        <View style={styles.segment}>
                            <Text style={styles.label}>
                                Solicitante:
                            </Text>
                            <Text>
                                {dataR.reqMng_name}
                            </Text>
                        </View>
                        <View style={styles.segment}>
                            <Text style={styles.label}>
                                Fechas Solicitantes:
                            </Text>
                            <Text>
                                {formatDate(dataR.requested_date)}
                            </Text>
                        </View>
                        <View style={styles.buttons}>
                            <View style={styles.button}>
                                <TouchableWithoutFeedback onPress={() => open()}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.button}>
                                <TouchableWithoutFeedback onPress={() => onResponse(dataR.req_id, "deny")}>
                                    <Text style={styles.buttonText}>Rechazar</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.button, { backgroundColor: theme.colors.naranjaNet }]}>
                                <TouchableWithoutFeedback onPress={() => onResponse(dataR.req_id, "accept")}>
                                    <Text style={styles.buttonText}>Aceptar</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    );
}

const styles = StyleSheet.create({

    modelContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: "center",
        flex: 1,
        backgroundColor: theme.colors.blancoNetTransp
    },
    modalBody: {
        width: "80%",
        height: "25%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        marginBottom: 50,
        backgroundColor: theme.colors.blanco
    },
    segment: {
        width: "50%",
        height: "38%",
        padding: 2,
        alignItems: "center"
    },
    label: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.azulNet,
        marginVertical: 5
    },
    reservedDate: {
        color: "red",
    },
    buttons: {
        width: "100%",
        height: "24%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingHorizontal: 15
    },
    button: {
        backgroundColor: theme.colors.azulNet,
        width: "22%",
        height: "60%",
        borderRadius: 5,
    },
    buttonText: {
        width: "100%",
        height: "100%",
        color: "white",
        textAlign: "center",
        textAlignVertical: "center"
    }

});
