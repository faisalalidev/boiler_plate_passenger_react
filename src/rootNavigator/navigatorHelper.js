//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {Images, Colors, Fonts} from '../theme';
import {pop} from '../services/NavigationService';
// import {Image, StyleSheet, Text} from 'react-native';
// import {ButtonView, ImageButton} from '../reuseableComponents';
// import {Metrics, AppStyles, Colors, Images} from '../theme';
// import utility from '../utility';

const headerThemeColor = {
  headerStyle: {
    backgroundColor: Colors.background.secondary,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
};

const headerWhiteColor = {
  headerStyle: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
};

const headerTransparent = {
  headerTransparent: true,
};

const headerHideTitle = {
  headerTitle: null,
};

// const backImage = (tintColor = Colors.secondary.azure) => {
//   return {
//     headerBackTitleVisible: false,
//     headerBackImage: () => (
//       <Image
//         source={Images.icBack}
//         style={{
//           marginLeft: Metrics.baseMargin,
//           //tintColor: tintColor
//         }}
//       />
//     )
//   };
// };
const title = (title) => ({
  title,
  headerTitleStyle: {
    color: Colors.white,
  },
});
// const defaultNavOptions = navOptions => {
//   return {
//     defaultNavigationOptions: ({ navigation }) => navOptions
//   };
// };
// const navOptions = navOptions => {
//   return {
//     navigationOptions: ({ navigation }) => navOptions
//   };
// };

// const navButton = (image, key = 'headerRight', navOptions, style) => {
//   return {
//     navigationOptions: ({ navigation }) => {
//       return {
//         [key]: () => (
//           <ImageButton
//             source={image}
//             style={{
//               justifyContent: 'center',
//               marginHorizontal: Metrics.smallMargin,
//               height: 40,
//               ...style
//             }}
//             onPress={navigation.getParam('onPress', () =>
//               global.log('onPress'),
//             )}
//           />
//         ),
//         ...navOptions,
//       };
//     },
//   };
// };
// const dyanimcTitle = (navOptions = {}) => {
//   return {
//     navigationOptions: ({ navigation }) => {
//       return {
//         title: navigation.getParam("title", ""),
//         ...navOptions
//       };
//     }
//   };
// };

// =============================================================================
// Navigation Version 5
// =============================================================================

// const HeaderTextButton = (
//   key = 'headerRight',
//   text = 'headerText',
//   callBack = null,
//   viewStyle = {},
//   textStyle = {},
// ) => {
//   return {
//     [key]: () => (
//       <ButtonView
//         style={{...styles.headerTextButton, ...viewStyle}}
//         onPress={callBack}>
//         <Text style={{...styles.textStyle, ...textStyle}}>{text}</Text>
//       </ButtonView>
//     ),
//   };
// };

// const navButton = (key = 'headerRight', image, callBack = null, style = {}) => {
//   return {
//     [key]: () => (
//       <ImageButton
//         source={image}
//         style={{
//           ...styles.navButton,
//           ...style,
//         }}
//         onPress={callBack}
//         disabled={callBack ? false : true}
//       />
//     ),
//   };
// };

// const backImage = (
//   image = Images.icBack,
//   tintColor = Colors.icon.secondary,
// ) => {
//   return {
//     headerBackTitleVisible: false,
//     headerBackImage: () => (
//       <Image
//         source={image}
//         style={{
//           marginVertical: Metrics.baseMargin,
//           marginHorizontal: utility.isPlatformAndroid
//             ? Metrics.smallMargin
//             : Metrics.baseMargin,
//           tintColor,
//         }}
//       />
//     ),
//   };
// };

// const tabBarOptaions = () => {
//   return {
//     activeTintColor: Colors.icon.theme,
//     inactiveTintColor: Colors.icon.gray,
//     keyboardHidesTabBar: true, //If true hide the tab bar when keyboard opens.
//     // safeAreaInsets: {bottom: Metrics.heightRatio(30)},
//   };
// };

// const removeBottomBorder = {
//   headerStyle: {
//     borderBottomWidth: 0,
//     shadowColor: 'transparent',
//     elevation: 0,
//   },
// };

const headerLeftButton = (icon = Images.leftBlackArrow) => {
  return (
    <TouchableOpacity style={{padding: 10}} onPress={() => pop()}>
      <Image style={styles.headerLeftBtn} source={icon} />
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({
//   headerTextButton: {
//     paddingHorizontal: Metrics.baseMargin,
//     paddingVertical: Metrics.smallMargin,
//   },
//   textStyle: {
//     ...AppStyles.Regular(14, Colors.text.theme),
//   },
//   navButton: {
//     justifyContent: 'center',
//     marginHorizontal: Metrics.smallMargin,
//   },
// });

export {
  //   headerColor,
  //   headerTransparent,
  //   backImage,
  //   title,
  //   defaultNavOptions,
  //   navOptions,
  //   navButton,
  //   dyanimcTitle,

  // ---------------------------------------------------------------------------
  // Navigation version 5
  // ---------------------------------------------------------------------------
  //   HeaderTextButton,
  //   removeBottomBorder,
  //   tabBarOptaions,
  //   navButton,
  //   backImage,
  headerLeftButton,
  headerTransparent,
  headerHideTitle,
  headerThemeColor,
  headerWhiteColor,
  title,
};
