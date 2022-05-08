// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, FlatList, ButtonView, Loading} from '../../components';
import {RideStatusCell, DriveAddress} from '../../appComponents';
import styles from './styles';
import {Images, Colors, Strings} from '../../theme';
import moment from 'moment';
import Utils from '../../util';
import _ from 'lodash';
import {
  request as historyRequest,
  success as historySuccess,
  failure as historyFailure,
} from '../../actions/HistoryAction';
import {push} from '../../services/NavigationService';

class History extends Component {
  componentDidMount() {
    this.props.historyRequest();
  }

  dateFormat(data) {
    var GetDate = new Date(date).toDateString();
    var NewDate = new Date().toDateString();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1);
    tomorrow = new Date(tomorrow).toDateString();
    if (GetDate === NewDate) {
      return 'Today';
    } else if (GetDate === tomorrow) {
      return 'Yesterday';
    } else {
      return date;
    }
  }

  _listItem = (item) => {
    return (
      <ButtonView
        onPress={() => push('MyTripDetails', {item})}
        style={styles.listItemContainer}>
        <RideStatusCell
          date={Utils.dateFormatHandler(item.created_at)}
          time={item.ride_start_time}
          earning={item.price}
        />
        <DriveAddress
          style={styles.driverAddress}
          startPoint={item.pickupLocation_main_text}
          endPoint={item.dropOffLocation_main_text}
          navImage={Images.trips}
          textColor={Colors.text.grey}
        />
      </ButtonView>
    );
  };
  _renderItems = ({item, index}) => {
    return this._listItem(item);
  };
  render() {
    let {history, networkInfo} = this.props;
    return (
      <View style={styles.container}>
        {history.data && history.data.length ? (
          <FlatList
            data={history.data}
            ItemSeparatorComponent={false}
            renderItem={this._renderItems}
          />
        ) : !history.isFetching ? (
          <View style={styles.historyStyle}>
            <Text color="grey" size="small" type="medium">
              {networkInfo.isNetworkConnected
                ? Strings.PLACEHOLDER.history
                : Strings.PLACEHOLDER.networkInfo}
            </Text>
          </View>
        ) : null}
        <Loading loading={history.isFetching} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
  history: state.history,
});

const actions = {
  historyRequest,
  historySuccess,
  historyFailure,
};

export default connect(mapStateToProps, actions)(History);
