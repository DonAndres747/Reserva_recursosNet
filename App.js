import React, { useEffect } from "react";
// import app from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';

import MainStack from "./Navigation/MainStack.js";


async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

async function getToken() {
  const token = await messaging().getToken()
  console.log("token: ", token);
}

export default function App() {

  useEffect(() => {

    requestUserPermission()
    getToken()

  }, [])

  return (
    <MainStack />
  );
}

