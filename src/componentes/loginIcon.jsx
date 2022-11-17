import React from "react";
import { Image, StyleSheet } from "react-native";

export default function LoginIcon() {
    return <Image source={require('../assets/login.png')} style={styles.image} />
}


const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 160,
        marginTop:50
    },
})

