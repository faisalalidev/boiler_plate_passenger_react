// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: Metrics.doubleBaseMargin,
    alignItems: "center"
  },
  imageBackground: {},
  scroll: {
    flex: 1,
    backgroundColor: Colors.background.secondary
  },
  textInput: { backgroundColor: Colors.background.quaternary },
  textfield: {
    // width: Metrics.screenWidth - Metrics.ratio(100),
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.textfieldBorder,
    borderBottomWidth: 1
  }
});
