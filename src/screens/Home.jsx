import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableWithoutFeedback onPress={() => navigation.setOptions({ title: 'Update!' })}>
        <Text>HOME</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default HomeScreen;