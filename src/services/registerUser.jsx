import React, { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function RegisterUser() {
    const navigation = useNavigation();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false);

    const onChangeName = (value) => {
        setUser({ ...user, firstName: value });
    };
    const onChangeLastName = (value) => {
        setUser({ ...user, lastName: value });
    };
    const onChangeCompany = (value) => {
        setUser({ ...user, company: value });
    };
    const onChangePhone = (value) => {
        setUser({ ...user, phone: value });
    };
    const onChangeEmail = (value) => {
        setUser({ ...user, email: value });
    };
    const onChangePassword = (value) => {
        setUser({ ...user, password: value });
    };


    const saveData = () => {
        setLoading(true)
        let myHeaders = new Headers();


        myHeaders.append(
            'Authorization',
            //     // 'Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263'
        );

        myHeaders.append('Content-Type', 'application/json');

        fetch('http://192.168.11.70:8090/user/', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                company: user.company,
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                password: user.password,
                phone: user.phone,
            }),
        })
            .then((response) => {
                setLoading(false);
                return response.json(); // Analiza la respuesta JSON
            })
            .then((result) => {
                console.log("response: { ", result.result.status, " }-----------------------------", JSON.stringify(result.result.message));

                if (result.result.status == 201) {
                    navigation.navigate('Home', { name: user.firstName + " " + user.lastName });
                } else if (result.result.message === 1062) {
                    Alert.alert("El email ya está registrado");
                } else {
                    Alert.alert("Algo ha salido mal  :(");
                }
            })
            .catch((error) => {
                console.error(error);
            });

    };

    return { onChangeName, onChangeLastName, onChangeCompany, onChangePhone, onChangeEmail, onChangePassword, saveData, loading }

}