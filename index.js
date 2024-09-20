/**
 * @format
 */
import './gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {displayNotifications} from './src/utils/notifee';

AppRegistry.registerComponent(appName, () => App);

messaging().onMessage(async remoteMessage => {
  // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  console.log('remote message ', remoteMessage);
  if (remoteMessage) {
    return displayNotifications({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
    });
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  return displayNotifications({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
  });
});
