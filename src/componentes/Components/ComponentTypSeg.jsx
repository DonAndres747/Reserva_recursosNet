import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import theme from "../../theme";

export default function ComponentTypSeg() {

    const [checkboxStates, setCheckboxStates] = useState(Array(6).fill(false));

    const handleCheckboxChange = (index) => {
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);
        return updatedStates
    };

    async function listSelectedItem(index) {
        const updatedSelectedItems = handleCheckboxChange(index);
        const checkItems = [];

        updatedSelectedItems.forEach((selectedItem, index) => {
            if (selectedItem) {
                checkItems.push(array[index].id);
            }
        });

        console.log(checkItems);
    }

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    checked={checkboxStates[1]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon= "circle"
                    checkedColor={theme.colors.naranjaNet} 
                    unCheckedColor={{backgroundColor: "#d3d3d3"}} 
                    containerStyle={styles.checkbox}
                    title="Indicador"
                    textStyle={styles.label}
                    onPress={() => listSelectedItem(1)}
                />
                <CheckBox
                    checked={checkboxStates[2]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon= "circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{backgroundColor: "#d3d3d3"}}
                    containerStyle={styles.checkbox}
                    title="Entrenamiento"
                    textStyle={styles.label}
                    onPress={() => listSelectedItem(2)}
                />
                <CheckBox
                    checked={checkboxStates[3]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon= "circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{backgroundColor: "#d3d3d3"}}
                    containerStyle={styles.checkbox}
                    title="Evento EMS"
                    textStyle={styles.label}
                    onPress={() => listSelectedItem(3)}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    checked={checkboxStates[4]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon= "circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{backgroundColor: "#d3d3d3"}}
                    containerStyle={styles.checkbox}
                    title="Reporte"
                    textStyle={styles.label}
                    onPress={() => listSelectedItem(4)}
                />
                <CheckBox
                    checked={checkboxStates[5]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon= "circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{backgroundColor: "#d3d3d3"}}
                    containerStyle={styles.checkbox}
                    title="Pantalla"
                    textStyle={styles.label}
                    onPress={() => listSelectedItem(5)}
                />
                <CheckBox
                    checked={checkboxStates[6]}
                    size={20}
                    iconType="material"
                    checkedIcon="check-circle"
                    uncheckedIcon= "circle"
                    checkedColor={theme.colors.naranjaNet}
                    unCheckedColor={{backgroundColor: "#d3d3d3"}}
                    containerStyle={styles.checkbox}
                    title="Interfaz"
                    textStyle={styles.label}
                    onPress={() => listSelectedItem(6)}
                />
            </View>
        </View>
    );
}

const array = [
    {
        name: "Indicador",
        id: "IND"
    },
    {
        name: "Entrenamiento",
        id: "ENTR"
    },
    {
        name: "Evento EMS",
        id: "EMS"
    },
    {
        name: "Reporte",
        id: "REP"
    },
    {
        name: "Pantalla",
        id: "Pnt"
    },
    {
        name: "INT",
        id: "INT"
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
        fontSize: Platform.OS === 'ios' ? "14%" :17
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
