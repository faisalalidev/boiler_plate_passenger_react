import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";
import { AnimatedRegion } from "react-native-maps";

const initialState = {
  isFetching: false,
  failure: false,
  errorMessage: "",
  coordinate: {
    latitude: 0,
    longitude: 0
  },
  trackingCoordinate: new AnimatedRegion({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  }),
  permissionGranted: null
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.USER_LOCATION.REQUEST:
      return {
        ...state,
        isFetching: action.permissionGranted === "granted",
        failure: false,
        errorMessage: "",
        permissionGranted: action.permissionGranted
      };
    case types.USER_LOCATION.SUCCESS:
      console.log("action.location", action.location);
      return {
        ...state,
        isFetching: false,
        failure: false,
        errorMessage: "",
        coordinate: {
          latitude: action.location.coords.latitude,
          longitude: action.location.coords.longitude
        }
      };
    case types.USER_LOCATION.FAILURE:
      return {
        ...state,
        isFetching: false,
        failure: true,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
};
