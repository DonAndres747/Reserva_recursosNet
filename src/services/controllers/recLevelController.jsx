import { useState } from "react";
import { Alert } from "react-native";
import RecLevelModel from "../models/recLevelModel";

export default function recLevelController() {
    const recLevelModel = new RecLevelModel();

    const getAllRecLevels = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await recLevelModel.getSolTypes();
                const result = await response.json();
                resolve(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                reject(error);
            }
        });
    };

    return { getAllRecLevels };
}
