import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { LoginBtn2 } from "../componentes/loginBtn"
import Footer from "../componentes/footer.jsx";
import BodyLogin from "../componentes/loginBody";
import LoginIcon from "../componentes/loginIcon";
import theme from "../theme";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 4, justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flex: 2.5, justifyContent: 'center' }}>
        <LoginIcon />
      </View>
      <View style={{ flex: 2, justifyContent: 'space-between' }}>
        <View style={{ flex: 1.3, justifyContent: 'flex-end' }}>
          <BodyLogin />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <LoginBtn2 />
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
    flexDirection: 'row', justifyContent: 'space-evenly'
  }
})

export default LoginScreen;