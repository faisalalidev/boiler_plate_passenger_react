import {
  GOOGLE_AUTOCOMPLETE,
  LOCATION_SELECTED,
  LOCATION_DROPOFF_RESET,
  FOCUS_CHANGE
} from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: GOOGLE_AUTOCOMPLETE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GOOGLE_AUTOCOMPLETE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GOOGLE_AUTOCOMPLETE.FAILURE
  };
}

export function changeLocation(text: String, type: String) {
  return {
    payload: text,
    type: type
  };
}
export function locationSelected(item: Object, type: String) {
  return {
    payload: item,
    selectedType: type,
    type: LOCATION_SELECTED
  };
}
export function locationDropOffReset() {
  return {
    type: LOCATION_DROPOFF_RESET
  };
}
export function focusChange(type) {
  return {
    type: FOCUS_CHANGE,
    payload: type
  };
}
