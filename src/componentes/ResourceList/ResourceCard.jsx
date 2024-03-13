import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions, ScrollView, Image, Modal } from "react-native";
import { Calendar } from 'react-native-calendars';
import { Alert } from "react-native";

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
    const [multiSelect, setMultiSelect] = useState([])


    const { getResourceBookDays } = resourceController();


    useEffect(() => {
        try {
            setResources(data);
            setCalendars(Array(data.length).fill(false));
            setResouceDates(Array(data.length + 1).fill(JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`)));
            setSelectedDateRange(Array(data.length + 1).fill(''));
            (typeof (data)) ? seDataG(false) : ""
        } catch (error) {
            seDataG(false)
        }

    }, [data])

    const toggleItem = (index) => {
        const updatedSelectedItems = [...calendars];
        updatedSelectedItems[index] = !updatedSelectedItems[index];
        setCalendars(updatedSelectedItems);
        return updatedSelectedItems;
    };

    saveDatesPerIndex = (index, selectedLoop) => {

        udpatedDates = selectedLoop ? [...selectedLoop] : [...resourceDates];

        if (udpatedDates[index].end == "false") {
            udpatedDates[index] = JSON.parse(`{"rsce_id":"${udpatedDates[index].rsce_id}", "start":"${udpatedDates[index].start}", "end":"${udpatedDates[index].start}"}`)
            setResouceDates(udpatedDates);
        }
        onSelect((udpatedDates.filter(item => item.rsce_id !== "false")))

        return udpatedDates
    }

    const saveDates = (index) => {
        if (multiSelect.length <= 0) {
            if (resourceDates[index] == undefined || resourceDates[index].start == "false") {
                Alert.alert("Por favor seleccione una fecha")
            } else {
                saveDatesPerIndex(index)
                toggleItem(index);
            }
        } else {
            if (resourceDates[resources.length].start == "false") {
                Alert.alert("Por favor seleccione una fecha")
            } else {
                const dates = resourceDates[resources.length];
                let selectedLoop, dateEach = false;
                for (let currentDate = new Date(dates.start); currentDate <= new Date(dates.end == "false" ? dates.start : dates.end); currentDate.setDate(currentDate.getDate() + 1)) {
                    const dateString = currentDate.toISOString().split('T')[0];
                    multiSelect.forEach(selected => {
                        if (bookDates[dateString]) {
                            if (!(bookDates[dateString].periods.find(id => id.user_id == selected.rsce_id))) {
                                result = multiSelectEach(selected.index, dateString, selected.rsce_id, selectedLoop, dateEach)
                                selectedLoop = result.selectedLoop
                                dateEach = result.dateEach
                            }
                        } else {
                            result = multiSelectEach(selected.index, dateString, selected.rsce_id, selectedLoop, dateEach)
                            selectedLoop = result.selectedLoop
                            dateEach = result.dateEach
                        }
                    })
                }

                if (selectedLoop) {
                    selectedLoop.pop()
                    dateEach.pop()
                    setSelectedDateRange(dateEach);
                    setCalendars(Array(data.length).fill(false));
                    multiEach = false
                    multiSelect.map(element => {
                        selectedLoop = saveDatesPerIndex(element.index, selectedLoop);
                        multiEach = handleMultiSelect(element.rsce_id, element.index, multiEach)
                    })
                } else {
                    Alert.alert("ninguno de los recursos se encuentra disponible en las fechas seleccionadas")
                }
            }
        }
    }

    const cancelDates = (index) => {
        const udpatedDates = [...resourceDates];
        udpatedDates[multiSelect.length > 0 ? resources.length : index] = JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`);
        setResouceDates(udpatedDates);
        onSelect((udpatedDates.filter(item => item.rsce_id !== "false")))
        const dateRanges = [...selectedDateRange];
        dateRanges[multiSelect.length > 0 ? resources.length : index] = ('');
        setSelectedDateRange(dateRanges);
        toggleItem(index);
    }

    const handleMultiSelect = (id, index, multiEach) => {

        if (multiEach) {
            temp = [...multiEach]
        } else {
            temp = [...multiSelect]
        }

        if (temp.length > 0) {
            const index2 = temp.findIndex(element => element.rsce_id == id);
            if (index2 >= 0) {
                temp.splice(index2, 1)
            } else {
                if (temp.length < 5) {
                    temp.push(JSON.parse(`{"rsce_id":"${id}", "index":"${index}"}`))
                } else {
                    Alert.alert("Maxima seleccion de 5 recursos a la vez")
                }
            }
        } else {
            temp.push(JSON.parse(`{"rsce_id":"${id}", "index":"${index}"}`))
        }

        setMultiSelect(temp);
        return temp
    }

    const isSelect = (id) => {
        const index = multiSelect.findIndex(element => element.rsce_id == id) + 1;
        return index > 0 ? styles[`multi${index}`] : styles.notSelected;
    }


    const selectDates = async (index, date, resource_id) => {

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
        let newDates = '';


        if (udpatedDates[index].end != 'false') {
            for (let currentDate = new Date(udpatedDates[index].start); currentDate <= new Date(udpatedDates[index].end); currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0];

                const a = Object.keys(bookDates).filter(item => item == currentDate.toISOString().split('T')[0])

                if (a != "") {
                    const prevDate = currentDate
                    selectedDates[dateString] = { selected: true, disableTouchEvent: true, textColor: "#cf010b", color: "white" }

                    const prev = (new Date(prevDate.setDate(prevDate.getDate() - 1)).toISOString().split('T')[0])


                    if ((Object.keys(bookDates).filter(key => key == prev)) == "") {
                        selectedDates[prev] = {
                            selected: true,
                            selectedColor: theme.colors.naranjaNet,
                            color: theme.colors.naranjaNet,
                            startingDay: (new Date(prev).getDate() + "," + new Date(prev).getMonth()) == (new Date(udpatedDates[index].start).getDate() + "," + new Date(udpatedDates[index].start).getMonth()),
                            endingDay: true
                        };
                    };

                    prevDate.setDate(prevDate.getDate() + 1)
                } else {

                    const prexDate = currentDate
                    const prex = (new Date(prexDate.setDate(prexDate.getDate() - 1)).toISOString().split('T')[0])

                    if ((Object.keys(bookDates).filter(key => key == prex)) != "") {
                        new Date(prexDate.setDate(prexDate.getDate() + 1))

                        selectedDates[dateString] = {
                            selected: true,
                            selectedColor: theme.colors.naranjaNet,
                            color: theme.colors.naranjaNet,
                            startingDay: true,
                            endingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(udpatedDates[index].end).getDate() + "," + new Date(udpatedDates[index].end).getMonth()),
                        };

                    } else {
                        new Date(prexDate.setDate(prexDate.getDate() + 1))
                        selectedDates[dateString] = {
                            selected: true,
                            selectedColor: theme.colors.naranjaNet,
                            color: theme.colors.naranjaNet,
                            startingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(udpatedDates[index].start).getDate() + "," + new Date(udpatedDates[index].start).getMonth()),
                            endingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(udpatedDates[index].end).getDate() + "," + new Date(udpatedDates[index].end).getMonth()),
                        };

                    }


                }

            }

            const b = Object.entries(selectedDates).filter(([key, value]) => !value.disableTouchEvent)
            const c = Object.entries(selectedDates).filter(([key, value]) => value.disableTouchEvent)

            if (c.length >= 1) {
                const rangos = [];
                let rangoActual = [];
                let fechaAnterior = null;

                for (const fecha of b.map(([key, value]) => key)) {

                    if (!fechaAnterior) {
                        rangoActual.push(fecha);
                    } else {
                        const fechaActual = new Date(fecha);
                        const fechaAnteriorDate = new Date(fechaAnterior);

                        const diferenciaDias = (fechaActual - fechaAnteriorDate) / (1000 * 60 * 60 * 24);

                        if (diferenciaDias <= 1) {
                            rangoActual.push(fecha);
                        } else {
                            rangos.push(rangoActual);
                            rangoActual = [fecha];
                        }
                    }

                    fechaAnterior = fecha;
                }

                if (rangoActual.length > 0) {
                    rangos.push(rangoActual);
                }

                rangos.map(rango => {
                    const fechasObjeto = rango.map(fecha => new Date(fecha));

                    const fechaMaxima = new Date(Math.max.apply(null, fechasObjeto)).toISOString().split('T')[0];
                    const fechaMinima = new Date(Math.min.apply(null, fechasObjeto)).toISOString().split('T')[0];

                    newDates += `{"rsce_id":"${resource_id}", "start":"${fechaMinima}", "end":"${fechaMaxima}"}+`
                })
                newDates = newDates.split("+")
                newDates.pop()
                newDates = newDates.map((dates) => {
                    return (JSON.parse(dates));
                })

            }

        } else if (udpatedDates[index].start != 'false') {
            selectedDates[udpatedDates[index].start] = {
                selected: true,
                color: theme.colors.naranjaNet,
                startingDay: true,
                selectedColor: theme.colors.naranjaNet,
                endingDay: true
            };
        }


        udpatedDates[index] = (newDates ? newDates : udpatedDates[index]);

        const dateRanges = [...selectedDateRange];
        dateRanges[index] = (selectedDates);
        setSelectedDateRange(dateRanges);
    }

    const multiSelectDates = (date) => {

        const udpatedDates = [...resourceDates];
        const index = resources.length
        udpatedDates[index] == undefined ? udpatedDates.push(JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`)) : ""
        udpatedDates[index].start == 'false' ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${date}", "end":"false"}`) :
            udpatedDates[index].start == date ? udpatedDates[index] = JSON.parse(`{"rsce_id":"false", "start":"${udpatedDates[index].end}", "end":"false"}`) :
                udpatedDates[index].start > date ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${date}", "end":"${udpatedDates[index].start}"}`) :
                    udpatedDates[index].end == 'false' ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${udpatedDates[index].start}", "end":"${date}"}`) :
                        udpatedDates[index].end == date ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${udpatedDates[index].start}", "end":"false"}`) :
                            udpatedDates[index].end < date ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${udpatedDates[index].end}", "end":"${date}"}`) :
                                udpatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${udpatedDates[index].start}", "end":"${date}"}`)

        setResouceDates(udpatedDates);


        const selectedDates = {};

        if (udpatedDates[index].end != 'false') {
            for (let currentDate = new Date(udpatedDates[index].start); currentDate <= new Date(udpatedDates[index].end); currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0]
                const peroids = bookDates[dateString]
                selectedDates[dateString] = {
                    selected: true,
                    selectedColor: theme.colors.naranjaNet,
                    ...peroids
                };
            }
        } else if (udpatedDates[index].start != 'false') {
            const peroids = bookDates[udpatedDates[index].start]
            selectedDates[udpatedDates[index].start] = {
                selected: true,
                selectedColor: theme.colors.naranjaNet,
                ...peroids
            };
        }

        const dateRanges = [...selectedDateRange];
        dateRanges[index] = (selectedDates);
        setSelectedDateRange(dateRanges);
    }

    const multiSelectEach = (index, date, resource_id, selectedLoop, dateEach) => {

        udpatedDates = selectedLoop ? [...selectedLoop] : [...resourceDates];
        udpatedDates[index].start == 'false' && udpatedDates[index].start != undefined ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${date}", "end":"false"}`) :
            udpatedDates[index].end == 'false' ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpatedDates[index].start}", "end":"${date}"}`) :
                udpatedDates[index].start != undefined ? udpatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpatedDates[index].start}", "end":"${date}"}`) :
                    udpatedDates[index][udpatedDates[index].length - 1] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${udpatedDates[index][udpatedDates[index].length - 1].start}", "end":"${date}"}`)


        setResouceDates(udpatedDates, index);
        const selectedDates = {};
        let newDates = '';


        if (udpatedDates[index].end != 'false') {
            const endArr = udpatedDates[index].length ? udpatedDates[index][udpatedDates[index].length - 1].end : udpatedDates[index].end;
            const startArr = udpatedDates[index].length ? udpatedDates[index][0].start : udpatedDates[index].start;

            for (let currentDate = new Date(startArr); currentDate <= new Date(endArr); currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0];
                const a = Object.keys(bookDates).filter(item => item == dateString);
                const e = (a != "" ? bookDates[a].periods.filter(y => y.user_id == resource_id) : "");

                if (a != "" && e != "") {
                    const prevDate = currentDate
                    selectedDates[dateString] = { selected: true, disableTouchEvent: true, textColor: "#cf010b", color: "white" }

                    const prev = (new Date(prevDate.setDate(prevDate.getDate() - 1)).toISOString().split('T')[0])

                    if ((Object.keys(bookDates).filter(key => key == prev)) == "") {
                        selectedDates[prev] = {
                            selected: true,
                            selectedColor: theme.colors.naranjaNet,
                            color: theme.colors.naranjaNet,
                            startingDay: (new Date(prev).getDate() + "," + new Date(prev).getMonth()) == (new Date(udpatedDates[index].start).getDate() + "," + new Date(udpatedDates[index].start).getMonth()),
                            endingDay: true
                        };
                    };

                    prevDate.setDate(prevDate.getDate() + 1)
                } else {
                    const prexDate = currentDate
                    const prex = (new Date(prexDate.setDate(prexDate.getDate() - 1)).toISOString().split('T')[0])
                    if (bookDates[prex]) {
                        new Date(prexDate.setDate(prexDate.getDate() + 1))
                        selectedDates[dateString] = {
                            selected: true,
                            selectedColor: theme.colors.naranjaNet,
                            color: theme.colors.naranjaNet,
                            startingDay: true,
                            endingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(udpatedDates[index].end).getDate() + "," + new Date(udpatedDates[index].end).getMonth()),
                        };

                    } else {
                        new Date(prexDate.setDate(prexDate.getDate() + 1))
                        selectedDates[dateString] = {
                            selected: true,
                            selectedColor: theme.colors.naranjaNet,
                            color: theme.colors.naranjaNet,
                            startingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(udpatedDates[index].start).getDate() + "," + new Date(udpatedDates[index].start).getMonth()),
                            endingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(udpatedDates[index].end).getDate() + "," + new Date(udpatedDates[index].end).getMonth()),
                        };

                    }


                }

            }

            const b = Object.entries(selectedDates).filter(([key, value]) => !value.disableTouchEvent)
            const c = Object.entries(selectedDates).filter(([key, value]) => value.disableTouchEvent)

            if (c.length >= 1) {
                const rangos = [];
                let rangoActual = [];
                let fechaAnterior = null;

                for (const fecha of b.map(([key, value]) => key)) {

                    if (!fechaAnterior) {
                        rangoActual.push(fecha);
                    } else {
                        const fechaActual = new Date(fecha);
                        const fechaAnteriorDate = new Date(fechaAnterior);

                        const diferenciaDias = (fechaActual - fechaAnteriorDate) / (1000 * 60 * 60 * 24);
                        if (diferenciaDias <= 1) {
                            rangoActual.push(fecha);
                        } else {
                            rangos.push(rangoActual);
                            rangoActual = [fecha];
                        }
                    }

                    fechaAnterior = fecha;
                }

                if (rangoActual.length > 0) {
                    rangos.push(rangoActual);
                }

                rangos.map(rango => {
                    const fechasObjeto = rango.map(fecha => new Date(fecha));
                    const fechaMaxima = new Date(Math.max.apply(null, fechasObjeto)).toISOString().split('T')[0];
                    const fechaMinima = new Date(Math.min.apply(null, fechasObjeto)).toISOString().split('T')[0];
                    newDates += `{"rsce_id":"${resource_id}", "start":"${fechaMinima}", "end":"${fechaMaxima}"}+`
                })
                newDates = newDates.split("+")
                newDates.pop()
                newDates = newDates.map((dates) => {
                    selectedDates[JSON.parse(dates).end] = {
                        ...selectedDates[JSON.parse(dates).end],
                        endingDay: true,
                        startingDay: false
                    }

                    selectedDates[JSON.parse(dates).start] = {
                        ...selectedDates[JSON.parse(dates).start],
                        startingDay: true
                    }

                    return (JSON.parse(dates));
                })

            }

        } else if (udpatedDates[index].start != 'false') {
            selectedDates[udpatedDates[index].start] = {
                selected: true,
                color: theme.colors.naranjaNet,
                startingDay: true,
                selectedColor: theme.colors.naranjaNet,
                endingDay: true
            };
        }

        udpatedDates[index] = (newDates ? newDates : udpatedDates[index]);

        dateRanges = dateEach ? [...dateEach] : [...selectedDateRange];
        dateRanges[index] = (selectedDates);
        setSelectedDateRange(dateRanges);
        return { "selectedLoop": udpatedDates, "dateEach": dateRanges }
    }

    const getBookDays = async (index) => {
        setBookDates()
        let days = await getResourceBookDays(resources[index])
        const bookDates = {};

        days ? days.forEach((date) => {
            const startDate = new Date(date.start);
            const endDate = new Date(date.end);

            for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0];
                bookDates[dateString] = { selected: true, disableTouchEvent: true, textColor: "#cf010b", color: "white" };
            }
        }) : "";

        setBookDates(bookDates);
    }

    const getMultiBookDays = async () => {
        setBookDates();
        let bookDates = {};
        const promises = multiSelect.map(async (element, i) => {
            let days = await getResourceBookDays(resources[element.index]);

            days ? days.forEach((date) => {
                const startDate = new Date(date.start);
                const endDate = new Date(date.end);
                for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
                    const dateString = currentDate.toISOString().split('T')[0];
                    if (!bookDates[dateString]) {
                        bookDates[dateString] = {
                            periods: [
                                {
                                    color: styles[`multi${i + 1}`].backgroundColor,
                                    user_id: element.rsce_id
                                }
                            ],
                        };
                    } else {
                        bookDates[dateString].periods.push(
                            {
                                color: styles[`multi${i + 1}`].backgroundColor,
                                user_id: element.rsce_id
                            }
                        );
                    }
                }
            }) : "";
        });

        await Promise.all(promises);
        setBookDates(bookDates);
    }

    const disableButton = (id) => {
        const temp = multiSelect.find(element => element.rsce_id == id) 
        return temp ? false : true;
    }

    const card = () => {
        try {
            return resources.map((element, index) => (
                <TouchableWithoutFeedback
                    key={element.user_id}
                    delayLongPress={multiSelect.length > 0 ? 60 : 500}
                    onLongPress={() => handleMultiSelect(element.user_id, index)}
                >
                    <View key={element.user_id} style={[styles.card, isSelect(element.user_id)]}  >
                        <Image source={require('../../assets/profile2.png')} style={styles.pict} />
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
                            if (multiSelect.length > 0) {
                                if (!disableButton(element.user_id)) {
                                    toggleItem(index);
                                    multiSelect.length > 0 ? getMultiBookDays() : getBookDays(index);
                                } else {
                                    return false
                                }
                            } else {
                                toggleItem(index);
                                multiSelect.length > 0 ? getMultiBookDays() : getBookDays(index);
                            }

                        }}>
                            <View>
                                <ButtonStyle disable={multiSelect.length > 0 ? disableButton(element.user_id) : false}>Agregar {multiSelect.length > 0 ? multiSelect.length : ""}</ButtonStyle>
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
                                        onDayPress={(date) => multiSelect.length > 0 ? (multiSelectDates(date.dateString)) : (selectDates(index, date.dateString, element.user_id))}
                                        markingType={multiSelect.length > 0 ? "multi-period" : "period"}
                                        markedDates={{
                                            ...bookDates,
                                            ...selectedDateRange[multiSelect.length > 0 ? resources.length : index]
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
                    </View >
                </TouchableWithoutFeedback >
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
        justifyContent: "center"
    },
    pict: {
        marginVertical: 10,
        width: 118,
        height: 118
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
    },
    notSelected: { backgroundColor: "white" },
    multi1: { backgroundColor: "#a9cce3" },
    multi2: { backgroundColor: "#a2d9ce" },
    multi3: { backgroundColor: "#f1948a" },
    multi4: { backgroundColor: "#f7dc6f" },
    multi5: { backgroundColor: "#d7bde2" }
});

export default ResourceCard;
