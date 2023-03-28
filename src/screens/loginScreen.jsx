import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LoginBtn from "../componentes/NavigationButton"
import Footer from "../componentes/footer.jsx";
import BodyLogin from "../componentes/Login/loginBody";
import LoginIcon from "../componentes/Login/loginIcon";
import theme from "../theme";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (


    <View style={{ flex: 1, alignItems: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled='false'
      >
        <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center' }}>
          <LoginIcon />
        </View>
        <View style={{ flex: 2, justifyContent: 'space-between' }}>
          <View style={{ flex: 1.3, justifyContent: 'flex-end' }}>
            <BodyLogin />
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <LoginBtn name='Home' profile={"Pedro "+ "Navaja"}>
              Login 
            </LoginBtn>
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
        <View style={{ flex: 0.9, justifyContent: 'flex-end' }}>
          <Footer />
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-evenly'
  }
})

export default LoginScreen;