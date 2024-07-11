import React, { useTransition } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import componentesLogo from "../../assets/componentesLogo.png";
import disponibilidadLogo from "../../assets/disponibilidadLogo.png";
import HomeSegments from "./HomeSegments";
import planificacionLogo from "../../assets/planificacionLogo.png";
import ReservaLogo from "../../assets/reservaLogo.png";
import solicitudLogo from "../../assets/solicitudLogo.png";
import TittleStyle from "../tittlesStyle";
import theme from "../../theme";
import netRewardsLogo from "../../assets/netRewardsLogo.png";
import '../../helpers/i18n'

const HomeBody = () => {
    const { t } = useTranslation();

    return (
        <View style={{ flex: 4 }}>
            <View>
                <TittleStyle text='subtittle' fontColor='Orange' >
                    {t("home.title")}
                </TittleStyle>
                <Text style={[styles.text, {}]}>
                    {t("home.subtitle")}
                </Text>
            </View>

            <View style={{ marginTop: 5, padding: 1 }}>
                <View style={[styles.segmentsRows]}>
                    <HomeSegments
                        tittle={t("home.availabilitySeg.title")}
                        segText={t("home.availabilitySeg.description")}
                        iconSrc={disponibilidadLogo}
                        name={'Disponibilidad'}
                        firstName={'Prov'}
                        lastName={'1'}
                    />
                    <View style={styles.separator} />
                    <HomeSegments
                        tittle={t("home.bookSeg.title")}
                        segText={t("home.bookSeg.description")}
                        iconSrc={ReservaLogo}
                        name={'Booking'}
                        firstName={'Prov'}
                        lastName={'1'}
                    />
                    <View style={styles.separator} />
                    <HomeSegments
                        tittle={t("home.componentSeg.title")}
                        segText={t("home.componentSeg.description")}
                        iconSrc={componentesLogo}
                        name={'Components'}
                        firstName={'Prov'}
                        lastName={'1'}
                    />
                </View>
                <View style={[styles.segmentsRows]}>
                    <HomeSegments
                        tittle={t("home.solutionsSeg.title")}
                        segText={t("home.solutionsSeg.description")}
                        iconSrc={solicitudLogo}
                        name={'Request'}
                        firstName={'Prov'}
                        lastName={'1'}
                    />
                    <View style={styles.separator} />
                    <HomeSegments
                        tittle={t("home.rewardsSeg.title")}
                        segText={t("home.solutionsSeg.description")}
                        iconSrc={netRewardsLogo}
                        // name={'Booking'}
                        firstName={'Prov'}
                        lastName={'1'}
                    />
                    <View style={styles.separator} />
                    <HomeSegments
                        tittle={t("home.planificationSeg.title")}
                        segText={t("home.solutionsSeg.description")}
                        iconSrc={planificacionLogo}
                        // name={'Booking'}
                        firstName={'Prov'}
                        lastName={'1'}
                    />
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        color: theme.colors.azulNet,
        fontSize: theme.fontSizes.subText,
        marginLeft: theme.margin.marginLeft1,
        marginLeft: 16,
        marginTop: 5
    },
    segmentsRows: {
        flexDirection: 'row',
        height: '43%',
        marginTop: 3
    },
    separator: {
        borderRightWidth: 1,
        borderRightColor: 'black',
        height: '70%',
        marginVertical: 5,
        alignSelf: 'center'
    },
})

export default HomeBody;