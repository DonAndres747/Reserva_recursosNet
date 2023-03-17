import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TittleStyle from "../componentes/tittlesStyle";
import theme from "../theme";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 4 }}>
      <View>
        <TittleStyle text='subtittle' fontColor='Orange' >
          Portal de Servicios de netLogistiK
        </TittleStyle>
        <Text style={styles.text}>
          Enter your email, we´ll send you a link to reset your password.
        </Text>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={() => navigation.setOptions({ title: 'Update!' })}>
          <Text>HOME</Text>
        </TouchableWithoutFeedback>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    color: theme.colors.azulNet,
    fontSize: theme.fontSizes.subText,
    marginLeft: theme.margin.marginLeft
  }
})

export default HomeScreen;