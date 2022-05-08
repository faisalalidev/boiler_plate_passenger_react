// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  listStyle: { paddingVertical: Metrics.smallMargin },
  sepratorStyle:{
    height:2
  }
});
