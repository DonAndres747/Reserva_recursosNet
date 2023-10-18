import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Platform } from "react-native";
import theme from "../../theme";
import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';

export default function ComponentCBSeg({ text, data, onSelect}) {

    function onChange(value) {
        onSelect(value)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
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
                    onChange(value)
                }}
                options={data.map(n => (
                    n.description
                ))}
                key={data.map(n => (
                    n.id
                ))}
                dropdownStyle={[styles.pickerIos, { width: Platform.OS === 'ios' ? "61%" : theme.width.input, height: "auto" }]}
                textStyle={[styles.pickerIos]}
                style={[styles.input, styles.pickerIos]} />
        )
    },
    default: ({ data, onChange }) => {
        const [selectedValue, setSelectedValue] = useState();

        return (
            <Picker
                selectedValue={selectedValue}
                onValueChange={value => {
                    setSelectedValue(value);
                    onChange(value)
                }}
                style={styles.pickerIos}
            >
                {
                    data.map(n => (
                        <Picker.Item
                            label={n.description}
                            value={n.id}
                            key={n.id}
                            style={styles.pickerIos} />
                    ))
                }
            </Picker >
        )
    }

});




const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: "center",
        marginBottom: 25,
        marginTop: 5
    },
    input: {
        width: 250,
        height: Platform.OS === 'ios' ? theme.height.buttonCont : 50,
        borderWidth: 1,
        borderColor: "#a7a7a7",
        marginHorizontal: 15,
    },
    pickerIos: {
        justifyContent: 'center',
        marginLeft: Platform.OS === 'ios' ? 4 : 0,
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        alignContent: "center",
    },
    row: {
        flexDirection: 'row',
    },
    text: {
        marginBottom: 15
    }
})