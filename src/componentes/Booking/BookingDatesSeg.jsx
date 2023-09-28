import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Slider } from "react-native-elements";
import theme from "../../theme";



export default function BookingDatesSeg() {
    const [sliderValue, setSliderValue] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.containerSeg}>
                <Text style={styles.textSeg}>
                    Desde:
                </Text>
                <TextInput
                    style={styles.date}
                />
            </View>
            <View style={styles.containerSeg}>
                <Text style={styles.textSeg}>
                    Hasta:{" "}
                </Text>
                <TextInput
                    style={styles.date}
                />
            </View >
            <View>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={sliderValue}
                    thumbStyle={styles.thumbStyle}
                />
                <View style={styles.middleLine} />
                <Text style={styles.middleLineLabel}>
                    40 hrs
                </Text>
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: 165,
        marginRight: 2,
        marginVertical: 15
    },
    containerSeg: {
        flexDirection: "row",
        marginVertical: 3,
        justifyContent: "space-evenly",

    },
    textSeg: {
        fontSize: theme.fontSizes.buttons
    },
    date: {
        backgroundColor: "#dcdcdc",
        width: 100,
        margin: 1,
        borderWidth: 1,
        height: 25,
        borderColor: "#bdbdbd"
    },
    separator: {
        borderBottomWidth: 2,
        width: 160,
        marginVertical: 3,
        alignSelf: 'center',
    },
    slider: {
        width: 160,
    },
    thumbStyle: {
        width: 9,
        height: 18,
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 1
    },
    middleLine: {
        position: 'absolute',
        borderStyle: 'dotted',
        height: 20,
        borderLeftWidth: 2,
        borderColor: "darkgrey",
        left: '50%',
        top: "25%",
        transform: [{ translateX: -0.5 }],
    },
    middleLineLabel: {
        left: '39%',
        top: "73%",
        position: 'absolute',
    }
});
