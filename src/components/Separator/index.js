import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default class Separator extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ])
  };

  static defaultProps = {
    style: {}
  };
  render() {
    const { style } = this.props;
    return <View style={[styles.container, style]} />;
  }
}
