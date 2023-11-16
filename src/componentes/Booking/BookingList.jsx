import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView } from "react-native";
import theme from "../../theme";


export default function BookingList({ data, onSelectedItemsChange, single, reload }) {
    const [selectedItems, setSelectedItems] = useState(Array(data.length).fill(false));
    const [selectedItemsStr, setSelectedItemsStr] = useState("");

    useEffect(() => {
        setSelectedItems(Array(data.length).fill(false));
        setSelectedItemsStr("")
    }, [reload])


    const toggleItem = (index) => {
        let updatedSelectedItems = [...selectedItems];
        const temp = !updatedSelectedItems[index]
        single ? updatedSelectedItems = Array(updatedSelectedItems.length).fill(false) : "";
        updatedSelectedItems[index] = temp;
        setSelectedItems(updatedSelectedItems);
        return updatedSelectedItems;
    };


    async function listSelectedItem(index) {
        const updatedSelectedItems = await toggleItem(index);
        const selectedItemsList = [];


        updatedSelectedItems.forEach((selectedItem, index) => {
            if (selectedItem) {
                selectedItemsList.push(data[index].id);
            }
        });

        const selectedItemsString = selectedItemsList.join(", ");
        setSelectedItemsStr(selectedItemsString);

        onSelectedItemsChange(selectedItemsString);
    }

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <ScrollView>
                    {data.map((elemento, index) => (
                        <View key={index}>
                            <TouchableWithoutFeedback key={index} onPress={() => { listSelectedItem(index) }}>
                                <Text style={[styles.listText, selectedItems[index] && styles.colorN]}>{elemento.description}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    ))}
                </ScrollView>
                <Text style={styles.selectTextList}>
                    {selectedItemsStr}
                </Text>
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: 145,
        justifyContent: "flex-end",
    },
    list: {
        height: Platform.OS === 'ios' ? 38 : 30,
    },
    listText: {
        fontSize: Platform.OS === 'ios' ? 20 : 20
    },
    colorN: {
        color: theme.colors.naranjaNet
    },
    selectTextList: {
        color: theme.colors.azulNet,
        fontSize: 8
    }
});
