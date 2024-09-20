import notifee from '@notifee/react-native';

export async function displayNotifications({
  title,
  body,
}: {
  title:  any;
  body:  any;
}) {
  return await notifee.displayNotification({
    title,
    body,
    android: {channelId: 'expaat-notification'},
    // ios:{id:'expaat-notification'}
  });
}
