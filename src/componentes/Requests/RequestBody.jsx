// RequestBody.jsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Dimensions, Alert } from "react-native";
import theme from "../../theme";

import RequestSeqment from "./RequestSeqment";
import RequestModal from "./RequestModal";

import RequestController from "../../services/controllers/requestController";

const RequestBody = () => {
    const { getRequestByManager, denyRequest, acceptRequest } = RequestController();
    const [dataRcv, setDataRcv] = useState([])
    const [formateDataDone, setFormateDataDone] = useState([])
    const [formateDataRcv, setFormateDataRcv] = useState([])
    const [modal, setModal] = useState(false);
    const [selectedReq, setSelectedReq] = useState({});
    const headersDone = [
        "Recurso", "Gerente", "Fechas Cruzadas", "Estado"
    ]
    const headersRcv = [
        "Recurso", "Solicitante", "Fechas Cruzadas", "                    "
    ]

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
        const dataD = await getRequestByManager("D")
        if (dataD.status === 200) {
            temp = []
            dataD.message.forEach((data) => {
                data.crozDates = data.crozDates.replaceAll("-", "/").replace("|", "- ");
                const orderedData = {
                    field1: data.resource_name,
                    field2: data.rcvMng_name,
                    field3: data.crozDates,
                    field4: { type: "status", value: data.request_status }
                };
                temp.push(orderedData);
            });
            setFormateDataDone(temp);
        } else {
            console.log(dataD.message);
        }

        const dataR = await getRequestByManager("R")
        if (dataR.status === 200) {
            temp = []
            dataR.message.forEach((data) => {
                data.crozDates = data.crozDates.replaceAll("-", "/").replace("|", "- ");
                const orderedData = {
                    field1: data.resource_name,
                    field2: data.reqMng_name,
                    field3: data.crozDates,
                    field4: { type: "button" }
                };

                temp.push(orderedData);
            });
            setDataRcv(dataR.message)
            setFormateDataRcv(temp);
        } else {
            console.log(dataR.message);
        }

    }

    async function handleRequest(index) {
        setSelectedReq(dataRcv[index]);
        handleModal();
    }

    async function handleResponse(id, response) {
        try {
            if (response == "accept") {
                const response = await acceptRequest(id);
                console.log(response);
            } else if (response = "deny") {
                const response = await denyRequest(id);
                console.log(response);
            }
            const temp = [...dataRcv]
            const index = temp.findIndex(data => data.req_id = id)
            const temp2 = [...formateDataRcv]
            temp.splice(index, 1);
            temp2.splice(index, 1);
            setDataRcv(temp);
            setFormateDataRcv(temp2)
            handleModal();
        } catch (error) {
            Alert.alert("algo ha salido mal :(")
        }
    }

    const handleModal = () => {
        setModal(!modal)
        return !modal
    };


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Maneja tus solicitudes desde esta pantalla:
            </Text>
            <View style={styles.separator} />
            <View style={styles.segment}>
                <RequestSeqment
                    subtittle={"Tus solicitudes realizadas:"}
                    subtext={"Consulta el estado de tus solicitudes"}
                    headers={headersDone}
                    data={formateDataDone}
                />
            </View>
            <View style={styles.separator} />
            <View style={styles.segment}>
                <RequestSeqment
                    subtittle={"Solicitudes recibidas:"}
                    headers={headersRcv}
                    data={formateDataRcv}
                    action={handleRequest}
                />
            </View>
            <View style={styles.separator} />




            <RequestModal
                open={handleModal}
                show={modal}
                data={selectedReq}
                onResponse={handleResponse} />
        </View>
    );
};


const autoWidth = (Dimensions.get('window').width * 0.8);
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: "100%",
        height: "80%",
        paddingHorizontal: "6%"
    },
    headerText: {
        color: theme.colors.azulNet,
        alignSelf: "flex-start",
        fontSize: Platform.OS === 'ios' ? 12 : 14
    },
    separator: {
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 2,
        borderStyle: Platform.OS === 'ios' ? 'dashed' : 'dotted',
        overflow: 'visible',
        width: autoWidth,
        alignSelf: 'center',
        borderWidth: Platform.OS === 'ios' ? 1 : 0
    },
    segment: {
        height: "40%"
    }
});

export default RequestBody;
