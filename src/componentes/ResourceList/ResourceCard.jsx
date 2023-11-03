import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions, ScrollView, Image, Modal } from "react-native";
import { Calendar } from 'react-native-calendars';

import ButtonStyle from "../buttonsStyle";
import theme from "../../theme";


function ResourceCard({ onSelect, data }) {
    const [resources, setResources] = useState();
    const [dataG, seDataG] = useState(true);
    const [calendars, setCalendars] = useState([]);
    const [resourceDates, setResouceDates] = useState([]);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);


    useEffect(() => {
        try {
            setResources(data);
            setCalendars(Array(data.length).fill(false));
            setResouceDates(Array(data.length).fill(JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`)));
            (typeof (data)) ? seDataG(false) : ""
        } catch (error) {
        }

    }, [data])


    const saveDates = (index) => {
        if (resourceDates[index].start == "false") {
            Alert.alert("Por favor seleccione una fecha")
        } else {
            const udpateDates = [...resourceDates];
            if (resourceDates[index].end == "false") {
                udpateDates[index] = JSON.parse(`{"rsce_id":"${udpateDates[index].rsce_id}", "start":"${udpateDates[index].start}", "end":"${udpateDates[index].start}"}`)
                setResouceDates(udpateDates);
            }

            onSelect((udpateDates.filter(item => item.rsce_id !== "false")))
            toggleItem(index);
        }
    }

    const cancelDates = (index) => {
        const udpateDates = [...resourceDates];
        udpateDates[index] = JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`)
        setResouceDates(udpateDates);
        onSelect((udpateDates.filter(item => item.rsce_id !== "false")))
        toggleItem(index)
    }

    const toggleItem = (index) => {
        const updatedSelectedItems = [...calendars];
        updatedSelectedItems[index] = !updatedSelectedItems[index];
        setCalendars(updatedSelectedItems);
        return updatedSelectedItems;
    };


    const selectDates = (index, date, resource_id) => {
        const udpateDates = [...resourceDates];
        udpateDates[index].start == 'false' ? udpateDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${date}", "end":"false"}`) :
            udpateDates[index].start == date ? udpateDates[index] = JSON.parse(`{"rsce_id":"false", "start":"${udpateDates[index].end}", "end":"false"}`) :
                udpateDates[index].start > date ? udpateDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${date}", "end":"${udpateDates[index].start}"}`) :
                    udpateDates[index].end == 'false' ? udpateDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpateDates[index].start}", "end":"${date}"}`) :
                        udpateDates[index].end == date ? udpateDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpateDates[index].start}", "end":"false"}`) :
                            udpateDates[index].end < date ? udpateDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpateDates[index].end}", "end":"${date}"}`) :
                                udpateDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpateDates[index].start}", "end":"${date}"}`)

        setResouceDates(udpateDates);
    }

    const card = () => {
        try {
            return resources.map((element, index) => (
                < View key={element.resource_id} style={styles.card} >
                    <Image source={require('../../assets/profile.png')} style={styles.pict} />
                    <Text style={styles.resourceName}>
                        {element.first_name}
                        {" "}
                        {element.last_name}
                    </Text>
                    <Text style={styles.resourceLevel}>
                        {element.long_dsc}
                    </Text>
                    <Text style={styles.resourceDescription}>
                        {element.description}
                    </Text>
                    <TouchableWithoutFeedback onPress={() => toggleItem(index)}>
                        <View  >
                            <ButtonStyle>Agregar</ButtonStyle>
                        </View>
                    </TouchableWithoutFeedback>

                    <View >
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={calendars[index]}
                            onRequestClose={() => {
                                toggleItem(index)
                            }}
                        >
                            <View style={styles.centeredView}>
                                <Calendar
                                    style={styles.modalView}
                                    minDate={currentDate.toISOString().split('T')[0]}
                                    // markingType="period"
                                    theme={{
                                        monthTextColor: theme.colors.naranjaNet,
                                    }}
                                    disableAllTouchEventsForDisabledDays={true}
                                    onDayPress={(date) => selectDates(index, date.dateString, element.resource_id)}
                                    markedDates={{
                                        ...unavailableDates,
                                        ...(resourceDates[index] ? {
                                            [resourceDates[index].start]: { selected: true, selectedColor: theme.colors.naranjaNet },
                                            [resourceDates[index].end]: { selected: true, selectedColor: theme.colors.naranjaNet }
                                            // [resourceDates[index].start]: { selected: true, startingDay: true, color: theme.colors.naranjaNet },
                                            // [resourceDates[index].end]: { selected: true, startingDay: true, selectedColor: theme.colors.naranjaNet }
                                        } : {})
                                    }}
                                />
                                <View style={styles.calendarButtons}>
                                    <TouchableWithoutFeedback onPress={() => cancelDates(index)}>
                                        <View style={styles.calendarButton}>
                                            <Text style={styles.calendarButtonText}>
                                                Cancelar
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => saveDates(index)}>
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
                </View>
            ))
        } catch (error) {
            return <Text>No data found {":("}</Text>
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {dataG ? (
                        <Text>Loading...</Text>
                    ) : (
                        card()
                    )}
                </ScrollView>
            </View >
        </View >
    );
}

function autoWidth(percentage) {
    return (Dimensions.get('window').width * (percentage / 100));
}
function autoHeight(percentage) {
    return (Dimensions.get('window').height * (percentage / 100));
}
const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        marginVertical: 10,
    },
    cardContainer: {
        flexDirection: "row",
        width: autoWidth(85),
    },
    card: {
        borderWidth: 1,
        borderColor: "center",
        flexDirection: "column",
        alignItems: "center",
        width: autoWidth(80),
        height: autoHeight(46),
        marginHorizontal: 10,
        marginVertical: 12,
        backgroundColor: "white",
        justifyContent: "center"
    },
    pict: {
        marginVertical: 10,
    },
    resourceName: {
        fontSize: theme.fontSizes.buttons
    },
    resourceLevel: {
        fontSize: theme.fontSizes.subheading,
        color: "grey"
    },
    resourceDescription: {
        width: "80%",
        marginVertical: 20,
        textAlign: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '25%',
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

export default ResourceCard;


const unavailableDates = {
    '2023-11-18': { disabled: true, disableTouchEvent: true },
};
