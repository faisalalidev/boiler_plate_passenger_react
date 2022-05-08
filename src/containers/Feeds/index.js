// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View } from "react-native";
import { Text, NoInternetConnection } from "../../components";
import styles from "./styles";
import { Metrics, Colors } from "../../theme";

class Feeds extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{}} type="bold" size="large" color="black">
          Feeds Screen
        </Text>
        <NoInternetConnection onPress={() => alert("try again")} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Feeds);
