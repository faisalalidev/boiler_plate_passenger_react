import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = {
  isFetching: false,
  failure: false,
  errorMessage: "",
  data: [],
  pickupLocation: "",
  dropoffLocation: "",
  selectedPickupLocation: {},
  selectedDropOffLocation: {},
  selectedPickupQueryText: "",
  selectedDropoffQueryText: "",
  nearByData: [],
  selectedType: "PICKUP_LOCATION_CHANGE"
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.GOOGLE_AUTOCOMPLETE.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.GOOGLE_AUTOCOMPLETE.SUCCESS:
      let newData = action.data.map(item => {
        return {
          description: item.description,
          id: item.id,
          place_id: item.place_id,
          main_text: item.structured_formatting.main_text,
          secondary_text: item.structured_formatting.secondary_text
        };
      });
      return {
        ...state,
        data: newData,
        isFetching: false,
        failure: false,
        errorMessage: ""
      };
    case types.GOOGLE_AUTOCOMPLETE.FAILURE:
      return {
        ...state,
        data: [],
        isFetching: false,
        failure: true,
        errorMessage: action.errorMessage
      };
    case types.FOCUS_CHANGE:
      return {
        ...state,
        selectedType: action.payload
      };
    case types.DROPOFF_LOCATION_CHANGE:
      return {
        ...state,
        dropoffLocation: action.payload,
        selectedDropoffQueryText: action.payload,
        selectedType: action.type,
        isFetching: false,
        selectedDropOffLocation:
          action.payload !== state.dropoffLocation
            ? {}
            : state.selectedDropOffLocation
      };
    case types.PICKUP_LOCATION_CHANGE:
      return {
        ...state,
        pickupLocation: action.payload,
        selectedPickupQueryText: action.payload,
        selectedType: action.type,
        isFetching: false,
        selectedPickupLocation:
          action.payload !== state.pickupLocation
            ? {}
            : state.selectedPickupLocation
      };
    case types.GOOGLE_GEOCODE.REQUEST:
      if (state.selectedType === "PICKUP_LOCATION_CHANGE") {
        return {
          ...state,
          isFetching: true,
          pickupLocation: "Loading...",
          //   selectedPickupQueryText: "Loading...",
          geoRequestType: action.requestType
        };
      } else {
        return {
          ...state,
          isFetching: true,
          dropoffLocation: "Loading...",
          //   selectedDropoffQueryText: "Loading...",
          geoRequestType: action.requestType
        };
      }
    case types.GOOGLE_GEOCODE.SUCCESS:
      let loc = {
        description: action.payload.results[0].formatted_address,
        id: action.payload.results[0].place_id,
        place_id: action.payload.results[0].place_id,
        main_text: action.payload.results[0].address_components[0].long_name,
        secondary_text:
          action.payload.results[0].address_components[1].long_name,
        lat: action.payload.results[0].geometry.location.lat,
        lng: action.payload.results[0].geometry.location.lng
      };
      if (
        state.selectedType === "PICKUP_LOCATION_CHANGE" ||
        state.geoRequestType === types.GET_CURRENT_LOCATION
      ) {
        return {
          ...state,
          selectedPickupLocation: loc,
          isFetching: false,
          failure: false,
          errorMessage: "",
          pickupLocation:
            action.payload.results[0].address_components[0].long_name,
          selectedPickupQueryText:
            state.geoRequestType !== types.GET_SEARCHED_LOCATION
              ? loc.main_text + " " + loc.secondary_text
              : state.selectedPickupQueryText
        };
      } else {
        return {
          ...state,
          selectedDropOffLocation: loc,
          isFetching: false,
          failure: false,
          errorMessage: "",
          dropoffLocation:
            action.payload.results[0].address_components[0].long_name,
          selectedDropoffQueryText:
            state.geoRequestType !== types.GET_SEARCHED_LOCATION
              ? loc.main_text + " " + loc.secondary_text
              : state.selectedDropoffQueryText
        };
      }

    case types.GOOGLE_GEOCODE.FAILURE:
      return {
        ...state,
        isFetching: false,
        failure: true,
        errorMessage: action.errorMessage
      };
    case types.LOCATION_SELECTED:
      if (action.selectedType === types.PICKUP_LOCATION_CHANGE) {
        return {
          ...state,
          selectedPickupLocation: action.payload,
          pickupLocation: action.payload.main_text,
          selectedPickupQueryText: action.payload.main_text
        };
      } else {
        return {
          ...state,
          selectedDropOffLocation: action.payload,
          dropoffLocation: action.payload.main_text,
          selectedDropoffQueryText: action.payload.main_text
        };
      }
    case types.GOOGLE_NEARBY.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.GOOGLE_NEARBY.SUCCESS:
      let nearByData = action.payload.map(item => {
        return {
          description: item.name,
          id: item.id,
          place_id: item.place_id,
          main_text: item.name,
          secondary_text: item.vicinity,
          lat: item.geometry.location.lat,
          lng: item.geometry.location.lng
        };
      });
      return {
        ...state,
        nearByData: nearByData,
        isFetching: false,
        failure: false,
        errorMessage: ""
      };
    case types.GOOGLE_NEARBY.FAILURE:
      return {
        ...state,
        isFetching: false,
        failure: true,
        errorMessage: action.errorMessage
      };
    case types.LOCATION_DROPOFF_RESET:
      return {
        ...state,
        dropoffLocation: "",
        selectedDropOffLocation: {},
        selectedDropoffQueryText: ""
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
