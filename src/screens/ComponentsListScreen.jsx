import React from "react";
import { View, ScrollView, Text } from "react-native";
import ComponenstListBody from "../componentes/ComponentsList/ComponentsListBody";
import Logo from "../componentes/logo";
import Footer from "../componentes/footer";


const ComponentsListScreen = ({ route }) => {
    const solTyp = route.params.solTyp
    const compList = route.params.compList
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <ComponenstListBody solTyp={solTyp} compList={compList} />
            <View style={{ alignItems: 'center', marginTop: "10%" }}>
                <Logo logoTyp='subLogo' />
                <Footer margin='false' />
            </View>
        </View>
    )
}


export default ComponentsListScreen;