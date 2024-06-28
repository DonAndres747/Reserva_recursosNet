import React from "react";
import { View, Text } from "react-native";
import Logo from "../componentes/logo.jsx";
import Footer from "../componentes/footer.jsx";
import RequestBody from "../componentes/Requests/RequestBody.jsx"

const Requestcreen = () => {

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <RequestBody />
            <View style={{ alignItems: 'center', marginTop: "5%" }}>
                <Logo logoTyp='subLogo' />
                <Footer margin='false' />
            </View>
        </View >
    )
}

export default Requestcreen;