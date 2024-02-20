import { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Platform } from "react-native";
import theme from "../../theme";
import { Dimensions } from 'react-native';

import BookingSolSeg from "./BookingSolSeg";
import BookingTextSeg from "./BookingTextSeg";
import BookingSerTypSeg from "./BookingSerTypSeg";
import BookingDatesSeg from "./BookingDatesSeg";
import BookingComplete from "./BookingComplete";
import ButtonStyle from "../buttonsStyle";

import applicationController from "../../services/controllers/applicationController";

const emptySpace = `
`

const BookingBody = () => {
    const [selectedSols, setselectedSols] = useState();
    const [requesitionData, setRequesitionData] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState('|');
    const [selectedDates, setSelectedDates] = useState();
    const [complete, setComplete] = useState(false);
 
    const { bookApplications, load } = applicationController();

    useEffect(() => {
        setComplete(load)
    }, [load])

    const handleselectedSols = (items) => {
        setselectedSols(items)
    };
    const handleselectedLevels = (items) => {
        setSelectedLevels(items)
    };
    const handleselectedDates = (items) => {
        setSelectedDates(items)
    };
    const handleComplete = () => {
        setComplete(!complete)
        return !complete
    };

    const handleBooking = async () => {
        const result = await bookApplications(requesitionData)
        console.log("result: ", result);
        (result != 500) ? (setComplete(false) + setTimeout(() => {
            setRequesitionData(result)
        }, 300)) : "";
    }

    const addRequest = () => {
        if (selectedSols && selectedLevels.split('|')[0] && selectedLevels.split('|')[1] && selectedDates) {
            const temp = [...requesitionData];

            const formatedReq = JSON.parse(`
            {
              "solTyp": "${selectedSols}",
              "servTyp": "${selectedLevels.split('|')[1]}",
              "recLvl": "${selectedLevels.split('|')[0]}",
              "start": "${selectedDates.split(',')[0]}", 
              "end": "${selectedDates.split(',')[1]}"
            }`)

            temp.push(formatedReq);

            setRequesitionData(temp);
            setselectedSols();
            setSelectedLevels('|');
            setSelectedDates();
        } else {
            Alert.alert("por favor seleccione tipo de solucion, tipo de servicio, nivel de recurso y un rango de fechas ")
        }
    }

    const sendRequest = () => {
        if (selectedSols && selectedLevels.split('|')[0] && selectedLevels.split('|')[1] && selectedDates) {
            const temp = [...requesitionData];

            const formatedReq = JSON.parse(`
            {
              "solTyp": "${selectedSols}",
              "servTyp": "${selectedLevels.split('|')[1]}",
              "recLvl": "${selectedLevels.split('|')[0]}",
              "start": "${selectedDates.split(',')[0]}", 
              "end": "${selectedDates.split(',')[1]}"
            }`)

            temp.push(formatedReq);
            setRequesitionData(temp);
            setselectedSols();
            setSelectedLevels('|');
            setSelectedDates();
            handleComplete();

        } else {
            if (requesitionData.length >= 1) {
                handleComplete();
            } else {
                Alert.alert("por favor dilingencia la solicitud para porder completar la peticion")
            }
        }

    }

    return (
        <View style={{ alignItems: "center" }}>
            <Text style={styles.headerText}>
                Permitanos ayudarle con su requerimiento en {' '}
                <Text style={{ fontSize: 20 }}>
                    3
                </Text>
                {' '} simples pasos:
            </Text>
            <View style={styles.container}>
                <BookingTextSeg
                    number='1'
                    text='Selecciona la solución o soluciones sobre la cual requieres nuestro apoyo.' />
                <BookingSolSeg onchange={handleselectedSols} data={requesitionData} />
            </View>
            <View style={styles.separator} />
            <View style={styles.container}>
                <BookingSerTypSeg onchange={handleselectedLevels} data={requesitionData} />
                <BookingTextSeg
                    number='2'
                    text='Selecciona el tipo de servicio que deseas y el nivel de experiencia del recurso requerido.' />
            </View>
            <View style={styles.separator} />

            <View style={styles.container}>
                <Text style={styles.hrLabel}>
                    Total Horas:
                </Text>
                <BookingTextSeg
                    number='3'
                    text={'Selecciona las fechas en que deseas reservar el servicio. ' + emptySpace} />
                <BookingDatesSeg onChange={handleselectedDates} data={requesitionData} />
            </View>
            <View style={styles.separator} />
            <View style={styles.buttons}>
                <TouchableWithoutFeedback onPress={() => addRequest()}>
                    <View>
                        <ButtonStyle view="action" >Agregar</ButtonStyle>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => sendRequest()}>
                    <View>
                        <ButtonStyle view="action" >{Platform.OS == "ios" ? "Finalizar" : "Completar"}</ButtonStyle>
                    </View>
                </TouchableWithoutFeedback>
            </View>


            <BookingComplete
                open={handleComplete}
                show={complete}
                data={requesitionData}
                onRemove={setRequesitionData}
                onComplete={handleBooking} />
        </View >
    )
}



const autoWidth = (Dimensions.get('window').width * 0.8);
const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row"
    },
    headerText: {
        color: theme.colors.azulNet,
        marginVertical: 10,
        alignSelf: "center",
        fontSize: Platform.OS === 'ios' ? 12 : 14
    },
    separator: {
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 2,
        borderStyle: Platform.OS === 'ios' ? 'dashed' : 'dotted',
        overflow: 'visible',
        width: autoWidth,
        marginVertical: 3,
        alignSelf: 'center',
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    hrLabel: {
        position: "absolute",
        left: '30%',
        top: "68%",
    },
    buttons: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        width: autoWidth
    }

})


export default BookingBody;