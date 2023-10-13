import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import theme from "../../theme";

export default function AvailabilityTypSeg({ onChange }) {

    const [checkboxStates, setCheckboxStates] = useState(Array(6).fill(false));

    const handleCheckboxChange = (index) => {
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);
        const checkItems = [];

        updatedStates.forEach((selectedItem, index) => {
            if (selectedItem) {
                checkItems.push(array[index].id);
            }
        });
        onChange(checkItems)
    };


    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    checked={checkboxStates[0]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon="circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{ backgroundColor: "#d3d3d3" }}
                    containerStyle={styles.checkbox}
                    title="Bilingue"
                    textStyle={styles.label}
                    onPress={() => handleCheckboxChange(0)}
                />
                <CheckBox
                    checked={checkboxStates[1]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon="circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{ backgroundColor: "#d3d3d3" }}
                    containerStyle={styles.checkbox}
                    title="Visa"
                    textStyle={styles.label}
                    onPress={() => handleCheckboxChange(1)}
                />
                <CheckBox
                    checked={checkboxStates[2]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon="circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{ backgroundColor: "#d3d3d3" }}
                    containerStyle={styles.checkbox}
                    title="Visa"
                    textStyle={styles.label}
                    onPress={() => handleCheckboxChange(2)}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    checked={checkboxStates[3]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon="circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{ backgroundColor: "#d3d3d3" }}
                    containerStyle={styles.checkbox}
                    title="Configuracion"
                    textStyle={styles.label}
                    onPress={() => handleCheckboxChange(3)}
                />
                <CheckBox
                    checked={checkboxStates[4]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon="circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{ backgroundColor: "#d3d3d3" }}
                    containerStyle={styles.checkbox}
                    title="Desarrollo"
                    textStyle={styles.label}
                    onPress={() => handleCheckboxChange(4)}
                />
                <CheckBox
                    checked={checkboxStates[5]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon="circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{ backgroundColor: "#d3d3d3" }}
                    containerStyle={styles.checkbox}
                    title="Integraciones"
                    textStyle={styles.label}
                    onPress={() => handleCheckboxChange(5)}
                />
            </View>
        </View>
    );
}

const array = [
    {
        name: "Bilingue",
        id: "BIL"
    },
    {
        name: "Visa",
        id: "VISA"
    },
    {
        name: "Visa",
        id: "VISA"
    },
    {
        name: "Configuracion",
        id: "CONF"
    },
    {
        name: "Desarrollo",
        id: "DES"
    },
    {
        name: "Integraciones",
        id: "INTE"
    },
];


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 20,
        justifyContent: "flex-start"
    },
    checkboxContainer: {
        flexDirection: "column",
        width: "50%"
    },
    label: {
        marginLeft: 8,
        fontSize: Platform.OS === 'ios' ? "14%" : 17
    },
    checkbox: {
        margin: 0,
        backgroundColor: '#f2f2f2',
        borderWidth: 0,
    },
    checkboxIcon: {
        width: 14,
        height: 14,
        backgroundColor: "#d3d3d3",
        borderRadius: 10,
    },
});
