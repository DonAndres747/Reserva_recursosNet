import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { url, port } from "../conection";
import { usermodel } from "../../models/userModel"; 

export default function RegisterUser() {
    const navigation = useNavigation();
    const [user, setUser] = useState(usermodel);
    const [loading, setLoading] = useState(false);

    const onChange = (field, value) => {
        setUser({ ...user, [field]: value });
    };


    const saveData = () => {
        setLoading(true)
        let myHeaders = new Headers();


        myHeaders.append(
            'Authorization',
            //     // 'Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263'
        );

        myHeaders.append('Content-Type', 'application/json');

        if (user.password && user.email && user.company && user.phone) {
            fetch(`http://${url}:${port}/user/`, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    company: user.company,
                    email: user.email,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    password: user.password,
                    password2: user.password2,
                    phone: user.phone,
                }),
            })
                .then((response) => {
                    setLoading(false);
                    return response.json();
                })
                .then((result) => {
                    console.log("response: { ", result.result.status, " }-----------------------------", result.result.message);
                    if (result.result.status == 201) {
                        navigation.navigate('Home', { name: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase() + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase() });
                    } else if (result.result.status == 500) {
                        Alert.alert(result.result.message);
                    } else {
                        Alert.alert("Algo ha salido mal  :(");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            Alert.alert("Por favor complete todos los campos obligatorios");
            setLoading(false);
        }

    };

    return { onChange, saveData, loading }

}