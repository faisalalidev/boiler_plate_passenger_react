import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";

import { Text, ButtonView } from "../../components";
import styles from "./styles";
import { Colors, Images, Metrics, Fonts } from "../../theme";

export default class EstimateBar extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    image: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onPress: PropTypes.func,
    isVisible: PropTypes.bool
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const {
      style,
      image,
      rideTitle,
      rideTitleStyle,
      onPress,
      price,
      isVisible,
      ...rest
    } = this.props;
    return isVisible ? (
      <View style={[styles.container, style]}>
        <View
          style={{
            flex: 1,
            marginLeft: Metrics.baseMargin
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontSize: Fonts.size.xxSmall,
              fontFamily: Fonts.type.regular
            }}
            numberOfLines={1}
          >
            Estimated Fare
          </Text>
        </View>
        <Text
          style={{
            color: Colors.jelly_bean,
            fontSize: Fonts.size.xxSmall,
            fontFamily: Fonts.type.regular,
            marginRight: Metrics.baseMargin
          }}
        >
          $ {price}
        </Text>
      </View>
    ) : null;
  }
}
