import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

const BoldHeading = (props: Object) => {
  const { style, title, ...rest } = props;
  return (
    <Text
      style={[styles.container, style]}
      type="medium"
      size="xLarge"
      color="white"
    >
      {title}
    </Text>
  );
};

BoldHeading.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  title: PropTypes.string
};

BoldHeading.defaultProps = {
  style: {},
  title: "Heading"
};

export default BoldHeading;
