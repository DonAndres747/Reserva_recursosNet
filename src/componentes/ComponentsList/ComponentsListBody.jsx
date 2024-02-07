import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions } from "react-native";

import theme from "../../theme";
import TittleStyle from "../tittlesStyle";
import ButtonStyle from "../buttonsStyle";

import componentController from "../../services/controllers/componentController";
import ComponenstListCards from "./ComponentsListCards";
import ComponenstListComplete from "./ComponentsListComplete";

function ComponenstListBody({ solTyp, compList }) {
    const { getComponentsByType } = componentController();
    const [components, setComponents] = useState();
    const [complete, setComplete] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState([]);

    useEffect(() => {
        getComponentsByType({ solTyp: solTyp, compList: compList })
            .then((response) => {
                setComponents(response.data)
            })
    }, [])
 

    handleSelected = (selected) => {
        setSelectedComponent(selected);
    }

    const handleComplete = () => {
        setComplete(!complete)
        return !complete
    };


    const handleBooking = async () => {
        setComplete(false)
    }


    const sendRequest = () => {
        if (selectedComponent.length >= 1) {
            handleComplete();
        } else {
            Alert.alert("por favor selecciona un compoonente para continuar")
        }
    }


    return (
        <View style={styles.container}>
            <TittleStyle fontColor='Orange' text="subtittle" >Seleccione los componentes deseados</TittleStyle>
            <ComponenstListCards data={components} onAdd={(selected) => { handleSelected(selected) }} onRemove={selectedComponent} />
            <View style={styles.buttons}>
                <TouchableWithoutFeedback onPress={() => sendRequest()}>
                    <View>
                        <ButtonStyle view="action" >{Platform.OS == "ios" ? "Finalizar" : "Completar"}</ButtonStyle>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <ComponenstListComplete
                open={handleComplete}
                show={complete}
                data={selectedComponent}
                onRemove={setSelectedComponent}
                onComplete={handleBooking} />
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    buttons: {
        marginTop: 8
    }
});

export default ComponenstListBody;
