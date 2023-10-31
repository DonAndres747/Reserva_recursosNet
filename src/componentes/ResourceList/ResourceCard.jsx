import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions, ScrollView, Image, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from 'react-native-calendars';

import resourceController from "../../services/controllers/resourceController";
import ButtonStyle from "../buttonsStyle";
import theme from "../../theme";


function ResourceCard() {
    const { onChange, resourceModelData, getResourcesBySkill } = resourceController();
    const [resources, setResources] = useState([]);
    const [reCharge, setRecharge] = useState(true);
    const [calendars, setCalendars] = useState([]);
    const [resourceDates, setResouceDates] = useState([]);
    const [dataG, seDataG] = useState("Loading...");
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                if (reCharge) {
                    const skills = await AsyncStorage.getItem("skills");
                    const level = await AsyncStorage.getItem("level");
                    onChange(skills, level);
                    setRecharge(false);
                    AsyncStorage.removeItem("skills");
                    AsyncStorage.removeItem("level");
                };

                const data = await getResourcesBySkill();
                const response = JSON.stringify(data);
                const parsedData = JSON.parse(response);
                parsedData.result.status == 404 ? seDataG(parsedData.result.message) :
                    (
                        setResources(parsedData.result.data),
                        setCalendars(Array(parsedData.result.data.length).fill(false)),
                        setResouceDates(Array(parsedData.result.data.length).fill(JSON.parse(`{"resource":"false", "start":"false", "end":"false"}`)))
                    )

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchResources();
    }, [resourceModelData]);

    const toggleItem = (index) => {
        const updatedSelectedItems = [...calendars];
        updatedSelectedItems[index] = !updatedSelectedItems[index];
        setCalendars(updatedSelectedItems);
        return updatedSelectedItems;
    };


    const selectDates = (index, date, resource_id) => {
        const udpateDates = [...resourceDates];
        udpateDates[index].start == 'false' ? udpateDates[index] = JSON.parse(`{"resource":"${resource_id}", "start":"${date}", "end":"false"}`) :
            udpateDates[index].start == date ? udpateDates[index] = JSON.parse(`{"resource":"false", "start":"${udpateDates[index].end}", "end":"false"}`) :
                udpateDates[index].start > date ? udpateDates[index] = JSON.parse(`{"resource":"${resource_id}", "start":"${date}", "end":"${udpateDates[index].start}"}`) :
                    udpateDates[index].end == 'false' ? udpateDates[index] = JSON.parse(`{"resource":"${resource_id}", "start":"${udpateDates[index].start}", "end":"${date}"}`) :
                        udpateDates[index].end == date ? udpateDates[index] = JSON.parse(`{"resource":"${resource_id}", "start":"${udpateDates[index].start}", "end":"false"}`) :
                            udpateDates[index].end < date ? udpateDates[index] = JSON.parse(`{"resource":"${resource_id}", "start":"${udpateDates[index].end}", "end":"${date}"}`) :
                                udpateDates[index] = JSON.parse(`{"resource":"${resource_id}", "start":"${udpateDates[index].start}", "end":"${date}"}`)

        console.log(udpateDates);
        setResouceDates(udpateDates);
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                // ref={scrollViewRef}
                // onScroll={handleScroll}
                >
                    {typeof (resources) == "undefined" ? (
                        <Text>{dataG}</Text>
                    ) : (
                        resources.map((element, index) => (
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
                                                    } : {})
                                                }}
                                            />
                                            <View style={styles.calendarButtons}>
                                                <TouchableWithoutFeedback onPress={() => toggleItem(index)}>
                                                    <View style={styles.calendarButton}>
                                                        <Text style={styles.calendarButtonText}>
                                                            Cancelar
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={() => toggleItem(index)}>
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

/*const scrollViewRef = useRef(null);
const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const cardHeight = autoHeight(46); // Altura de cada tarjeta
    const indexToShow = Math.floor(offsetY / cardHeight);
 
    // Aplicar margen superior negativo solo al elemento visible
    resources.forEach((_, index) => {
        if (index === indexToShow) {
            scrollViewRef.current.scrollTo({ y: index * cardHeight });
        }
    });
};*/