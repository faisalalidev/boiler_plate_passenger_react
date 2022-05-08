// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    width:
      Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin),
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    top: 12
  },
  buttonContainer: {
    backgroundColor: Colors.appbutton.primary,
    flex: 1,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row"
  }
});
