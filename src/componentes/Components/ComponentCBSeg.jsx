import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Platform } from "react-native";
import theme from "../../theme";
import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';

export default function ComponentCBSeg({ text, data }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
            <View style={styles.row} >
                <View style={[styles.input, styles.marginInput]}>
                    {pickerOS(data)}
                </View>
            </View>
        </View>
    )
}


const pickerOS = Platform.select({
    ios: (data) => {
        return (
            <ModalDropdown
                onValueChange={(value) => console.log(value)}
                options={data.map(n => (
                    n.name
                ))}
                key={data.map(n => (
                    n.id
                ))}
                dropdownStyle={[styles.pickerIos, { width: Platform.OS === 'ios' ? "61%" : theme.width.input, height:"auto" }]}
                textStyle={[styles.pickerIos]}
                style={[styles.input, styles.pickerIos]} />
        )
    },
    default: (data) => {
        const [selectedValue, setSelectedValue] = useState();

        return (
            <Picker
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
            >
                {data.map(n => (
                    <Picker.Item label={n.name} value={n.id} key={n.id} />
                ))}
            </Picker>
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
        height: theme.height.buttonCont,
        borderWidth: 1,
        borderColor: "#a7a7a7",
        marginHorizontal: 15
    },
    pickerIos: {
        justifyContent: 'center',
        marginLeft: 4,
        fontSize: 15,
        alignContent: "center"
    },
    row: {
        flexDirection: 'row',
    },
    text: {
        marginBottom: 15
    }
})