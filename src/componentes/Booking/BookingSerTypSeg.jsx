import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import theme from "../../theme";
import BookingList from "./BookingList";
import recLevelController from "../../services/controllers/recLevelController";


let levels = ''
let servs = ''

export default function BookingSerTypSeg({ onchange, data }) {
    const [checkboxStates, setCheckboxStates] = useState(Array(array.length).fill(false));
    const [recLevels, setrecLevels] = useState([]);
    
    const { getAllRecLevels } = recLevelController();

    useEffect(() => {
        levels = ''
        servs = ''
        setCheckboxStates(Array(array.length).fill(false));

    }, [data]);


    const handleSelectedItems = (selectedItems) => {
        onchange([selectedItems, "|", servs].join(""));
        return levels = selectedItems
    };

    async function handleCheckboxChange(index) {
        servs = ''
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);
        const checkItems = [];

        updatedStates.forEach((selectedItem, index) => {
            if (selectedItem) {
                checkItems.push(array[index].id);
            }
        });
        onchange([levels, "|", checkItems].join(""))

        return servs = checkItems
    };


    useEffect(() => {
        getAllRecLevels()
            .then((data) => {
                const response = JSON.stringify(data);
                const parsedData = JSON.parse(response);
                const renamedData = parsedData.levels[0].map((item) => ({
                    ...item,
                    description: item.short_dsc,
                }));

                setrecLevels(renamedData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            {array.map((elemento, index) => (
                <View key={elemento.id} style={styles.checkboxContainer}>
                    <CheckBox
                        checked={checkboxStates[index]}
                        size={23}
                        iconType="material"
                        checkedIcon="check-box"
                        uncheckedIcon={<View style={styles.checkboxIcon} />}
                        checkedColor={theme.colors.naranjaNet}
                        containerStyle={styles.checkbox}
                        title={elemento.description}
                        textStyle={styles.label}
                        onPress={() => handleCheckboxChange(index)}
                    />
                </View>
            ))}
            <View style={styles.listContainer}>
                <BookingList data={recLevels} single={true} onSelectedItemsChange={handleSelectedItems} reload={data} />
            </View>
        </View>
    );
}


const array = [
    {
        description: "Desarrollo",
        id: "DEV"
    },
    {
        description: "Interfaces",
        id: "INT"
    },
    {
        description: "Consultoria",
        id: "CON"
    },
];



const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginVertical: 13,
    },
    checkboxContainer: {
        flexDirection: "row"
    },
    label: {
        marginLeft: 2,
        fontSize: 20
    },
    checkbox: {
        margin: 0,
        backgroundColor: '#f2f2f2',
        borderWidth: 0,
        height: 40,
    },
    checkboxIcon: {
        width: 20,
        height: 20,
        backgroundColor: "#b5b5b5",
        borderRadius: 5,
        marginHorizontal: 3
    },
    listContainer: {
        alignSelf: "center",
        justifyContent: "center",
        width: Platform.OS === 'ios' ? "50%" : 80,
        height: Platform.OS === 'ios' ? 38 : 30,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 5
    },
});
