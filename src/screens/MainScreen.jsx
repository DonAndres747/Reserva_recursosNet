import React from "react";
import { View } from "react-native";
import { LoginBtn } from "../componentes/loginBtn"
import Logo from "../componentes/logo";
import { RegisterBtn } from "../componentes/RegistryBtn";
import Footer from "../componentes/footer.jsx";
import LoginText from "../componentes/loginText.jsx";

const MainScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <View>
        <Logo />
        <LoginText />
      </View>
      <View>
        <LoginBtn />
        <RegisterBtn />
      </View>
      <View>
        <Footer />
      </View>
    </View>
  )
}

export default MainScreen;