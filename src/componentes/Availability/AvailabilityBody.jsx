import { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert } from "react-native";
import { Dimensions } from 'react-native';
import TittleStyle from "../tittlesStyle";
import AvailabilityCBSeg from "./AvailabilityCBSeg";
import AvailabilityTypSeg from "./AvailabilityTypSeg";
import ButtonStyle from "../buttonsStyle";
import solTypController from "../../services/controllers/solTypController"
import recLevelController from "../../services/controllers/recLevelController"
import resourceController from "../../services/controllers/resourceController";

function AvailabilityBody() {
    const { getAllSolTypes } = solTypController();
    const [solTypes, setSolTypes] = useState([]);
    const { getAllRecLevels } = recLevelController();
    const [solRecLevels, setRecLevels] = useState([]);
    const { getResourcesBySkill } = resourceController();

    const [caracteristics, setCaracteristics] = useState([]);

    const [selectedSol, setSelectedSol] = useState([]);
    const [selectedRec, setSelectedRec] = useState([]);

    function handleSelectSol(value) {
        setSelectedSol(value);
        console.log(value);
    };
    function handleSelectRec(value) {
        setSelectedRec(value);
        console.log(value);
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
        getAllRecLevels()
            .then((data) => {
                const response = JSON.stringify(data);
                const parsedData = JSON.parse(response);
                const renamedData = parsedData.levels[0].map((item) => ({
                    ...item,
                    description: item.long_dsc,
                }));
                setRecLevels(renamedData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);



    return (
        <View style={styles.container}>
            <TittleStyle text='subtittle' fontColor='Orange'>Disponibilidad de recursos{`                      
            `}</TittleStyle>
            <AvailabilityCBSeg text='Selecciona la solución:' data={solTypes} onSelect={handleSelectSol} />
            <AvailabilityCBSeg text='Selecciona el tipo de Recurso:' data={solRecLevels} onSelect={handleSelectRec} />
            <View style={styles.checkbox}>
                <Text >
                    Caracteristicas Adcionales:
                </Text>
                <AvailabilityTypSeg onChange={handleSelectCaract} />
            </View>
            <View style={styles.separator} />
            <TouchableWithoutFeedback onPress={() => getResourcesBySkill((selectedSol + "," + caracteristics), selectedRec)}>
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


export default AvailabilityBody;