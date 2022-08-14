import React, { useState, useEffect, useContext, useRef } from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Text, View, Button, Platform } from 'react-native';

import GlobalContext from './../Store/GlobalContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const PushNotification = () => {
  const store = useContext(GlobalContext);
  const [message, setMessage] = useState('');

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => {
        console.log('here i am', store.user.id, token);
        store.updateUser(store.user.id, { device_id: token }).catch(err => {
          console.log('updateUser err', err.response.data.message);;
        });
        setExpoPushToken(token);
      })
      .catch(err => { console.log(err) });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {message !== '' && <Text> {message} </Text>}
        <Button
          title="Send Emergency Alert"
          style={{
            backgroundColor: 'red'
          }}
          onPress={async () => {
            await sendPushNotification(store, setMessage);

          }}
        />
      </View>
    </>
  )

}


// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(store, setMessage) {
  store.notifyCircle()
    .then(res => {
      console.log('notify cirlce', res);
      setMessage('Circle Notified.');
    })
    .catch(err => {
      setMessage('Something went wrong');
      console.log(err.response.data);
    });

  await store.circle.forEach((item) => {
    console.log('here', item);
    if (item.friend.device_id) {
      const message = {
        to: item.friend.device_id,
        sound: 'default',
        title: item.user.name,
        body: 'I think I am in trouble. Here\'s my location.',
        data: { location: [{ lat: 1, long: 2 }, { lat: 2, long: 3 }] },
      };

      console.log('message', message);

      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default PushNotification;
