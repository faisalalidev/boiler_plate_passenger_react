// @flow
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "../../components";
import styles from "./styles";

const RideStatusCell = (props: Object) => {
  const { date, time, earning, earningColor, ...rest } = props;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <Text
          size="xSmall"
          color="darkestGrey"
          type="medium"
          style={styles.date}
        >
          {date}
        </Text>
        <Text size="xxSmall" color="grey" type="regular">
          {time}
        </Text>
      </View>
      <View>
        <Text size="small" color={earningColor} type="medium">
          {earning}
        </Text>
      </View>
    </View>
  );
};

RideStatusCell.propTypes = {
  date: PropTypes.string,
  time: PropTypes.string,
  earning: PropTypes.string,
  earningColor: PropTypes.string
};

RideStatusCell.defaultProps = {
  date: "",
  time: "",
  earning: "",
  earningColor: "darkestGrey"
};
export default RideStatusCell;
