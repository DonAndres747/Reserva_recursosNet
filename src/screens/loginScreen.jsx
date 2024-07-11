import React from "react";
import { View,  KeyboardAvoidingView } from "react-native";

import BodyLogin from "../componentes/Login/loginBody.jsx";
import Footer from "../componentes/footer.jsx";
import LoginIcon from "../componentes/Login/loginIcon.jsx"; 

const LoginScreen = () => { 
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