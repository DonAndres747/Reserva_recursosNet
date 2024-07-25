import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function initFireBase() {
    try {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        const token = await messaging().getToken(); 
        AsyncStorage.setItem("phoneToken", token)

            // Handle the notification that caused the app to open from a quit state
            messaging().getInitialNotification().then(remoteMessage => {
                if (remoteMessage) {
                    console.log('Notification caused app to open from quit state:', remoteMessage.notification);
                }
            });

            // Handle the notification when the app is in the foreground
            messaging().onMessage(async remoteMessage => {
                if (remoteMessage.notification) {
                    Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
                }
            });

            // Handle the notification when the app is in the background
            messaging().onNotificationOpenedApp(remoteMessage => {
                if (remoteMessage) {
                    console.log('Notification opened:', remoteMessage.notification);
                }
            });

            // Handle background messages
            messaging().setBackgroundMessageHandler(async remoteMessage => {
                console.log('Received background message:', remoteMessage.notification);
            });

            return () => messaging().onMessage(() => {}); // Cleanup function for unsubscribe
        }
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
}

export default initFireBase;
