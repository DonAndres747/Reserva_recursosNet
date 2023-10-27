import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Footer from "../componentes/footer.jsx";
import BodyLogin from "../componentes/Login/loginBody.jsx";
import LoginIcon from "../componentes/Login/loginIcon.jsx";
import theme from "../theme.js";
import userController from "../services/controllers/userController.jsx";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { userLogin, loading } = userController();
  return (

    <View style={{ flex: 1, alignItems: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled='false'
      >
        <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center' }}>
          <LoginIcon />
        </View>
        <View style={{ flex: 2 }}>
          <View style={{ flex: 1.3, justifyContent: 'flex-end' }}>
            <BodyLogin />
          </View>
        </View>
        <View style={{ flex: 0.9, justifyContent: 'flex-end' }}>
          <Footer />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}


export default LoginScreen;