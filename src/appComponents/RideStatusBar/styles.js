// @flow
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: 46,
    backgroundColor: Colors.appbutton.secondary,
    flexDirection: "row",
    paddingHorizontal: Metrics.baseMargin,
    alignItems: "center",
    position: "absolute"
  },
  titleContainer: {
    marginLeft: Metrics.doubleBaseMargin,
    flex: 1
  },
  rideText: {
    color: Colors.white,
    fontSize: Fonts.size.xxSmall,
    fontFamily: Fonts.type.regular,
    lineHeight: 16,
    letterSpacing: 0
  }
});
