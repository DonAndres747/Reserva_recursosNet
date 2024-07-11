import React from "react";
import { View } from "react-native";

import Footer from "../componentes/footer.jsx";
import Logo from "../componentes/logo";
import LoginText from "../componentes/Login/loginText";
import NavigationButton from "../componentes/NavigationButton";
import { useTranslation } from 'react-i18next';
import '../helpers/i18n.js';  


const MainScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <View>
        <Logo logoTyp='logo' />
        <LoginText />
      </View>
      <View>
        <NavigationButton name='Login'>{t('main.login')}</NavigationButton>
        <NavigationButton name='Registry'>{t('main.registry')}</NavigationButton>
      </View>
      <View>
        <Footer />
      </View>
    </View>
  )
}

export default MainScreen;