// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator } from "react-native";
import { Text } from "../";
import styles from "./styles";
import { Colors, Metrics } from "../../theme";

export default class Empty extends React.Component {
  static propTypes = {
    customStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ])
  };

  static defaultProps = {
    customStyle: {},
    color: Colors.blue,
    size: "small"
  };

  render() {
    const { color, size, style, customStyle } = this.props;
    return (
      <View style={[styles.container, customStyle]}>
        <ActivityIndicator animating color={color} size={size} style={style} />
      </View>
    );
  }
}
