import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import {
  Login,
  Signup,
  Home,
  ForgotPassword,
  MoreItems,
  CustomDrawerContainer,
  Feeds,
  Profile,
  ChangePassword,
  WebViewContainer,
  AutoCompleteLocation,
  RideStatusMap,
  Notifications,
  YourRidesTabNavigation,
  History,
  MyTripDetails,
  HelpNFAQ,
} from '../containers';
import {CreditCard, AddPaymentMethod} from '../components';
import {ImageButton, Text} from '../components';
import {Images, Colors, Fonts, Metrics} from '../theme';
import React from 'react';
import styles from './styles';
import FindYourTrip from '../containers/FindYourTrip';
import {HELP} from '../config/WebService';

const DrawerScreenStack = createStackNavigator(
  {
    home: {
      screen: Home,
    },
    yourRides: {
      screen: History,
      navigationOptions: ({navigation}) => ({
        title: 'Your Rides',
      }),
    },
    notifications: {
      screen: Notifications,
      navigationOptions: ({navigation}) => ({
        title: 'Notifications',
      }),
    },
    setting: {
      screen: MoreItems,
      navigationOptions: ({navigation}) => ({
        title: 'Settings',
      }),
    },
    getHelp: {
      screen: WebViewContainer,
      navigationOptions: ({navigation}) => ({
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        title: 'Get Help',
      }),
    },
    profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        title: 'Profile',
      }),
    },

    MyTripDetails: {
      screen: MyTripDetails,
      navigationOptions: ({navigation}) => ({
        title: 'Details',
      }),
    },
    PaymentInfo: {
      screen: AddPaymentMethod,
      navigationOptions: ({navigation}) => ({
        title: 'Payment Info',
      }),
    },
    addAnotherCard: {
      screen: CreditCard,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: 'white'},
        headerStyle: {
          backgroundColor: Colors.background.aztec,
        },
        // headerTransparent: true,
        title: 'Add Card Details',
      }),
    },
  },

  {
    gesturesEnabled: false,
    headerMode: 'float',
    defaultNavigationOptions: ({navigation}) => {
      console.log('defaultNavigationOptions', navigation);
      const {params} = navigation.state;
      return {
        title: params ? params.title : '',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft:
          navigation.state.routeName === 'home' ? (
            <ImageButton
              source={params ? params.headerLeftInage : Images.drawer}
              onPress={
                params
                  ? params.headerLeftPress
                  : () => navigation.dispatch(DrawerActions.toggleDrawer())
              }
              style={{marginLeft: 15}}
            />
          ) : (
            <ImageButton
              source={
                navigation.state.routeName === 'addAnotherCard'
                  ? Images.navigationBack
                  : Images.leftBlackArrow
              }
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        // headerLeft: (
        //   <ImageButton
        //     source={params ? params.headerLeftInage : Images.drawer}
        //     onPress={
        //       params
        //         ? params.headerLeftPress
        //         : () => navigation.dispatch(DrawerActions.toggleDrawer())
        //     }
        //     style={{ marginLeft: 15 }}
        //   />
        // ),

        headerRight: params ? (
          params.headerRightPress ? (
            <Text
              size="large"
              type="regular"
              color="black"
              style={{marginRight: 20}}
              onPress={params.headerRightPress}>
              Done
            </Text>
          ) : null
        ) : null,
      };
    },
    initialRouteName: 'home',
  },
);

const DrawerStack = createDrawerNavigator(
  {
    DrawerStack: {screen: DrawerScreenStack},
  },
  {
    contentComponent: CustomDrawerContainer,
    drawerWidth: Metrics.screenWidth - Metrics.ratio(120),
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    headerMode: 'screen',
    navigationOptions: () => ({
      gesturesEnabled: false,
      // headerStyle: { backgroundColor: "red" },
    }),
  },
);
const routeConfig = createStackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    signup: {
      screen: Signup,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: 'white'},
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTransparent: true,
        headerLeft: (
          <ImageButton
            source={Images.navigationBack}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    forgotPassword: {
      screen: ForgotPassword,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: 'white'},
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTransparent: true,
        headerLeft: (
          <ImageButton
            source={Images.navigationBack}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    helpAndFAQ: {
      screen: HelpNFAQ,
      navigationOptions: ({navigation}) => ({
        // headerTitleStyle: { color: "white" },
        headerStyle: {
          borderBottomWidth: 0,
        },
        title: 'Help & FAQ',
        // headerTransparent: true,
        headerLeft: (
          <ImageButton
            source={Images.leftBlackArrow}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    drawerStack: {
      screen: DrawerStack,
      navigationOptions: () => ({
        header: null,
      }),
    },
    webView: {
      screen: WebViewContainer,
      navigationOptions: ({navigation}) => ({
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        title: `${navigation.state.params.title}`,
        headerLeft: (
          <ImageButton
            source={Images.leftBlackArrow}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },

    changePassword: {
      screen: ChangePassword,
      navigationOptions: ({navigation}) => ({
        title: 'Reset Password',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: (
          <ImageButton
            source={Images.leftBlackArrow}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    autoCompleteLocation: {
      screen: AutoCompleteLocation,
      navigationOptions: ({navigation}) => {
        return {
          title: '',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: (
            <ImageButton
              source={Images.leftBlackArrow}
              onPress={() => navigation.pop()}
            />
          ),
        };
      },
    },
    findYourTrip: {
      screen: FindYourTrip,
      navigationOptions: ({navigation}) => {
        return {
          // title: "",
          // headerStyle: styles.header,
          // headerTitleStyle: styles.headerTitle,
          header: null,
          // headerLeft: (
          //   <ImageButton
          //     source={Images.leftBlackArrow}
          //     onPress={() => navigation.pop()}
          //   />
          // )
        };
      },
    },
    rideStatusMap: {
      screen: RideStatusMap,
      navigationOptions: ({navigation}) => {
        console.log('navigation', navigation);
        return {
          title: '',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: (
            <ImageButton
              source={Images.leftBlackArrow}
              onPress={
                navigation.state.params && navigation.state.params.onBack
              }
            />
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerStyle: {
          backgroundColor: Colors.background.primary,
          borderBottomWidth: 0,
        },
      };
    },
  },
);

export {routeConfig};
