// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    // backgroundColor: Colors.background.grey
    flexDirection: "row",
    width: Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin)
    // paddingVertical: Metrics.doubleBaseMargin
  }
});
