// @flow
import React from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback } from "react-native";

const DOUBLE_PRESS_DELAY = 400;

export default class DoubleTap extends React.PureComponent {
  static propTypes = {
    onDoubleTapPress: PropTypes.func
  };

  static defaultProps = {
    onDoubleTapPress: () => {}
  };

  lastPress = 0;

  onDoubleTapPress = () => {
    const time = new Date().getTime();
    const delta = time - this.lastPress;

    if (delta < DOUBLE_PRESS_DELAY) {
      this.props.onDoubleTapPress();
    }
    this.lastPress = time;
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onDoubleTapPress}>
        {this.props.children}
      </TouchableWithoutFeedback>
    );
  }
}
