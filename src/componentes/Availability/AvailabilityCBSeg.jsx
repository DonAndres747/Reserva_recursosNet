import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Platform } from "react-native";
import theme from "../../theme";
import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';

export default function AvailabilityCBSeg({ text, data, onSelect }) {

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
        const [selectedValue, setSelectedValue] = useState(0);
        return (

            <ModalDropdown
                onSelect={value => {
                    setSelectedValue(value);
                    onChange(data[value].id);
                }}
                options={data.map(n => (
                    n.description
                ))}
                keyExtractor={(index) => index.toString()}
                saveScrollPosition={false}
                defaultValue={"select"}
                defaultIndex={selectedValue}
                dropdownStyle={[styles.pickerIos, { width: "63%", height: "auto" }]}
                textStyle={styles.pickerFont}
                dropdownTextStyle={styles.pickerFont}
                style={styles.pickerIos} />
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
        alignContent: "center",
        flex: Platform.OS === 'ios' ? 1 : undefined,
    },
    pickerFont: {
        marginLeft: Platform.OS === 'ios' ? 5 : 0,
        fontSize: Platform.OS === 'ios' ? 15 : 18,
    },
    row: {
        flexDirection: 'row',
    },
    text: {
        marginBottom: 15
    }
})