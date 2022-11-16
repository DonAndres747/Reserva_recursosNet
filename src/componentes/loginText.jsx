import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from '../theme.js';

export default function LoginText() {
    return (
        <View>
            <View>
                <Text style={styles.text}>
                    Your digital supply chain in our hands
                </Text>

            </View>
            {/* <View style={styles.backGroung}>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        color: theme.colors.azulNet,
        fontSize: theme.fontSizes.subText,
        textAlign: 'center'

    },
    // backGroung:{
    //     alignSelf:'center' ,
    //     backgroundColor: theme.colors.naranjaNet,
    //     flex: 0.09,
    //     width:190
    // }
})
