import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useTranslation } from "react-i18next";

import theme from "../../theme";
import '../../helpers/i18n'

export default function RequestListSeg({ headers, data, action }) {
    const [dataList, setDataList] = useState([])
    const { t } = useTranslation()

    useEffect(() => {
        data.reverse()
        setDataList(data)
    }, [data])

    const status = {
        P: t("solutions.listSeg.status.p"),
        A: t("solutions.listSeg.status.a"),
        R: t("solutions.listSeg.status.r"),
        PP: t("solutions.listSeg.status.pp")
    }

    return (
        <View style={styles.container}>
            <View style={styles.headers}>
                {headers?.map((header, index) =>
                    <Text key={index} style={styles.header}>
                        {header}
                    </Text>)}
            </View>
            <View style={styles.listContainer}>
                <ScrollView>
                    {dataList.map((row, rowIndex) =>
                        <View key={rowIndex} style={styles.listRow}>
                            {Object.entries(row).map(([key, value], index) =>
                                typeof value !== 'object' ? (
                                    <Text key={key + index} style={styles.text}>
                                        {value}
                                    </Text>
                                ) : (
                                    <View key={key + index} style={styles.text}>
                                        {value.type == "status" ?
                                            (<View style={styles.status}>
                                                <View style={[styles.stsOuterCircle, styles["sts" + value.value]]} >
                                                    <View style={styles.stsInnerCircle}></View>
                                                </View>
                                                <Text>{status[value.value]}</Text>
                                            </View>)
                                            :
                                            value.type == "button" ?
                                                (
                                                    <TouchableWithoutFeedback onPress={() => { action(rowIndex); }}>
                                                        <View style={styles.cardButton}>
                                                            <Text style={styles.cardButtonText}>
                                                                {t("solutions.listSeg.button")}
                                                            </Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                                : ""}
                                    </View>
                                )
                            )}
                        </View>
                    )}
                </ScrollView>
            </View>
        </View >
    );
}



const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    headers: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row",
        width: "100%",
    },
    header: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.azulNet,
        margin: 0,
    },
    listContainer: {
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
        height: "70%",
        borderRadius: 14,
        marginVertical: 3,
        padding: 2,
    },
    listRow: {
        flexDirection: "row",
        color: theme.colors.azulNet,
        marginBottom: 1,
        borderBottomWidth: 1,
        borderColor: "#ededed",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: theme.colors.azulNet,
        width: "25%",
        height: "auto",
        textAlign: "left",
        fontSize: 15,
    },
    status: {
        flexDirection: "row",
        width: "100%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    stsOuterCircle: {
        alignItems: "center",
        justifyContent: "center",
        width: "17%",
        height: "50%",
        borderRadius: 50,
        marginHorizontal: 2
    },
    stsInnerCircle: {
        backgroundColor: "white",
        width: "40%",
        height: "40%",
        borderRadius: 50
    },
    stsP: {
        backgroundColor: "#387FE5"
    },
    stsA: {
        backgroundColor: "green"
    },
    stsR: {
        backgroundColor: "red"
    },
    stsPP: {
        backgroundColor: theme.colors.naranjaNet
    },
    cardButton: {
        backgroundColor: theme.colors.azulNet,
        marginVertical: 3,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 5,
        alignSelf: "center",
    },
    cardButtonText: {
        color: "white",
        textAlign: "center",
        paddingHorizontal: 7,
        paddingVertical: 5,
        fontSize: 12
    },
});
