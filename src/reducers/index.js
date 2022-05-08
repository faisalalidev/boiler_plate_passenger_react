import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";

import networkInfo from "./networkInfo";
import user from "./user";
import notification from "./notification";
import ForgotPasswordReducer from "../containers/Forgot_password/ForgotPasswordReducer";
import userLocation from "./userLocation";
import vehicleCategory from "./SocketReducers/vehicleCategory";
import googleAutoComplete from "./googleAutoComplete";
import { routeConfig } from "../navigator";
const navReducer = createNavigationReducer(routeConfig);

// SOCKET REDUCER
import SocketConnetion from "./SocketReducers/SocketConnetion";
import socketLogin from "./SocketReducers/socketLogin";
import nearByAllDriver from "./SocketReducers/nearByAllDriver";
import getPassengerRecentLocation from "./SocketReducers/getPassengerRecentLocation";
import tripDetails from "./tripDetails";

import shortestPath from "./GoogleApiReducers/shortestPath";
import calculateEstimateFare from "./SocketReducers/calculateEstimateFare";
import requestRide from "./SocketReducers/requestRide";
import distanceMatrix from "./GoogleApiReducers/distanceMatrix";
import cancelRide from "./SocketReducers/cancelRide";

import driverCancelRideReducer from "./SocketReducers/driverCancelRideReducer";
import completeRideReducer from "./SocketReducers/completeRideReducer";
import startRideReducer from "./SocketReducers/startRideReducer";
import rideRating from "./SocketReducers/rideRating";
import scheduled from "./scheduled";
import history from "./history";
import appStateReducer from "./appStateReducer";
import tripReducer from "./SocketReducers/tripReducer";
import addStripe from "./addStripe";
import getStripe from "./getStripe";
import deleteStripe from "./deleteStripe";
import defaultCard from "./defaultCard";
import faq from "./faq";
export default combineReducers({
  nav: navReducer,
  user,
  networkInfo,
  ForgotPasswordReducer,
  userLocation,
  vehicleCategory,
  googleAutoComplete,
  nearByAllDriver,
  SocketConnetion,
  getPassengerRecentLocation,
  calculateEstimateFare,
  //   requestRide,
  // Google Api Action
  notification,
  scheduled,
  history,
  shortestPath,
  distanceMatrix,
  socketLogin,
  cancelRide,
  driverCancelRideReducer,
  //   completeRideReducer,
  //   startRideReducer,
  rideRating,
  appStateReducer,
  tripReducer,
  addStripe,
  getStripe,
  deleteStripe,
  defaultCard,
  tripDetails,
  faq
});
