import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView, AppButton, Separator } from "../../components";
import { DistanceTimeEstimate } from "../../appComponents";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";
import Utils from "../../util";

_button = (title, image, onPress, buttonStyle) => {
  //   const { buttonStyle } = props;
  return (
    <ButtonView onPress={onPress} style={[styles.buttonContainer, buttonStyle]}>
      <Image source={image} />
      <Text
        size="normal"
        color="white"
        type="medium"
        style={{ paddingLeft: 10 }}
      >
        {title}
      </Text>
    </ButtonView>
  );
};

const HelpButtons = (props: Object) => {
  const {
    style,
    leftTitle,
    leftImage,
    leftOnPress,
    rightTitle,
    rightImage,
    rightOnPress,
    leftButtonStyle,
    rightButtonStyle,
    ...rest
  } = props;
  return (
    <View style={[styles.container, style]}>
      {this._button(leftTitle, leftImage, leftOnPress, leftButtonStyle)}
      {this._button(rightTitle, rightImage, rightOnPress, rightButtonStyle)}
    </View>
  );
};

HelpButtons.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),

  image: PropTypes.object
};

HelpButtons.defaultProps = {
  style: {}
};

export default HelpButtons;
