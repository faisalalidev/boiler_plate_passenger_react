// @flow
import { StyleSheet, Platform } from "react-native";
import { Metrics, Fonts, Colors } from "../theme";
import Utils from "../util";
export default StyleSheet.create({
  container: {
    flex: 1
  },
  headerTitle: {
    color: Colors.navbar.text,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium
  },
  header: {
    backgroundColor: Colors.white
  },
  headerDashBoard: {
    backgroundColor: Colors.navbar.background,
    // backgroundColor: "yellow",
    elevation: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.separator
    // marginTop: Platform.select({
    //   ios: 0,
    //   android: Platform.Version >= 19 ? Metrics.statusBarHeight : 0
    // })
  },
  transparentHeader: { backgroundColor: Colors.transparent },
  title: {
    // paddingHorizontal: Platform.OS === "ios" ? 70 : 56,
    // paddingHorizontal: Utils.isPlatformAndroid() ? 50 : null,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.book,
    color: Colors.navbar.text,
    fontWeight: "normal",
    opacity: 0.9,
    fontStyle: "normal",
    letterSpacing: 0
  },
  groov: {
    height: 30,
    resizeMode: "contain"
  },
  iconStyle: {
    width: Metrics.icons.large,
    height: Metrics.icons.large
  },
  tabBarStyle: {
    borderTopColor: Colors.border,
    borderTopWidth: Metrics.horizontalLineHeight,
    backgroundColor: Colors.navbar.background
    // height: Metrics.ratio(70)
  },
  indicatorStyle: {
    opacity: 0
  },
  rightButton: {
    flex: 1,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin
  },
  rightTitle: {
    paddingLeft: Metrics.smallMargin,
    marginRight: Metrics.smallMargin,
    color: Colors.text.secondary,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.normal
  },
  rightButtonStyle: {
    marginRight: Metrics.baseMargin
  },
  leftButtonStyle: {
    marginLeft: Metrics.baseMargin
  }
});
