import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Footer from "../componentes/footer.jsx";
import theme from "../theme";
import NavigationButton from "../componentes/NavigationButton.jsx";
import BodyRegistry from "../componentes/Registry/RegistryBody.jsx";

const RegistryScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop:65  }}>
            <ScrollView 
             showsVerticalScrollIndicator={false}>
                <View>
                    <BodyRegistry />
                    <View style={{ alignItems: 'center', marginTop: 45 }}>
                        <NavigationButton name='Home'>Register</NavigationButton>
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
            </ScrollView>
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