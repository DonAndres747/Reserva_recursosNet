import { useState } from "react";
import NewClientModel from "../models/newClientModel";

export default function newClientController() {
    const newClientModel = new NewClientModel();
    const [newClientData, setNewClientData] = useState({ ...newClientModel });


    const onNewClient = (field, value) => {
        setNewClientData({ ...newClientData, [field]: value });
    };

    const createNewClient = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const newClientModel = new NewClientModel(
                    newClientData.user_email,
                    newClientData.company_name,
                );
                const response = await newClientModel.registerNewClient(newClientData);
                const result = await response.json();
                resolve(result);
                console.log(result.result.status);
            } catch (error) {
                console.error("Error fetching data:", error);
                reject(error);
            }
        });
    };

    return { createNewClient, onNewClient };
};
