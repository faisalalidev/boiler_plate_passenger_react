import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth - Metrics.doubleBaseMargin,
    height: 46,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 207
  }
});
