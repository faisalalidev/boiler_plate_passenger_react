// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors, Fonts } from "../../../theme";

export default StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center"
  },
  body: {
    padding: Metrics.ratio(24),
    margin: Metrics.ratio(32),
    borderRadius: Metrics.ratio(8),
    backgroundColor: Colors.background.primary,
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    height: Metrics.ratio(50),
    borderTopColor: Colors.modalBoder,
    borderTopWidth: 1,
    // borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.background.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    backgroundColor: Colors.background.primary,
    width: Metrics.ratio(350),
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: Metrics.baseMargin,
    borderRadius: 5,
    overflow: "hidden"
    // padding: Metrics.baseMargin
  },
  button: {
    // flex: 1,
    // height: Metrics.ratio(50),
    // justifyContent: "center",
    // borderRadius: Metrics.borderRadius,
    // backgroundColor: Colors.quaternary,
    // marginRight: Metrics.smallMargin
  },
  descriptionStyle: {
    marginBottom: Metrics.ratio(24),
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  buttonCancel: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    height: Metrics.ratio(50),
    borderColor: Colors.black,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.transparent,
    marginRight: Metrics.smallMargin
  },
  closeView: {
    position: "absolute",
    right: Metrics.smallMargin,
    top: Metrics.smallMargin
  },
  close: {
    width: Metrics.images.small,
    height: Metrics.images.small,
    position: "absolute",
    right: Metrics.smallMargin / 2,
    top: Metrics.smallMargin / 2
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.blue
  },
  unSelectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: Colors.background.aztec,
    borderWidth: 2
  },
  itemCon: {
    height: 54,
    flexDirection: "row"
  },
  textArea: {
    // height: 40,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: Colors.textAreaBorder,
    borderRadius: 5,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.regular,
    padding: Metrics.ratio(12),
    alignItems: "flex-start",
    width: Metrics.screenWidth - Metrics.xDoubleBaseMargin * 3
  }
});
