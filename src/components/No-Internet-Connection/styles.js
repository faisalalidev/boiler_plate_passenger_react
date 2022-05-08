// // @flow
// import { StyleSheet } from "react-native";
// import { Colors, Fonts, Metrics } from "../../theme";
// const numColumns = 3;
// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background.primary

//     // paddingVertical: Metrics.doubleBaseMargin,
//     // margin: 1
//   }
// });

// @flow
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background.primary
  },
  text: {
    textAlign: "center"
  },
  leftButtonView: {
    borderWidth: 1,
    width: Metrics.ratio(150),
    paddingVertical: Metrics.baseMargin
  },
  noInternetImage: {
    // width: Metrics.image.xLarge,
    // height: Metrics.image.xLarge
    // marginTop: -Metrics.doubleBaseMargin * 2
  },
  noConnection: {
    margin: Metrics.baseMargin,
    alignItems: "center",
    justifyContent: "center"
  }
});
