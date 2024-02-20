import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions, Image, Modal } from "react-native";

import theme from "../../theme";

function ComponenstListModal({ component, visible, onClose, onAdd, onRemove }) {
    const [selectedComponent, setSelectedComponent] = useState([]);

    useState(() => { 
        setSelectedComponent(onRemove == undefined ? [] : onRemove);
    }, [visible])


    handleAdd = () => {
        const temp = [...selectedComponent];

        const formatedReq = JSON.parse(`
        {
          "comp_id": "${component.id}",
          "recTittle": "${component.name}",
          "recDesc": "${component.description}",
          "recprice": "${component.rate}" 
        }`)

        temp.push(formatedReq)
        setSelectedComponent(temp);
        onAdd(temp);
    }


    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    onClose()
                }}
                backgroundColor="red"
            >
                <View style={styles.modalBody}>
                    <View style={styles.modal}>
                        <View style={styles.modalText}>
                            <Text style={styles.modalTittle}>
                                Seguro que desea añadir el modulo
                            </Text>
                            <Text style={styles.modalComponentTittle}>
                                {" " + component.name}
                            </Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableWithoutFeedback onPress={() => { handleAdd() }} >
                                <View style={[styles.button, styles.buttonOra]}>
                                    <Text style={styles.buttonText}>
                                        Añadir
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => { onClose() }}>
                                <View style={[styles.button, styles.buttonBlue]}>
                                    <Text style={styles.buttonText}>
                                        Cancelar
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>

            </Modal>
        </View >
    );
}

function autoWidth(percentage) {
    return (Dimensions.get('window').width * (percentage / 100));
}
const styles = StyleSheet.create({
    modalBody: {
        height: '100%',
        width: "100%",
        backgroundColor: theme.colors.blancoNetTransp
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: "white",
        justifySelf: "center",
        width: autoWidth(80),
        marginTop: "60%",
        padding: 5,
        borderWidth: 1,
        borderRadius: 5
    },
    modalText: {
        marginVertical: 10
    },
    modalTittle: {
        fontSize: theme.fontSizes.subheading
    },
    modalComponentTittle: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: "bold",
        color: theme.colors.naranjaNet
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginVertical: 5
    },
    button: {
        width: autoWidth(20),
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5
    },
    buttonText: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: theme.fontSizes.subheading,
        color: "white"
    },
    buttonOra: {
        backgroundColor: theme.colors.naranjaNet
    },
    buttonBlue: {
        backgroundColor: theme.colors.azulNet
    }
});

export default ComponenstListModal;
