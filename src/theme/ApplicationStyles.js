// @flow
import { StyleSheet } from "react-native";
import { Metrics } from "../theme";
export default StyleSheet.create({
  flex: {
    flex: 1
  },
  htmlContainer: {
    marginTop: -Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin
  },
  textCenter: {
    textAlign: "center"
  }
});
