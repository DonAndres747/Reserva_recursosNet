import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView, Modal, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import theme from "../../theme";
import TittleStyle from "../tittlesStyle";


export default function ResouceListComplete({ data, open, show, onRemove, resourceInfo, onComplete }) {
    const [dataR, setDataR] = useState(data);

    useEffect(() => {
        setDataR(data)
    }, [show])

    const remove = async (index, recid) => {
        const newData = [...dataR]
        newData.splice(index, 1);
        setDataR(newData);
        await onRemove(resourceInfo.findIndex((resource) => resource.user_id == recid), true);
        newData.length < 1 ? open() : "";
    }

    const getNames = (id) => {
        const { first_name, last_name } = resourceInfo.find((resource) => resource.user_id == id) || { first_name: null, last_name: null }
        return first_name + " " + last_name
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
                    <View style={styles.tableColumns}>
                        <View style={styles.tableTittle}>
                            <TittleStyle text="subtittle" margin="false" fontColor="white">Reservas</TittleStyle>
                        </View>
                        <View style={styles.tableRows}>
                            <View style={[styles.tableHeader, { borderTopLeftRadius: 5 }]}>
                                <Text style={styles.headerText}>Recursos</Text>
                            </View>
                            <View style={[styles.tableHeader, styles.dates]}>
                                <Text style={styles.headerText}>Fechas</Text>
                            </View>
                            <View style={[styles.tableHeader, , { borderTopEndRadius: 5 }]}>
                            </View>
                        </View>
                        {dataR.map((recD, index) => (recD.rsce_id != "false" ?
                            < View key={index} style={styles.tableRows} >
                                <View key={index} style={[styles.tableCell, styles.tittle, index % 2 === 0 ? styles.tableCellEven : styles.tableCellOdd, index == (data.length - 1) ? { borderBottomLeftRadius: 5 } : ""]}>
                                    <Text key={index} style={styles.tittle}>
                                        {getNames(recD.length > 0 ? recD[0].rsce_id : recD.rsce_id)}
                                    </Text>
                                </View>
                                <View style={[styles.tableCell, index % 2 === 0 ? styles.tableCellEven : styles.tableCellOdd, styles.dates]}>
                                    {recD.length > 0 ? recD.map((date, idx) => {
                                        return <Text key={idx} style={styles.multidatesText}> {date.start + " - " + date.end}</Text>
                                    }) :
                                        <Text> {recD.start + " - " + recD.end}</Text>
                                    }
                                </View>
                                <View style={[styles.tableCell, index % 2 === 0 ? styles.tableCellEven : styles.tableCellOdd, index == (dataR.length - 1) ? { borderBottomRightRadius: 5 } : ""]}>
                                    <TouchableWithoutFeedback onPress={() => remove(index, recD.rsce_id)}>
                                        <View style={styles.removeButton}>
                                            <Icon name='delete' color={"white"} size={20}></Icon>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            : ""))}
                        <View style={styles.bottomButtonsRow}>
                            <TouchableWithoutFeedback onPress={() => open()}>
                                <View style={styles.bottomButton}>
                                    <Text style={styles.bottomButtonText}>Continuar</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => onComplete()}>
                                <View style={styles.bottomButton}>
                                    <Text style={styles.bottomButtonText}>Completar</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                </View >
            </Modal >
        </View >
    );
}

const styles = StyleSheet.create({

    modelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.colors.blancoNetTransp
    },
    tableTittle: {
        alignSelf: "center",
        marginBottom: 8
    },
    tableColumns: {
        flexDirection: "column",
        width: Platform.OS === "ios" ? "90%" : "80%",
        justifyContent: 'center',
        backgroundColor: theme.colors.azulNetTransp,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5
    },
    tableRows: {
        flexDirection: "row",
        justifyContent: "center",
    },
    tableHeader: {
        paddingVertical: 5,
        backgroundColor: "white",
        width: "30%",
        margin: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.naranjaNet,
        marginBottom: 3,
    },
    headerText: {
        color: "white",
        fontSize: Platform.OS === "ios" ? 13 : 15
    },
    tableCell: {
        paddingVertical: 5,
        backgroundColor: "white",
        width: "30%",
        margin: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    tableCellEven: {
        backgroundColor: "#d4eafc"
    },
    tableCellOdd: {
        backgroundColor: "#eaf4fe"
    },
    removeButton: {
        backgroundColor: theme.colors.naranjaNet,
        padding: 5,
        borderRadius: 5
    },
    buttonText: {
        color: "white",
    },
    bottomButtonsRow: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    bottomButton: {
        width: "45%",
        height: 30,
        justifyContent: 'center',
        backgroundColor: theme.colors.azulNet,
        alignItems: "center",
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1,
        marginHorizontal: 5
    },
    bottomButtonText: {
        color: "white",
        fontSize: 15,
    },
    tittle: {
        color: theme.colors.azulNet,
        fontSize: Platform.OS === "ios" ? 13 : 15
    },
    dates: {
        width: Platform.OS === "ios" ? "45%" : "40%",
    },
    multidatesText: {
        fontSize: Platform.OS === "ios" ? 13 : 11
    }

});
