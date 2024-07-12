import React from "react";
import { View, Text, StyleSheet } from "react-native";

import theme from "../../theme";
import RequestListSeg from "./RequestListSeg"

export default function RequestSeqment({ subtittle, subtext, headers, data, action }) {

    function count() {
        if (data.length) {
            if (data[0].field4.type == "status") {
                const P = data.filter(d => d.field4.value == "P" || d.field4.value == "PP").length
                const A = data.filter(d => d.field4.value == "A").length
                const R = data.filter(d => d.field4.value == "R").length

                return `${P}P ${A}A ${R}R`
            } else if (data[0].field4.type == "button") {
                return data.length
            }
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.segHeader}>
                <Text style={styles.segHeaderText}>
                    {subtittle}
                </Text>
                <Text style={styles.segHeaderText}>
                    {count()}
                </Text>
            </View>
            <Text style={styles.segText}>
                {subtext}
            </Text>
            <RequestListSeg headers={headers} data={data} action={action} />
        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        height: "auto"
    },
    segHeader: {
        justifyContent: "space-between",
        flexDirection: "row"
    },
    segHeaderText: {
        color: theme.colors.azulNet,
        marginBottom: 10,
        alignSelf: "flex-start",
        fontSize: Platform.OS === 'ios' ? 16 : 20,
        fontWeight: theme.fontWeight.semiBold
    },
    segText: {
        alignSelf: "flex-start",
        fontSize: Platform.OS === 'ios' ? 12.5 : 15

    }
})

