import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { Calendar } from 'react-native-calendars';
import Slider from "@react-native-assets/slider";
import theme from "../../theme";


export default function BookingDatesSeg({ onChange, data }) {
    const [sliderValue, setSliderValue] = useState(0);
    const [selectedDates, setSelectedDates] = useState(JSON.parse(`{"start":"false", "end":"false"}`));
    const [calendar, setCalendar] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);



    useEffect(() => {
        setSliderValue(0);
        setSelectedDates(JSON.parse(`{"start":"false", "end":"false"}`));
        setSelectedDateRange('')
    }, [data])

    const selectDates = (date) => {
        let udpatedDates = selectedDates

        udpatedDates.start == 'false' ? udpatedDates = JSON.parse(`{"start":"${date}", "end":"false"}`) :
            udpatedDates.start == date ? udpatedDates = JSON.parse(`{"start":"${udpatedDates.end}", "end":"false"}`) :
                udpatedDates.start > date ? udpatedDates = JSON.parse(`{"start":"${date}", "end":"${udpatedDates.start}"}`) :
                    udpatedDates.end == 'false' ? udpatedDates = JSON.parse(`{"start":"${udpatedDates.start}", "end":"${date}"}`) :
                        udpatedDates.end == date ? udpatedDates = JSON.parse(`{"start":"${udpatedDates.start}", "end":"false"}`) :
                            udpatedDates.end < date ? udpatedDates = JSON.parse(`{"start":"${udpatedDates.end}", "end":"${date}"}`) :
                                udpatedDates = JSON.parse(`{"start":"${udpatedDates.start}", "end":"${date}"}`)
        setSelectedDates(udpatedDates);

        const selectedDatesRange = {};
        if (udpatedDates.end != 'false') {

            for (let currentDate = new Date(udpatedDates.start); currentDate <= new Date(udpatedDates.end); currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0];

                selectedDatesRange[dateString] = {
                    selected: true,
                    color: theme.colors.naranjaNet,
                    startingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(udpatedDates.start).getDate() + "," + new Date(udpatedDates.start).getMonth()),
                    endingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(udpatedDates.end).getDate() + "," + new Date(udpatedDates.end).getMonth()),
                };

            }

        } else if (udpatedDates.start != 'false') {
            selectedDatesRange[udpatedDates.start] = {
                selected: true,
                color: theme.colors.naranjaNet,
                startingDay: true,
                endingDay: true,
            };
        }

        setSelectedDateRange(selectedDatesRange);
    }

    const saveDates = () => {
        if (selectedDates.start == "false") {
            Alert.alert("Por favor seleccione una fecha")
        } else {
            let udpatedDates = selectedDates;
            if (selectedDates.end == "false") {
                udpatedDates = JSON.parse(`{"start":"${udpatedDates.start}", "end":"${udpatedDates.start}"}`)
                setSelectedDates(udpatedDates);
            }

            onChange(udpatedDates.start + ',' + udpatedDates.end)
            contarHoras(udpatedDates.start, udpatedDates.end)
            setCalendar(!calendar)
        }
    }

    const cancelDates = () => {
        let udpatedDates = selectedDates;
        udpatedDates = JSON.parse(`{"start":"false", "end":"false"}`)
        setSelectedDates(udpatedDates);
        onChange(udpatedDates.start + ',' + udpatedDates.end)

        setSelectedDateRange('');
        setCalendar(!calendar);
    }

    function contarHoras(from, to) {
        const domingos = contarDomingos(from, to)
        const totalHoras = (((new Date(to).getDate() - new Date(from).getDate()) + 1) - domingos) * 8;
        setSliderValue(totalHoras)
        return totalHoras
    }

    function contarDomingos(from, to) {
        let count = 0;

        for (let currentDate = new Date(from); currentDate <= new Date(to); currentDate.setDate(currentDate.getDate() + 1)) {
            if (currentDate.getDay() === 0) {
                count++;
            }
        }

        return count;
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerSeg}>
                <Text style={styles.textSeg}>
                    Desde:
                </Text>
                <Text
                    style={styles.date}
                    onPress={() => setCalendar(!calendar)}
                >
                    {selectedDates.start == "false" ? "" : selectedDates.start}
                </Text>
            </View>
            <View style={styles.containerSeg}>
                <Text style={styles.textSeg}>
                    Hasta:{" "}
                </Text>
                <Text
                    style={styles.date}
                    onPress={() => setCalendar(!calendar)}
                >
                    {selectedDates.end == "false" ? "" : selectedDates.end}
                </Text>
            </View >
            <View>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={80}
                    value={sliderValue}
                    thumbStyle={styles.thumbStyle}
                    enabled={false}
                    trackHeight={2}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="grey"
                />
                <View style={styles.middleLine} />
                <Text style={styles.middleLineLabel}>
                    {sliderValue} hrs
                </Text>
            </View>



            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={calendar}
                    onRequestClose={() => {
                        setCalendar(!calendar)
                    }}
                >
                    <View style={styles.centeredView}>
                        <Calendar
                            style={styles.modalView}
                            minDate={currentDate.toISOString().split('T')[0]}
                            theme={{
                                monthTextColor: theme.colors.naranjaNet
                            }}
                            onDayPress={(date) => (selectDates(date.dateString))}
                            markingType="period"
                            markedDates={{
                                ...selectedDateRange
                            }}

                        />
                        <View style={styles.calendarButtons}>
                            <TouchableWithoutFeedback onPress={() => cancelDates()}>
                                <View style={styles.calendarButton}>
                                    <Text style={styles.calendarButtonText}>
                                        Resetear
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => saveDates()}>
                                <View style={styles.calendarButton}>
                                    <Text style={styles.calendarButtonText}>
                                        Aceptar
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Modal>

            </View>
        </View >
    );
}



function autoWidth(percentage) {
    return (Dimensions.get('window').width * (percentage / 100));
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
        width: 155,
        marginHorizontal: 5,
    },
    thumbStyle: {
        width: 7,
        height: 15,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '25%',
        backgroundColor: theme.colors.blancoNetTransp
    },
    modalView: {
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical: 10,
        backgroundColor: theme.colors.azulNet,
        width: autoWidth(75)
    },
    calendarButton: {
        backgroundColor: theme.colors.azulNet,
        marginVertical: 3,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 5,
    },
    calendarButtonText: {
        color: "white",
        textAlign: "center",
        padding: 7,
        fontSize: 15
    },
    calendarButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: 'center',
        width: autoWidth(75)
    }
});