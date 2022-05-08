import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";

import { Text, ButtonView } from "../../components";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";

export default class RideStatusBar extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    rideTitleStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    image: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    onPress: PropTypes.func
  };

  static defaultProps = {
    style: {},
    rideTitle: "Ipsum aute est ipsum quis."
  };

  render() {
    const {
      style,
      image,
      rideTitle,
      rideTitleStyle,
      rideTitleTextStyle,
      onPress,
      ...rest
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Image source={image} />
        <View style={[styles.titleContainer, rideTitleStyle]}>
          <Text style={[styles.rideText, rideTitleTextStyle]} numberOfLines={1}>
            {rideTitle}
          </Text>
        </View>
      </View>
    );
  }
}
