import { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView } from "react-native";
import BookingList from "./BookingList";
import solTypController from "../../services/controllers/solTypController";

function BookingSolSeg({ onchange }) {
    const { getAllSolTypes } = solTypController();
    const [solTypes, setSolTypes] = useState([]);

    useEffect(() => {
        getAllSolTypes()
            .then((data) => {
                const response = JSON.stringify(data);
                const parsedData = JSON.parse(response); 
                setSolTypes(parsedData.solutionsTypes[0]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, []);


    const handleSelectedItems = (selectedItems) => {
        onchange(selectedItems)
    };


    return (
        <View style={styles.container}>
            <Text style={styles.solText}>Solucion(es)</Text>
            <BookingList data={solTypes} onSelectedItemsChange={handleSelectedItems} />
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: 145,
        marginLeft: 15,
    },
    list: {
        height: 20,
    },
    listText: {
        fontSize: 20
    },
    solText: {
        textAlign: "left",
        marginBottom: 7
    }
})

export default BookingSolSeg;