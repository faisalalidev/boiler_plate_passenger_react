import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

export default class TextFieldBorder extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    error: PropTypes.string,
    reference: PropTypes.func,
    textFieldStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    onPress: PropTypes.func,
    showDropDownIcon: PropTypes.bool,
    onLayout: PropTypes.func
  };

  static defaultProps = {
    style: {},
    reference: undefined,
    error: "",
    textFieldStyle: {},
    onPress: undefined,
    showDropDownIcon: false,
    onLayout: undefined
  };

  render() {
    const {
      style,
      label,
      error,
      reference,
      textFieldStyle,
      onPress,
      showDropDownIcon,
      onLayout,
      icons,
      data,
      image,
      myText,
      ...rest
    } = this.props;

    return (
      <ButtonView
        style={[{
          flexDirection: "row",
          paddingVertical: Metrics.doubleBaseMargin,
          paddingHorizontal: Metrics.xDoubleBaseMargin,
          justifyContent: "flex-start",
        }, style]}
        onPress={onPress}
      >
        {!_.isUndefined(icons) ? (
          <View
            style={{
              paddingRight: Metrics.baseMargin,
              justifyContent: "center"
            }}
          >
            <Image source={this.props.icons} />
          </View>
        ) : null}

        <View>
          <Text type="bold" size="medium" color="white">
            {this.props.myText}
          </Text>
        </View>
        {this.props.myText === "Payment Info" && this.props.count != 0 && (
          <View
            style={{
              backgroundColor: Colors.azure,
              borderRadius: 17,
              padding: 2,
              paddingHorizontal: 5,
              marginLeft: 3
            }}
          >
            <Text type="bold" size="medium" color="white">
              $ {this.props.count}
            </Text>
          </View>
        )}
      </ButtonView>
    );
  }
}
