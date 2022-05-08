// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, TouchableOpacity, RefreshControl } from "react-native";
import { Text, FlatList, Separator, Loading } from "../../components";
import styles from "./styles";
import { Colors, Metrics, Strings } from "../../theme";
import Utils from "../../util";
import {
  request as notificationRequest,
  success as notificationSuccess,
  failure as notificationFailure
} from "../../actions/NotificationAction";
import { ERROR_NETWORK_NOT_AVAILABLE } from "../../config/WebService";

// const notification = [
//   {
//     notification: "Marie Winter",
//     remarks: "Appointment Request Received",
//     time: Utils.howLongAgo(new Date().getTime() - 100000),
//     read: true
//   },
//   {
//     notification: "Marie Winter",
//     remarks: "Appointment Request Received",
//     time: Utils.howLongAgo(new Date().getTime() - 1000000),
//     read: true
//   },
//   {
//     notification: "Marie Winter",
//     remarks: "Appointment Request Received",
//     time: Utils.howLongAgo(new Date()),
//     read: false
//   }
// ];

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichFetching: false
    }
  }

  componentDidMount() {
    this.setState({ whichFetching: true })
    this.props.notificationRequest()
  }
  onRefresh() {
    this.setState({ whichFetching: false })
    this.props.notificationRequest();
  }


  _renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => null}
        style={styles.itemContainer}
      >
        <View style={styles.itemSubContainer}>
          <View style={styles.notiConatiner}>
            <View style={styles.notification}>
              <View>
                <Text color="darkGrey" size="xxSmall" type="medium">
                  {item.title}
                </Text>
              </View>
              <View style={styles.mark}>
                {/* active notification */}
                {item.status ? (
                  <View style={styles.markContainer}>
                    <View style={styles.markSubContainer} />
                  </View>
                ) : null}
                {/* active notification */}
              </View>
            </View>
            <View>
              <Text color="grey" size="xxxSmall" type="medium">
                {Utils.howLongAgo(item.created_at)}
              </Text>
            </View>
          </View>
          <View>
            <Text color="grey" size="xxSmall" type="medium">
              {item.description}
            </Text>
          </View>
        </View>
        <View style={styles.seprator} />
      </TouchableOpacity>
    );
  };

  render() {
    let { notification, networkInfo } = this.props;
    let { whichFetching } = this.state;
    return (
      <View style={styles.container}>
        {notification.data && notification.data.length ? <FlatList
          onEndReached={() => {
            console.log("End")
          }}
          refreshControl={
            <RefreshControl
              refreshing={notification.isFetching}
              onRefresh={() => this.onRefresh()}

            />
          }
          data={notification.data}
          ItemSeparatorComponent={false}
          renderItem={this._renderItems}
        /> : !notification.isFetching ?
            <View style={styles.notificationStyle}>
              <Text color="grey" size="small" type="medium">
                {networkInfo.isNetworkConnected ? Strings.PLACEHOLDER.notification : ERROR_NETWORK_NOT_AVAILABLE.message}
              </Text>
            </View> : null
        }
        <Loading loading={whichFetching && notification.isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  networkInfo: state.networkInfo,
  notification: state.notification
});

const actions = {
  notificationRequest,
  notificationSuccess,
  notificationFailure
};

export default connect(
  mapStateToProps,
  actions
)(Notifications);