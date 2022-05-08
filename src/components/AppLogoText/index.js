import React from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import { Images, Metrics } from "../../theme";
import styles from "./styles";

export default class ApplogoText extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ])
  };
  render() {
    const { style } = this.props;
    return (
      <Image
        source={Images.appLogo}
        resizeMode="contain"
        style={[styles.container, style]}
      />
    );
  }
}
