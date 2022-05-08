import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";

const ValidationText = (props: Object) => {
  const { style, title, text, ...rest } = props;
  return (
    <Text
      style={[styles.container, style]}
      type="regular"
      size="xxSmall"
      color="red"
    >
      {text}
    </Text>
  );
};

ValidationText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  text: PropTypes.string
};

ValidationText.defaultProps = {
  style: {},
  text: "validation"
};

export default ValidationText;
