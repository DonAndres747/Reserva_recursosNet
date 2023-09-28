import React from "react";
import { View, Text } from "react-native";
import Logo from "../componentes/logo.jsx";
import Footer from "../componentes/footer.jsx";
import BookingBody from "../componentes/Booking/BookingBody.jsx";

const BookingScreen = () => {

  return (
    <View style={{ flex: 1, alignItems: "center"}}>
      <BookingBody />
      <View style={{ alignItems: 'center', marginTop:"15%" }}>
        <Logo logoTyp='subLogo' />
        <Footer margin='false' />
      </View>
    </View >
  )
}

export default BookingScreen;