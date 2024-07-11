import { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

import AvailabilityCBSeg from "./AvailabilityCBSeg";
import AvailabilityTypSeg from "./AvailabilityTypSeg";
import ButtonStyle from "../buttonsStyle";
import recLevelController from "../../services/controllers/recLevelController";
import solTypController from "../../services/controllers/solTypController";
import TittleStyle from "../tittlesStyle";
import '../../helpers/i18n'

function AvailabilityBody() {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const { getAllSolTypes } = solTypController();
    const [solTypes, setSolTypes] = useState([]);
    const { getAllRecLevels } = recLevelController();
    const [solRecLevels, setRecLevels] = useState([]);

    const [caracteristics, setCaracteristics] = useState([]);

    const [selectedSol, setSelectedSol] = useState([]);
    const [selectedRec, setSelectedRec] = useState([]);

    function handleSelectSol(value) {
        setSelectedSol(value);
    };
    function handleSelectRec(value) {
        setSelectedRec(value);
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
            <TittleStyle text='subtittle' fontColor='Orange'>{t("availability.title")}{`                      
            `}</TittleStyle>
            <AvailabilityCBSeg text={t("availability.labels.selectSol")} data={solTypes} onSelect={handleSelectSol} />
            <AvailabilityCBSeg text={t("availability.labels.selectRecLvl")} data={solRecLevels} onSelect={handleSelectRec} />
            <View style={styles.checkbox}>
                <Text >
                {t("availability.labels.additionalC")}
                </Text>
                <AvailabilityTypSeg onChange={handleSelectCaract} />
            </View>
            <View style={styles.separator} />
            <TouchableWithoutFeedback onPress={() => {
                AsyncStorage.setItem("skills", (selectedSol + "," + caracteristics));
                AsyncStorage.setItem("level", selectedRec + "");
                navigation.navigate("ResourceList");
            }}>
                <View style={{ marginTop: 8 }}>
                    <ButtonStyle view="action" > {t("availability.button")}</ButtonStyle>
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