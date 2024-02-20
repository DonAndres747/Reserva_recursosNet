import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions, Image } from "react-native";

import theme from "../../theme";
import ComponenstListModal from "./ComponentsListModal";

function ComponenstListCards({ data, onAdd, onRemove }) {
    const [modal, setModal] = useState(false); 

    useEffect(() => {
        data ? setModal(Array(data.length).fill(false)) : "";
    }, [data])
 

    handleModal = (index) => {
        const tempMod = [...modal];
        tempMod[index] = !tempMod[index];
        setModal(tempMod);
    };

    return (
        <View style={styles.container}>
            {
                data ? (
                    data.map((component, index) => (
                        <View style={styles.card} key={index}>
                            <View>
                                <Image source={require('../../assets/componentsIcon.png')} style={styles.pict} />
                                <TouchableWithoutFeedback onPress={() => { handleModal(index) }}>
                                    <View style={styles.cardButton}>
                                        <Text style={styles.cardButtonText}>
                                            Añadir
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <Text style={styles.cardTittle}>{component.name}</Text>
                                <Text style={styles.cardDescr}>{component.description}</Text>
                                <Text style={styles.cardRate}>${component.rate} USD</Text>
                            </View>
                            {modal[index] == true ? <ComponenstListModal
                                component={component}
                                onRemove={onRemove}
                                visible={modal[index]}
                                onClose={() => handleModal(index)}
                                onAdd={(selected) => {
                                    onAdd(selected);
                                    setModal(Array(data.length).fill(false));
                                }} /> : ""}

                        </View>
                    ))
                ) :
                    <Text>No se encontraron componentes con estas caracteristicas</Text>
            }
        </View >
    );
}

function autoWidth(percentage) {
    return (Dimensions.get('window').width * (percentage / 100));
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 20
    },
    card: {
        flexDirection: "row",
        width: autoWidth(88),
        marginVertical: 5,
    },
    pict: {
        width: 80,
        height: 80,
        margin: 6,
    },
    cardTittle: {
        fontSize: autoWidth(4.5),
        textDecorationLine: "underline",
        marginVertical: 5,
        marginLeft: 5,
    },
    cardDescr: {
        fontSize: autoWidth(3.9),
        marginHorizontal: 5,
        width: autoWidth(60),
        color: "grey"
    },
    cardRate: {
        fontSize: autoWidth(3.9),
        marginHorizontal: 5,
        width: autoWidth(60),
        marginTop: 15
    },
    cardButton: {
        backgroundColor: theme.colors.azulNet,
        marginVertical: 3,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 5,
        width: autoWidth(17),
        alignSelf: "center",
    },
    cardButtonText: {
        color: "white",
        textAlign: "center",
        padding: 7,
        fontSize: 15
    },
});

export default ComponenstListCards;
