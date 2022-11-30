import React from "react";
import { Image, StyleSheet } from "react-native";

export default function RecoverIcon() {
    return <Image source={require('../../assets/recover.png')} style={styles.image} />
}


const styles = StyleSheet.create({
    image: {
        width: 220,
        height: 170,
        marginTop:130,
        marginBottom:20
    },
})

