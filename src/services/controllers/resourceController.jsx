import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

import { Alert } from "react-native";
import ResourceModel from "../models/resourceModel.js";
import '../../helpers/i18n.js'
import { t } from "i18next";

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

    const getResourceBookDays = async (resource) => {
        try {
            const resourceModel = new ResourceModel(
                resource.user_id,
                resource.first_name,
                resource.last_name,
                resource.description
            );

            const token = await AsyncStorage.getItem("token");
            const response = await resourceModel.getResourceBookDays(token, resource);
            const result = await response.json();

            return (result.result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            return error
        }
    };

    const bookResource = async (resource, selectedRecs) => {
        try {
            const [user, skills, token] = await Promise.all([
                AsyncStorage.getItem("result").then(JSON.parse),
                AsyncStorage.getItem("skills"),
                AsyncStorage.getItem("token")
            ]);

            const temp = selectedRecs.map(items => ({
                end: items.end,
                rsce_id: items.rsce_id,
                start: items.start,
                user_id: user.id,
                selected_skills: skills
            }));

            const response = await resourceModel.bookResource(token, temp);
            const result = await response.json();
            let alertResponse = {}

            switch (response.status) {
                case 401:
                    await AsyncStorage.clear();
                    Alert.alert((t("globals.sessionExpired")), '', [{ text: t("globals.buttons.accept"), onPress: () => navigation.navigate('Login') }]);
                    break;

                case 201:
                    await AsyncStorage.multiRemove(['skills', 'level']);
                    alertResponse = { tittle: t("resourceList.alerts.reservedRec"), status: "ok" }
                    break;

                case 400:
                    alertResponse = { tittle: t("resourceList.alerts.recNotReserved"), status: "Error" }
                    break;

                default:
                    break;
            }

            if (result.failedResults) {
                const failedResourceNames = result.failedResults.map(res => {
                    const matchingResource = resource.find(rec => res.rsce_id == rec.rsce_id);
                    return matchingResource ? `${matchingResource.first_name} ${matchingResource.last_name}` : null;
                }).filter(Boolean);

                alertResponse = {
                    tittle: t("resourceList.alerts.someRecNotReserved"),
                    body: failedResourceNames.join('\n') + t("resourceList.alerts.otherRecReserved"),
                    status: "ok"
                }

            }

            return alertResponse
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const extraRequest = async (extraData) => {
        try {
            const [user, token] = await Promise.all([
                AsyncStorage.getItem("result").then(JSON.parse),
                AsyncStorage.getItem("token")
            ]);

            const temp = extraData.map(items => ({
                end: items.end,
                rsce_id: items.rsce_id,
                start: items.start,
                user_id: user.id
            }));

            const response = await resourceModel.extraRequest(token, temp);
            const result = await response.json();
            let alertResponse = {}

            console.log(response.status);
            switch (response.status) {
                case 401:
                    await AsyncStorage.clear();
                    Alert.alert(t("globals.sessionExpired"), '', [{ text: t("globals.buttons.accept"), onPress: () => navigation.navigate('Login') }]);
                    break;

                case 201:
                    alertResponse = { tittle: t("resourceList.alerts.solRequested"), status: "ok" }
                    break;

                case 400:
                    alertResponse = { tittle: t("resourceList.alerts.solNotRequested"), status: "Error" }
                    break;

                case 404:
                    alertResponse = { tittle: t("resourceList.alerts.nothingToRequest"), status: "Error" }
                    break;

                default:
                    break;
            }

            if (result.failedResults) {
                const failedResourceNames = result.failedResults.map(res => {
                    const matchingResource = resource.find(rec => res.rsce_id == rec.rsce_id);
                    return matchingResource ? `${matchingResource.first_name} ${matchingResource.last_name}` : null;
                }).filter(Boolean);

                alertResponse = {
                    tittle: t("resourceList.alerts.someRequestNotDone"),
                    body: failedResourceNames.join('\n') + t("resourceList.alerts.otherReqDone"),
                    status: "ok"
                }
            }
 
            return alertResponse
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return { getResourcesBySkill, onChange, setResourceModelData, bookResource, getResourceBookDays, extraRequest, resourceModelData };
}
