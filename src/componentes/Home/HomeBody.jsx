import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TittleStyle from "../tittlesStyle";
import HomeSegments from "./HomeSegments";
import disponibilidadLogo from "../../assets/disponibilidadLogo.png";
import ReservaLogo from "../../assets/reservaLogo.png";
import componentesLogo from "../../assets/componentesLogo.png";
import netRewardsLogo from "../../assets/netRewardsLogo.png";
import planificacionLogo from "../../assets/planificacionLogo.png";

import theme from "../../theme";

const HomeBody = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 4 }}>
            <View>
                <TittleStyle text='subtittle' fontColor='Orange' >
                    Portal de Servicios de netLogistiK
                </TittleStyle>
                <Text style={[styles.text, {}]}>
                    Bienvenido a nuestra App
                </Text>
            </View>

            <View style={{marginTop:5}}>
                <View style={[styles.segmentsRows]}>
                    <HomeSegments
                        tittle='Disponibilidad'
                        segText='Conoce la disponibilidad de los recursos para tus proyectos'
                        iconSrc={disponibilidadLogo}
                    />
                    <View style={styles.separator} />
                    <HomeSegments
                        tittle='Reserva recursos'
                        segText='Reserva recursos definiendo las caracteristicas y habilidades que necesitas'
                        iconSrc={ReservaLogo}
                    />
                    <View style={styles.separator} />
                    <HomeSegments
                        tittle='Componentes'
                        segText='Conoce y adquiere componentes, servicios y addons para tus soluciones'
                        iconSrc={componentesLogo}
                    />
                </View>
                <View style={[styles.segmentsRows]}>
                    <HomeSegments
                        tittle='netRewards'
                        segText='conoce tu estatus y puntos asignados a tu cuenta'
                        iconSrc={netRewardsLogo}
                    />
                    <View style={styles.separator} />
                    <HomeSegments
                        tittle='planificacion'
                        segText='Realiza la planificacion de recursos'
                        iconSrc={planificacionLogo}
                    />
                    <View style={styles.separator} />
                    <HomeSegments
                        circleV='false'
                    />
                    <View style={styles.separator} />
                </View>
            </View>


            {/* <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={() => navigation.setOptions({ title: 'Update!' })}>
          <Text>HOME</Text>
        </TouchableWithoutFeedback>
      </View> */}
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
        padding: 5, 
        marginTop: 5
    },
    separator: {
        borderRightWidth: 1,
        borderRightColor: 'black',
        height: '70%',
        marginVertical: 5,
        alignSelf:'center'
    },
})

export default HomeBody;