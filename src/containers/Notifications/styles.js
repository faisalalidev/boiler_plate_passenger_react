// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  itemContainer: {
    backgroundColor: Colors.text.concrete,
    justifyContent: "center",
    alignItems: "center",
    height: 103
  },
  itemSubContainer: {
    height: "80%",
    justifyContent: "space-evenly",
    width: Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin)
  },
  mark: {
    justifyContent: "center",
    marginLeft: 35
  },
  markContainer: {
    height: 11,
    width: 11,
    borderRadius: 5.5,
    backgroundColor: "#1f19d94a",
    justifyContent: "center",
    alignItems: "center"
  },
  markSubContainer: {
    height: 7,
    width: 7,
    borderRadius: 3.5,
    backgroundColor: "#1f19d9"
  },
  notiConatiner: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  notification: {
    flexDirection: "row"
  },
  seprator: {
    height: 1,
    backgroundColor: "#eaeaea",
    width:
      Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin),
    position: "absolute",
    bottom: 0
  },
  notificationStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});