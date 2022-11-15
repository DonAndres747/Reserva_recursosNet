import React from "react";
import { Button, Text, View, toy} from "react-native";
import LoginBtn from "../componentes/loginBtn"
import Logo from "../componentes/logo";
import RegisterBtn from "../componentes/RegistryBtn";

const Login = () => {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Logo/>
          <LoginBtn/>
          <RegisterBtn/>
        </View>
    )
}

export default Login;