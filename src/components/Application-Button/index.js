// NOTE: It's a application button
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text, ButtonView, ActivityIndicator } from "../";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

export default class AppButton extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    icon: PropTypes.object,
    onPress: PropTypes.func
  };

  static defaultProps = {
    style: {},
    icon: false,
    title: "Title",
    rightIcon: false
  };

  render() {
    const {
      style,
      buttonTitle,
      onPress,
      rightIcon,
      btnColor,
      icon,
      isFetching,
      ...rest
    } = this.props;
    return (
      <ButtonView style={[styles.container, style]} onPress={onPress} disabled={isFetching}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>

          {icon ? <Image source={icon} style={{ marginRight: 15 }} /> : null}
          <Text
            type="medium"
            size="medium"
            color={btnColor}
            style={{
              textAlign: "center",
              fontStyle: "normal",
              letterSpacing: 0,

            }}
          >
            {buttonTitle}
          </Text>
        </View>
        {rightIcon && !isFetching ? (
          <Image
            source={rightIcon}
            style={{ position: "absolute", right: 15 }}
          />
        ) : null}
        {isFetching ? <ActivityIndicator /> : null}
      </ButtonView>
    );
  }
}
