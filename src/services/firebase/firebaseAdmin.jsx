import { Alert } from "react-native";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";

async function initFireBase() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        const token = await messaging().getToken(); 
        AsyncStorage.setItem("phoneToken", token) 

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log("Notification caused app to open from quit state" /* remoteMessage.notification */);
                }
            });

        messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                console.log("Notification opened", /* remoteMessage.notification */);
            }
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log("Received background message", /* remoteMessage.notification */);
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
        });

        return unsubscribe;
    }
}

export default initFireBase;
