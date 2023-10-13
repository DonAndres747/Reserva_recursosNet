import { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import theme from "../../theme";
import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';

export default function RegistryComboBox({ data, onSelect }) {

    function onChange(value) {
        onSelect(value)
    }

    return (
        <View style={styles.container}>
            <View style={styles.row} >
                <View style={styles.input}>
                    {pickerOS({ data, onChange })}
                </View>
            </View>
        </View>
    )
}


const pickerOS = Platform.select({
    ios: ({ data, onChange }) => {
        const [selectedValue, setSelectedValue] = useState();
        return (
            <ModalDropdown
                onValueChange={value => {
                    setSelectedValue(value);
                    onChange(value);
                }}
                options={data.map(n => n.description)}
                key={data.map(n => n.id)}
                defaultValue="select"
                dropdownStyle={[styles.pickerIos, { width: Platform.OS === 'ios' ? "61%" : theme.width.input, height: "auto" }]}
                textStyle={[styles.pickerIos]}
                style={[styles.input, styles.pickerIos]}
            />
        )
    },
    default: ({ data, onChange }) => {
        const [selectedValue, setSelectedValue] = useState();

        return (
            <Picker
                selectedValue={selectedValue}
                onValueChange={value => {
                    setSelectedValue(value);
                    onChange(value);
                }}
                style={styles.pickerIos}
            >
                <Picker.Item label="Select" style={styles.picker} />
                {
                    data.map(n => (
                        <Picker.Item
                            label={n.description}
                            value={n.id}
                            key={n.id}
                            style={styles.pickerIos}
                        />
                    ))
                }
            </Picker>
        )
    }
});


const styles = StyleSheet.create({
    input: {
        width: theme.width.input,
        height: theme.height.buttonCont,
        borderBottomWidth: 1
    },
    pickerIos: {
        justifyContent: 'center',
        fontSize: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picker: {
        color: 'grey'
    },
})