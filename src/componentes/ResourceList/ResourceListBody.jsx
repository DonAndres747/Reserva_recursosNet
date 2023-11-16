import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TittleStyle from "../tittlesStyle";

import resourceController from "../../services/controllers/resourceController";
import ResourceCard from "./ResourceCard";
import theme from "../../theme";
import ButtonStyle from "../buttonsStyle";

function ResourceListBody() {
    const [selectedRecs, setSelectedRecs] = useState([]);
    const [reCharge, setRecharge] = useState(true);
    const [resources, setResources] = useState();

    const { onChange,
        getResourcesBySkill,
        bookResource } = resourceController();

    useEffect(() => {

        const saveData = (parsedData) => {
            try {
                parsedData.result.status == 404 ? setResources(parsedData.result.status) : setResources(parsedData.result.data);
            } catch (error) {

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

        let resource = (Array(formatedRecs.length).fill());
        formatedRecs.map((rec, index) => {
            resource[index] = (resources.filter(resource => resource.user_id == rec.rsce_id)[0]);
        })

        bookResource(resource, formatedRecs);
    }

    return (
        <View style={styles.container}>
            <TittleStyle text="subtittle" fontColor='blue' fontWeight="bold">
                La disponibilidad ha sido confirmada{"   "}
            </TittleStyle>
            <Text style={styles.headerText}>
                Se han identificado varios recursos que concuerdan con su solicitud,{/*💩*/} Por favor seleccione el recurso a reservar:
            </Text>
            <ResourceCard onSelect={handleselectedRec} data={resources} />
            <TouchableWithoutFeedback onPress={() => (selectedRecs != '' ? (saveData()) : Alert.alert("Ningun recurso a sido seleccionado"))}>
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
        fontSize: Platform.OS === 'ios' ? 13 : 14.5,
        marginVertical: 8
    },
});

export default ResourceListBody;
