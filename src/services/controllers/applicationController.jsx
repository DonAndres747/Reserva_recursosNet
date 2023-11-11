import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import ApplicationModel from "../models/applicationModel.js";


export default function applicationController() {
    const applicationModel = new ApplicationModel();
    const [load, setLoad] = useState(false)
    const navigation = useNavigation();

    const bookApplications = async (ApplicationData) => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem("result"));
            const token = await AsyncStorage.getItem("token");
            ApplicationData.push(JSON.parse(`
            {
              "solTyp": "1",
              "servTyp": "1",
              "recLvl": "1",
              "start": "1",  
              "end": "1"
            }`))
            const response = await applicationModel.bookApplication(token, ApplicationData, user.id);

            if (response.result.failedResults) {
                const failedApps = response.result.failedResults.map((res) => {
                    const matchingApp = ApplicationData.find((app, index) => res.index == index);
                    if (matchingApp) {
                        return matchingApp;
                    }
                });

                console.log((failedApps));

                Alert.alert('Los siguientes reservas no pudieron ser procesadas'
                    , JSON.stringify(failedApps) + '\n\ntodos los demas fueron reservados exitosamente',
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

                return 201
            } else {
                Alert.alert('Los recursos no pudieron ser reservados    :(', ' ', [
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

    return { bookApplications, load };
}
