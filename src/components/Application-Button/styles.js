// @flow
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.appbutton.primary,
    width:
      Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin),
    paddingVertical: 15,
    borderRadius: Metrics.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  }
});
