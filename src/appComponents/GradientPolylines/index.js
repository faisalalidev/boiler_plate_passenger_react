import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import MapView, {
  Polyline,
  ProviderPropType,
  PROVIDER_GOOGLE
} from "react-native-maps";
import uber_style from "../../theme/uber_style.json";
import { Colors } from "../../theme";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GradientPolylines = (props: Object) => {
  const { COORDINATES, ...rest } = props;
  this.state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={uber_style}
      style={styles.container}
      pitchEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      zoomEnabled={false}
      initialRegion={this.state.region}
    >
      <Polyline
        coordinates={COORDINATES}
        strokeColor="#000"
        strokeColors={Colors.polyline}
        strokeWidth={3}
      />
    </MapView>
  );
};

GradientPolylines.propTypes = {
  COORDINATES: PropTypes.array
};

GradientPolylines.defaultProps = {
  COORDINATES: []
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
});

export default GradientPolylines;
