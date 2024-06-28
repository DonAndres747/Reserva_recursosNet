import { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import TittleStyle from "../tittlesStyle";
import ComponentCBSeg from "./ComponentCBSeg";
import ComponentTypSeg from "./ComponentTypSeg";
import ButtonStyle from "../buttonsStyle";
import solTypController from "../../services/controllers/solTypController"

function ComponentsBody() {
    const navigation = useNavigation();
    const { getAllSolTypes } = solTypController();
    const [solTypes, setSolTypes] = useState([]);

    const [caracteristics, setCaracteristics] = useState([]);

    const [selectedSol, setSelectedSol] = useState([]);

    function handleSelectSol(value) {
        setSelectedSol(value);
    };
    function handleSelectCaract(value) {
        setCaracteristics(value);
    };


    useEffect(() => {
        getAllSolTypes()
            .then((data) => {
                const response = JSON.stringify(data);
                const parsedData = JSON.parse(response);
                setSolTypes(parsedData.solutionsTypes[0]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);



    return (
        <View style={styles.container}>
            <TittleStyle text='subtittle' fontColor='Orange'>Seleccione los componentes deseados{`   
            `}</TittleStyle>
            <ComponentCBSeg text='Selecciona la solución:' data={solTypes} onSelect={handleSelectSol} />
            <View style={styles.checkbox}>
                <Text >
                    Tipo de componente
                </Text>
                <ComponentTypSeg onChange={handleSelectCaract} />
            </View>
            <View style={styles.separator} />
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ComponentsList', { solTyp: selectedSol, compList: caracteristics.join(",") })}>
                <View style={{ marginTop: 30 }}>
                    <ButtonStyle view="action" >Buscar</ButtonStyle>
                </View>
            </TouchableWithoutFeedback>
        </View >
    )
}


const autoWidth = (Dimensions.get('window').width * 0.8);
const styles = StyleSheet.create({

    container: {
        alignItems: "center",
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