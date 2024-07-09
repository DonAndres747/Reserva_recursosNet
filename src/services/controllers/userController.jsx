import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import UserModel from "../models/userModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import newClientController from "./newClientController";

export default function userController() {
    const navigation = useNavigation();
    const userModel = new UserModel();
    const [loading, setLoading] = useState(false);
    const [userModelData, setUserModelData] = useState({ ...userModel });

    const onChange = (field, value) => {
        setUserModelData({ ...userModelData, [field]: value });
    };

    const { onNewClient, createNewClient } = newClientController();

    const saveData = async (newClient) => {
        setLoading(true);
        if (!userModelData.first_name || !userModelData.last_name || !userModelData.company_id || !userModelData.phone || !userModelData.email || !userModelData.password || !userModelData.password2 || !userModelData.country_id || userModelData.country_id == "select" || userModelData.company_id == "select") {
            Alert.alert("Por favor complete todos los campos obligatorios");
            setLoading(false);
        } else {
            try {
                const userModel = new UserModel(
                    userModelData.first_name,
                    userModelData.last_name,
                    userModelData.company_id,
                    userModelData.phone,
                    userModelData.email,
                    userModelData.password,
                    userModelData.password2,
                    userModelData.country_id
                );

                const response = await userModel.registerUser(userModelData);
                const result = await response.json();

                if (response.status === 201) {

                    delete userModelData.password;
                    delete userModelData.password2;
                    await AsyncStorage.setItem("token", result.result.message)
                    await AsyncStorage.setItem("result", JSON.stringify(userModelData))

                    newClient ? (
                        createNewClient(),
                        navigation.navigate('Home')
                    ) : navigation.navigate('Home');

                } else if (response.status === 500) {
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

    const userLogin = async () => {
        setLoading(true);
        try {

            const userModel = new UserModel(
                userModelData.id,
                userModelData.first_name,
                userModelData.last_name,
                userModelData.company_id,
                userModelData.phone,
                userModelData.email,
                userModelData.password,
                userModelData.password2,
                userModelData.country_id
            );

            const response = await userModel.loginUser(userModelData);
            const result = await response.json();

            if (response.status === 200) {
                const data = (result.result.data);
                delete data.password;
                await AsyncStorage.setItem("token", result.result.token)
                await AsyncStorage.setItem("result", JSON.stringify(data))
                registerPhone(data.id)
                navigation.navigate('Home')

            } else if (response.status === 401) {
                Alert.alert(result.result.message);
            } else {
                Alert.alert("Algo ha salido mal :(");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const registerPhone = async (id) => {
        try {
            const phoneToken = await AsyncStorage.getItem("phoneToken")
            await userModel.registerUserPhone(id, phoneToken)
        } catch (error) {
            console.error(error);
        }
    }

    return { onChange, saveData, userLogin, onNewClient, loading };
};
