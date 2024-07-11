import React from "react";
import { View, Text, StyleSheet } from "react-native";

import theme from '../theme.js'
import { useTranslation } from 'react-i18next';
import '../helpers/i18n.js';

export default function Footer({ margin }) {
    const { t } = useTranslation();
    const marginStyle = [
        styles.view,
        margin != 'false' && styles.margins
    ]

    return (
        <View style={marginStyle}>
            <Text style={styles.text}>
                {t("footer.rights")}
            </Text>
            <Text style={styles.text}>
                {t("footer.net")}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
    },
    margins: {
        marginTop: 40,
        marginBottom: 30,
    },
    text: {
        fontSize: theme.fontSizes.subText,
        color: theme.colors.azulNet,
    }
})