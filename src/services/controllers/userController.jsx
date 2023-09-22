// controllers/RegisterUserController.js
import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { url, port } from "../conection";
import UserModel from "../models/userModel";

export default function RegisterUserController() {
    const navigation = useNavigation();
    const userModel = new UserModel();
    const [loading, setLoading] = useState(false);

    // Inicializa el estado con los valores del modelo si aún no se han establecido
    const [userModelData, setUserModelData] = useState({ ...userModel });

    const onChange = (field, value) => {
        // Actualiza solo el campo especificado en el estado
        setUserModelData({ ...userModelData, [field]: value });
    };

    const saveData = async () => {
        setLoading(true);
        if (!userModelData.firstName || !userModelData.lastName || !userModelData.company || !userModelData.phone || !userModelData.email || !userModelData.password || !userModelData.password2) {
            Alert.alert("Por favor complete todos los campos obligatorios");
            setLoading(false);
            console.log(userModelData);
        } else {
            console.log(userModelData);
            try {
                const response = await userModel.registerUser(userModelData);

                if (response.status === 201) {
                    const result = await response.json();
                    navigation.navigate('Home', {
                        name: userModelData.firstName.charAt(0).toUpperCase() + userModelData.firstName.slice(1).toLowerCase() + " " +
                            userModelData.lastName.charAt(0).toUpperCase() + userModelData.lastName.slice(1).toLowerCase()
                    });
                } else if (response.status === 500) {
                    const result = await response.json();
                    Alert.alert(result.result.message);
                } else {
                    Alert.alert("Algo ha salido mal :(");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return { onChange, saveData, loading };
}
