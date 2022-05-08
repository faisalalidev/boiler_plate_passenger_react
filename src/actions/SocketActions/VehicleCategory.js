// @flow

import {VEHICLE_CATEGORY, VEHICLE_CATEGORY_SELECTED} from '../ActionTypes';

export function request(data: Object) {
  return {
    payload: data,
    type: VEHICLE_CATEGORY.REQUEST,
  };
}

export function success(data: Object) {
  return {
    data,
    type: VEHICLE_CATEGORY.SUCCESS,
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: VEHICLE_CATEGORY.FAILURE,
  };
}
export function vechicalCategorySelected(data: Int) {
  console.log('vechicalCategorySelected', data);
  return {
    payload: data,
    type: VEHICLE_CATEGORY_SELECTED,
  };
}
