import _ from 'lodash';
import Geolocation from '@react-native-community/geolocation';

let watchID;
let myLastPosition;
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};

class Geolocation {
  watchLocation() {
    watchID = Geolocation.watchPosition(
      position => {
        if (!_.isEqual(position.coords, myLastPosition)) {
          myLastPosition = position.coords;
        }
      },
      null,
      geolocationOptions,
    );
  }

  unWatchLocation() {
    if (this.watchID) {
      Geolocation.clearWatch(this.watchID);
    }
  }
}

export default new Geolocation();
