// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.grey
  },
  driverAddress: {
    // height: 52,
    padding: Metrics.baseMargin
    // width: "90%"
  },
  listItemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 139,
    margin: Metrics.baseMargin,
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: Metrics.baseMargin
  },
  historyStyle:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  separator: {
    height: 1,
    backgroundColor: "#eaeaea",
    width:
      Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin),
    position: "absolute",
    bottom: 0
  },
});
