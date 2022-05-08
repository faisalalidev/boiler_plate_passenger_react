// @flow
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary
  },
  appButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0
  },
  carCard: {
    height: 102,
    width: 109,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 9,
    // borderColor: Colors.black,
    marginRight: 10
  },
  textArea: {
    width: 370,
    height: 100,
    borderWidth: 1,
    borderColor: Colors.textAreaBorder,
    borderRadius: 5,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.regular,
    padding: Metrics.ratio(12),
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin)
  },
  tipCaptainImageSize: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: Colors.background.grey
  }
});
