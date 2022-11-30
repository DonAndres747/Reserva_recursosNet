import React from "react";
import { View, ScrollView } from "react-native";
import BodyRegistry from "../componentes/Registry/RegistryBody.jsx";

const RegistryScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 65 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View>
                    <BodyRegistry />
                </View>
            </ScrollView>
        </View>
    )
}


export default RegistryScreen;