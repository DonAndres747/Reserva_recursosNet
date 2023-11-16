import React, { useState, useEffect } from "react";
import TittleStyle from "../tittlesStyle";
import { View, TextInput, StyleSheet, Platform, Text, TouchableWithoutFeedback, Alert } from "react-native";
import theme from "../../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import userController from "../../services/controllers/userController";
import Footer from "../footer";
import { useNavigation } from '@react-navigation/native';
import ButtonStyle from "../buttonsStyle";
import RegistryComboBox from "./RegistryComboBox";
import companyController from "../../services/controllers/companyController"
import countryController from "../../services/controllers/countryController"


export default function BodyRegistry() {
    const navigation = useNavigation();
    const [selectedCoun, setSelectedCoun] = useState([]);
    const [selectedCom, setSelectedCom] = useState([]);
    const [newCompany, setNewCompany] = useState("none");

    const { getAllCompanies } = companyController();
    const [companies, setCompanies] = useState([]);

    const { getAllCountries } = countryController();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getAllCompanies()
            .then((data) => {
                const response = JSON.stringify(data);
                const parsedData = JSON.parse(response);
                setCompanies(parsedData.companies[0]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        getAllCountries()
            .then((data) => {
                const response = JSON.stringify(data);
                const parsedData = JSON.parse(response);
                setCountries(parsedData.countries[0]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }, []);

    function handleSelectCoun(value) {
        onChange("country_id", value)
        setSelectedCoun(value);
    };
    function handleSelectCom(value) {
        onChange("company_id", value)
        setSelectedCom(value);
        value == 9999 ? setNewCompany("flex") : setNewCompany("none");
    };

    const { onChange,
        saveData,
        onNewClient,
        loading } = userController();



    return (

        <View>
            <TittleStyle text='tittle'>
                Register
            </TittleStyle>
            <View style={styles.row}>
                <Icon name='face' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="nombre"
                    returnKeyType="next"
                    placeholder="  Nombre"
                    keyboardType='default'
                    style={[styles.input, styles.marginInput]}
                    onChangeText={(value) => onChange("first_name", value)}
                />
            </View>
            <View style={styles.row}>
                <Icon name='face' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="apellido"
                    returnKeyType="next"
                    placeholder="  Apellido"
                    keyboardType='default'
                    style={[styles.input, styles.marginInput]}
                    onChangeText={(value) => onChange("last_name", value)}
                />
            </View>
            <View style={styles.row}>
                <Icon name='copyright' color={theme.colors.azulNet} size={22}></Icon>
                <RegistryComboBox data={companies} onSelect={(value) => {
                    handleSelectCom(value)
                }} />
            </View>
            <View style={[styles.row, { display: newCompany }]}>
                <Icon name='copyright' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="newCompany"
                    returnKeyType="next"
                    placeholder="  Company Name*"
                    keyboardType='default'
                    style={[styles.input, styles.marginInput]}
                    onChangeText={(value) => {
                        onNewClient("company_name", value);
                    }}
                />
            </View>
            <View style={styles.row}>
                <Icon name='call' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="celular"
                    returnKeyType="next"
                    placeholder="  000000000*"
                    keyboardType='phone-pad'
                    style={[styles.input, styles.marginInput]}
                    onChangeText={(value) => onChange("phone", value)}
                />
            </View>
            <View style={styles.row}>
                <Icon name='alternate-email' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="email"
                    returnKeyType="next"
                    placeholder="  YourEmail@netlogistik.com*"
                    keyboardType='email-address'
                    autoCapitalize="none"
                    style={[styles.input, styles.marginInput]}
                    onChangeText={(value) => {
                        onChange("email", value);
                        onNewClient("user_email", value);
                    }}
                />
            </View>
            <View style={styles.row} >
                <Icon name='emoji-flags' color={theme.colors.azulNet} size={22}></Icon>
                <RegistryComboBox data={countries} onSelect={(value) => {
                    handleSelectCoun(value)
                }} />
            </View>
            <View style={styles.row}>
                <Icon name='lock' color='black' size={22}></Icon>
                <TextInput
                    label="password"
                    returnKeyType="next"
                    placeholder="  Contraseña*"
                    style={[styles.input, styles.marginInput]}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => onChange("password", value)}
                />
            </View>
            <View style={styles.row}>
                <Icon name='lock' color='black' size={22}></Icon>
                <TextInput
                    label="confirmPassword"
                    returnKeyType="next"
                    placeholder="  Confirma contraseña*"
                    style={[styles.input, styles.marginInput]}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => onChange("password2", value)}
                />
            </View>
            <View style={{ alignItems: 'center', marginTop: 45 }}>


                <TouchableWithoutFeedback onPress={() => {
                    const newC = (newCompany == "none" ? "false" : true); 
                    saveData(newC)
                }}>
                    <View>
                        <ButtonStyle name='Home'>
                            <Text>
                                {loading ? "Loading" : "Register"}
                            </Text>
                        </ButtonStyle>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.text}>
                    <Text>
                        Already have an account with us?
                    </Text>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.HiperLinks}>
                            Login
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
                <Footer />
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    input: {

        width: theme.width.input,
        height: theme.height.buttonCont,
        borderBottomWidth: 1
    },
    marginInput: {
        marginBottom: 10,
    },
    pickerIos: {
        justifyContent: 'center',
        marginLeft: 4,
        fontSize: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picker: {
        color: 'grey'
    },
    HiperLinks: {
        color: theme.colors.naranjaNet,
        marginLeft: 5,
        fontWeight: theme.fontWeight.bold
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

