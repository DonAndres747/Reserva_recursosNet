import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Slider } from "react-native-elements";
import theme from "../../theme";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const currentDate = new Date();
const ToDate = new Date();
currentDate.setDate(currentDate.getDate() + 5);
ToDate.setDate(ToDate.getDate() + 6)

export default function BookingDatesSeg({ onChange }) {
    const [sliderValue, setSliderValue] = useState(0);
    const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
    const [selectedFromDate, setSelectedFromDate] = useState(null);
    const [selectedToDate, setSelectedToDate] = useState(null);

    const showDatePicker = (as) => {
        as == "from" ? setFromDatePickerVisibility(true) : setToDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setFromDatePickerVisibility(false);
        setToDatePickerVisibility(false);
    };

    const handleConfirm = (date, as) => {
        const isValid = isSunday(date)
        if (!isValid) {
            if (as == "from") {
                setSelectedFromDate(date);
                ToDate.setDate(date.getDate() + 1);
            } else {
                setSelectedToDate(date);
            }
        } else {
            Alert.alert("Por favor seleccione un día hábil")
        }

        hideDatePicker();
        as == "from" ?
            onChange(date.toDateString() + " , " + (selectedToDate == null ? "" : selectedToDate.toDateString())) :
            onChange((selectedFromDate == null ? "" : selectedFromDate.toDateString()) + " , " + date.toDateString())
    };

    const isSunday = (date) => {
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0;
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerSeg}>
                <Text style={styles.textSeg}>
                    Desde:
                </Text>
                <Text
                    style={styles.date}
                    onPress={() => showDatePicker("from")}
                >
                    {selectedFromDate == null ? "" : selectedFromDate.toDateString()}
                </Text>
                <DateTimePickerModal
                    isVisible={isFromDatePickerVisible}
                    mode="date"
                    onConfirm={value => { handleConfirm(value, "from") }}
                    onCancel={() => hideDatePicker()}
                    minimumDate={currentDate}
                />
            </View>
            <View style={styles.containerSeg}>
                <Text style={styles.textSeg}>
                    Hasta:{" "}
                </Text>
                <Text
                    style={styles.date}
                    onPress={() => showDatePicker("to")}
                >
                    {selectedToDate == null ? "" : selectedToDate.toDateString()}
                </Text>
                <DateTimePickerModal
                    isVisible={isToDatePickerVisible}
                    mode="date"
                    onConfirm={value => { handleConfirm(value, "to") }}
                    onCancel={() => hideDatePicker()}
                    minimumDate={ToDate}
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
        </View >
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