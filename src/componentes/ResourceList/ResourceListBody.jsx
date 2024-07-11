import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

import ButtonStyle from "../buttonsStyle";
import resourceController from "../../services/controllers/resourceController";
import ResourceCard from "./ResourceCard";
import theme from "../../theme";
import TittleStyle from "../tittlesStyle";
import '../../helpers/i18n'

function ResourceListBody() {
    const [selectedRecs, setSelectedRecs] = useState([]);
    const [reCharge, setRecharge] = useState(true);
    const [resources, setResources] = useState();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const {
        onChange,
        getResourcesBySkill,
        bookResource,
        extraRequest
    } = resourceController();

    useEffect(() => {

        const saveData = (parsedData) => {
            try {
                parsedData.result.status == 404 ? setResources(parsedData.result.status) : setResources(parsedData.result.data);
            } catch (error) {
                return false
            }
        }

        const fetchResources = async () => {
            try {
                const skills = await AsyncStorage.getItem("skills");
                const level = await AsyncStorage.getItem("level");
                onChange(skills, level);
                setRecharge(false);

                !reCharge ? (
                    data = await getResourcesBySkill(),
                    response = JSON.stringify(data),
                    parsedData = JSON.parse(response),
                    saveData(parsedData)
                ) : "";

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchResources();
    }, [reCharge]);

    const handleselectedRec = (items) => {
        setSelectedRecs(items)
    };

    const saveData = async () => {
        let formatedRecs = []
        selectedRecs.map((rec) => {
            if (rec[0]) {
                rec.map((rec2) => {
                    formatedRecs.push(rec2);
                })
            } else {
                formatedRecs.push(rec)
            }
        })

        let normalRec = formatedRecs.filter(rec => { return rec.extraOrd == undefined || rec.extraOrd == false })
        let extraRec = formatedRecs.filter(rec => { return rec.extraOrd == true })

        let resource = (Array(normalRec.length).fill());

        normalRec.map((rec, index) => {
            resource[index] = (resources.filter(resource => resource.user_id == rec.rsce_id)[0]);
        })

        const response = normalRec.length > 0 ? await bookResource(resource, normalRec) : "";
        const response2 = extraRec.length > 0 ? await extraRequest(extraRec) : "";

        Alert.alert(
            (response ? response.tittle : "") + " \n" + (response2 ? response2.tittle : "") + " ",
            (response && response.body ? response.body : "") + " \n" + (response2 && response2.body ? response2.body : ""),
            [{
                text: 'Aceptar',
                onPress: () =>
                    response?.status !== 'Error' && response2?.status !== 'Error' ?
                        navigation.navigate('Home') :
                        null
            }]
        )
    }

    return (
        <View style={styles.container}>
            <TittleStyle text="subtittle" fontColor='blue' fontWeight="bold">
                {t("resourceList.title")}{"   "}
            </TittleStyle>
            <Text style={styles.headerText}>
                {t("resourceList.subtitle")}
            </Text>
            <ResourceCard onSelect={handleselectedRec} data={resources} onComplete={() => { saveData() }} />
            <TouchableWithoutFeedback onPress={() => (selectedRecs != '' ? (saveData()) : Alert.alert("Ningun recurso a sido seleccionado"))}>
                <View>
                    <ButtonStyle>
                        {t("resourceList.buttons.completeR")}
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
        fontSize: Platform.OS === 'ios' ? 13 : 14.5,
        marginVertical: 8
    },
});

export default ResourceListBody;
