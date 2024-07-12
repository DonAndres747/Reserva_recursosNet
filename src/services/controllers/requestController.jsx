import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

import RequestModel from "../models/requestModel";
import '../../helpers/i18n'

export default function RequestController() {
    const requestModel = new RequestModel();
    const navigation = useNavigation();
    const { t } = useTranslation()

    const getRequestByManager = async (type) => {
        try {
            const [user, token] = await Promise.all([
                AsyncStorage.getItem("result").then(JSON.parse),
                AsyncStorage.getItem("token")
            ]);

            const response = await requestModel.getRequestByManager(token, user.id, type);
            const result = await response.json();

            switch (response.status) {
                case 401:
                    await AsyncStorage.clear();
                    Alert.alert(t("globals.sessionExpired"), '', [{ text: 'Aceptar', onPress: () => navigation.navigate('Login') }]);
                    break;

                default:
                    break;
            }

            return result.result;
        } catch (error) {
            console.error("Error fetching data:3", error);
            return error
        }
    };

    const denyRequest = async (id) => {
        try {
            const token = await AsyncStorage.getItem("token")

            const response = await requestModel.denyRequest(token, id);
            const result = await response.json();

            switch (response.status) {
                case 401:
                    await AsyncStorage.clear();
                    Alert.alert(t("globals.sessionExpired"), '', [{ text: 'Aceptar', onPress: () => navigation.navigate('Login') }]);
                    break;

                case 500:
                    await AsyncStorage.clear();
                    Alert.alert(t("globals.somethingWrong"));
                    break;

                default:
                    break;
            }

            return result.result;
        } catch (error) {
            console.error("Error fetching data:1", error);
        }
    }

    const acceptRequest = async (id) => {
        try {
            const token = await AsyncStorage.getItem("token")
            const response = await requestModel.acceptRequest(token, id);

            switch (response.status) {
                case 401:
                    await AsyncStorage.clear();
                    Alert.alert(t("globals.sessionExpired"), '', [{ text: 'Aceptar', onPress: () => navigation.navigate('Login') }]);
                    break;

                case 500:
                    Alert.alert(t("globals.somethingWrong"));
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.error("Error fetching data:2", error);
        }
    }

    return { getRequestByManager, denyRequest, acceptRequest };
}
