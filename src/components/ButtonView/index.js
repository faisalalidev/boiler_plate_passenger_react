import Util from "../../util";
import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform
} from "react-native";

let disableClick = false;

const debounceTime = Platform.select({
  ios: 200,
  android: 900
});
export default class ButtonView extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.element
    ]).isRequired
  };

  _onPress = () => {
    if (!disableClick) {
      disableClick = true;
      if (this.props.onPress) {
        this.props.onPress();
      }

      setTimeout(() => {
        disableClick = false;
      }, debounceTime);
    }
  };
  render() {
    const { onPress, ...rest } = this.props;
    if (Util.isPlatformAndroid()) {
      return (
        <TouchableNativeFeedback
          onPress={this._onPress}
          // background={TouchableNativeFeedback.Ripple("#E0E0E0", true)}
        >
          <View {...rest}>{this.props.children}</View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity onPress={this._onPress} {...rest}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
