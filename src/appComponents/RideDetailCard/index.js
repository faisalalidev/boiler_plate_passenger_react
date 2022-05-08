import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text } from "../../components";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";

export default class RideDetailCard extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.element
    ]).isRequired
  };

  defaultProps = {
    style: {}
  };
  render() {
    const { style } = this.props;
    return <View style={[styles.container, style]}>{this.props.children}</View>;
  }
}
