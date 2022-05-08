// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: Metrics.doubleBaseMargin,
    alignItems: "center"
    // backgroundColor: "red"
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  emailAddressTextField: {
    // width: Metrics.screenWidth - Metrics.ratio(100),
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.textfieldBorder,
    borderBottomWidth: 1
  },
  passwordAddressTextField: {
    width: Metrics.screenWidth - Metrics.ratio(50),
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.textfieldBorder,
    borderBottomWidth: 1,
    borderRadius: Metrics.borderRadius
  },
  scroll: {
    flex: 1,
    // backgroundColor: "yellow"
    backgroundColor: Colors.background.secondary
  },
  textInput: { backgroundColor: Colors.background.quaternary },
  forgotPassword: {
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0
  },
  guestContainer: {
    paddingVertical: Metrics.smallMargin
    // marginTop: Metrics.baseMargin
  }
});
