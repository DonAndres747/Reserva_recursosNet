import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ResourceModel from "../models/resourceModel.js";

export default function resourceController() {
    const resourceModel = new ResourceModel();
    const [resourceModelData, setResourceModelData] = useState({ ...resourceModel });

    const getResourcesBySkill = async (skills, level) => {
        try {
            console.log("skill: ", skills);
            console.log("level: ", level);
            setResourceModelData({
                ...resourceModelData,
                skills: skills,
                level: level
            });

            const resourceModel = new ResourceModel(
                resourceModelData.user_id,
                resourceModelData.first_name,
                resourceModelData.last_name,
                resourceModelData.level,
                resourceModelData.description,
                resourceModelData.skills
            );

            console.log(resourceModelData);

            const token = await AsyncStorage.getItem("token");
            const response = await resourceModel.getResourcesBySkill(token, resourceModelData);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error("Error fetching data:", error);
            return error
        }
    };

    return { getResourcesBySkill };
}
