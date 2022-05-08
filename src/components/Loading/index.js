// @flow

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, StatusBar, ActivityIndicator } from "react-native";
import styles from "./styles";
import { Colors } from "../../theme";

export default class Loader extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool
  };

  static defaultProps = {
    loading: false
  };

  render() {
    const { loading } = this.props;
    return (
      <View>
        <StatusBar networkActivityIndicatorVisible={loading} />
        <Modal
          style={{ margin: 0 }}
          backdropOpacity={0.5}
          animationIn="fadeIn"
          isVisible={loading}
        >
          <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.blue} />
          </View>
        </Modal>
      </View>
    );
  }
}
