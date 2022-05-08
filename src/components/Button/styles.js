// @flow
import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";

export default StyleSheet.create({
  button: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    height: Metrics.buttonHeight,
    borderRadius: Metrics.borderRadius
  },
  spinner: {
    alignSelf: "center"
  },
  opacity: {
    opacity: 0.5
  },
  icon: {
    position: "absolute"
  },
  iconShadow: {
    height: Metrics.buttonHeight,
    width: Metrics.buttonHeight,
    borderRadius: Metrics.borderRadius,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  }
});
