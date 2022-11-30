import react from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import TittleStyle from "../tittlesStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../../theme";
import ButtonStyle from "../buttonsStyle";

export default function RecoverBody() {
    return (
        <View>
            <TittleStyle text='tittle'>
                Forgot{"\n"}
                Password?
            </TittleStyle>
            <Text style={styles.text}>
                Enter your email, we´ll send you a link to reset your password.
            </Text>
            <View style={styles.row}>
                <Icon name='alternate-email' color={theme.colors.azulNet} size={22}></Icon>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    placeholder="  YourEmail@netlogistik.com"
                    keyboardType='email-address'
                    style={styles.input}
                />
            </View>
            <View style={styles.button}>
                <ButtonStyle>
                    Submit
                </ButtonStyle>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        marginBottom:15,
        width: theme.width.input,
        height: theme.height.buttonCont,
        borderBottomWidth: 1
    },
    button:{
        alignItems:'center',
        marginTop: theme.margin.maringTop
    },
    text:{
        marginLeft: theme.margin.marginLeft, 
        marginRight: theme.margin.marginRight,
        marginBottom:5,
    }
})