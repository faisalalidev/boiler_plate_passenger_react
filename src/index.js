// @flow
import React, {createContext, Component} from 'react';
import {
  View,
  StatusBar,
  NativeModules,
  PermissionsAndroid,
  BackHandler,
  Platform,
} from 'react-native';
import {Provider} from 'react-redux';
import NetworkInfo from './services/NetworkInfo';
import {networkInfoListener} from './actions/NetworkInfoActions';
import LocationServices from './services/LocationService';
import SplashScreen from 'react-native-splash-screen';
// import { request, success, failure } from "./actions/UserLocation";
import {navigatorRef} from './services/NavigationService';
import {Colors, Images} from './theme';
import {AppState, MessageBar} from './components';
import Utils from './util';
import {PersistGate} from 'redux-persist/integration/react';
import Notification from './services/Notification';
import firebase from 'react-native-firebase';
import {store, persistor} from './store';
import RootNavigator from './rootNavigator';
import singleton from './singleton';

export const LoginContext = createContext();

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.state = {
      //   isLoading: true,
      //   store: configureStore(() => {
      //     this.setState({isLoading: false});
      //     SplashScreen.hide();
      //     // if (Utils.isPlatformAndroid()) {
      //     //   NativeModules.SplashScreen.hide();
      //     // }
      //   }),
      isLogin: false,
      setLogin: this.setLogin,
      isReduxLoaded: false,
    };
  }
  setLogin = (isLogin = true) => this.setState({isLogin});
  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  //   onBackPress = () => {
  //     const {store} = this.state;
  //     const index = this.state.store.getState().nav.index;
  //     const routeName = this.state.store.getState().nav.routes[index].routeName;
  //     let getNav = this.state.store.getState().nav.routes;
  //     let navIn = getNav.length === 2 ? 1 : getNav.length > 2 ? 2 : 3;
  //     if (getNav.length === 2 && getNav[navIn]['routes']) {
  //       if (getNav[navIn]['routes'][0]['routes'].length === 1) {
  //         return BackHandler.exitApp();
  //       }
  //     } else if (getNav.length === 3 && getNav[2]['routes']) {
  //       return BackHandler.exitApp();
  //     } else if (
  //       getNav.length === 3 &&
  //       getNav[2]['params'] &&
  //       getNav[2]['params'].title === 'Get Help'
  //     ) {
  //       this.state.store.dispatch(StackActions.pop());
  //       return this.state.store.dispatch(StackActions.pop());
  //     }
  //     if ('login'.includes(routeName)) {
  //       return BackHandler.exitApp();
  //     }
  //     return this.state.store.dispatch(StackActions.pop());
  //   };
  componentDidMount() {
    NetworkInfo.networkInfoListener(store.dispatch, networkInfoListener);
    // if (Utils.isPlatformAndroid()) {
    //   NativeModules.SplashScreen.hide();
    // }
    // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // console.log("app store : ", this.state.store.getState().user);

    this._forgroundNotification();

    // Notification.notificationForeground(data => {
    //   console.log("notificationForeground ******* : src  ", data);
    // });
  }
  onBeforeLift = () => {
    singleton.storeRef = store;

    this.setState({isReduxLoaded: true}, () => {
      SplashScreen.hide();

      const userObj = store.getState().user.data;

      if (userObj.id) {
        Utils.setUserToken(userObj.token);
        this.setLogin();
      }
      // return rootNavigator(isLoggedIn);
    });
  };
  _requestLocationPermission = async () => {
    const check = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (!check) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Rydr needs location permission to work.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Location permission granted
          this._startLocationService(granted);
        } else {
          // Location permission denied
          this.state.store.dispatch(request(granted));
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  _forgroundNotification = () => {
    Notification.notificationForeground((notification) => {
      console.log('notificationForeground ****** : ', notification);

      const channelId = new firebase.notifications.Android.Channel(
        'Default',
        'Default',
        firebase.notifications.Android.Importance.High,
      );
      firebase.notifications().android.createChannel(channelId);

      let notification_to_be_displayed = new firebase.notifications.Notification(
        {
          data: {},
          sound: 'default',
          show_in_foreground: true,
          title: notification._title,
          body: notification._body,
        },
      );

      if (Platform.OS == 'android') {
        notification_to_be_displayed.android
          .setPriority(firebase.notifications.Android.Priority.High)
          .android.setChannelId('Default')
          .setSound('default')
          .android.setSmallIcon('ic_launcher')
          .android.setAutoCancel(true);
      }

      firebase
        .notifications()
        .displayNotification(notification_to_be_displayed)
        .then((msg) => {
          console.log('msg', msg);
        })
        .catch((err) => {
          console.log('err', err);
        });
    });
  };

  render() {
    const {isLoading, isReduxLoaded} = this.state;
    if (isLoading) {
      return null;
    }
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <Provider store={store}>
          <PersistGate onBeforeLift={this.onBeforeLift} persistor={persistor}>
            {isReduxLoaded ? (
              <LoginContext.Provider value={this.state}>
                <RootNavigator ref={navigatorRef} />
              </LoginContext.Provider>
            ) : (
              <View />
            )}
          </PersistGate>
        </Provider>
        <AppState />
        <MessageBar />
      </View>
    );
  }
}
