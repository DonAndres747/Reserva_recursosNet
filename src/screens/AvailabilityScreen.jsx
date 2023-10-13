import React from "react";
import { View, Text } from "react-native";
import Logo from "../componentes/logo.jsx";
import Footer from "../componentes/footer.jsx";
import AvailabilityBody from "../componentes/Availability/AvailabilityBody.jsx";

const AvailabilityScreen = () => {

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <AvailabilityBody />
            <View style={{ alignItems: 'center', marginTop: "15%" }}>
                <Logo logoTyp='subLogo' />
                <Footer margin='false' />
            </View>
        </View >
    )
}

export default AvailabilityScreen;