import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ComponentModel from "../models/componentModel";

export default function componentController() {
    const componentModel = new ComponentModel();
    const [componentsModelData, setComponentsModelData] = useState({ ...componentModel });

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

    return { getComponentsByType };
}
