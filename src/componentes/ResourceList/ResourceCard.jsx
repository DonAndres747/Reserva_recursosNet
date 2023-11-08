import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions, ScrollView, Image, Modal } from "react-native";
import { Calendar } from 'react-native-calendars';

import resourceController from "../../services/controllers/resourceController";

import ButtonStyle from "../buttonsStyle";
import theme from "../../theme";


function ResourceCard({ onSelect, data }) {
    const [resources, setResources] = useState();
    const [dataG, seDataG] = useState(true);
    const [calendars, setCalendars] = useState([]);
    const [resourceDates, setResouceDates] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const [bookDates, setBookDates] = useState([]);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);


    const { getResourceBookDays } = resourceController();


    useEffect(() => {
        try {
            setResources(data);
            setCalendars(Array(data.length).fill(false));
            setResouceDates(Array(data.length).fill(JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`)));
            (typeof (data)) ? seDataG(false) : ""
        } catch (error) {
        }

    }, [data])

    const toggleItem = (index) => {
        const updatedSelectedItems = [...calendars];
        updatedSelectedItems[index] = !updatedSelectedItems[index];
        setCalendars(updatedSelectedItems);
        return updatedSelectedItems;
    };

    const saveDates = (index) => {
        if (resourceDates[index].start == "false") {
            Alert.alert("Por favor seleccione una fecha")
        } else {
            const udpatedDates = [...resourceDates];
            if (resourceDates[index].end == "false") {
                udpatedDates[index] = JSON.parse(`{"rsce_id":"${udpatedDates[index].rsce_id}", "start":"${udpatedDates[index].start}", "end":"${udpatedDates[index].start}"}`)
                setResouceDates(udpatedDates);
            }

            onSelect((udpatedDates.filter(item => item.rsce_id !== "false")))
            toggleItem(index);
        }
    }

    const cancelDates = (index) => {
        const udpatedDates = [...resourceDates];
        udpatedDates[index] = JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`)
        setResouceDates(udpatedDates);
        onSelect((udpatedDates.filter(item => item.rsce_id !== "false")))
        setSelectedDateRange([])
        toggleItem(index);
    }


    const selectDates = (index, date, resource_id) => {
        const udpatedDates = [...resourceDates];
        udpatedDates[index].start == 'false' ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${date}", "end":"false"}`) :
            udpatedDates[index].start == date ? udpatedDates[index] = JSON.parse(`{"rsce_id":"false", "start":"${udpatedDates[index].end}", "end":"false"}`) :
                udpatedDates[index].start > date ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${date}", "end":"${udpatedDates[index].start}"}`) :
                    udpatedDates[index].end == 'false' ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpatedDates[index].start}", "end":"${date}"}`) :
                        udpatedDates[index].end == date ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpatedDates[index].start}", "end":"false"}`) :
                            udpatedDates[index].end < date ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpatedDates[index].end}", "end":"${date}"}`) :
                                udpatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpatedDates[index].start}", "end":"${date}"}`)

        setResouceDates(udpatedDates);


        const selectedDates = {};

        if (udpatedDates[index].end != 'false') {

            for (let currentDate = new Date(udpatedDates[index].start); currentDate <= new Date(udpatedDates[index].end); currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0];

                let a = Object.keys(bookDates).filter(item => item == currentDate.toISOString().split('T')[0])

                if (a != "") {
                    const prevDate = currentDate
                    selectedDates[dateString] = { selected: true, disableTouchEvent: true, textColor: "#cf010b", color: "white" }

                    const prev = (new Date(prevDate.setDate(prevDate.getDate() - 1)).toISOString().split('T')[0])

                    if ((Object.keys(bookDates).filter(key => key == prev)) == "") {
                        selectedDates[prev] = {
                            selected: true,
                            color: theme.colors.naranjaNet,
                            startingDay: new Date(prev).getDate() == new Date(udpatedDates[index].start).getDate(),
                            endingDay: true
                        };
                    };

                    prevDate.setDate(prevDate.getDate() + 1)
                } else {
                    console.log(currentDate);

                    const prexDate = currentDate
                    const prex = (new Date(prexDate.setDate(prexDate.getDate() - 1)).toISOString().split('T')[0])

                    if ((Object.keys(bookDates).filter(key => key == prex)) != "") {
                        new Date(prexDate.setDate(prexDate.getDate() + 1))

                        selectedDates[dateString] = {
                            selected: true,
                            color: theme.colors.naranjaNet,
                            startingDay: true,
                            endingDay: currentDate.getDate() == new Date(udpatedDates[index].end).getDate(),
                        };
                    } else {
                        new Date(prexDate.setDate(prexDate.getDate() + 1))

                        selectedDates[dateString] = {
                            selected: true,
                            color: theme.colors.naranjaNet,
                            startingDay: currentDate.getDate() == new Date(udpatedDates[index].start).getDate(),
                            endingDay: currentDate.getDate() == new Date(udpatedDates[index].end).getDate(),
                        };
                    }


                }

            }
        } else if (udpatedDates[index].start != 'false') {
            selectedDates[udpatedDates[index].start] = {
                selected: true,
                color: theme.colors.naranjaNet,
                startingDay: true,
                endingDay: true,
            };


        }




        /*if (udpatedDates[index].end != 'false') {
 
            let omitDates;
            omitDates = (Object.keys(bookDates).map((omitDate) => {
                return (omitDate >= udpatedDates[index].start && omitDate <= udpatedDates[index].end) ? omitDate : "";
            }).filter((valor) => valor !== ''));
 
            omitDates = omitDates.map((omitDate) => {
                selectedDates[omitDate] = { selected: true, disableTouchEvent: true, textColor: "#cf010b", color: "white" };
                return new Date(omitDate)
            });
 
            if (omitDates.length > 0) {
 
                const a = (Object.entries(selectedDates).map(([key, a]) => {
                    // console.log(a.disableTouchEvent);
                   console.log(new Date(key));
                    return !a.disableTouchEvent ? (key) : "";
                }))
                // .filter((value) => value !== '');
 
                // const b = [[]]
                // a.map((a, index) => {
                //     // console.log(new Date(a).getDate())
                //     console.log(a)
                // })
 
                console.log(a);
 
                for (let index = new Date(Math.min(...a)); index < new Date(Math.max(...a)); currentDate.setDate(currentDate.getDate() + 1)) {
                    console.log(index);
                    console.log(a[index]);
                }
 
                // const minDate = new Date(Math.min(...omitDates) - 1).toISOString().split('T')[0];
                // const maxDate = new Date(Math.max(...omitDates))
                // maxDate.setDate(maxDate.getDate() + 1)
 
                // selectedDates[minDate] = {
                //     selected: true,
                //     color: theme.colors.naranjaNet,
                //     startingDay: minDate == udpatedDates[index].start,
                //     endingDay: true,c
                // };
                // selectedDates[maxDate.toISOString().split('T')[0]] = {
                //     selected: true,
                //     color: theme.colors.naranjaNet,
                //     startingDay: true,
                //     endingDay: maxDate.toISOString().split('T')[0] == udpatedDates[index].end
                // };
 
 
 
            }
 
 
        }*/



        setSelectedDateRange(selectedDates);
    }

    const getBookDays = async (index) => {
        setBookDates()
        let days = await getResourceBookDays(resources[index])
        const bookDates = {};

        days.forEach((date) => {
            const startDate = new Date(date.start);
            const endDate = new Date(date.end);

            for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0];
                bookDates[dateString] = { selected: true, disableTouchEvent: true, textColor: "#cf010b", color: "white" };
            }
        });

        setBookDates(bookDates);
    }

    const card = () => {
        try {
            return resources.map((element, index) => (
                < View key={element.user_id} style={styles.card} >
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
                    <TouchableWithoutFeedback onPress={() => {
                        toggleItem(index);
                        getBookDays(index);
                    }}>
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
                                    theme={{
                                        monthTextColor: theme.colors.naranjaNet

                                    }}
                                    disableAllTouchEventsForDisabledDays={true}
                                    onDayPress={(date) => (selectDates(index, date.dateString, element.user_id))}
                                    markingType="period"
                                    markedDates={{
                                        ...bookDates,
                                        ...selectedDateRange
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