import { useState } from "react";
import { Alert } from "react-native";
import SolTypModel from "../models/solTypModel";

export default function solTypController() {
    const solTypModel = new SolTypModel();

    const getAllSolTypes = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await solTypModel.getSolTypes();
                const result = await response.json();
                resolve(result); 
            } catch (error) {
                console.error("Error fetching data:", error);
                reject(error); 
            }
        });
    };

    return { getAllSolTypes };
}
