// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";
import Polyline from "@mapbox/polyline";
const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: [],
  distance: {},
  duration: {},
  polyLinecoordinates: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHORTEST_PATH.REQUEST:
      return { ...state, isFetching: true };
    case types.SHORTEST_PATH.SUCCESS:
      let array = Polyline.decode(action.data[0].overview_polyline.points);
      let coordinates = array.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        distance: action.data[0].legs[0].distance,
        duration: action.data[0].legs[0].duration,
        data: action.data,
        polyLinecoordinates: coordinates
      };
    case types.DECODE_POLYLINE:
      let arr = Polyline.decode(action.data);
      let coords = arr.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      action.callback(coords);
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        polyLinecoordinates: coords
      };
    case types.SHORTEST_PATH.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};
