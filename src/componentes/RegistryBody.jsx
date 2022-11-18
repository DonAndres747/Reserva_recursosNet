import React from "react";
import TittleStyle from "../componentes/tittlesStyle";
import { View, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import theme from "../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';


export default function BodyRegistry() {
    const navigation = useNavigation();
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
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Icon name='face' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="apellido"
                    returnKeyType="next"
                    placeholder="  Apellido"
                    keyboardType='default'
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Icon name='copyright' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="empresa"
                    returnKeyType="next"
                    placeholder="  Compañia"
                    keyboardType='default'
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Icon name='call' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="celular"
                    returnKeyType="next"
                    placeholder="  Celular"
                    keyboardType='phone-pad'
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Icon name='alternate-email' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="email"
                    returnKeyType="next"
                    placeholder="  YourEmail@netlogistik.com"
                    keyboardType='email'
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Icon name='lock' color='black' size={22}></Icon>
                <TextInput
                    label="password"
                    returnKeyType="next"
                    placeholder="  Contraseña"
                    style={[styles.input]}
                />
            </View>
            <View style={styles.row}>
                <Icon name='lock' color='black' size={22}></Icon>
                <TextInput
                    label="confirmPassword"
                    returnKeyType="next"
                    placeholder="  Confirma contraseña"
                    style={[styles.input]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 15,
        width: theme.width.input,
        height: theme.height.buttonCont,
        borderBottomWidth: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})