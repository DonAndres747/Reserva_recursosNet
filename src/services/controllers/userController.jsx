import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import UserModel from "../models/userModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function userController() {
    const navigation = useNavigation();
    const userModel = new UserModel();
    const [loading, setLoading] = useState(false);
    const [userModelData, setUserModelData] = useState({ ...userModel });

    const onChange = (field, value) => {
        setUserModelData({ ...userModelData, [field]: value });
    };


    const saveData = async () => {
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
                    const a = await AsyncStorage.getItem("result");
                    console.log("ahp:", JSON.parse(a));
                    navigation.navigate('Home')

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


    return { onChange, saveData, userLogin, loading };
};
