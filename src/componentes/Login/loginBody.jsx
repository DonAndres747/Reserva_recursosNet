import React, { useState } from "react";
import TittleStyle from "../tittlesStyle";
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import theme from "../../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { showPassword } from "../../helpers/password";
import userController from "../../services/controllers/userController";
import ButtonStyle from "../buttonsStyle.jsx";

export default function BodyLogin() {


    const navigation = useNavigation();
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = showPassword();
    const [password, setPassword] = useState('');
    const { onChange, userLogin, loading } = userController();

    return (
        <View style={{ flex: 2, justifyContent: 'space-between' }}>
            <TittleStyle text='tittle'>
                Login
            </TittleStyle>
            <View style={styles.row}>
                <Icon name='alternate-email' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    placeholder="  YourEmail@netlogistik.com"
                    keyboardType='email-address'
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => onChange("email", value)}
                />
            </View>
            <View style={styles.row}>
                <Icon name='lock' color='black' size={22} style={{ marginLeft: 12 }}></Icon>
                <TextInput
                    label="Password"
                    returnKeyType="next"
                    placeholder="  Password"
                    keyboardType='Password'
                    style={[styles.input2]}
                    secureTextEntry={passwordVisibility}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => onChange("password", value)}
                />
                <TouchableWithoutFeedback onPress={handlePasswordVisibility}>
                    <Icon2 name={rightIcon} size={22} color={theme.colors.azulNet} style={{ borderBottomWidth: 1, marginRight: 12 }} />
                </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Recover')}>
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.HiperLinks} >
                        Remember Password?
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>

                <TouchableWithoutFeedback onPress={userLogin}>
                    <View>
                        <ButtonStyle name='Home'>
                            <Text>
                                {loading ? "Loading" : "Login"}
                            </Text>
                        </ButtonStyle>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.text}>
                    <Text>
                        New to Netlogistik?
                    </Text>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Registry')}>
                        <Text style={styles.HiperLinks}>
                            Register
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
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
    input2: {
        marginBottom: 15,
        width: theme.width.input2,
        height: theme.height.buttonCont,
        borderBottomWidth: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    HiperLinks: {
        alignSelf: 'flex-end',
        color: theme.colors.naranjaNet,
        fontWeight: theme.fontWeight.bold,
        marginLeft: 5,
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})