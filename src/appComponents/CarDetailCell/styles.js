// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    width:
      Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin),
    justifyContent: "center"
  },
  acceptRideImageSize: {
    width: 56,
    height: 56,
    marginRight: 25,
    borderWidth: 3,
    borderRadius: 28,
    borderColor: Colors.background.grey
  }
});
