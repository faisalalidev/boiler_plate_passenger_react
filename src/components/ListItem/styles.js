// @flow
import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: Metrics.ratio(15),
    marginHorizontal: Metrics.baseMargin,
    alignItems: "center"
  }
});
