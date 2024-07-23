import * as Notifications from 'expo-notifications';

export default function requestPermission() {
  const requestNotificationsPermition = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  }

  return { requestNotificationsPermition }
};

