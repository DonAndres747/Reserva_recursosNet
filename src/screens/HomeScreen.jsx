import React from "react";
import { View } from "react-native";

import Footer from "../componentes/footer.jsx";
import HomeBody from "../componentes/Home/HomeBody.jsx";
import Logo from "../componentes/logo.jsx"; 

const HomeScreen = () => {


  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <HomeBody />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Logo logoTyp='subLogo' />
        <Footer margin='false' />
      </View>
    </View >
  )
}

export default HomeScreen;