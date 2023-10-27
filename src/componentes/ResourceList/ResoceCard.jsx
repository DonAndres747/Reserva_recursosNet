    import React, { useState, useEffect, useRef } from "react";
    import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, Dimensions, ScrollView, Image } from "react-native";
    import AsyncStorage from "@react-native-async-storage/async-storage";

    import resourceController from "../../services/controllers/resourceController";
    import ButtonStyle from "../buttonsStyle";
    import theme from "../../theme";


    function ResourceCard() {
        const { onChange, resourceModelData, getResourcesBySkill } = resourceController();
        const [resources, setResources] = useState([]);
        const [reCharge, setRecharge] = useState(true);
        const scrollViewRef = useRef(null);

        const [dataG, seDataG] = useState("Loading...");

        useEffect(() => {
            const fetchResources = async () => {
                try {
                    if (reCharge) {
                        const skills = await AsyncStorage.getItem("skills");
                        const level = await AsyncStorage.getItem("level");
                        onChange(skills, level);
                        setRecharge(false);
                        AsyncStorage.removeItem("skills");
                        AsyncStorage.removeItem("level");
                    };

                    const data = await getResourcesBySkill();
                    const response = JSON.stringify(data);
                    const parsedData = JSON.parse(response);
                    parsedData.result.status == 404 ? seDataG(parsedData.result.message) : setResources(parsedData.result.data);;
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchResources();
        }, [resourceModelData]);

        // const handleScroll = (event) => {
        //     const offsetY = event.nativeEvent.contentOffset.y;
        //     const cardHeight = autoHeight(46); // Altura de cada tarjeta
        //     const indexToShow = Math.floor(offsetY / cardHeight);

        //     // Aplicar margen superior negativo solo al elemento visible
        //     resources.forEach((_, index) => {
        //         if (index === indexToShow) {
        //             scrollViewRef.current.scrollTo({ y: index * cardHeight });
        //         }
        //     });
        // };

        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <ScrollView
                        horizontal={true}
                        // ref={scrollViewRef}
                        // onScroll={handleScroll}
                        >

                        {typeof (resources) == "undefined" ? (
                            <Text>{dataG}</Text>
                        ) : (
                            resources.map((element, index) => (
                                <View key={element.resource_id} style={styles.card}>
                                    <Image source={require('../../assets/profile.png')} style={styles.pict} />
                                    <Text style={styles.resourceName}>
                                        {element.first_name}
                                        {" "}
                                        {element.last_name}
                                    </Text>
                                    <Text style={styles.resourceLevel}>
                                        {element.long_dsc}
                                    </Text>
                                    <Text style={styles.resourceDescription}>
                                        {element.description}
                                    </Text>
                                    <TouchableWithoutFeedback onPress={() => Alert.alert("Ingeniero " + element.first_name + " reservado")}>
                                        <View  >
                                            <ButtonStyle>Agregar</ButtonStyle>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            ))
                        )}
                    </ScrollView>
                </View>

            </View>
        );
    }

    function autoWidth(percentage) {
        return (Dimensions.get('window').width * (percentage / 100));
    }
    function autoHeight(percentage) {
        return (Dimensions.get('window').height * (percentage / 100));
    }
    const styles = StyleSheet.create({
        container: {
            alignContent: "center",
            marginVertical: 10
        },
        cardContainer: {
            flexDirection: "row",
            width: autoWidth(85),
        },
        card: {
            borderWidth: 1,
            borderColor: "center",
            flexDirection: "column",
            alignItems: "center",
            width: autoWidth(80),
            height: autoHeight(46),
            marginHorizontal: 10,
            marginVertical: 12,
            backgroundColor: "white",
            justifyContent: "center"
        },
        pict: {
            marginVertical: 10,
        },
        resourceName: {
            fontSize: theme.fontSizes.buttons
        },
        resourceLevel: {
            fontSize: theme.fontSizes.subheading,
            color: "grey"
        },
        resourceDescription: {
            width: "80%",
            marginVertical: 20,
            textAlign: "center"
        }
    });

    export default ResourceCard; 