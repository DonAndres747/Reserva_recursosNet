import React from "react";
import { View } from "react-native";
import HomeBody from "../componentes/Home/HomeBody.jsx";
import Logo from "../componentes/logo.jsx";
import Footer from "../componentes/footer.jsx";
import theme from "../theme";

const HomeScreen = () => {

  return (
    <View style={{ flex: 1 }}>
      <HomeBody />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Logo logoTyp='subLogo' />
        <Footer margin='false'/>
      </View>
    </View >
  )
}

export default HomeScreen;