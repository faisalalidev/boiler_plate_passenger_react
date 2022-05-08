import Geolocation from '@react-native-community/geolocation';
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

class LocationServiceAndroid {
  watchID = null;
  getCurrentLocationAndroid(success, failure) {
    Geolocation.getCurrentPosition(
      position => {
        success(position);
      },
      error => {
        // See error code charts below.
        failure(error.message);
      },
      {
        enableHighAccuracy: LOCATION_HIGH_ACCURACY,
        timeout: LOCATION_TIME_OUT,
        maximumAge: LOCATION_MAX_AGE,
      },
    );
  }

  startTrackingServiceAndroid(success, failure, callback) {
    this.watchID = Geolocation.watchPosition(
      position => {
        // set location and get location is only for --- rest is for all projects
        success(position);
        callback(position);
      },
      //
      // second argument for handling error
      //
      error => {
        // console.log("startTrackingService error : ", position);
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
        fastestInterval: 1000,
        interval: 1000,
        maximumAge: TRACKER_LOCATION_MAX_AGE,
        distanceFilter: TRACKER_LOCATION_DISTANCE_FILTER,
        // useSignificantChanges: to do when significant change occur
      },
    );
  }

  getWatchID() {
    return this.watchID;
  }
  clearWatchId() {
    Geolocation.clearWatch(this.watchID);
  }
}

export default new LocationServiceAndroid();
