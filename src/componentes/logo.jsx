import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo({logoTyp}) {
    const logoStyle=[
        logoTyp == 'logo' && styles.image, 
        logoTyp == 'subLogo' && styles.subImage, 
        
    ]

    return <Image source={require('../assets/logo.png')} style={logoStyle} />
}


const styles = StyleSheet.create({
    image: {
        width: 215,
        height: 110,
        marginTop:160
    },
    subImage: {
        width: 100,
        height: 50
    },
})

