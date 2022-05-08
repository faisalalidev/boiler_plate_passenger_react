// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  subContainer: {
    marginVertical: Metrics.doubleBaseMargin
    //width: Metrics.screenWidth - Metrics.doubleBaseMargin
  },
  headerCon: {},
  headerSub: {
    justifyContent: "center",
    height: 50
  },
  addCon: {
    height: 100,
    marginHorizontal: 20
  },
  addSub: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  addTextView: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  listView: {
    flex: 8
  }
});
