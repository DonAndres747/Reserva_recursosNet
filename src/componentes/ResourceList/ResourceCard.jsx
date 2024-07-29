import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions, ScrollView, Image, Modal, FlatList, Platform } from "react-native";
import { Alert } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useTranslation } from "react-i18next";

import ButtonStyle from "../buttonsStyle";
import resourceController from "../../services/controllers/resourceController";
import ResourceListComplete from "./ResouceListComplete";
import theme from "../../theme";

let a = null

function ResourceCard({ onSelect, data, onComplete }) {
    const [resources, setResources] = useState();
    const [dataG, seDataG] = useState(true);
    const [calendars, setCalendars] = useState([]);
    const [resourceDates, setResourceDates] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const [bookDates, setBookDates] = useState([]);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);
    const [multiSelect, setMultiSelect] = useState([])
    const [complete, setComplete] = useState(false);
    const [multiExtra, setMultiExtra] = useState(false);
    const [checked, setChecked] = useState([]);
    const { t } = useTranslation()

    const { getResourceBookDays } = resourceController();

    useEffect(() => {
        try {
            setResources(data);
            setCalendars(Array(data.length).fill(false));
            setResourceDates(Array(data.length + 1).fill(JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`)));
            setSelectedDateRange(Array(data.length + 1).fill(''));
            setChecked(Array(data.length + 1).fill(false));
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

    const saveDatesPerIndex = (index, selectedLoop) => {

        updatedDates = selectedLoop ? [...selectedLoop] : [...resourceDates];

        if (updatedDates[index].end == "false") {
            updatedDates[index] = JSON.parse(`{"rsce_id":"${updatedDates[index].rsce_id}", "start":"${updatedDates[index].start}", "end":"${updatedDates[index].start}"}`)
            updatedDates[index].extraOrd = checked[index]
            setResourceDates(updatedDates);
        }
        onSelect(updatedDates.filter(item => item.rsce_id !== "false"))

        return updatedDates
    }

    const saveDates = (index) => {
        if (multiSelect.length <= 0) {
            if (resourceDates[index] == undefined || resourceDates[index].start == "false") {
                Alert.alert(t("resourceList.alerts.selectDate"))
            } else {
                saveDatesPerIndex(index)
                handleComplete(index)
                toggleItem(index);
            }
        } else {
            if (resourceDates[resources.length] ? resourceDates[resources.length].start == "false" : "false") {
                Alert.alert(t("resourceList.alerts.selectDate"))
            } else {
                //obtiene el ultimo objeto de la lista de fechas seleccionadas el cual se usa solo cuando se selccionan de a multiples recursos a la vez
                const dates = resourceDates[resources.length];
                let selectedLoop, dateEach = false;
                //itera de las fechas obtenidas
                for (let currentDate = new Date(dates.start); currentDate <= new Date(dates.end == "false" ? dates.start : dates.end); currentDate.setDate(currentDate.getDate() + 1)) {
                    const dateString = currentDate.toISOString().split('T')[0];
                    //itera la fecha por recurso selecciando 
                    multiSelect.forEach(selected => {
                        //verifica si la fecha ha marca sido marcada como reservada por algun recurso independientemente de cual sea
                        if (bookDates[dateString]) {
                            //verifica si el recurso iterado tiene disponible la fecha o si es un recurso extraordinario   
                            if (!(bookDates[dateString].periods.find(id => id.user_id == selected.rsce_id)) || checked[selected.index]) {
                                //si se cumplen alguna de estas 2 condiciones la fecha se reserva para el recurso     
                                result = multiSelectEach(selected.index, dateString, selected.rsce_id, selectedLoop, dateEach)
                                selectedLoop = result.selectedLoop
                                dateEach = result.dateEach
                            }
                        } else {
                            //si la fecha no ha esta marcada como reservada sera reservada para todos los seleccionadas
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

                    handleComplete(index)

                } else {
                    Alert.alert(t("resourceList.alerts.noAvailRec"))
                }

            }
        }
    }

    const cancelDates = (index, refresh) => {
        const updatedDates = [...resourceDates];
        if (multiSelect.length > 0) {
            //formatea todas las fechas de los recursos seleccionados 
            multiSelect.forEach(rec => {
                return updatedDates[rec.index] = { "end": "false", "rsce_id": "false", "start": "false" };
            })
        }
        //si la condicion es cierta resetea ultimo valor de resource el cual se usa para seleccion multiple
        updatedDates[multiSelect.length > 0 ? resources.length : index] = JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`);
        setResourceDates(updatedDates);
        onSelect((updatedDates.filter(item => item.rsce_id !== "false")))
        const dateRanges = [...selectedDateRange];
        dateRanges[multiSelect.length > 0 ? resources.length : index] = ('');
        setSelectedDateRange(dateRanges);
        refresh ? "" : toggleItem(index);
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
                    Alert.alert(t("resourceList.alerts.maxRecsReached"))
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

        const updatedDates = [...resourceDates];
        //Formatea Json De fechas inicio y fin de reserva  
        updatedDates[index].start == 'false' ? updatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${date}", "end":"false"}`) :
            updatedDates[index].start == date ? updatedDates[index] = JSON.parse(`{"rsce_id":"false", "start":"${updatedDates[index].end}", "end":"false"}`) :
                updatedDates[index].start > date ? updatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${date}", "end":"${updatedDates[index].start}"}`) :
                    updatedDates[index].end == 'false' ? updatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${updatedDates[index].start}", "end":"${date}"}`) :
                        updatedDates[index].end == date ? updatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${updatedDates[index].start}", "end":"false"}`) :
                            updatedDates[index].end < date ? updatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${updatedDates[index].end}", "end":"${date}"}`) :
                                updatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${updatedDates[index].start}", "end":"${date}"}`)

        setResourceDates(updatedDates);
        const selectedDates = {};
        let newDates = '';

        //formatea el estilo de los dias seleccionados
        if (updatedDates[index].end != 'false') {
            for (let currentDate = new Date(updatedDates[index].start); currentDate <= new Date(updatedDates[index].end); currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0];


                // verifica se currentDate es un dia reservado
                if (Object.keys(bookDates).filter(item => item == currentDate.toISOString().split('T')[0]) != "") {
                    const prevDate = currentDate
                    selectedDates[dateString] = {
                        selected: true,
                        disableTouchEvent: !checked[index],
                        textColor: !checked[index] ? "#cf010b" : "white",
                        color: !checked[index] ? "white" : "lightblue",
                        startingDay: checked[index] && (new Date(dateString).getDate() + "," + new Date(dateString).getMonth()) == (new Date(updatedDates[index].start).getDate() + "," + new Date(updatedDates[index].start).getMonth()),
                        endingDay: checked[index] && (new Date(dateString).getDate() + "," + new Date(dateString).getMonth()) == (new Date(updatedDates[index].end).getDate() + "," + new Date(updatedDates[index].end).getMonth()),
                    }

                    const prev = (new Date(prevDate.setDate(prevDate.getDate() - 1)).toISOString().split('T')[0])

                    //verifica si prev esta reservado si no formatea como dia inicio
                    if ((Object.keys(bookDates).filter(key => key == prev)) == "" && selectedDates[prev]) {
                        selectedDates[prev] = {
                            selected: true,
                            selectedColor: theme.colors.naranjaNet,
                            color: theme.colors.naranjaNet,
                            startingDay: (new Date(prev).getDate() + "," + new Date(prev).getMonth()) == (new Date(updatedDates[index].start).getDate() + "," + new Date(updatedDates[index].start).getMonth()),
                            endingDay: !checked[index]
                        };
                    }

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
                            startingDay: !checked[index] || (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(updatedDates[index].start).getDate() + "," + new Date(updatedDates[index].start).getMonth()),
                            endingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(updatedDates[index].end).getDate() + "," + new Date(updatedDates[index].end).getMonth()),
                        };

                    } else {
                        new Date(prexDate.setDate(prexDate.getDate() + 1))
                        selectedDates[dateString] = {
                            selected: true,
                            selectedColor: theme.colors.naranjaNet,
                            color: theme.colors.naranjaNet,
                            startingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(updatedDates[index].start).getDate() + "," + new Date(updatedDates[index].start).getMonth()),
                            endingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(updatedDates[index].end).getDate() + "," + new Date(updatedDates[index].end).getMonth()),
                        };

                    }


                }

            }

            const b = Object.entries(selectedDates).filter(([key, value]) => !value.disableTouchEvent)
            const c = Object.entries(selectedDates).filter(([key, value]) => value.disableTouchEvent)
            //formatea las fechas entre periodos cuando hay fechas reservadas de por medio 
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

            } else if (checked[index]) {
                updatedDates[index].extraOrd = checked[index]
            }

        } else if (updatedDates[index].start != 'false') {
            //Si solo hay una fecha seleccionada formatea es fecha para ser inicio y fin y el color dependiendo si es extraordinaria o no 
            const extraOrdDate = checked[index] && Object.keys(bookDates).filter(item => item == updatedDates[index].start).length > 0

            updatedDates[index].extraOrd = checked[index]
            selectedDates[updatedDates[index].start] = {
                selected: true,
                color: extraOrdDate ? "lightblue" : theme.colors.naranjaNet,
                startingDay: true,
                selectedColor: extraOrdDate ? "lightblue" : theme.colors.naranjaNet,
                endingDay: true
            };
        }


        updatedDates[index] = (newDates ? newDates : updatedDates[index]);

        const dateRanges = [...selectedDateRange];
        dateRanges[index] = (selectedDates);
        setSelectedDateRange(dateRanges);
    }

    const multiSelectDates = (date) => {

        const updatedDates = [...resourceDates];
        //Formatea Json De fechas inicio y fin de reserva 
        const index = resources.length
        updatedDates[index] == undefined ? updatedDates.push(JSON.parse(`{"rsce_id":"false", "start":"false", "end":"false"}`)) : ""
        updatedDates[index].start == 'false' ? updatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${date}", "end":"false"}`) :
            updatedDates[index].start == date ? updatedDates[index] = JSON.parse(`{"rsce_id":"false", "start":"${updatedDates[index].end}", "end":"false"}`) :
                updatedDates[index].start > date ? updatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${date}", "end":"${updatedDates[index].start}"}`) :
                    updatedDates[index].end == 'false' ? updatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${updatedDates[index].start}", "end":"${date}"}`) :
                        updatedDates[index].end == date ? updatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${updatedDates[index].start}", "end":"false"}`) :
                            updatedDates[index].end < date ? updatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${updatedDates[index].end}", "end":"${date}"}`) :
                                updatedDates[index] = JSON.parse(`{"rsce_id":"${0}", "start":"${updatedDates[index].start}", "end":"${date}"}`)

        setResourceDates(updatedDates);


        const selectedDates = {};

        //formatea el estilo de los dias seleccionados
        if (updatedDates[index].end != 'false') {
            for (let currentDate = new Date(updatedDates[index].start); currentDate <= new Date(updatedDates[index].end); currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0]
                const periods = bookDates[dateString]
                selectedDates[dateString] = {
                    selected: true,
                    selectedColor: theme.colors.naranjaNet,
                    ...periods
                };
            }
        } else if (updatedDates[index].start != 'false') {
            const periods = bookDates[updatedDates[index].start]
            selectedDates[updatedDates[index].start] = {
                selected: true,
                selectedColor: theme.colors.naranjaNet,
                ...periods
            };
        }

        const dateRanges = [...selectedDateRange];
        dateRanges[index] = (selectedDates);
        setSelectedDateRange(dateRanges);
    }

    const multiSelectEach = (index, date, resource_id, selectedLoop, dateEach) => {
        //formatea los jsons de fechas para los recursos seleccionados en multiselect 
        updatedDates = selectedLoop ? [...selectedLoop] : [...resourceDates];
        updatedDates[index].start == 'false' && updatedDates[index].start != undefined ? updatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${date}", "end":"false"}`) :
            updatedDates[index].end == 'false' ? updatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${updatedDates[index].start}", "end":"${date}"}`) :
                updatedDates[index].start != undefined ? updatedDates[index] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${updatedDates[index].start}", "end":"${date}"}`) :
                    updatedDates[index][updatedDates[index].length - 1] = JSON.parse(`{"rsce_id":"${resource_id}", "start":"${updatedDates[index][updatedDates[index].length - 1].start}", "end":"${date}"}`)

        setResourceDates(updatedDates, index);
        const selectedDates = {};
        let newDates = '';


        //formatea los estilos de los dias seleccionados
        if (updatedDates[index].end != 'false') {
            const endArr = updatedDates[index].length ? updatedDates[index][updatedDates[index].length - 1].end : updatedDates[index].end;
            const startArr = updatedDates[index].length ? updatedDates[index][0].start : updatedDates[index].start;

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
                            startingDay: (new Date(prev).getDate() + "," + new Date(prev).getMonth()) == (new Date(updatedDates[index].start).getDate() + "," + new Date(updatedDates[index].start).getMonth()),
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
                            endingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(updatedDates[index].end).getDate() + "," + new Date(updatedDates[index].end).getMonth()),
                        };

                    } else {
                        new Date(prexDate.setDate(prexDate.getDate() + 1))
                        selectedDates[dateString] = {
                            selected: true,
                            selectedColor: theme.colors.naranjaNet,
                            color: theme.colors.naranjaNet,
                            startingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(updatedDates[index].start).getDate() + "," + new Date(updatedDates[index].start).getMonth()),
                            endingDay: (currentDate.getDate() + "," + currentDate.getMonth()) == (new Date(updatedDates[index].end).getDate() + "," + new Date(updatedDates[index].end).getMonth()),
                        };

                    }


                }

            }

            const b = Object.entries(selectedDates).filter(([key, value]) => !value.disableTouchEvent)
            const c = Object.entries(selectedDates).filter(([key, value]) => value.disableTouchEvent)
            //verifica si hay fechas reservadas y si no el recurso a formatear no es extraordinario
            if (c.length >= 1 && !checked[index]) {
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

            } else if (checked[index]) {
                updatedDates[index].extraOrd = checked[index]
            }
        } else if (updatedDates[index].start != 'false') {
            selectedDates[updatedDates[index].start] = {
                selected: true,
                color: theme.colors.naranjaNet,
                startingDay: true,
                selectedColor: theme.colors.naranjaNet,
                endingDay: true
            };
            updatedDates[index].extraOrd = checked[index]
        }

        updatedDates[index] = (newDates ? newDates : updatedDates[index]);

        dateRanges = dateEach ? [...dateEach] : [...selectedDateRange];
        dateRanges[index] = (selectedDates);
        setSelectedDateRange(dateRanges);
        return { "selectedLoop": updatedDates, "dateEach": dateRanges }
    }

    const getBookDays = async (index, extra) => {
        extra = extra != null ? extra : !checked[index]
        setBookDates()

        let days = await getResourceBookDays(resources[index])
        const bookDates = {};

        days ? days.forEach((date) => {
            const startDate = new Date(date.start);
            const endDate = new Date(date.end);
            for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
                const dateString = currentDate.toISOString().split('T')[0];
                bookDates[dateString] = { selected: true, disableTouchEvent: extra, textColor: extra ? "#cf010b" : "lightblue", color: "white" };
            }
        }) : "";

        setBookDates(bookDates);
    }

    const getMultiBookDays = async () => {

        //resetea las fechas par los recursos seleccionados 
        multiSelect.forEach(rec => {
            cancelDates(rec.index, true)
        })

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

    const handleComplete = () => {
        setComplete(!complete)
        return !complete
    };

    const handleCheck = async (index) => {
        const temp = [...checked]
        if (!(multiSelect.length > 0)) {
            if (!temp[index]) {
                Alert.alert(
                    t("resourceList.alerts.extraordinarySol.title"),
                    t("resourceList.alerts.extraordinarySol.body"),
                    [
                        {
                            text: t("resourceList.buttons.cancel"),
                            style: 'cancel'
                        },
                        {
                            text: t("resourceList.buttons.accept"),
                            onPress: async () => (
                                temp[index] = !temp[index],
                                await getBookDays(index, false),
                                cancelDates(index, true),
                                setChecked(temp, true)),
                        }
                    ],
                    { cancelable: false }
                )
            } else {
                temp[index] = !temp[index]
                await getBookDays(index, true)
                cancelDates(index, true)
                setChecked(temp)
            }
        } else {
            if (!multiExtra) {
                Alert.alert(
                    t("resourceList.alerts.extraordinarySol.title"),
                    t("resourceList.alerts.extraordinarySol.body"), [
                    {
                        text: t("resourceList.buttons.cancel"),
                        style: 'cancel'
                    },
                    {
                        text: t("resourceList.buttons.accept"),
                        onPress: async () => (
                            setMultiExtra(!multiExtra)),
                    }
                ],
                    { cancelable: false }
                )
            } else {
                setMultiExtra(!multiExtra)
            }

        }
    }

    const handleMultiCheck = (index) => {
        const temp = [...checked];
        temp[index] = !temp[index];
        setChecked(temp)
    }

    const extraListData = () => {
        const data2 = (resources.filter(resource => {
            return multiSelect.some(multi => resource.user_id == multi.rsce_id);
        }));

        const names = []
        data2.forEach(resc => {
            names.push({
                name1: (resc.first_name + " " + resc.last_name),
                idx: multiSelect.findIndex(a => a.rsce_id == resc.user_id) + 1,
                recIndex: multiSelect.filter(a => a.rsce_id == resc.user_id)[0].index
            });
        });

        return names
    }

    const card = () => {
        try {
            return resources.map((element, index) => (
                <TouchableWithoutFeedback
                    key={element.user_id}
                    delayLongPress={multiSelect.length > 0 ? 60 : 500}
                    onLongPress={() => handleMultiSelect(element.user_id, index)}
                >
                    <View key={element.user_id} style={[styles.card, isSelect(element.user_id)]} >
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
                                <ButtonStyle disable={multiSelect.length > 0 ? disableButton(element.user_id) :
                                    false}>{t("resourceList.buttons.cardbutton")} {multiSelect.length > 0 ? multiSelect.length : ""}
                                </ButtonStyle>
                            </View>

                        </TouchableWithoutFeedback>

                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={calendars[index]}
                                onRequestClose={() => {
                                    toggleItem(index),
                                        setMultiExtra(false)
                                }}
                                key={multiSelect.length > 0 ? "" : checked[index]}
                            >
                                <View style={styles.centeredView}>
                                    {multiSelect.length > 0 ?
                                        (
                                            <View style={{ alignSelf: "flex-end", flexDirection: "column" }}>
                                                <TouchableWithoutFeedback onPress={() => handleCheck()}>
                                                    <View style={[styles.radiobutton, multiExtra ? [styles.selected, styles.selectedIos] : '']}>
                                                        <Text style={[styles.radiobuttonText, multiExtra ? styles.selected : '']} >{t("resourceList.extra")}</Text>
                                                        <View style={[styles.outerCircle, multiExtra ? styles.selected : '']}>
                                                            <View style={[styles.innerCircle, multiExtra ? styles.inneSelected : '']}>
                                                            </View>
                                                        </View>
                                                        <View style={{ width: 2 }}></View>
                                                        <View style={[styles.outerCircle, multiExtra ? styles.selected : '']}>
                                                            <View style={[styles.innerCircle, multiExtra ? styles.inneSelected : '']}>
                                                            </View>
                                                        </View>
                                                        <View style={{ width: 2 }}></View>
                                                        <View style={[styles.outerCircle, multiExtra ? styles.selected : '']}>
                                                            <View style={[styles.innerCircle, multiExtra ? styles.inneSelected : '']}>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>

                                                {multiExtra ? (() => {
                                                    const dataList = extraListData();
                                                    return (
                                                        <View style={styles.extralist}>
                                                            <FlatList
                                                                data={dataList}
                                                                keyExtractor={(item, idx) => idx.toString()}
                                                                horizontal={Platform.OS == 'ios'}
                                                                renderItem={({ item }) => (
                                                                    <TouchableWithoutFeedback onPress={() => { handleMultiCheck(item.recIndex) }}>
                                                                        <Text style={[styles.extratext, styles[`extra${item.idx}`], checked[item.recIndex] ? styles.extraSelected : ""]}>
                                                                            {item.name1}
                                                                        </Text>
                                                                    </TouchableWithoutFeedback>
                                                                )}
                                                            />
                                                        </View>
                                                    );
                                                })() : null}
                                            </View>
                                        ) : (
                                            <TouchableWithoutFeedback onPress={() => handleCheck(index)}>
                                                <View style={[styles.radiobutton, checked[index] ? styles.selected : '']}>
                                                    <Text style={[styles.radiobuttonText, checked[index] ? styles.selected : '']} >Extra</Text>
                                                    <View style={[styles.outerCircle, checked[index] ? styles.selected : '']}>
                                                        <View style={[styles.innerCircle, checked[index] ? styles.inneSelected : '']}>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}

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
                                                    {t("resourceList.buttons.cancel")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <TouchableWithoutFeedback onPress={() => saveDates(index)}>
                                            <View style={styles.calendarButton}>
                                                <Text style={styles.calendarButtonText}>
                                                    {t("resourceList.buttons.accept")}
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
            return <Text>{t("resourceList.noDataFound")}</Text>
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
                        <Text>{t("resourceList.loading")}</Text>
                    ) : (
                        card()
                    )}
                </ScrollView>
            </View >


            <ResourceListComplete
                open={handleComplete}
                show={complete}
                data={resourceDates}
                onRemove={cancelDates}
                resourceInfo={resources}
                onComplete={() => { onComplete() }}
            />
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
    multi5: { backgroundColor: "#d7bde2" },
    extralist: {
        width: 'auto',
        height:'auto',
        right: 47,
        backgroundColor: "white",
        top: Platform.OS == 'ios' ? -5 : 30,
        zIndex: 2,
        position: 'absolute',
        borderWidth: 1,
        borderColor: theme.colors.naranjaNet,
        borderRadius: 5
    },
    extratext: {
        padding: 5,
        margin: 2,
        backgroundColor: theme.colors.azulNet,
        borderRadius: 5,
        borderWidth: 1
    },
    extra1: {
        color: "#a9cce3",
        borderColor: "#a9cce3",
    },
    extra2: {
        color: "#a2d9ce",
        borderColor: "#a2d9ce",
    },
    extra3: {
        color: "#f1948a",
        borderColor: "#f1948a",
    },
    extra4: {
        color: "#f7dc6f",
        borderColor: "#f7dc6f",
    },
    extra5: {
        color: "#d7bde2",
        borderColor: "#d7bde2",
    },
    extraSelected: {
        backgroundColor: "lightblue",
        color: "white"
    },
    radiobutton: {
        alignSelf: "flex-end",
        flexDirection: "row",
        marginRight: 50,
        marginBottom: 10,
        justifyContent: "center",
        alignContent: "center",
        borderWidth: 1,
        borderColor: "black",
        padding: 2,
        borderRadius: 5
    },
    radiobuttonText: {
        marginRight: 2
    },
    outerCircle: {
        height: 15,
        width: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "black",
    },
    innerCircle: {
        height: 10,
        width: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "transparent",
    },
    selected: {
        borderColor: theme.colors.naranjaNet,
        color: theme.colors.naranjaNet
    },
    selectedIos: {
        top: Platform.OS == 'ios' ? -30 : 0,
    },
    inneSelected: {
        backgroundColor: theme.colors.naranjaNet
    }
});

export default ResourceCard;
