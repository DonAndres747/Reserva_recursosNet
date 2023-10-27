import React from "react";
import { View, ScrollView } from "react-native";
import ResourceListBody from "../componentes/ResourceList/ResourceListBody";
import Logo from "../componentes/logo";
import Footer from "../componentes/footer";

const ResourceListScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <ResourceListBody />
            <View style={{ alignItems: 'center', marginTop: "5%" }}>
                <Logo logoTyp='subLogo' />
                <Footer margin='false' />
            </View>
        </View>
    )
}


export default ResourceListScreen;