import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import ComponentModel from "../models/componentModel";

export default function componentController() {
    const componentModel = new ComponentModel();
    const [componentsModelData, setComponentsModelData] = useState({ ...componentModel });
    const navigation = useNavigation();

    const getComponentsByType = async (data) => {
        try {
            const componentsModel = new ComponentModel(
                componentsModelData.id,
                componentsModelData.name,
                componentsModelData.description,
                componentsModelData.rate
            );

            const token = await AsyncStorage.getItem("token");
            const response = await componentsModel.getComponentsByType(token, data);
            const result = await response.json();

            return result.result;
        } catch (error) {
            console.error("Error fetching data:", error);
            return error
        }
    };

    const bookComponents = async (ComponentsData) => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem("result"));
            const token = await AsyncStorage.getItem("token");

            const response = await componentModel.bookComponents(token, ComponentsData, user.id);

            if (response.result.failedResults) {
                const failedApps = response.result.failedResults.map((res) => {
                    const matchingApp = ComponentsData.find((app, index) => res.index == index);
                    if (matchingApp) {
                        return matchingApp;
                    }
                });

                console.log((failedApps));

                Alert.alert('Los siguientes componentes no pudieron ser procesados'
                    , /*JSON.stringify(failedApps) + \n\n*/ 'todos los demas fueron reservados exitosamente',
                    [
                        {
                            text: 'Aceptar',
                            onPress: () => {
                                setLoad(!load)
                            },
                        }
                    ]);

                return failedApps
            } else if (response.status == 201) {
                Alert.alert(
                    'Componentes reservados exitosamente',
                    '',
                    [
                        {
                            text: 'Aceptar',
                            onPress: () => {
                                navigation.navigate('Home');
                            },
                        },
                    ]
                );

                return 201
            } else {
                Alert.alert('Los componentes no pudieron ser reservados    :(', ' ', [
                    {
                        text: 'Aceptar',
                    },
                ]);

                return 500
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            return error
        }
    }

    return { getComponentsByType, bookComponents };
}
