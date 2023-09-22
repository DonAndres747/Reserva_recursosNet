import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { url, port } from "./conection";

export default function RegisterUser() {
    const navigation = useNavigation();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: '',
        password: '',
        password2: '',
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
    const onChangePassword2 = (value) => {
        setUser({ ...user, password2: value })
    }


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
                    } else if (result.result.message === 1062) {
                        Alert.alert("El email ya está registrado");
                    } else if (result.result.message === 400 && user.password !== user.password2) {
                        Alert.alert("Las contraseñas no coinciden");
                    } else if (result.result.message === 402) {
                        Alert.alert("El formato de correo electrónico no es válido.");
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

    return { onChangeName, onChangeLastName, onChangeCompany, onChangePhone, onChangeEmail, onChangePassword, onChangePassword2, saveData, loading }

}