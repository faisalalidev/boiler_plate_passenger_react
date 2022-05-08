// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component, PureComponent} from 'react';
import {
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import {Text, AppButton, ButtonView} from '../../components';
import {RideStatusBar, Car_Box, EstimateBar} from '../../appComponents';
import styles from './styles';
import {Metrics, Colors, Images, Fonts} from '../../theme';
import uber_style from '../../theme/uber_style.json';
import MapView, {
  ProviderPropType,
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  // Polyline
} from 'react-native-maps';
import Utils from '../../util';

// Socket Action
import {
  request as requestVehicleCategory,
  vechicalCategorySelected,
} from '../../actions/SocketActions/VehicleCategory';
import {request as nearByAllDriverRequest} from '../../actions/SocketActions/NearByAllDriver';
import {request as requestShortestPathAction} from '../../actions/GoogleApiActions/ShortestPathAction';
import {request as calculateEstimateFareRequest} from '../../actions/SocketActions/CalculateEstimateFare';
import {request as requestRideRequest} from '../../actions/SocketActions/RequestRide';
import {StackActions} from 'react-navigation';
import {locationDropOffReset} from '../../actions/GoogleAutoComplete';

class RideStatusMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
    };
  }
  componentDidMount() {
    this.props.requestVehicleCategory();
    this.focusMap([
      {
        latitude: this.props.userLocation.coordinate.latitude,
        longitude: this.props.userLocation.coordinate.longitude,
      },
    ]);
    this.setCarsOnMap(1);
    this.props.navigation.setParams({onBack: this.onBack});

    const payload = {
      origin:
        'place_id:' +
        this.props.googleAutoComplete.selectedPickupLocation.place_id,
      destination:
        'place_id:' +
        this.props.googleAutoComplete.selectedDropOffLocation.place_id,
      departure_time: 'now',
    };
    this.props.requestShortestPathAction(payload);
    BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
  }
  calcEstimatedFare = vehicle_type => {
    let data = {
      estimate_km: this.props.shortestPath.distance.value / 1000,
      vehicle_type: vehicle_type,
    };
    this.props.calculateEstimateFareRequest(data);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.shortestPath.distance !== this.props.shortestPath.distance) {
      this.calcEstimatedFare(1);
    }
  }
  onBack = () => {
    this.props.navigation.dispatch(StackActions.pop({n: 2}));
    this.props.locationDropOffReset();
  };
  onBackHandler = () => {
    this.props.locationDropOffReset();
  };
  focusMap(markers) {
    options = {
      edgePadding: {
        top: 300,
        right: 300,
        bottom: 300,
        left: 300,
      },
      animated: true,
    };
    if (this.map !== null && this.state.isMapReady) {
      // Platform.OS === "ios"
      //   ? this.map.fitToElements(true)
      //   : this.map.fitToCoordinates(markers, options);
      Utils.isPlatformAndroid()
        ? this.map.fitToCoordinates(markers, options)
        : this.map.fitToElements(true);
      //   this.map.fitToSuppliedMarkers(["currLocation"], options);
      //   this.map.fitToElements(true);
    }
  }

  _renderMapMarker = (item, image, anchor = {x: 0.5, y: 0.5}) => {
    return (
      <MapView.Marker
        key={item.id}
        identifier="marker"
        coordinate={{
          latitude: +item.latitude,
          longitude: +item.longitude,
        }}
        flat={true}
        anchor={anchor}
        image={image}
      />
    );
  };
  setCarsOnMap = carType => {
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
    console.log('setCarsOnMap ******* : ', carType);

    this.props.nearByAllDriverRequest(data);
  };
  requestRidePressed = () => {
    this.props.navigation.push('findYourTrip');
    const {
      googleAutoComplete,
      shortestPath,
      calculateEstimateFare,
    } = this.props;
    // this.props.shortestPath.polyLinecoordinates
    let data = {
      pickupLocation_description:
        googleAutoComplete.selectedPickupLocation.description,
      pickupLocation_main_text:
        googleAutoComplete.selectedPickupLocation.main_text,
      pickupLocation_place_id:
        googleAutoComplete.selectedPickupLocation.place_id,
      pickupLocation_secondary_text:
        googleAutoComplete.selectedPickupLocation.secondary_text,
      pickupLocation_latitude: shortestPath.polyLinecoordinates[0].latitude, // googleAutoComplete.selectedPickupLocation.lat,
      pickupLocation_longitude: shortestPath.polyLinecoordinates[0].longitude, //googleAutoComplete.selectedPickupLocation.lng,

      dropOffLocation_description:
        googleAutoComplete.selectedDropOffLocation.description,
      dropOffLocation_longitude:
        shortestPath.polyLinecoordinates[
          shortestPath.polyLinecoordinates.length - 1
        ].latitude, //googleAutoComplete.selectedDropOffLocation.lng,
      dropOffLocation_latitude:
        shortestPath.polyLinecoordinates[
          shortestPath.polyLinecoordinates.length - 1
        ].longitude,
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
    };
    this.props.requestRideRequest(data);
  };
  itemSelected = (itemIndex, buttonDisable, data) => {
    console.log('itemSelected', itemIndex, ' buttonDisable ', buttonDisable);
    if (buttonDisable) {
      return;
    }
    this.calcEstimatedFare(data.id);
    this.props.vechicalCategorySelected(itemIndex);
  };

  _renderItem = (item, index) => {
    console.log('item', item.item);
    // const { vehicle } = this.state;
    const data = item.item;
    const itemIndex = item.index;
    const vehicleStatus = data.status;
    // const borderColor =
    const buttonDisable = vehicleStatus === '0' ? true : false;
    return (
      <ButtonView
        style={[
          styles.carCard,
          {
            borderColor: buttonDisable
              ? Colors.lightGrey
              : data.isActive === true
              ? Colors.blue
              : Colors.black,
          },
        ]}
        disabled={buttonDisable}
        onPress={() => this.itemSelected(itemIndex, buttonDisable, data)}>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Image
            source={{
              uri: data.image,
            }}
            resizeMode={'contain'}
            style={{
              width: 70,
              height: 30,
              tintColor: buttonDisable
                ? Colors.lightGrey
                : data.isActive === true
                ? Colors.blue
                : Colors.black,
            }}
          />
        </View>
        <Text
          style={[
            {
              color: buttonDisable ? Colors.lightGrey : Colors.black,
              fontSize: Fonts.size.xxSmall,
              fontFamily: Fonts.type.regular,
              textAlign: 'center',
              marginTop: 10,
            },
          ]}>
          {data.car_type}
        </Text>
      </ButtonView>
    );
  };
  renderCaps = () => {};
  onMapLayout = () => {
    this.setState({isMapReady: true});
  };
  render() {
    const {userLocation, vehicleCategory, shortestPath} = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <MapView
          customMapStyle={uber_style}
          initialRegion={{
            latitude: this.props.userLocation.coordinate.latitude,
            longitude: this.props.userLocation.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // onLayout={this.onMapLayout}
          onMapReady={this.onMapLayout}
          provider={PROVIDER_GOOGLE}
          loadingIndicatorColor="#e21d1d"
          ref={map => (this.map = map)}
          style={{
            // flex: 1
            width: Metrics.screenWidth,
            height: Metrics.screenHeight,
            // backgroundColor: "red"
          }}
          loadingEnabled={true}
          onRegionChange={region => {
            // console.log("onRegionChange : ", region);
          }}>
          {!_.isEmpty(this.props.nearByAllDriver.data) && this.state.isMapReady
            ? this.props.nearByAllDriver.data.map(item =>
                this._renderMapMarker(item, Images.mapCar, {x: 0.6, y: 0.5}),
              )
            : null}
          {this.state.isMapReady &&
            this._renderMapMarker(
              {
                id: 'currLocation',
                latitude: this.props.userLocation.coordinate.latitude,
                longitude: this.props.userLocation.coordinate.longitude,
              },
              Images.mapMarker,
            )}
          {this.state.isMapReady && (
            <MapView.Polyline
              identifier={'drivingRoute'}
              coordinates={this.props.shortestPath.polyLinecoordinates}
              strokeColor="#C1ACC6" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={4}
            />
          )}
          {/* {this.props.shortestPath.polyLinecoordinates.length > 0 ? (
            <MapView.Polyline
              identifier={"walkingRoute"}
              coordinates={[
                {
                  latitude: this.props.googleAutoComplete.selectedPickupLocation
                    .lat,
                  longitude: this.props.googleAutoComplete
                    .selectedPickupLocation.lng
                },
                {
                  latitude: this.props.shortestPath.polyLinecoordinates[0]
                    .latitude,
                  longitude: this.props.shortestPath.polyLinecoordinates[0]
                    .longitude
                }
              ]}
              strokeColor="#78849E" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={4}
              lineDashPattern={[1, 1]}
              lineJoin={"miter"}
            />
          ) : null} */}

          {this.props.shortestPath.polyLinecoordinates.length > 0 &&
          this.state.isMapReady
            ? this._renderMapMarker(
                {
                  id: 'capStart',
                  latitude: this.props.shortestPath.polyLinecoordinates[0]
                    .latitude,
                  longitude: this.props.shortestPath.polyLinecoordinates[0]
                    .longitude,
                },
                Images.capStart,
              )
            : null}
          {this.props.shortestPath.polyLinecoordinates.length > 0 &&
          this.state.isMapReady
            ? this._renderMapMarker(
                {
                  id: 'capEnd',
                  latitude: this.props.shortestPath.polyLinecoordinates[
                    this.props.shortestPath.polyLinecoordinates.length - 1
                  ].latitude,
                  longitude: this.props.shortestPath.polyLinecoordinates[
                    this.props.shortestPath.polyLinecoordinates.length - 1
                  ].longitude,
                },
                Images.capEnd,
              )
            : null}
        </MapView>

        <EstimateBar
          price={
            this.props.calculateEstimateFare.data &&
            this.props.calculateEstimateFare.data.passengers_ride_fare
          }
        />
        {/* <Car_Box carData={this.state.vehicleCategory} /> */}
        <View
          style={{
            width: Metrics.screenWidth - Metrics.doubleBaseMargin,
            alignSelf: 'center',
            position: 'absolute',
            bottom: 95,
          }}>
          <FlatList
            // data={this.state.vehicleCategory}
            data={this.props.vehicleCategory.data}
            renderItem={this._renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            extraData={this.props.vehicleCategory.data}
          />
        </View>
        <View style={styles.appButtonContainer}>
          <AppButton
            onPress={this.requestRidePressed}
            buttonTitle="Request a Ride"
            style={{backgroundColor: Colors.appbutton.black}}
          />
          <SafeAreaView />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  networkInfo: state.networkInfo,
  userLocation: state.userLocation,
  vehicleCategory: state.vehicleCategory,
  nearByAllDriver: state.nearByAllDriver,
  shortestPath: state.shortestPath,
  googleAutoComplete: state.googleAutoComplete,
  calculateEstimateFare: state.calculateEstimateFare,
});
const actions = {
  requestVehicleCategory,
  nearByAllDriverRequest,
  requestShortestPathAction,
  vechicalCategorySelected,
  locationDropOffReset,
  calculateEstimateFareRequest,
  requestRideRequest,
};

export default connect(mapStateToProps, actions)(RideStatusMap);
