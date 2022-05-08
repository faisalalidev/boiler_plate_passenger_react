import firebase from 'react-native-firebase';

import {Platform} from 'react-native';
const notifications = firebase.notifications();
class Notification {
  hasPermission = (callback) => {
    firebase
      .messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          console.log('permission : ', enabled);
          // user has permissions
          callback(enabled);
        } else {
          callback(enabled);
          console.log("permission user doesn't have permission : ", enabled);
          // user doesn't have permission
        }
      });
  };

  notificationPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions

      return enabled;
    } else {
      try {
        const requestPermission = await firebase
          .messaging()
          .requestPermission();
        // User has authorised

        return requestPermission;
      } catch (error) {
        console.log('Error : ', error);
        return error;
        // User has rejected permissions
      }
      // user doesn't have permission
    }
  };

  fcmToken = (callback) => {
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          // user has a device token
          console.log('fcm token : ', fcmToken);
          callback(fcmToken);
        } else {
          callback(fcmToken);
          console.log("user doesn't have a device token yet");
          // user doesn't have a device token yet
        }
      });
  };

  // works from kill state to foreground state
  notificationInitialize = (callback) => {
    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          const action = notificationOpen.action;
          const notification: Notification = notificationOpen.notification;
          callback(notification);
        }
      })
      .catch((error) => {
        callback(error);
      });
  };

  onNotificationOpened = (callback) => {
    firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        callback(notification);
      });
  };

  notificationForeground = (callback) => {
    firebase.notifications().onNotification((notification: Notification) => {
      callback(notification);
    });
  };
}
export default new Notification();
