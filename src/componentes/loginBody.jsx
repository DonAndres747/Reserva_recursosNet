import React from "react";
import TittleStyle from "../componentes/tittlesStyle";
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Alert } from "react-native";
import theme from "../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';


export default function BodyLogin() {
    const navigation = useNavigation();
    return (
        <View>
            <TittleStyle text='tittle'>
                Login
            </TittleStyle>
            <View style={styles.row}>
                <Icon name='alternate-email' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    placeholder="  YourEmail@hotmail.com"
                    keyboardType='email-address'
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Icon name='lock' color='black' size={22}></Icon>
                <TextInput
                    label="Password"
                    returnKeyType="next"
                    placeholder="  Password"
                    keyboardType='Password'
                    style={[styles.input]}
                    secureTextEntry={true}
                />
            </View>
            <TouchableWithoutFeedback onPress={() => Alert.alert('jodido')}>
                <View>
                    <Text style={styles.remember}>
                        Remember Password?
                    </Text>
                </View>
            </TouchableWithoutFeedback>
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
    },
    remember: {
        alignSelf: 'flex-end',
        color: theme.colors.naranjaNet,
        fontWeight: theme.fontWeight.bold
    },
    asd: {
        borderTopWidth: 1
    }
})