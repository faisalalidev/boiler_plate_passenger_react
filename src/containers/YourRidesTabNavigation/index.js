// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "../../components";
import styles from "./styles";
import TabNavigator from "../../navigator/tabNavigator";

class YourRidesTabNavigation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(YourRidesTabNavigation);
