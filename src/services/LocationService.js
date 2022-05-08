import {
  LOCATION_TIME_OUT,
  LOCATION_MAX_AGE,
  LOCATION_DISTANCE_FILTER,
  LOCATION_HIGH_ACCURACY,
  TRACKER_LOCATION_TIME_OUT,
  TRACKER_LOCATION_MAX_AGE,
  TRACKER_LOCATION_DISTANCE_FILTER,
  TRACKER_LOCATION_HIGH_ACCURACY,
} from '../constants';
import Geolocation from '@react-native-community/geolocation';

class LocationService {
  watchID = null;

  // get current location is for getting current location this function runs and terminates
  getCurrentLocation(success, failure, locator) {
    Geolocation.getCurrentPosition(
      //
      // first argument for function returning current position
      //
      position => {
        // it has position
        success(position);
      },
      //
      // second argument for handling error
      //
      error => {
        console.log('getCurrentLocation error : ', error);
        failure(error.message);
      },
      //
      // third argument is optional its for config timeout how long wait to return location maximumAge how much older data from cache is useless
      //
      {
        enableHighAccuracy: LOCATION_HIGH_ACCURACY,
        timeout: LOCATION_TIME_OUT,
        maximumAge: LOCATION_MAX_AGE,
      },
    );
  }

  // start location service is for tracking user location after every distanceFilter times distance covered
  startLocationService(success, failure, dispatch, locator) {
    this.watchID = Geolocation.watchPosition(
      position => {
        // set location and get location is only for groov rest is for all projects
        dispatch(success(position));
      },
      //
      // second argument for handling error
      //
      error => {
        dispatch(failure(error.message));
      },
      //
      // third argument is optional its for config timeout how long
      // wait to return location maximumAge how much older data from
      // cache is useless, distanceFilter after how far trigger a location request
      //
      {
        enableHighAccuracy: LOCATION_HIGH_ACCURACY,
        timeout: LOCATION_TIME_OUT,
        maximumAge: LOCATION_MAX_AGE,
        distanceFilter: LOCATION_DISTANCE_FILTER,
      },
    );
  }

  // start location service is for tracking user location after every distanceFilter times distance covered
  startTrackingService(success, failure, callback) {
    this.watchID = Geolocation.watchPosition(
      position => {
        // set location and get location is only for --- rest is for all projects
        console.log('startTrackingService', position);
        success(position);
        callback(position);
        //console.log("tracking success : ", position);
      },
      //
      // second argument for handling error
      //
      error => {
        failure(error.message);
      },
      //
      // third argument is optional its for config timeout how long
      // wait to return location maximumAge how much older data from
      // cache is useless, distanceFilter after how far trigger a location request
      //

      {
        enableHighAccuracy: TRACKER_LOCATION_HIGH_ACCURACY,
        timeout: TRACKER_LOCATION_TIME_OUT,
        maximumAge: TRACKER_LOCATION_MAX_AGE,
        distanceFilter: TRACKER_LOCATION_DISTANCE_FILTER,
      },
    );
    console.log('watche id : ', this.watchID);
  }

  // start location service is for tracking user location after every distanceFilter times distance covered
  startLocationServiceWithoutDispatchObject(success, failure, locator) {
    this.watchID = Geolocation.watchPosition(
      position => {
        // set location and get location is only for --- rest is for all projects
        success(position);
      },
      //
      // second argument for handling error
      //
      error => {
        failure(error.message);
      },
      //
      // third argument is optional its for config timeout how long
      // wait to return location maximumAge how much older data from
      // cache is useless, distanceFilter after how far trigger a location request
      //
      {
        enableHighAccuracy: LOCATION_HIGH_ACCURACY,
        timeout: LOCATION_TIME_OUT,
        maximumAge: LOCATION_MAX_AGE,
        distanceFilter: LOCATION_DISTANCE_FILTER,
      },
    );
  }

  getWatchID() {
    return this.watchID;
  }
}

export default new LocationService();
