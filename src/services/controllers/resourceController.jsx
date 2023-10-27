import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ResourceModel from "../models/resourceModel.js";


export default function resourceController() {


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

    return { getResourcesBySkill, onChange, setResourceModelData, resourceModelData };
}
