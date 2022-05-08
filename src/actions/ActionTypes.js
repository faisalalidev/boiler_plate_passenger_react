// @flow

const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

const ON = "ON";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL, ON].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const LOGOUT = "LOGOUT";
export const NETWORK_INFO = "NETWORK_INFO";
export const NOTIFICATION = createRequestTypes("NOTIFICATION");
export const SCHEDULED = createRequestTypes("SCHEDULED");
export const HISTORY = createRequestTypes("HISTORY");
export const ADD_STRIPE = createRequestTypes("ADD_STRIPE");
export const DEFAULT_CARD = createRequestTypes("DEFAULT_CARD");
export const DELETE_STRIPE = createRequestTypes("DELETE_STRIPE");
export const GET_STRIPE = createRequestTypes("GET_STRIPE");
export const GET_STRIPE_LIST_UPDATE = "GET_STRIPE_LIST_UPDATE";
export const GET_STRIPE_LIST_REMOVE = "GET_STRIPE_LIST_REMOVE";
export const SET_DEFAULT_UPDATE = "SET_DEFAULT_UPDATE";
export const TRIP_DETAILS = createRequestTypes("TRIP_DETAILS");
export const USER_LOCATION = createRequestTypes("USER_LOCATION");
export const FAQ = createRequestTypes("FAQ");
export const LOGIN = createRequestTypes("LOGIN");
export const STATE = createRequestTypes("STATE");
export const SIGN_UP = createRequestTypes("SIGN_UP");
export const CITY = createRequestTypes("CITY");

export const FORGOT_PASSWORD = createRequestTypes("FORGOT_PASSWORD");

export const PASSENGER_PROFILE = createRequestTypes("PASSENGER_PROFILE");

export const USER_PROFILE_UPDATE = createRequestTypes("USER_PROFILE_UPDATE");

export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");

export const VEHICLE_CATEGORY = createRequestTypes("VEHICLE_CATEGORY");
export const EMPTY = createRequestTypes("EMPTY");

export const GOOGLE_AUTOCOMPLETE = createRequestTypes("GOOGLE_AUTOCOMPLETE");

export const GOOGLE_GEOCODE = createRequestTypes("GOOGLE_GEOCODE");

export const PICKUP_LOCATION_CHANGE = "PICKUP_LOCATION_CHANGE";

export const DROPOFF_LOCATION_CHANGE = "DROPOFF_LOCATION_CHANGE";

export const LOCATION_SELECTED = "LOCATION_SELECTED";

export const LOCATION_DROPOFF_RESET = "LOCATION_DROPOFF_RESET";

export const FOCUS_CHANGE = "FOCUS_CHANGE";

export const GOOGLE_NEARBY = createRequestTypes("GOOGLE_NEARBY");

export const VEHICLE_CATEGORY_SELECTED = "VEHICLE_CATEGORY_SELECTED";

export const CALCULATE_ESTIMATE_FARE = createRequestTypes(
  "CALCULATE_ESTIMATE_FARE"
);
export const CANCEL_RIDE = createRequestTypes("CANCEL_RIDE");
export const REQUEST_RIDE = createRequestTypes("REQUEST_RIDE");
export const REQUEST_RIDE_RESET = "REQUEST_RIDE_RESET";
export const REQUEST_RIDE_CONDITIONAL_RESET = "REQUEST_RIDE_CONDITIONAL_RESET";

// Socket Actions

export const SOCKET_INFO = "SOCKET_INFO";
export const SOCKET_LOGIN = createRequestTypes("SOCKET_LOGIN");
export const SOCKET_CONNECT = createRequestTypes("SOCKET_CONNECT");

export const NEARBY_ALL_DRIVER = createRequestTypes("NEARBY_ALL_DRIVER");
export const GET_PASSENGER_RECENT_LOCATION = createRequestTypes(
  "GET_PASSENGER_RECENT_LOCATION"
);

export const DRIVER_COMPLETED_RIDE = createRequestTypes(
  "DRIVER_COMPLETED_RIDE"
);
export const RESET_DRIVER_COMPLETED_RIDE = "RESET_DRIVER_COMPLETED_RIDE";

export const DRIVER_STARTED_RIDE = createRequestTypes("DRIVER_STARTED_RIDE");
export const RESET_DRIVER_STARTED_RIDE = "RESET_DRIVER_STARTED_RIDE";

export const DRIVER_CANCELED_RIDE = createRequestTypes("DRIVER_CANCELED_RIDE");
export const RESET_DRIVER_CANCELED_RIDE = "RESET_DRIVER_CANCELED_RIDE";

export const SHORTEST_PATH = createRequestTypes("SHORTEST_PATH");
export const DECODE_POLYLINE = "DECODE_POLYLINE";

export const DISTANCE_MATRIX = createRequestTypes("DISTANCE_MATRIX");

export const RIDE_RATING = createRequestTypes("RIDE_RATING");
//Geo Location Request type
export const GET_CURRENT_LOCATION = "GET_CURRENT_LOCATION";
export const GET_SEARCHED_LOCATION = "GET_SEARCHED_LOCATION";
export const GET_DRAGED_LOCATION = "GET_DRAGED_LOCATION";

//App State Actions
export const SHOW_HOME_VIEWS = "SHOW_HOME_VIEWS";
export const SHOW_AUTOCOMPLETE_VIEWS = "SHOW_AUTOCOMPLETE_VIEWS";
export const SHOW_RIDE_SEARCH_DETAIL_VIEWS = "SHOW_RIDE_SEARCH_DETAIL_VIEWS";
export const SHOW_RIDE_SEARCHING_VIEWS = "SHOW_RIDE_SEARCHING_VIEWS";
export const SHOW_IN_RIDE_VIEWS = "SHOW_IN_RIDE_VIEWS";
export const SHOW_COMPLETE_RIDE_VIEWS = "SHOW_COMPLETE_RIDE_VIEWS";
export const SHOW_RIDE_RATING_CONTENT_VIEWS = "SHOW_RIDE_RATING_CONTENT_VIEWS";
export const APP_STATUS = createRequestTypes("APP_STATUS");

export const PAY_NOW = createRequestTypes("PAY_NOW");

export const PAY_NEGATIVE_PAYMENT = createRequestTypes("PAY_NEGATIVE_PAYMENT");
