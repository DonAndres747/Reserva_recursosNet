import React from "react";
import TittleStyle from "../componentes/tittlesStyle";
import { View, TextInput, StyleSheet, Text } from "react-native";
import theme from "../theme";
import Icon from "react-native-vector-icons/MaterialIcons";


export default function BodyLogin() {
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
                    keyboardType='email'
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Icon name='lock' color='black' size={22}></Icon>
                <TextInput
                    label="Password"
                    returnKeyType="next"
                    placeholder="Password"
                    keyboardType='Password'
                    style={styles.input}
                />
            </View>
            <View>
                <Text style={styles.remember}>
                    Remember Password?
                </Text>
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
    },
    remember:{
        alignSelf:'flex-end',
        color: theme.colors.naranjaNet,
        fontWeight: theme.fontWeight.bold
    }
})