import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { Polyline } from "react-native-maps";
import { Colors } from "../../theme";
const MapPolyline = props => {
  return props.isVisible ? (
    <Polyline
      identifier={props.identifier}
      coordinates={props.coordinates}
      strokeColor={props.color ? props.color : Colors.polyline}
      strokeWidth={props.strokeWidth ? props.strokeWidth : 4}
    //   lineDashPhase={props.lineDashPhase ? props.lineDashPhase : null}
    //   lineDashPattern={props.lineDashPattern ? props.lineDashPattern : null}
    //   lineJoin={props.lineJoin ? props.lineJoin : null}
    />
  ) : null;
};

export default MapPolyline;
