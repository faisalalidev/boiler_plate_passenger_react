import { fork } from "redux-saga/effects";

import init from "./init";
import login from "./login";
import signup from "./signup";
import ForgotPasswordSaga from "../containers/Forgot_password/ForgotPasswordSaga";
import driverProfile from "./driverProfile";
import driverProfileUpdate from "./driverProfileUpdate";
import changePassword from "./changePassword";
import googleAutoComplete from "./googleAutoComplete";
import googleGeocode from "./googleGeocode";
import googleNearBy from "./googleNearBy";
import socketConnectionSaga from "./SocketSagas/socketConnectionSaga";
import getNearByWithVehicleType from "./SocketSagas/getNearByWithVehicleType";
import getPassngerRecentLocation from "./SocketSagas/getPassngerRecentLocation";
import getAllVehicleTypes from "./SocketSagas/getAllVehicleTypes";
import scheduled from "./scheduled";
import history from "./history";

import shortestPath from "./GoogleApiSaga/shortestPath";
import calculateEstimateFare from "./SocketSagas/calculateEstimateFare";
import requestRide from "./SocketSagas/requestRide";
import socketLoginSaga from "./SocketSagas/socketLoginSaga";
import cancelRide from "./SocketSagas/cancelRide";
import tripDetails from "./tripDetails";

import driverCancelRideSaga from "./SocketSagas/driverCancelRideSaga";
import driverCompleteRideSaga from "./SocketSagas/driverCompleteRideSaga";
import driverStarteRideSaga from "./SocketSagas/driverStarteRideSaga";

import distanceMatrix from "./GoogleApiSaga/distanceMatrix";
import rideRating from "./SocketSagas/rideRating";
import notification from "./notification";
import appStatus from "./SocketSagas/appStatus";
import addStripe from "./addStripe";
import getStripe from "./getStripe";
import deleteStripe from "./deleteStripe";
import defaultCard from "./defaultCard";
import paynow from "./paynow";
import payNegativePayment from "./payNegativePayment";
import faq from "./faq"

// Consider using takeEvery
export default function* root() {
  yield fork(init);
  yield fork(login);
  yield fork(signup);
  yield fork(ForgotPasswordSaga);
  yield fork(driverProfile);
  yield fork(driverProfileUpdate);
  yield fork(changePassword);
  yield fork(googleAutoComplete);
  yield fork(googleGeocode);
  yield fork(googleNearBy);
  yield fork(socketConnectionSaga);
  yield fork(getNearByWithVehicleType);
  yield fork(getPassngerRecentLocation);
  yield fork(getAllVehicleTypes);
  yield fork(notification);
  yield fork(shortestPath);
  yield fork(calculateEstimateFare);
  yield fork(requestRide);
  yield fork(tripDetails);
  yield fork(distanceMatrix);
  yield fork(socketLoginSaga);
  yield fork(cancelRide);
  yield fork(scheduled);
  yield fork(history);
  yield fork(addStripe);
  yield fork(driverCancelRideSaga);
  yield fork(driverCompleteRideSaga);
  yield fork(driverStarteRideSaga);
  yield fork(rideRating);
  yield fork(appStatus);
  yield fork(getStripe);
  yield fork(deleteStripe);
  yield fork(paynow);
  yield fork(payNegativePayment);
  yield fork(faq);
  yield fork(defaultCard);
}
