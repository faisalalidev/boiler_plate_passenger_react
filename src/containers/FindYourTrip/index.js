// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "../../components";
import { Modal, Cards, BottomSheet } from "../../appComponents";
import styles from "./styles";
import uber_style from "../../theme/uber_style.json";
import MapView, {
  ProviderPropType,
  Marker,
  Callout,
  PROVIDER_GOOGLE
  // Polyline
} from "react-native-maps";
import { Metrics, Colors, Images, Fonts } from "../../theme";
import { StackActions } from "react-navigation";
import { locationDropOffReset } from "../../actions/GoogleAutoComplete";
import { request as requestShortestPathAction } from "../../actions/GoogleApiActions/ShortestPathAction";
import Utils from "../../util";
import { reset } from "../../actions/SocketActions/RequestRide";

class FindYourTrip extends Component {
  state = {
    rideConfirmCardVissibility: false
  };
  componentDidMount() {
    this.findRide.show();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.requestRide !== this.props.requestRide &&
      this.props.requestRide.errorMessage === ""
    ) {
      this.findRide.hide();
      this.setState({
        rideConfirmCardVissibility: true
      });
      const payload = {
        origin:
          "place_id:" +
          this.props.googleAutoComplete.selectedPickupLocation.place_id,
        destination:
          this.props.requestRide.data.driver.latitude +
          "," +
          this.props.requestRide.data.driver.longitude,
        departure_time: "now"
      };
      this.props.requestShortestPathAction(payload);
    }
    if (
      this.props.requestRide.errorMessage !== "" &&
      this.props.requestRide.failure &&
      this.props.requestRide.failure !== prevProps.requestRide.failure
    ) {
      // alert("error hoo tou ");
      this.findRide.hide();
      this.props.navigation.dispatch(StackActions.pop({ n: 3 }));
      this.props.locationDropOffReset();
      this.props.reset();
    }
  }
  onPressCancel = () => {
    this.props.navigation.dispatch(StackActions.pop({ n: 3 }));
    this.props.locationDropOffReset();
  };
  onPressCall = () => {
    Utils.openCall(`tel:` + this.props.requestRide.data.driver.mobile_no);
  };
  onPressMessage = () => {
    Utils.openCall(
      "sms:" + this.props.requestRide.data.driver.mobile_no + "&body=Rydr"
    );
  };
  _renderMapMarker = (item, image, anchor = { x: 0.5, y: 0.5 }) => {
    return (
      <MapView.Marker
        key={item.id}
        identifier="marker"
        coordinate={{
          latitude: +item.latitude,
          longitude: +item.longitude
        }}
        flat={true}
        anchor={anchor}
        image={image}
        calloutAnchor={{ x: 0.5, y: 0.2 }}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          customMapStyle={uber_style}
          initialRegion={{
            latitude: this.props.userLocation.coordinate.latitude,
            longitude: this.props.userLocation.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          provider={PROVIDER_GOOGLE}
          loadingIndicatorColor="#e21d1d"
          ref={map => (this.map = map)}
          style={{
            flex: 1,
            backgroundColor: "red"
          }}
          loadingEnabled={true}
          onRegionChange={region => {
            // console.log("onRegionChange : ", region);
          }}
        >
          {this.state.rideConfirmCardVissibility && (
            <MapView.Polyline
              identifier={"driverRoute"}
              coordinates={this.props.shortestPath.polyLinecoordinates}
              strokeColor="#C1ACC6" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={4}
            />
          )}
          {this.state.rideConfirmCardVissibility &&
            this.props.shortestPath.polyLinecoordinates.length > 0
            ? this._renderMapMarker(
              {
                id: "capStart",
                latitude: this.props.shortestPath.polyLinecoordinates[0]
                  .latitude,
                longitude: this.props.shortestPath.polyLinecoordinates[0]
                  .longitude
              },
              Images.capStart
            )
            : null}
          {this.state.rideConfirmCardVissibility &&
            this.props.shortestPath.polyLinecoordinates.length > 0
            ? this._renderMapMarker(
              {
                id: "capEnd",
                latitude: this.props.shortestPath.polyLinecoordinates[
                  this.props.shortestPath.polyLinecoordinates.length - 1
                ].latitude,
                longitude: this.props.shortestPath.polyLinecoordinates[
                  this.props.shortestPath.polyLinecoordinates.length - 1
                ].longitude
              },
              Images.mapCar
            )
            : null}
        </MapView>
        <Modal.FindRide
          ref={ref => {
            this.findRide = ref;
          }}
          isButton
          buttonTitle="Finding Your Trip"
          onPress={() => {
            // this.findRide.hide();
          }}
        />
        {this.state.rideConfirmCardVissibility && (
          <BottomSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={460}
            duration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                position: "absolute",
                bottom: 0
              }
            }}
          >
            <Cards.RideConfirmCard
              data={this.props.requestRide.data}
              onPressCancel={this.onPressCancel}
              onPressCall={this.onPressCall}
              onPressMessage={this.onPressMessage}
            />
          </BottomSheet>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userLocation: state.userLocation,
  requestRide: state.requestRide,
  googleAutoComplete: state.googleAutoComplete,
  shortestPath: state.shortestPath
});

const actions = {
  locationDropOffReset,
  requestShortestPathAction,
  reset
};

export default connect(
  mapStateToProps,
  actions
)(FindYourTrip);
