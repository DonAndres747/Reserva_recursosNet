import React, { useState, setState } from "react";
import TittleStyle from "../componentes/tittlesStyle";
import { View, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import theme from "../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


export default function BodyRegistry() {
    const navigation = useNavigation();
    const [selectedCountry, setSelectedCountry] = useState();

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
                    placeholder="  000000000"
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
            <View style={styles.row} >
                <Icon name='alternate-email' color={theme.colors.azulNet} size={22}></Icon>
                <View style={styles.input}>


                    <Picker
                        selectedValue={selectedCountry}
                        onValueChange={setSelectedCountry}
                    >
                        <Picker.Item label="Pais" style={styles.picker} value={null} key={'unselectable'} />
                        <Picker.Item label="Colombia" value="Col" />
                        <Picker.Item label="España" value="Es" />
                    </Picker>
                </View>
            </View>
            <View style={styles.row}>
                <Icon name='lock' color='black' size={22}></Icon>
                <TextInput
                    label="password"
                    returnKeyType="next"
                    placeholder="  Contraseña"
                    style={[styles.input]}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View style={styles.row}>
                <Icon name='lock' color='black' size={22}></Icon>
                <TextInput
                    label="confirmPassword"
                    returnKeyType="next"
                    placeholder="  Confirma contraseña"
                    style={[styles.input]}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        width: theme.width.input,
        height: theme.height.buttonCont,
        borderBottomWidth: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picker: {
        color: 'grey'
    }
})