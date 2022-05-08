// @flow
import _ from 'lodash';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  PixelRatio,
  TextInput,
  BackHandler,
  PermissionsAndroid,
  Keyboard,
  Button,
  SafeAreaView,
} from 'react-native';
import {Text, AppButton, ButtonView} from '../../components';
import {
  WhereToGo,
  CurrentLocationMarker,
  EstimateBar,
  VehicleCategory,
  MapMarker,
  MapPolyline,
  Modal,
  Cards,
  BottomSheet,
  ProfileImage,
  RideDetailCard,
} from '../../appComponents';
import styles from './styles';
import {Metrics, Colors, Images, Fonts} from '../../theme';
import uber_style from '../../theme/uber_style.json';
import MapView, {PROVIDER_GOOGLE, AnimatedRegion} from 'react-native-maps';
import SocketIO from '../../services/SocketIO';
import {
  request as userLocationRequest,
  success as userLocatoinSuccess,
  failure as userLocationFailure,
} from '../../actions/UserLocation';
import LocationService from '../../services/LocationService';
import {
  success as nearByAllDriverSuccess,
  request as nearByAllDriverRequest,
  on as nearByAllDriverOn,
} from '../../actions/SocketActions/NearByAllDriver';
import {
  request as requestVehicleCategory,
  vechicalCategorySelected,
} from '../../actions/SocketActions/VehicleCategory';
import {
  request as requestShortestPathAction,
  decodePolyline,
} from '../../actions/GoogleApiActions/ShortestPathAction';
import {request as calculateEstimateFareRequest} from '../../actions/SocketActions/CalculateEstimateFare';
import {
  request as requestRideRequest,
  reset as resetRequestRide,
  resetConditional,
} from '../../actions/SocketActions/RequestRide';
import {locationDropOffReset} from '../../actions/GoogleAutoComplete';
import {request as geoRequest} from '../../actions/GoogleGeocode';
import {request as distanceMatrixRequest} from '../../actions/GoogleApiActions/DistanceMatrixAction';
import {request as requestCancelRide} from '../../actions/SocketActions/CancelRide';
import {DrawerActions} from 'react-navigation';
import AutoCompleteView from '../../appComponents/AutoCompleteView';
import {reset as resetDriverStartedRide} from '../../actions/SocketActions/DriverStartedRide';
import {request as requestRideRating} from '../../actions/SocketActions/RideRating';

import {
  API_NEARBYWITHVEHICLETYPE,
  API_PAYNOW,
  API_PAYNOW_SOCKET,
} from '../../config/WebService';
import Utils from '../../util';
import StarRating from 'react-native-star-rating';
import SocketIOClient, {Manager} from 'socket.io-client';
import haversine from 'haversine';
// Socket Action
import LocationServiceAndroid from '../../services/LocationServiceAndroid';
import {
  GET_DRAGED_LOCATION,
  GET_CURRENT_LOCATION,
  DROPOFF_LOCATION_CHANGE,
  SHOW_HOME_VIEWS,
  SHOW_AUTOCOMPLETE_VIEWS,
  SHOW_RIDE_SEARCH_DETAIL_VIEWS,
  SHOW_RIDE_SEARCHING_VIEWS,
  SHOW_RIDE_RATING_CONTENT_VIEWS,
} from '../../actions/ActionTypes';
import {stateChange} from '../../actions/AppStateActions';
import {request as requestPaynow} from '../../actions/Paynow';
import firebase, {RemoteMessage, NotificationOpen} from 'react-native-firebase';
import Notification from '../../services/Notification';
import MapMarkerAnimated from '../../appComponents/MapMarkerAnimated';
import {ERROR_NETWORK_NOT_AVAILABLE} from '../../config/WebService';
import {success as userProfileUpdatedSuccess} from '../../actions/DriverProfileUpdate';

//38.309162, -92.527436

const LATITUDE = 38.309162;
const LONGITUDE = -92.527436;
const LATITUDE_DELTA = 0.0043;
const LONGITUDE_DELTA = 0.0034;

class Home extends Component {
  // //Constructor and State
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      maxZoomLevel: 18,
      currentLocationCoordinate: new AnimatedRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      comment: '',
      isFocusedCurrentLoc: false,
      animateToFirstLocationCentered: false,
      showCallout: false,
      nearByAllDriver: [],
      scrollEnabled: true,
      driver: {},
      driverLocationCoordinate: new AnimatedRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      tip: 0,
      isFetching: false,
      userRating: 0,
      tipError: false,
      error: false,
      cancelChangesFee: 0,
      cancelReasonId: 0,
    };

    SocketIO.getInstance().requestOn(
      API_NEARBYWITHVEHICLETYPE,
      this.successNearByVehicle,
      this.failureNearByVehicle,
    );
    props.navigation.setParams({
      title: 'Home',
      headerLeftPress: () => this.headerLeftPress('Home'),
      headerLeftInage: Images.drawer,
    });
  }
  // //Life Cycle Methods
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    if (Utils.isPlatformAndroid()) {
      this._requestLocationPermission();
    } else {
      this._startTracking();
    }
    if (
      this.props.appStateReducer.showAutoCompleteViews ||
      this.props.appStateReducer.showRideSearchDetailViews
    ) {
      this.props.stateChange(true, SHOW_HOME_VIEWS);
      this.props.locationDropOffReset();
      this.findRide.hide();
    } else if (this.props.appStateReducer.showRideSearchingViews) {
      this.updateNavigation('', Images.leftBlackArrow);
      setTimeout(() => {
        this.focusOnPolyline();
      }, 510);
      this.findRide.show();
    } else if (
      this.props.appStateReducer.showRequestRideViews ||
      this.props.appStateReducer.showStartRideViews ||
      this.props.appStateReducer.showCompleteRideViews
    ) {
      console.log('showCompleteRideViews-aya');
      setTimeout(() => {
        this.focusOnPolyline();
      }, 1010);
    } else {
      this.findRide.hide();
    }

    // Notification.notificationForeground(data => {
    //   console.log("notificationForeground ****** : ", data);
    // });

    Notification.notificationPermission()
      .then((bool) => {
        console.warn('notificationPermission :', bool);
      })
      .catch((error) => {
        console.warn('notificationPermission err :', error);
      });

    // this.messageListener = firebase
    //   .messaging()
    //   .onMessage((message: RemoteMessage) => {
    //     console.log("messageListener in foreground", message);
    //     // Process your message as required
    //   });

    // this.removeNotificationListener = firebase
    //   .notifications()
    //   .onNotification((notification: Notification) => {
    //     // Process your notification as required
    //     console.log(
    //       "notification in removeNotificationListener foreground",
    //       notification
    //     );
    //   });

    //   // when notification open (tap on noti)
    // this.removeNotificationOpenedListener = firebase
    //   .notifications()
    //   .onNotificationOpened((notificationOpen: NotificationOpen) => {
    //     // Get the action triggered by the notification being opened
    //     const action = notificationOpen.action;
    //     // Get information about the notification that was opened
    //     const notification: Notification = notificationOpen.notification;
    //     console.log("onNotificationOpened in background state  ", notification);
    //   });

    // Notification.notificationInitialize(data => {
    //   console.log("notificationInitialize ", notification);
    // });
    // firebase
    //   .notifications()
    //   .getInitialNotification()
    //   .then((notificationOpen: NotificationOpen) => {
    //     if (notificationOpen) {
    //       // App was opened by a notification
    //       // Get the action triggered by the notification being opened
    //       const action = notificationOpen.action;
    //       // Get information about the notification that was opened
    //       const notification: Notification = notificationOpen.notification;
    //       // work when comming from kill state
    //       console.log("notificationInitialize  ", notification);
    //     }
    //   });
  } //E.F
  handleBackPress = () => {
    if (
      this.props.appStateReducer.showRideSearchDetailViews ||
      this.props.appStateReducer.showAutoCompleteViews
    ) {
      this.headerLeftPress();
      return true;
    }
  };
  componentWillUnmount() {
    // this.messageListener();
    // this.removeNotificationListener();
    // this.removeNotificationOpenedListener();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.appStateReducer.showRequestRideViews !==
        prevProps.appStateReducer.showRequestRideViews &&
      this.props.appStateReducer.showRequestRideViews
    ) {
      this.requestRideSuccess(this.props.tripReducer.data);
    }
    if (
      this.props.tripReducer.failure !== prevProps.tripReducer.failure &&
      this.props.tripReducer.failure
    ) {
      this.requestRideFailure(this.props.tripReducer.errorMessage);
      this.props.resetConditional();
    }
    if (
      this.props.tripReducer.data !== prevProps.tripReducer.data &&
      !_.isEmpty(this.props.tripReducer.data)
    ) {
      this.props.decodePolyline(
        this.props.tripReducer.data.overview_polyline,
        () => {},
      );
    }
  } //E.F
  updateNavigation = (title, image) => {
    this.props.navigation.setParams({
      title: title,
      headerLeftInage: image,
    });
  };

  // //Left nav bar button handler
  headerLeftPress = (status) => {
    if (
      this.props.appStateReducer.showRideSearchDetailViews ||
      this.props.appStateReducer.showAutoCompleteViews
    ) {
      this.updateNavigation('Home', Images.drawer);
      //   this.setState({

      //   });
      this.setState(
        {
          maxZoomLevel: 18,
          scrollEnabled: true,
        },
        () => {
          newCoordinate = {
            latitude: +this.props.userLocation.coordinate.latitude,
            longitude: +this.props.userLocation.coordinate.longitude,
          };
          Utils.focusOnMapCoordinates(this.map, [newCoordinate]);
          this.setState({
            isFocusedCurrentLoc: true,
          });
        },
      );
      this.props.stateChange(true, SHOW_HOME_VIEWS);
      this.props.navigation.setParams({
        headerRightPress: null,
      });
      this.props.locationDropOffReset();
      status != 'Home' &&
        setTimeout(() => {
          this._currentLocation();
        }, 0);
    } else {
      this.props.navigation.dispatch(DrawerActions.toggleDrawer());
      status != 'Home' &&
        setTimeout(() => {
          this._currentLocation();
        }, 0);
    }
  };
  headerRightPress = () => {
    //Auto Complete Checks and Push to ridestatusmap state
    if (_.isEmpty(this.props.googleAutoComplete.selectedPickupLocation)) {
      alert('Select Pickup Location');
      this.refPickUp.focus();
    } else if (
      _.isEmpty(this.props.googleAutoComplete.selectedDropOffLocation)
    ) {
      alert('Select DropOff Location');
      this.refDropOff.focus();
    } else if (
      !_.isEmpty(this.props.googleAutoComplete.selectedDropOffLocation) &&
      !_.isEmpty(this.props.googleAutoComplete.selectedPickupLocation)
    ) {
      this.showRideSearchDetailViews();
    }
  }; //E.F
  // //E.o.H.R.L
  // //MapView Methods
  onMapLayout = () => {
    this.setState({isMapReady: true});
  };
  onRegionChangeComplete = (region) => {
    this.setState({
      maxZoomLevel: 23,
    });
    let data = {
      latlng: region.latitude + ',' + region.longitude,
    };
    if (!this.state.scrollEnabled) {
      this.props.geoRequest(data, GET_DRAGED_LOCATION);
    }
  };
  // //E.o.M.V.M
  // //Location get with tracking and callback
  _requestLocationPermission = async () => {
    const check = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (!check) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Rydr needs location permission to work.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Location permission granted
          // this._startLocationService(granted);
          this.props.userLocationRequest(granted);
          this._currentLocation();
          this._startTracking();
        } else {
          // Location permission denied
          this.props.userLocationRequest(granted);
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // location permission already allowed
      this._currentLocation();
      this._startTracking();
    }
  }; //E.F
  _startTracking = () => {
    if (Utils.isPlatformAndroid()) {
      LocationServiceAndroid.startTrackingServiceAndroid(
        this.props.userLocatoinSuccess,
        this.props.userLocationFailure,
        this.watchPositionSuccess,
      );
    } else {
      LocationService.startTrackingService(
        this.props.userLocatoinSuccess,
        this.props.userLocationFailure,
        this.watchPositionSuccess,
      );
    }
  }; //E.F
  watchPositionSuccess = (position) => {
    console.log('position-', position);
    newCoordinate = {
      latitude: +position.coords.latitude,
      longitude: +position.coords.longitude,
    };
    if (Platform.OS === 'android') {
      if (this.currMarker) {
        console.log('============= this.currMarker', this.currMarker);
        this.currMarker.animateMarkerToCoordinate(newCoordinate, 500);
      }
    } else {
      this.state.currentLocationCoordinate
        .timing({...newCoordinate, duration: 500})
        .start();
    }
    if (
      this.props.appStateReducer.showHomeViews &&
      !this.state.isFocusedCurrentLoc
    ) {
      this.setState(
        {
          maxZoomLevel: 18,
        },
        () => {
          Utils.focusOnMapCoordinates(this.map, [newCoordinate]);
          this.setState({
            isFocusedCurrentLoc: true,
          });
        },
      );
      this.setCarsOnMap('all');
    }
  }; //E.F
  // //E.o.L.T
  // //Socket Callback get nearby drivers
  // //API_NEARBYWITHVEHICLETYPE
  // //request all near by driver from socket
  setCarsOnMap = (carType) => {
    const {userLocation} = this.props;

    const lat = userLocation.coordinate.latitude;
    const lng = userLocation.coordinate.longitude;
    // const carType = carType;
    const kilo = 10;
    const data = {
      lat: lat,
      lag: lng,
      car_type: carType,
      kilo: kilo,
    };
    this.props.nearByAllDriverRequest(
      data,
      this.getNearByDriversDistanceMatrix,
    );
  };
  successNearByVehicle = (data) => {
    const {appStateReducer} = this.props;

    if (
      appStateReducer.showRequestRideViews ||
      appStateReducer.showStartRideViews ||
      appStateReducer.showCompleteRideViews
    ) {
      this.updateDriverPolyline(data);
      this.setState({
        nearByAllDriver: [],
      });
      return;
    }

    if (data.length === 0) {
      this.setState({
        nearByAllDriver: [],
        showCallout: false,
      });
      return;
    }
    listCoordinates = [];
    listCoordinates.push({
      latitude: +this.props.userLocation.coordinate.latitude,
      longitude: +this.props.userLocation.coordinate.longitude,
    });
    newData = data.map((item) => {
      listCoordinates.push({
        latitude: +item.latitude,
        longitude: +item.longitude,
      });
      result = this.state.nearByAllDriver.findIndex(
        (itemFilter) => item.user_id == itemFilter.user_id,
      );
      if (result !== -1) {
        oldObj = this.state.nearByAllDriver[result];
        return {
          ...item,
          rotation: Utils.bearing(
            +oldObj.latitude,
            +oldObj.longitude,
            +item.latitude,
            +item.longitude,
          ),
          latitude: +item.latitude,
          longitude: +item.longitude,
          ref: null,
        };
      } else {
        return {
          ...item,
          latitude: +item.latitude,
          longitude: +item.longitude,
          rotation: Utils.bearing(0, 0, +item.latitude, +item.longitude),
          ref: null,
        };
      }
    });
    console.log('successNearByVehicle-newData', newData);
    this.setState({
      nearByAllDriver: newData,
    });
    if (!this.state.animateToFirstLocationCentered) {
      Utils.animateToFirstLocationCentered(this.map, listCoordinates);
      this.setState({
        animateToFirstLocationCentered: true,
      });
    }
    this.getNearByDriversDistanceMatrix(data);
  };
  updateDriverPolyline = (data) => {
    if (data.length > 0) {
      if (data[0].updated_polyline_overview !== null) {
        this.props.decodePolyline(
          data[0].updated_polyline_overview,
          this.updateDriverMarker,
        );
        const newCoordinate = {
          latitude: +data[0].latitude,
          longitude: +data[0].longitude,
        };
        if (!this.state.animateToFirstLocationCentered) {
          this.setState(
            {
              maxZoomLevel: 18,
            },
            () => {
              Utils.focusOnMapCoordinates(this.map, [newCoordinate]);
              this.setState({
                animateToFirstLocationCentered: true,
              });
            },
          );
        }
      } else {
        newCoordinate = {
          latitude: +data[0].latitude,
          longitude: +data[0].longitude,
        };
        if (Platform.OS === 'android') {
          if (this.driverMarker) {
            this.driverMarker.animateMarkerToCoordinate(newCoordinate, 500);
          }
        } else {
          this.state.driverLocationCoordinate
            .timing({...newCoordinate, duration: 500})
            .start();
        }
        this.setState(
          {
            driver: {
              ...data[0],
              rotation: Utils.bearing(
                +0,
                +0,
                +data[0].latitude,
                +data[0].longitude,
              ),
              latitude: +data[0].latitude,
              longitude: +data[0].longitude,
            },
          },
          () => console.log('driver', this.state.driver),
        );
      }
    }
  };
  updateDriverMarker = (data) => {
    newCoordinate = {
      latitude: +data[0].latitude,
      longitude: +data[0].longitude,
    };
    if (Platform.OS === 'android') {
      if (this.driverMarker) {
        this.driverMarker.animateMarkerToCoordinate(newCoordinate, 500);
      }
    } else {
      this.state.driverLocationCoordinate
        .timing({...newCoordinate, duration: 500})
        .start();
    }
    if (!_.isEmpty(this.state.driver)) {
      this.setState({
        driver: {
          ...data[0],
          rotation: Utils.bearing(
            +this.state.driver.latitude,
            +this.state.driver.longitude,
            +data[0].latitude,
            +data[0].longitude,
          ),
          latitude: +data[0].latitude,
          longitude: +data[0].longitude,
        },
      });
    } else {
      this.setState({
        driver: {
          ...data[0],
          rotation: Utils.bearing(
            +0,
            +0,
            +data[0].latitude,
            +data[0].longitude,
          ),
          latitude: +data[0].latitude,
          longitude: +data[0].longitude,
        },
      });
    }
  };
  failureNearByVehicle = (data) => {
    this.setState({
      nearByAllDriver: [],
      showCallout: false,
    });

    console.log('failureNearByVehicle', data);
  };
  // //E.o.N.D
  // //get est. reaching time of driver matrix api call
  getNearByDriversDistanceMatrix = (data) => {
    if (data.length > 0) {
      dataNew = {
        origins:
          this.props.userLocation.coordinate.latitude +
          ',' +
          this.props.userLocation.coordinate.longitude,
        destinations: data[0].latitude + ',' + data[0].longitude,
      };
      this.props.distanceMatrixRequest(
        dataNew,
        this.distanceMatrixRequestSuccess,
      );
    }
  };
  distanceMatrixRequestSuccess = () => {
    this.setState({
      showCallout: true,
    });
  }; //E.o.D.M
  // //App State 1
  // //Load Auto Complete Screen view (SHOW_AUTOCOMPLETE_VIEWS)
  setupAutoComplete = () => {
    this.props.stateChange(true, SHOW_AUTOCOMPLETE_VIEWS);
    this.props.navigation.setParams({
      headerRightPress: this.headerRightPress,
      whereTo: true,
    });
    this.updateNavigation('', Images.leftBlackArrow);
    let data = {
      latlng:
        this.props.userLocation.coordinate.latitude +
        ',' +
        this.props.userLocation.coordinate.longitude,
      result_type: 'establishment|point_of_interest|route|premise|subpremise',
      //   location_type: "ROOFTOP"
    };
    console.log('geoRequest', data);
    this.props.geoRequest(data, GET_CURRENT_LOCATION);
  }; //A.S.1
  // //App State 2
  // //showRideSearchDetailViews Work (SHOW_RIDE_SEARCH_DETAIL_VIEWS)
  showRideSearchDetailViews = () => {
    this.props.stateChange(true, SHOW_RIDE_SEARCH_DETAIL_VIEWS);
    this.props.navigation.setParams({
      headerRightPress: null,
    });
    this.props.requestVehicleCategory();
    this.setCarsOnMap(1);
    const payload = {
      origin:
        'place_id:' +
        this.props.googleAutoComplete.selectedPickupLocation.place_id,
      destination:
        'place_id:' +
        this.props.googleAutoComplete.selectedDropOffLocation.place_id,
      departure_time: 'now',
    };
    this.focusOnPolyline();
    this.props.requestShortestPathAction(
      payload,
      this.requestShortestPathSuccess,
    );
  };
  focusOnPolyline = () => {
    newCoordinate1 = {
      latitude: +this.props.googleAutoComplete.selectedPickupLocation.lat,
      longitude: +this.props.googleAutoComplete.selectedPickupLocation.lng,
    };
    newCoordinate2 = {
      latitude: +this.props.googleAutoComplete.selectedDropOffLocation.lat,
      longitude: +this.props.googleAutoComplete.selectedDropOffLocation.lng,
    };
    Utils.focusOnMapCoordinates(this.map, [newCoordinate1, newCoordinate2], {
      top: 20,
      right: 20,
      bottom: Metrics.screenHeight / 2.5,
      left: 20,
    });
  };
  requestShortestPathSuccess = (data) => {
    this.calcEstimatedFare(1);
  };
  calcEstimatedFare = (vehicle_type) => {
    let data = {
      estimate_km: this.props.shortestPath.distance.value / 1000,
      vehicle_type: vehicle_type,
      estimate_time: Math.round(this.props.shortestPath.duration.value / 60),
    };
    this.props.calculateEstimateFareRequest(data);
  };
  requestRidePressed = () => {
    var carID = 1;
    for (car of this.props.vehicleCategory.data) {
      console.log('car', car);
      if (car.isActive) {
        carID = car.id;
        break;
      }
    }
    const {
      googleAutoComplete,
      shortestPath,
      calculateEstimateFare,
    } = this.props;
    let data = {
      pickupLocation_description:
        googleAutoComplete.selectedPickupLocation.description,
      pickupLocation_main_text:
        googleAutoComplete.selectedPickupLocation.main_text,
      pickupLocation_place_id:
        googleAutoComplete.selectedPickupLocation.place_id,
      pickupLocation_secondary_text:
        googleAutoComplete.selectedPickupLocation.secondary_text,
      pickupLocation_latitude: googleAutoComplete.selectedPickupLocation.lat,
      pickupLocation_longitude: googleAutoComplete.selectedPickupLocation.lng,
      selectedPickupQueryText: googleAutoComplete.selectedPickupQueryText,

      selectedDropoffQueryText: googleAutoComplete.selectedDropoffQueryText,
      dropOffLocation_description:
        googleAutoComplete.selectedDropOffLocation.description,
      dropOffLocation_longitude: googleAutoComplete.selectedDropOffLocation.lng,
      dropOffLocation_latitude: googleAutoComplete.selectedDropOffLocation.lat,
      dropOffLocation_main_text:
        googleAutoComplete.selectedDropOffLocation.main_text,
      dropOffLocation_place_id:
        googleAutoComplete.selectedDropOffLocation.place_id,
      dropOffLocation_secondary_text:
        googleAutoComplete.selectedDropOffLocation.secondary_text,
      kilo: 10,
      estimate_fare: calculateEstimateFare.data.passengers_ride_fare,
      estimate_time: shortestPath.duration.text,
      estimate_distance: shortestPath.distance.text,
      car_type: carID,
    };
    this.props.requestRideRequest(
      data,
      () => {},
      () => {},
    );
    this.props.stateChange(true, SHOW_RIDE_SEARCHING_VIEWS);
    this.findRide.show();
  };
  requestRideSuccess = (response) => {
    console.log('requestRideSuccess', response);
    this.findRide.hide();
    this.updateNavigation('', Images.drawer);
    //set shortest path polyline
    //this.props.decodePolyline(response.overview_polyline);
  };
  requestRideFailure = (message) => {
    this.findRide.hide();
    this.props.stateChange(true, SHOW_RIDE_SEARCH_DETAIL_VIEWS);
    Utils.MessageAlertError('', message);
  };
  vehicleCategorySelected = (itemIndex, buttonDisable, data) => {
    if (buttonDisable) {
      return;
    }
    this.calcEstimatedFare(data.id);
    this.props.vechicalCategorySelected(itemIndex);
  }; //AS2
  //Cancel Pressed (card modal else)
  _onCancelRideSuccessHandler(data) {
    this.setCarsOnMap('all');
    this.props.stateChange(true, SHOW_HOME_VIEWS);
    this.props.locationDropOffReset();
    this.props.resetRequestRide();
    this.setState({
      isFetching: false,
    });
    this.CancelRidePopup.hide();
    this._currentLocation();
  }
  onPressCancel = (check, id) => {
    this.setState({
      isFetching: true,
      cancelReasonId: id,
    });
    if (check == 'card') {
      this.props.requestCancelRide({reject_id: id}, (response) => {
        if (response.reject_need_verification) {
          this.setState({
            cancelChangesFee: response.charge_fees,
            isFetching: false,
          });
          this.CancelRidePopup.show();
        } else {
          this._onCancelRideSuccessHandler();
        }
        //this.findRide.hide();
      });
    } else {
      // Cancel request
      this.props.requestCancelRide({reject_id: id}, () => {
        this.props.stateChange(true, SHOW_RIDE_SEARCH_DETAIL_VIEWS);
        this.findRide.hide();
        this.setCarsOnMap('all');
        // this.props.locationDropOffReset();
        this.props.resetRequestRide();
        this.setState({
          isFetching: false,
        });
        //this.props.stateChange(true, SHOW_HOME_VIEWS);
      });
    }
  };

  onPaynowPress = () => {
    this.tipYourCaptain.hide();
    this.setState({
      isFetching: true,
    });
    SocketIO.getInstance().requestEmit(API_PAYNOW_SOCKET);
    data = {
      total_charge_amount: this.props.tripReducer.data.estimation.estimate_fare,
      tip_amount: this.state.tip,
      driver_id: this.props.tripReducer.data.driver.id,
    };
    this.props.requestPaynow(
      data,
      (response) => {
        this.setState({
          isFetching: false,
        });
        this.props.stateChange(true, SHOW_RIDE_RATING_CONTENT_VIEWS);
        this.setCarsOnMap('all');
        this.props.userProfileUpdatedSuccess(response);
        this.setState({tip: ''});
        this._currentLocation();
      },
      (error) => {
        this.setState({
          isFetching: false,
        });
        console.log('requestPaynow-error', error);
      },
    );
  };
  _onStarRatingPress(rating) {
    this.setState({
      userRating: rating,
      error: false,
    });
  }
  submitRatingPressed = () => {
    if (this.state.userRating) {
      this.props.stateChange(true, SHOW_HOME_VIEWS);
      this.props.locationDropOffReset();
      this.props.resetRequestRide();
      this.setState({
        isFocusedCurrentLoc: false,
        // userRating: 0
        //   isFetching: true
      });
      const payload = {
        rate: this.state.userRating,
        rater_id: this.props.user.data.id,
        rated_id: this.props.tripReducer.data.driver.id,
        comment: this.state.comment,
        trip_id: this.props.tripReducer.data.trip_id,
      };

      this.props.requestRideRating(payload, this.submitRatingSuccess);
    } else {
      this.setState({error: 'Rating is require'});
    }
  };
  submitRatingSuccess = (response) => {
    // this.setState({ userRating: 0, comment: "", isFetching: false });
    this.props.stateChange(true, SHOW_HOME_VIEWS);
    this.props.locationDropOffReset();
    this.props.resetRequestRide();
    this.setCarsOnMap('all');
    this.setState({
      userRating: 0,
      comment: '',
    });
  };
  isLocationOnPath = (point, polyline, tolerance) => {
    const payload = {
      origin: point.latitude + ',' + point.longitude,
      destination:
        polyline[polyline.length - 1].latitude +
        ',' +
        polyline[polyline.length - 1].longitude,
      departure_time: 'now',
    };
    //   this.focusOnPolyline();
    this.props.requestShortestPathAction(
      payload,
      this.requestShortestPathSuccess,
    );
    return;
    polyline.forEach((value, index) => {
      //   haversine(currentLocation, value, { unit: "meter" });
      var distance = haversine(point, value, {
        unit: 'meter',
      });
      console.log('isLocationOnPath', distance, 'point : ', value);

      if (distance <= tolerance) {
        this.setState({
          nearByAllDriver: [
            {
              ...this.state.nearByAllDriver[0],
              rotation: Utils.bearing(
                +point.latitude,
                +point.longitude,
                +value.latitude,
                +value.longitude,
              ),
              latitude: +value.latitude,
              longitude: +value.longitude,
              ref: null,
            },
          ],
        });

        console.log('isLocationOnPath-tolerance', distance, 'point : ', value);
        return;
      }
    });
  };
  _currentLocation = () => {
    if (Utils.isPlatformAndroid()) {
      LocationServiceAndroid.getCurrentLocationAndroid(
        this.props.userLocatoinSuccess,
        this.props.userLocationFailure,
      );
    } else {
      LocationService.getCurrentLocation(
        this.props.userLocatoinSuccess,
        this.props.userLocationFailure,
        navigator.geolocation,
      );
    }
    const newCoordinate = {
      latitude: +this.props.userLocation.coordinate.latitude,
      longitude: +this.props.userLocation.coordinate.longitude,
    };

    this.setState(
      {
        maxZoomLevel: 18,
      },
      () => {
        Utils.focusOnMapCoordinates(this.map, [newCoordinate]);
      },
    );
    //todo
    if (Platform.OS === 'android') {
      if (this.currMarker) {
        this.currMarker.animateMarkerToCoordinate(newCoordinate, 500);
      }
    } else {
      this.state.currentLocationCoordinate
        .timing({...newCoordinate, duration: 500})
        .start();
    }
  };
  render() {
    const {
      distanceMatrix,
      appStateReducer,
      googleAutoComplete,
      shortestPath,
      calculateEstimateFare,
    } = this.props;
    const {driver, isMapReady} = this.state;
    // console.log("driver state : ", driver);

    // console.log(
    //   "driver state : showRequestRideViews ",
    //   appStateReducer.showRequestRideViews,
    //   " showStartRideViews",
    //   appStateReducer.showStartRideViews,
    //   "appStateReducer.showCompleteRideViews : ",
    //   appStateReducer.showCompleteRideViews
    // );

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

        <MapView
          ref={(map) => (this.map = map)}
          customMapStyle={uber_style}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onMapReady={this.onMapLayout}
          maxZoomLevel={this.state.maxZoomLevel}
          provider={PROVIDER_GOOGLE}
          loadingIndicatorColor="#e21d1d"
          style={{
            flex: 1,
            width: Metrics.screenWidth,
            height: Metrics.screenHeight,
          }}
          showsBuildings={true}
          loadingEnabled={true}
          //   showsUserLocation={true}
          onRegionChangeComplete={this.onRegionChangeComplete}>
          <CurrentLocationMarker
            refMarker={(marker) => (this.currMarker = marker)}
            callout={this.state.showCallout}
            coordinate={this.state.currentLocationCoordinate}
            duration={
              !_.isEmpty(distanceMatrix.data) &&
              parseInt(
                distanceMatrix.data.duration == undefined
                  ? 0
                  : distanceMatrix.data.duration.text,
              )
            }
            isVisible={
              this.state.isMapReady &&
              (appStateReducer.showHomeViews ||
                appStateReducer.showAutoCompleteViews ||
                appStateReducer.showRideRatingContentViews)
            }
          />

          {this.state.nearByAllDriver.map((item) => {
            return (
              <MapMarker
                refMarker={(marker) => {
                  this.marker = marker;
                }}
                isVisible={this.state.isMapReady}
                key={item.user_id}
                coordinate={{
                  latitude: +item.latitude,
                  longitude: +item.longitude,
                }} //item.animateRegion
                flat={true}
                anchor={{x: 0.6, y: 0.5}}
                image={Images.mapCar}
                rotationItem={item.rotation}
              />
            );
          })}
          {!_.isEmpty(this.state.driver) && (
            <MapMarkerAnimated
              refMarker={(marker) => (this.driverMarker = marker)}
              isVisible={
                this.state.isMapReady &&
                (appStateReducer.showRequestRideViews ||
                  appStateReducer.showStartRideViews ||
                  appStateReducer.showCompleteRideViews)
              }
              key={this.state.driver.user_id}
              coordinate={this.state.driverLocationCoordinate} //item.animateRegion
              flat={true}
              anchor={{x: 0.6, y: 0.5}}
              image={Images.mapCar}
              rotationItem={this.state.driver.rotation}
            />
          )}

          <MapPolyline
            isVisible={
              appStateReducer.showRideSearchDetailViews ||
              appStateReducer.showRideSearchingViews ||
              appStateReducer.showRequestRideViews ||
              appStateReducer.showStartRideViews ||
              appStateReducer.showCompleteRideViews
            }
            key={'drivingRoute'}
            coordinates={shortestPath.polyLinecoordinates}
          />

          <MapMarker
            isVisible={
              appStateReducer.showRideSearchDetailViews ||
              appStateReducer.showRideSearchingViews
            }
            identifier={'capStart'}
            coordinate={{
              latitude:
                shortestPath.polyLinecoordinates.length > 0
                  ? +shortestPath.polyLinecoordinates[0].latitude
                  : 0,
              longitude:
                shortestPath.polyLinecoordinates.length > 0
                  ? +shortestPath.polyLinecoordinates[0].longitude
                  : 0,
            }}
            image={Images.capStart}
          />

          <MapMarker
            isVisible={
              appStateReducer.showRideSearchDetailViews ||
              appStateReducer.showRideSearchingViews ||
              appStateReducer.showRequestRideViews ||
              appStateReducer.showStartRideViews ||
              appStateReducer.showCompleteRideViews
            }
            key={'capEnd'}
            coordinate={{
              latitude:
                shortestPath.polyLinecoordinates.length > 0
                  ? shortestPath.polyLinecoordinates[
                      shortestPath.polyLinecoordinates.length - 1
                    ].latitude
                  : 0,
              longitude:
                shortestPath.polyLinecoordinates.length > 0
                  ? shortestPath.polyLinecoordinates[
                      shortestPath.polyLinecoordinates.length - 1
                    ].longitude
                  : 0,
            }}
            image={Images.capEnd}
          />
        </MapView>

        <WhereToGo
          onPress={this.setupAutoComplete}
          isVisible={appStateReducer.showHomeViews}
        />
        {/* AutoComplete Views */}
        <AutoCompleteView
          isVisible={appStateReducer.showAutoCompleteViews}
          onClose={(bool) => {
            this.setState({scrollEnabled: bool});
            if (bool) {
              googleAutoComplete.selectedType === DROPOFF_LOCATION_CHANGE
                ? this.refDropOff.focus()
                : this.refPickUp.focus();
            } else {
              Keyboard.dismiss();
            }
          }}
          scrollEnabled={this.state.scrollEnabled}
          refPickUp={(input) => {
            this.refPickUp = input;
          }}
          refDropOff={(input) => {
            this.refDropOff = input;
          }}
        />
        {!this.state.scrollEnabled && appStateReducer.showAutoCompleteViews && (
          <Image
            source={Images.pinAutocomplete}
            style={{
              zIndex: 0,
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              position: 'absolute',
              bottom: '50%',
            }}
          />
        )}
        {/* show Ride Search Detail Views */}
        <EstimateBar
          isVisible={
            appStateReducer.showRideSearchDetailViews ||
            appStateReducer.showRideSearchingViews
          }
          price={
            calculateEstimateFare.data &&
            calculateEstimateFare.data.passengers_ride_fare
          }
        />
        <VehicleCategory
          data={this.props.vehicleCategory.data}
          isVisible={
            appStateReducer.showRideSearchDetailViews ||
            appStateReducer.showRideSearchingViews
          }
          onPressCell={this.vehicleCategorySelected}
        />
        {appStateReducer.showRideSearchDetailViews ||
        appStateReducer.showRideSearchingViews ? (
          <View style={{alignSelf: 'center', position: 'absolute', bottom: 8}}>
            <AppButton
              onPress={() => {
                if (this.props.networkInfo) {
                  this.requestRidePressed();
                } else {
                  Utils.MessageAlertError(
                    ERROR_NETWORK_NOT_AVAILABLE.title,
                    ERROR_NETWORK_NOT_AVAILABLE.message,
                  );
                }
              }}
              buttonTitle="Request a Ride"
              style={{backgroundColor: Colors.appbutton.black}}
            />
            <SafeAreaView />
          </View>
        ) : null}
        <Modal.Dialogue
          ref={(ref) => {
            this.CancelRidePopup = ref;
          }}
          description={`It has been more than two minutes, if you cancel ${this.state.cancelChangesFee} will be charged. Are you sure you want to cancel?`}
          title="Cancel Ride"
          leftButton="No"
          rightButton="Yes"
          isButton
          onPress={() => {
            this.props.requestCancelRide(
              {
                reject_id: this.state.cancelReasonId,
                reject_need_verification: true,
              },
              (response) => {
                this._onCancelRideSuccessHandler();
              },
            );
          }}
        />
        <Modal.FindRide
          ref={(ref) => {
            this.findRide = ref;
          }}
          isButton
          buttonTitle="Finding Your Trip"
          onPress={() => this.onPressCancel('')}
        />
        {(appStateReducer.showRequestRideViews ||
          appStateReducer.showStartRideViews ||
          appStateReducer.showCompleteRideViews) && (
          <BottomSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            onClose={(bool) => console.log(bool)}
            height={appStateReducer.showStartRideViews ? 410 : 460}
            duration={250}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: 0,
              },
            }}>
            <Cards.RideConfirmCard
              callVissible={
                appStateReducer.showStartRideViews ||
                appStateReducer.showRequestRideViews
              }
              paynowVissible={appStateReducer.showCompleteRideViews}
              cancelVissible={appStateReducer.showRequestRideViews}
              data={this.props.tripReducer.data}
              onPressCancel={() => {
                if (this.props.networkInfo) {
                  this.cancelRideModal.show();
                } else {
                  Utils.MessageAlertError(
                    ERROR_NETWORK_NOT_AVAILABLE.title,
                    ERROR_NETWORK_NOT_AVAILABLE.message,
                  );
                }
              }}
              onPressCall={() =>
                Utils.openCall(
                  `tel:${this.props.tripReducer.data.driver.mobile_no}`,
                )
              }
              onPressMessage={() =>
                Utils.openCall(
                  `sms:${this.props.tripReducer.data.driver.mobile_no}`,
                )
              }
              onPressPaynow={() => {
                if (this.props.networkInfo) {
                  this.tipYourCaptain.show();
                } else {
                  Utils.MessageAlertError(
                    ERROR_NETWORK_NOT_AVAILABLE.title,
                    ERROR_NETWORK_NOT_AVAILABLE.message,
                  );
                }
              }}
              asTotal={appStateReducer.showCompleteRideViews}
              isFetching={this.state.isFetching}
            />
          </BottomSheet>
        )}

        {appStateReducer.showRideRatingContentViews && (
          <RideDetailCard>
            <View
              style={{
                width: Metrics.screenWidth,
                backgroundColor: Colors.white,
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 352,
              }}>
              <ProfileImage
                image={{
                  uri: Utils.imageUrlConverter(
                    !_.isEmpty(this.props.tripReducer.data) &&
                      this.props.tripReducer.data.driver.image_url,
                  ),
                }}
                imageSize={styles.tipCaptainImageSize}
                imageValidation
              />

              <Text
                size="xSmall"
                color="darkestGrey"
                type="regular"
                style={{textAlign: 'center'}}>
                {!_.isEmpty(this.props.tripReducer.data) &&
                  this.props.tripReducer.data.driver.username}
              </Text>
              <StarRating
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={this.state.userRating}
                selectedStar={(rating) => this._onStarRatingPress(rating)}
                fullStarColor={'#ffa800'}
                starSize={26}
                fullStar={Images.activeStar}
                emptyStar={Images.inActiveStar}
                buttonStyle={{
                  paddingHorizontal: 4,
                }}
              />

              <TextInput
                onChangeText={(text) => this.setState({comment: text})}
                onFocus={() => {}}
                style={styles.textArea}
                placeholderTextColor={Colors.text.scorpion}
                placeholder={'Add Comment'}
                numberOfLines={10}
                textAlignVertical="top"
                multiline={true}
                text={this.state.comment}
              />
              {this.state.error ? (
                <Text color={Colors.red} size="xxSmall" type="regular">
                  {this.state.error}
                </Text>
              ) : null}
              <AppButton
                buttonTitle="Submit"
                onPress={this.submitRatingPressed}
                style={{
                  backgroundColor: Colors.appbutton.black,
                  marginBottom: 5,
                }}
                isFetching={this.state.isFetching}
              />
            </View>
          </RideDetailCard>
        )}
        <Modal.CancelRide
          ref={(ref) => {
            this.cancelRideModal = ref;
          }}
          description="Do you really want to logout ?"
          title="Why did you cancel your Ride?"
          leftButton="Cancel"
          rightButton="Submit"
          isButton
          onPress={(data) => {
            this.onPressCancel('card', data);
            this.cancelRideModal.hide();
          }}
        />

        <Modal.TipYourCaptian
          ref={(ref) => {
            this.tipYourCaptain = ref;
          }}
          title="Tip Your Rider"
          leftButton="Cancel"
          rightButton="Submit"
          isButton
          onPress={() => {
            const {tip} = this.state;
            if (/^[0-9]*$/.test(tip)) {
              this.onPaynowPress();
              this.setState({tipError: false});
            } else {
              this.setState({tipError: true});
            }
          }}
          error={this.state.tipError}
          onChangeText={(text) => this.setState({tip: text})}
          value={this.state.tip}
        />
        {appStateReducer.showHomeViews && (
          <ButtonView
            onPress={() => this._currentLocation()}
            style={{
              position: 'absolute',
              right: 15,
              bottom: 35,
            }}>
            <Image source={Images.currentLocation} />
          </ButtonView>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo.isNetworkConnected,
  userLocation: state.userLocation,
  vehicleCategory: state.vehicleCategory,
  nearByAllDriver: state.nearByAllDriver,
  SocketConnetion: state.SocketConnetion,
  distanceMatrix: state.distanceMatrix,
  googleAutoComplete: state.googleAutoComplete,
  calculateEstimateFare: state.calculateEstimateFare,
  shortestPath: state.shortestPath,
  requestRide: state.requestRide,
  cancelRide: state.cancelRide,
  startRideReducer: state.startRideReducer,
  completeRideReducer: state.completeRideReducer,
  user: state.user,
  driverCancelRide: state.driverCancelRideReducer,
  rideRating: state.rideRating,
  appStateReducer: state.appStateReducer,
  tripReducer: state.tripReducer,
});
const actions = {
  userLocationRequest,
  userLocatoinSuccess,
  userLocationFailure,
  nearByAllDriverSuccess,
  nearByAllDriverRequest,
  nearByAllDriverOn,
  distanceMatrixRequest,
  geoRequest,
  requestShortestPathAction,
  calculateEstimateFareRequest,
  requestRideRequest,
  requestVehicleCategory,
  vechicalCategorySelected,
  locationDropOffReset,
  requestCancelRide,
  resetRequestRide,
  decodePolyline,
  requestRideRating,
  resetConditional,
  resetDriverStartedRide,
  stateChange,
  requestPaynow,
  userProfileUpdatedSuccess,
};

export default connect(mapStateToProps, actions)(Home);
