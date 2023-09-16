import React, { useState } from "react";
import TittleStyle from "../tittlesStyle";
import { View, TextInput, StyleSheet, Platform, Text, TouchableWithoutFeedback, Alert } from "react-native";
import theme from "../../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';
import ModalDropdown from 'react-native-modal-dropdown';
import RegisterUser from "../../services/registerUser";
import NavigationButton from "../NavigationButton";
import Footer from "../footer";
import { useNavigation } from '@react-navigation/native';
import ButtonStyle from "../buttonsStyle";


export default function BodyRegistry() {
    const navigation = useNavigation();
    const { onChangeName,
        onChangeLastName,
        onChangeCompany,
        onChangePhone,
        onChangeEmail,
        onChangePassword,
        onChangePassword2,
        saveData,
        loading } = RegisterUser();
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
                    onChangeText={(value) => onChangeName(value)}
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
                    onChangeText={(value) => onChangeLastName(value)}
                />
            </View>
            <View style={styles.row}>
                <Icon name='copyright' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="empresa"
                    returnKeyType="next"
                    placeholder="  Compañia*"
                    keyboardType='default'
                    style={[styles.input, styles.marginInput]}
                    onChangeText={(value) => onChangeCompany(value)}
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
                    onChangeText={(value) => onChangePhone(value)}
                />
            </View>
            <View style={styles.row}>
                <Icon name='alternate-email' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="email"
                    returnKeyType="next"
                    placeholder="  YourEmail@netlogistik.com*"
                    keyboardType='email'
                    autoCapitalize="none"
                    style={[styles.input, styles.marginInput]}
                    onChangeText={(value) => onChangeEmail(value)}
                />
            </View>
            <View style={styles.row} >
                <Icon name='emoji-flags' color={theme.colors.azulNet} size={22}></Icon>
                <View style={[styles.input, styles.marginInput]}>
                    {pickerOS()}
                </View>
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
                    onChangeText={(value) => onChangePassword(value)}
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
                    onChangeText={(value) => onChangePassword2(value)}
                />
            </View>
            <View style={{ alignItems: 'center', marginTop: 45 }}>

                <ButtonStyle name='Home'>
                    <TouchableWithoutFeedback onPress={saveData}>
                        <Text>
                            {loading? "Loading": "Register"}
                        </Text>
                    </TouchableWithoutFeedback>
                </ButtonStyle>

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
        </View>
    )
}

const paises = [
    {
        name: "Colombia",
        id: "Col"
    },
    {
        name: "Mexico",
        id: "Mex"
    },
    {
        name: "España",
        id: "Esp"
    },
    {
        name: "Estados Unidos",
        id: "EEUU"
    }
]

const pickerOS = Platform.select({
    ios: () => {
        return (
            <ModalDropdown
                onValueChange={(value) => console.log(value)}
                defaultValue='Pais'
                defaultTextStyle={[styles.picker]}
                options={paises.map(n => (
                    n.name
                ))}
                key={paises.map(n => (
                    n.id
                ))}
                dropdownStyle={[styles.pickerIos, { width: theme.width.input }]}
                textStyle={[styles.pickerIos]}
                style={[styles.input, styles.pickerIos]} />
        )
    },
    default: () => {

        const [selectedCountry, setSelectedCountry] = useState();

        return (

            <Picker
                selectedValue={selectedCountry}
                onValueChange={setSelectedCountry}
            >
                <Picker.Item label="Pais" style={styles.picker} />
                {paises.map(n => (
                    <Picker.Item label={n.name} value={n.id} key={n.id} />
                ))}
            </Picker>

        )
    }

});


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

