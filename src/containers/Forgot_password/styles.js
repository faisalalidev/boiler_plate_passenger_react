// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Metrics.doubleBaseMargin,
    alignItems: "center"
  },
  imageBackground: {},
  scroll: {
    flex: 1,
    backgroundColor: Colors.background.secondary
  },
  emailAddressTextField: {
    // width: Metrics.screenWidth - Metrics.ratio(100),
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.textfieldBorder,
    borderBottomWidth: 1
  },
  forgotPasswordButton: {
    backgroundColor: Colors.background.quaternary,
    width:
      Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin),
    paddingVertical: 10,
    borderRadius: Metrics.borderRadius,
    justifyContent: "center",
    alignItems: "center"
  }
});
