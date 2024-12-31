/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import Navigator from './src/navigator';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/store/store';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

function App(): React.JSX.Element {
  async function getToken() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
  }

  useEffect(() => {
    async function unsubscribe() {
      await notifee.createChannel({
        id: 'expaat-notification',
        name: 'expaat-notification',
        importance: AndroidImportance.HIGH,
        bypassDnd: true,
        visibility: AndroidVisibility.PUBLIC,
        badge: true,
      });
      console.log('registered channel');
    }
    unsubscribe();
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
