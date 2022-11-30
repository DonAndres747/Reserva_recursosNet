import React from "react";
import { View } from "react-native";
import NavigationButton from "../componentes/NavigationButton";
import Logo from "../componentes/logo";
import Footer from "../componentes/footer.jsx";
import LoginText from "../componentes/Login/loginText";

const MainScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <View>
        <Logo />
        <LoginText />
      </View>
      <View>
        <NavigationButton name='Login'>Login</NavigationButton>
        <NavigationButton name='Registry'>Registry</NavigationButton>
      </View>
      <View>
        <Footer />
      </View>
    </View>
  )
}

export default MainScreen;