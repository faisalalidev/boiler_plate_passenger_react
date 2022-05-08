import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView, AppButton, Separator } from "../../components";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";

ContentContaoner = (title, subtitle, asTotal) => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      {asTotal ? (
        <Text
          size="xxLarge"
          color="blue"
          type="medium"
          numberOfLines={1}
          style={{ alignSelf: "flex-end" }}
        >
          {subtitle}
        </Text>
      ) : (
          <View>
            <Text
              size="xxSmall"
              color="grey"
              type="regular"
              numberOfLines={1}
            // style={{ textAlign: "center" }}
            >
              {title}
            </Text>
            <Text
              size="xSmall"
              color="darkestGrey"
              type="regular"
              numberOfLines={1}
            // style={{ textAlign: "center" }}
            >
              {subtitle}
            </Text>
          </View>
        )}
    </View>
  );
};

const DistanceTimeEstimate = (props: Object) => {
  const {
    style,
    startPoint,
    destination,
    distance,
    time,
    estimatedFare,
    carImage,
    asTotal,
    ...rest
  } = props;
  return (
    <View style={[styles.container, style]}>
      {!_.isUndefined(carImage) ? (
        <Image source={Images.carBackground} style={{ marginRight: 10 }} />
      ) : null}
      {this.ContentContaoner("Distance", distance)}
      {this.ContentContaoner("Time", time)}
      {/* {this.ContentContaoner("", "", "$ 5.222")} */}
      {this.ContentContaoner("Estimated Fare", estimatedFare, asTotal)}
    </View>
  );
};

DistanceTimeEstimate.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  startPoint: PropTypes.string,
  destination: PropTypes.string
};

DistanceTimeEstimate.defaultProps = {
  style: {},
  startPoint: "30 Newbury St, 3rd Floor, Boston,",
  destination: "867 Boylston Street, 5th Floor, Boston"
};

export default DistanceTimeEstimate;
