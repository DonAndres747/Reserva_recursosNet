import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import UserModel from "../models/userModel";

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
        if (!userModelData.firstName || !userModelData.lastName || !userModelData.company || !userModelData.phone || !userModelData.email || !userModelData.password || !userModelData.password2) {
            Alert.alert("Por favor complete todos los campos obligatorios");
            setLoading(false);
        } else {
            try {

                const userModel = new UserModel(
                    userModelData.firstName,
                    userModelData.lastName,
                    userModelData.company,
                    userModelData.phone,
                    userModelData.email,
                    userModelData.password,
                    userModelData.password2
                );

                const response = await userModel.registerUser(userModelData);

                if (response.status === 201) {
                    navigation.navigate('Home',
                        {
                            name: userModelData.firstName.charAt(0).toUpperCase() + userModelData.firstName.slice(1).toLowerCase() + " " +
                                userModelData.lastName.charAt(0).toUpperCase() + userModelData.lastName.slice(1).toLowerCase()
                        }
                    )
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

    const userLogin = async () => {
        setLoading(true);
        try {

            const userModel = new UserModel(
                userModelData.firstName,
                userModelData.lastName,
                userModelData.company,
                userModelData.phone,
                userModelData.email,
                userModelData.password,
                userModelData.password2
            );

            const response = await userModel.loginUser(userModelData);
            const result = await response.json();

            if (response.status === 200) {
                navigation.navigate('Home',
                    {
                        name: result.result.data.first_name.charAt(0).toUpperCase() + result.result.data.first_name.slice(1).toLowerCase() + " " +
                            result.result.data.last_name.charAt(0).toUpperCase() + result.result.data.last_name.slice(1).toLowerCase()
                    }
                )
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
