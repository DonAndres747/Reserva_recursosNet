import React from "react";
import { View } from "react-native";
import RecoverIcon from "../componentes/Recover/recoverIcon";
import RecoverBody from "../componentes/Recover/recoverBody";

const RecoverScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
      <RecoverIcon />
      <RecoverBody />
    </View>
  )
}

export default RecoverScreen;