// @flow
import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics } from "../../theme";
const { height, width } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    height: height - 200,
    width: width,
    paddingTop: 50,
    alignItems: "center"
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.background.secondary
  },
  textfield: {
    width: Metrics.screenWidth,
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.textfieldBorder,
    borderBottomWidth: 1
  },

  labelInput: {
    color: Colors.background.white
  },
  formInput: {
    borderBottomWidth: 1.5,
    borderColor: Colors.textfieldBorder
  },

  input: {
    borderWidth: 0,
    color: Colors.text.primary,
    fontSize: 18
  }
});
