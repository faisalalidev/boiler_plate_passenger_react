// @flow
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Image,
  Platform,
  StyleSheet,
  ViewPropTypes,
  Text as TextRN,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback
} from "react-native";
import { Text } from "../";
import styles from "./styles";
import { Metrics, Images, Fonts, Colors } from "../../theme";

let disableClick = false;

const debounceTime = Platform.select({
  ios: 200,
  android: 900
});

function renderInnerText(
  title,
  color,
  size,
  type,
  textStyle,
  isLoading,
  indicatorColor,
  textAlign
) {
  if (isLoading) {
    return (
      <ActivityIndicator
        animating
        size="small"
        style={styles.spinner}
        color={indicatorColor}
      />
    );
  }

  return (
    <Text
      color={color}
      size={size}
      type={type}
      textAlign={textAlign}
      style={textStyle}
    >
      {title}
    </Text>
  );
}

function renderIcon(
  icon,
  iconRight,
  smallSize,
  showIconShadow,
  shadowBackground
) {
  if (!icon) {
    return null;
  }

  let positionStyle = { left: Metrics.baseMargin };
  if (iconRight) {
    positionStyle = { right: Metrics.smallMargin };
  }

  let shadowPositionStyle = { left: 0 };
  if (iconRight && showIconShadow) {
    shadowPositionStyle = { right: 0 };
  }

  let smallIcon = {
    width: Metrics.icon.normal,
    height: Metrics.icon.normal
  };
  if (smallSize) {
    smallIcon = {
      height: Metrics.icon.tiny,
      width: Metrics.icon.tiny
    };
  }
  if (showIconShadow) {
    return (
      <View
        style={[
          styles.iconShadow,
          shadowPositionStyle,
          {
            backgroundColor:
              Colors.background[shadowBackground] ||
              Colors[shadowBackground] ||
              shadowBackground
          }
        ]}
      >
        <Image resizeMode="contain" source={Images[icon]} style={smallIcon} />
      </View>
    );
  }
  return (
    <Image
      resizeMode="contain"
      source={Images[icon]}
      style={[styles.icon, positionStyle, smallIcon]}
    />
  );
}

function _onPress(props) {
  if (!disableClick) {
    disableClick = true;
    if (props.onPress) {
      props.onPress();
    }

    setTimeout(
      () => {
        disableClick = false;
      },
      props.isDebounce ? debounceTime : 0
    );
  }
}

const Button = (props: Object) => {
  const {
    style,
    color,
    size,
    type,
    icon,
    raised,
    iconRight,
    children,
    disabled,
    textAlign,
    isLoading,
    textStyle,
    background,
    indicatorColor,
    smallSize,
    aOpacity,
    isDebounce,
    showIconShadow,
    shadowBackground,
    ...rest
  } = props;

  const buttonStyle = StyleSheet.flatten([
    styles.button,
    raised && {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,

      elevation: 1
    },
    {
      // marginHorizontal: Metrics.doubleBaseMargin,
      backgroundColor:
        Colors.background[background] || Colors[background] || background
    },
    style,
    disabled && styles.opacity
  ]);

  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback
        disabled={disabled}
        {...rest}
        onPress={() => _onPress(props)}
        activeOpacity={aOpacity}
      >
        <View style={buttonStyle}>
          {renderInnerText(
            children,
            color,
            size,
            type,
            textStyle,
            isLoading,
            indicatorColor,
            textAlign
          )}

          {renderIcon(
            icon,
            iconRight,
            smallSize,
            showIconShadow,
            shadowBackground
          )}
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={buttonStyle}
      {...rest}
      onPress={() => _onPress(props)}
    >
      {renderInnerText(
        children,
        color,
        size,
        type,
        textStyle,
        isLoading,
        indicatorColor,
        textAlign
      )}
      {renderIcon(icon, iconRight, smallSize)}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  raised: PropTypes.bool,
  iconRight: PropTypes.bool,
  style: ViewPropTypes.style,

  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(_.keys(Fonts.size)),
    PropTypes.number
  ]),
  background: PropTypes.string,
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(_.keys(Fonts.type)),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  textStyle: TextRN.propTypes.style,
  indicatorColor: PropTypes.string,
  textAlign: PropTypes.oneOf(["auto", "left", "right", "center", "justify"]),
  isDebounce: PropTypes.bool,
  showIconShadow: PropTypes.bool,
  shadowBackground: PropTypes.string
};

Button.defaultProps = {
  style: {},
  Size: "medium",
  type: "bold",
  icon: undefined,
  color: "secondary",
  raised: false,
  iconRight: false,
  disabled: false,
  isLoading: false,
  indicatorColor: "black",
  textAlign: "center",
  background: "tertiary",
  textStyle: { flex: 1 },
  isDebounce: true,
  showIconShadow: false,
  shadowBackground: "tertiary"
};

export default Button;
