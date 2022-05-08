// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
    // backgroundColor: "red"

    // backgroundColor: Colors.background.primary
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.background.secondary
  },
  textfield: {
    // width: Metrics.screenWidth - Metrics.ratio(50),
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.textfieldBorder,
    borderBottomWidth: 1
  }
});
