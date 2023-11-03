import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

import ResourceModel from "../models/resourceModel.js";
import { Alert } from "react-native";

export default function resourceController() {
    const navigation = useNavigation();
    const resourceModel = new ResourceModel();
    const [resourceModelData, setResourceModelData] = useState({ ...resourceModel });

    const onChange = (skills, level) => {
        setResourceModelData({ ...resourceModelData, ["skills"]: skills, ["level"]: level });
    };

    const getResourcesBySkill = async () => {
        try {
            const resourceModel = new ResourceModel(
                resourceModelData.user_id,
                resourceModelData.first_name,
                resourceModelData.last_name,
                resourceModelData.level,
                resourceModelData.description,
                resourceModelData.skills
            );

            const token = await AsyncStorage.getItem("token");
            const response = await resourceModel.getResourcesBySkill(token, resourceModelData);
            const result = await response.json();

            return result;
        } catch (error) {
            console.error("Error fetching data:", error);
            return error
        }
    };

    const bookResource = async (resource, selectedRecs) => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem("result"));
            const skills = await AsyncStorage.getItem("skills");
            let temp = (Array(selectedRecs.length).fill(""))
            selectedRecs.map((items, index) => {
                temp[index] = JSON.parse(`{"end": "${items.end}", "rsce_id": "${items.rsce_id}", "start": "${items.start}", "user_id":"${user.id}", "selected_skills":"${skills}"}`)
            }) 
            const token = await AsyncStorage.getItem("token");
            const response = await resourceModel.bookResource(token, temp);
            const result = await response.json();

            switch (response.status) {
                case 401:
                    AsyncStorage.clear();
                    Alert.alert(
                        'La sesión ha expirado',
                        ' ',
                        [
                            {
                                text: 'Aceptar',
                                onPress: () => {
                                    navigation.navigate('Login');
                                },
                            },
                        ]
                    );
                    break;

                case 201:
                    AsyncStorage.removeItem('skills');
                    AsyncStorage.removeItem('level');
                    Alert.alert(
                        'Recursos reservados exitosamente',
                        ' ',
                        [
                            {
                                text: 'Aceptar',
                                onPress: () => {
                                    navigation.navigate('Home');
                                },
                            },
                        ]
                    );
                    break;

                case 400:
                    Alert.alert('Los recursos no pudieron ser reservados    :(', ' ', [
                        {
                            text: 'Aceptar',
                        },
                    ]);
                    break;

                default: 
                    break;
            }



            if (result.failedResults) {
                const failedResourceNames = result.failedResults.map((res) => {
                    const matchingResource = resource.find(rec => res.resource_id == rec.resource_id);
                    if (matchingResource) {
                        return matchingResource.first_name + ' ' + matchingResource.last_name;
                    }
                });

                console.log('Failed Resource Names:', failedResourceNames);

                Alert.alert('Los siguientes recursos no pudieron ser reservados'
                    , failedResourceNames.join('\n') + '\n\ntodos los demas fueron reservados exitosamente',
                    [
                        {
                            text: 'Aceptar'
                        }
                    ]);
            }

            console.log(response.status);

        } catch (error) {
            console.error("Error fetching data:", error);
            return error
        }
    }


    return { getResourcesBySkill, onChange, setResourceModelData, bookResource, resourceModelData };
}
