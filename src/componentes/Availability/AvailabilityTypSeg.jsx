import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { useTranslation } from "react-i18next";

import theme from "../../theme";
import '../../helpers/i18n'


export default function AvailabilityTypSeg({ onChange }) {
    const [checkboxStates, setCheckboxStates] = useState(Array(array.length).fill(false));
    const { t } = useTranslation();

    const handleCheckboxChange = (index) => {
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);

        const checkItems = [];
        updatedStates.forEach((selectedItem, index) => {
            if (selectedItem) {
                console.log(array[index].id);
                checkItems.push(array[index].id);
            }
        });
        onChange(checkItems);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.checkboxContainer}
                showsVerticalScrollIndicator={false}
            >
                {array.map((item, index) => (
                    <CheckBox
                        key={item.id}
                        checked={checkboxStates[index]}
                        size={20}
                        iconType="material"
                        checkedIcon="check-circle"
                        uncheckedIcon="circle"
                        checkedColor={theme.colors.naranjaNet}
                        unCheckedColor={{ backgroundColor: "#d3d3d3" }}
                        containerStyle={styles.checkbox}
                        title={t(`${item.name}`)}
                        textStyle={styles.label}
                        onPress={() => handleCheckboxChange(index)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const array = [
    { name: "availability.OTHER.PPT", id: "PPT" },
    { name: "availability.OTHER.VISAEEUU", id: "VISAEEUU" },
    { name: "availability.OTHER.VISACAN", id: "VISACAN" },
    { name: "availability.language.ENG", id: "ENG" },
    { name: "availability.language.POR", id: "POR" },
    { name: "availability.language.FRA", id: "FRA" },
    { name: "availability.language.SPA", id: "SPA" },
    { name: "availability.servtyp.CONF", id: "CONF" },
    { name: "availability.servtyp.CONS", id: "CONS" },
    { name: "availability.servtyp.DEV", id: "DEV" },
    { name: "availability.servtyp.TECH", id: "TECH" },
];

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        height: 150,
        padding: 0,
    },
    checkboxContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    label: {
        marginLeft: 8,
        fontSize: Platform.OS === 'ios' ? 15 : 17
    },
    checkbox: {
        width: "40%",
        backgroundColor: '#f2f2f2',
        borderWidth: 0,
    },
});
