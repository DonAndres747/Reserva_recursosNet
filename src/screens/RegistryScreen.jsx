import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Footer from "../componentes/footer.jsx";
import theme from "../theme";
import { RegisterBtn2 } from "../componentes/RegistryBtn";
import BodyRegistry from "../componentes/RegistryBody.jsx";

const RegistryScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <BodyRegistry />
                <View style={{ alignItems: 'center', marginTop:45 }}>
                    <RegisterBtn2 />
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
        </View>
    )
}

const styles = StyleSheet.create({
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

export default RegistryScreen;