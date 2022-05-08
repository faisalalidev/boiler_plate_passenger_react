import React from "react";
import { Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import { Marker } from "react-native-maps";
const MapMarker = props => {
  return props.isVisible ? (
    <Marker
      ref={props.refMarker}
      rotation={props.rotationItem}
      identifier={props.identifier}
      coordinate={props.coordinate}
      flat={props.flat ? props.flat : true}
      anchor={props.anchor ? props.anchor : { x: 0.5, y: 0.5 }}
      image={props.image ? props.image : null}
    >
      {/* <Image
        source={props.image}
        style={{ transform: [{ rotate: `${props.rotationItem}deg` }] }}
      /> */}
    </Marker>
  ) : null;
};

export default MapMarker;

