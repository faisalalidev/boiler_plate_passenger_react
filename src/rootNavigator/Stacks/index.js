import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Login,
  ForgotPassword,
  Signup,
  Profile,
  Home,
  Notifications,
  MoreItems,
  WebViewContainer,
  ChangePassword,
  History,
} from '../../containers';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  headerLeftButton,
  headerTransparent,
  headerHideTitle,
  headerThemeColor,
  headerWhiteColor,
  title,
} from '../navigatorHelper';
import {AddPaymentMethod, CreditCard} from '../../components';
import {Images, Colors, Fonts} from '../../theme';

const Stack = createStackNavigator();
const Screen = createStackNavigator().Screen;
const Tab = createBottomTabNavigator();

// =============================================================================
// Auth Stacks
// =============================================================================
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      ...headerThemeColor,
      ...headerHideTitle,
    }}>
    <Screen
      name="login"
      component={Login}
      options={{
        ...headerTransparent,
      }}
    />
    <Screen
      name="signup"
      component={Signup}
      options={{
        headerLeft: () => headerLeftButton(Images.navigationBack),
      }}
    />
    <Screen
      name="forgotPassword"
      component={ForgotPassword}
      options={{
        headerLeft: () => headerLeftButton(Images.navigationBack),
      }}
    />
  </Stack.Navigator>
);

// =============================================================================
// App Stacks
// =============================================================================

const DrawerStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      ...headerWhiteColor,
      headerLeft: () => headerLeftButton(),
    }}>
    <Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
      }}
    />

    <Screen
      name="notifications"
      component={Notifications}
      options={{
        ...title('Notifications'),
      }}
    />
    <Screen
      name="setting"
      component={MoreItems}
      options={{
        ...title('Settings'),
      }}
    />
    <Screen
      name="addAnotherCard"
      component={CreditCard}
      options={{
        ...title('Add Card Details'),
      }}
    />

    <Screen
      name="yourRides"
      component={History}
      options={{
        ...title('Your Rides'),
      }}
    />

    <Screen
      name="PaymentInfo"
      component={AddPaymentMethod}
      options={{
        ...title('Payment Info'),
      }}
    />
    <Screen
      name="changePassword"
      component={ChangePassword}
      options={{
        ...title('Reset Password'),
        ...headerThemeColor,
        headerLeft: () => headerLeftButton(Images.navigationBack),
      }}
    />
    <Screen
      name="profile"
      component={Profile}
      options={{
        ...title('Profile'),
        ...headerThemeColor,
        headerLeft: () => headerLeftButton(Images.navigationBack),
      }}
    />
    <Screen
      name="webView"
      component={WebViewContainer}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
    <Screen
      name="getHelp"
      component={WebViewContainer}
      options={{
        ...title('Get Help'),
      }}
    />
  </Stack.Navigator>
);

export {AuthStack, DrawerStack};
