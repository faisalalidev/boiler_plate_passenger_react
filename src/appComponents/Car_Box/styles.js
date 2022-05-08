// @flow
import { StyleSheet } from "react-native";
import { Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary
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
    borderColor: Colors.black,
    marginRight: 10
  }
});
