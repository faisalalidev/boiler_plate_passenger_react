import { StyleSheet, PixelRatio, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;
const iphoneX = height == 812;

const guidelineBaseWidth = iphoneX ? 375 : 414;
const guidelineBaseHeight = iphoneX ? 812 : 736;

// const baselineHeight = 730;

// const ratio = screenHeight / baselineHeight;

const scale = size => (screenWidth / guidelineBaseWidth) * +size;
const scaleVertical = size => (screenHeight / guidelineBaseHeight) * size;

const ratio = (iosSize: number, androidSize: ?number) =>
  Platform.select({
    ios: scaleVertical(iosSize),
    android: androidSize || iosSize
  });

const generatedFontSize = (iosFontSize: number, androidFontSize: ?number) =>
  Platform.select({
    ios: scale(iosFontSize),
    android: androidFontSize || iosFontSize
  });

const NAVBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
// const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 24;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? (iphoneX ? 44 : 20) : 24;

// width: 750,
// height: 110,

export default {
  ratio,
  scaleVertical,
  screenWidth,
  screenHeight,
  generatedFontSize,
  searchBarHeight: ratio(50),
  smallMargin: ratio(8),
  baseMargin: ratio(16),
  doubleBaseMargin: ratio(24),
  xDoubleBaseMargin: ratio(32),
  horizontalLineHeight: ratio(1),
  statusBarHeight: STATUSBAR_HEIGHT,
  navBarHeight: NAVBAR_HEIGHT + STATUSBAR_HEIGHT,
  // navBarHeight: Platform.OS === "ios" ? 64 : 54,
  tabBarHeight: 49, // Default tab bar height in iOS 10

  borderRadius: ratio(5),
  defaultUIHeight: ratio(55),
  oneThirdScreenWidth: ratio(screenWidth / 1.5),
  icons: {
    tiny: ratio(15),
    small: ratio(20),
    normal: ratio(27),
    medium: ratio(30),
    large: ratio(38),
    xl: ratio(60)
  },
  images: {
    xSmall: ratio(15),
    small: ratio(20),
    medium: ratio(40),
    large: ratio(55),
    xLarge: ratio(70),
    avatar: ratio(90),
    logo: ratio(200),
    radius: ratio(100),
    coverWidth: screenWidth,
    coverHeight: screenWidth / 2
  }
};
