import React, { useState } from "react";
import { Alert } from "react-native";

export default function RegisterUser() {
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

        fetch('http://192.168.11.114:4000/api/user/registro/', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                company: user.company,
                phone: user.phone,
                email: user.email,
                password: user.password
            }),
        })
            .then((response) => {
                setLoading(false)
                response.text()
            })
            .then((result) => /*console.log(result)*/console.log(result))
            .catch((error) => /*console.log(error)*/Alert.alert(error));


    };

    return { onChangeName, onChangeLastName, onChangeCompany, onChangePhone, onChangeEmail, onChangePassword, saveData }

}