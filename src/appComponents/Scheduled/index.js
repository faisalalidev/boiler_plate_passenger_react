// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View } from "react-native";
import { Text, FlatList, ButtonView, Loading } from "../../components";
import { RideStatusCell, DriveAddress } from "../../appComponents";
import styles from "./styles";
import { Images, Colors, Strings } from "../../theme";
import moment from "moment";
import Utils from "../../util";
import {
  request as scheduledRequest,
  success as scheduledSuccess,
  failure as scheduledFailure
} from "../../actions/ScheduledAction";

class Scheduled extends Component {

  componentDidMount() {
    this.props.scheduledRequest()
  }

  _listItem = item => {
    return (
      <ButtonView
        onPress={() => alert("touchable")}
        style={styles.listItemContainer}
      >
        <RideStatusCell
          date={Utils.dateFormatHandler(item.created_at)}
          time={item.ride_start_time}
          earning={"$ " + item.price}
        />
        <DriveAddress
          style={styles.driverAddress}
          startPoint={item.pickupLocation_description}
          endPoint={item.dropOffLocation_description}
          navImage={Images.trips}
          textColor={Colors.text.grey}
        />
      </ButtonView>
    );
  };
  _renderItems = ({ item, index }) => {
    return this._listItem(item);
  };
  render() {
    const { scheduled, networkInfo } = this.props;
    return (
      <View style={styles.container}>
        {scheduled.data && scheduled.data.length ? <FlatList
          data={scheduled.data}
          ItemSeparatorComponent={false}
          renderItem={this._renderItems}
        /> : !scheduled.isFetching ?
            <View style={styles.scheduleStyle}>
              <Text color="grey" size="small" type="medium">
                {networkInfo.isNetworkConnected ? Strings.PLACEHOLDER.scheduled : Strings.PLACEHOLDER.networkInfo}
              </Text>
            </View> : null
        }
        <Loading loading={scheduled.isFetching} />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  networkInfo: state.networkInfo,
  scheduled: state.scheduled
});

const actions = {
  scheduledRequest,
  scheduledSuccess,
  scheduledFailure
};

export default connect(
  mapStateToProps,
  actions
)(Scheduled);