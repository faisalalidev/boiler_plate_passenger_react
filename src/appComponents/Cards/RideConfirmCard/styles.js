// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../theme";

export default StyleSheet.create({
  // Confirm Ride Card
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary
    // alignItems: "center"
    // justifyContent: "center",
  },
  appButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginBottom: Metrics.baseMargin,
    bottom: 0,
    left: 0,
    right: 0
  },
  rideDetailContainer: {
    width: Metrics.screenWidth - 35,
    bottom: 23,
    backgroundColor: "transparent",
    borderRadius: 5,
    shadowColor: "rgba(201, 201, 201, 0.16)",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowRadius: 9,
    shadowOpacity: 1,
    justifyContent: "space-between",
    height: 370
  },
  rideDetailSubCon: {
    backgroundColor: Colors.white,
    width: "100%",
    alignItems: "center",
    height: 261,
    borderRadius: 5
  },
  proMainContainer: {
    height: 58,
    width: "100%"
  },
  proSubContainer: {
    position: "absolute",

    bottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0
  },
  confirmRideImageSize: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: Colors.background.grey
  },
  carDetails: {
    height: 52,
    width: "90%"
  },
  driverAddress: {
    height: 52,
    width: "90%"
  },
  distanceTime: {
    height: 52,
    alignItems: "center",
    alignSelf: "center",
    width: "90%"
  },
  helpBtnCon: {
    width: "100%",
    height: 52,
    marginBottom: 18
  },
  appBtn: {
    backgroundColor: Colors.appbutton.danger,
    height: 52,
    width: "100%"
  },
  separator: {
    width: "90%",
    backgroundColor: Colors.background.grey
  },
  numConStyle: {
    borderWidth: 1,
    borderColor: Colors.text.jelly_bean,
    borderRadius: 1,
    width: 60.7,
    height: 19.1,
    justifyContent: "center",
    alignItems: "center"
  }
  // Confirm Ride Card
});
