import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LoginBtn2 } from "../componentes/loginBtn"
import Footer from "../componentes/footer.jsx";
import BodyLogin from "../componentes/loginBody";
import theme from "../theme";

const LoginScreen = () => {
  return (
    <View style={{ flex: 3, justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flex: 2, justifyContent: 'space-between' }}>
        <View style={{ flex: 1.5, justifyContent: 'flex-end' }}>
          <BodyLogin />
        </View>
        <View style={{ flex: 0.8, justifyContent: 'flex-end', alignItems: 'center' }}>
          <LoginBtn2 />
          <View style={styles.text}>
            <Text>
              New to Netlogistik?
            </Text>
            <Text style={styles.HiperLinks}>
                 Register
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Footer />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    HiperLinks:{
      color: theme.colors.naranjaNet, 
      marginLeft: 5, 
      fontWeight:theme.fontWeight.bold
    },
    text:{
      flexDirection:'row', justifyContent:'space-evenly'
    }
})

export default LoginScreen;