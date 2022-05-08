// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, SectionList, Text, Image, TouchableOpacity} from 'react-native';
import {Separator} from '../../components';
import styles from './styles';
import _ from 'lodash';
import {connect} from 'react-redux';
import {
  request,
  changeLocation,
  locationSelected,
} from '../../actions/GoogleAutoComplete';
import {
  PICKUP_LOCATION_CHANGE,
  DROPOFF_LOCATION_CHANGE,
  GET_SEARCHED_LOCATION,
} from '../../actions/ActionTypes';
import {request as geoRequest} from '../../actions/GoogleGeocode';
import {request as nearByRequest} from '../../actions/GoogleNearBy';
import {request as requestGetPassengerRecentLocation} from '../../actions/SocketActions/GetPassengerRecentLocation';
import {Strings, Metrics, Colors, Images, Fonts} from '../../theme';

class AutoCompleteListView extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    let data = {
      latlng:
        this.props.userLocation.coordinate.latitude +
        ',' +
        this.props.userLocation.coordinate.longitude,
      //   result_type: "street_address|sublocality"
    };
    let dataNearBy = {
      location:
        this.props.userLocation.coordinate.latitude +
        ',' +
        this.props.userLocation.coordinate.longitude,
      radius: 50000,
      //   result_type: "street_address|sublocality"
    };
    // this.props.geoRequest(data);
    this.props.nearByRequest(dataNearBy);
    this.props.requestGetPassengerRecentLocation(data);
  }

  itemSelected = (item) => {
    if (this.props.googleAutoComplete.selectedType === PICKUP_LOCATION_CHANGE) {
      this.props.locationSelected(item, PICKUP_LOCATION_CHANGE);
      console.log(
        'if part pickup Location *** : ',
        this.props.googleAutoComplete.pickupLocation,
        ' drop off  : ',
        this.props.googleAutoComplete.dropoffLocation,
      );
    } else {
      this.props.locationSelected(item, DROPOFF_LOCATION_CHANGE);
      console.log(
        'else part pickup Location *** : ',
        this.props.googleAutoComplete.pickupLocation,
        ' drop off  : ',
        this.props.googleAutoComplete.dropoffLocation,
      );
    }
    console.log('item', item);
    let data = {
      place_id: item.place_id,
    };
    this.props.geoRequest(data, GET_SEARCHED_LOCATION);
  };
  loadList = () => {
    //   if (this.state.selectedType === )
    if (
      this.props.googleAutoComplete.data.length > 0 &&
      (this.props.googleAutoComplete.dropoffLocation !== '' ||
        this.props.googleAutoComplete.pickupLocation !== '')
    ) {
      return [
        {
          title: 'Search',
          data: this.props.googleAutoComplete.data,
        },
      ];
    } else {
      return [
        {
          title: 'Recent Locations',
          data: this.props.getPassengerRecentLocation.data,
        },
        {
          title: 'Nearby Locations',
          data: this.props.googleAutoComplete.nearByData,
        },
      ];
    }
  };
  renderItems = (item, index, section) => {
    return (
      <TouchableOpacity onPress={() => this.itemSelected(item)}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: Colors.separator,
          }}>
          <Image source={Images.icLocationAcutoComp} style={{margin: 20}} />
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: Fonts.type.medium,
                fontSize: Fonts.size.normal,
                marginRight: 16,
              }}>
              {item.main_text}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: Fonts.type.regular,
                fontSize: Fonts.size.normal,
                color: Colors.lightGrey,
                marginRight: 16,
              }}>
              {item.secondary_text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          keyboardShouldPersistTaps={'always'}
          scrollEnabled={this.props.scrollEnabled}
          sections={this.loadList()}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({item, index, section}) =>
            this.renderItems(item, index, section)
          }
          extraData={this.props.googleAutoComplete}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={{
                margin: 15,
                fontFamily: Fonts.type.regular,
                fontSize: Fonts.size.large,
                color: Colors.black,
                flex: 1,
              }}>
              {title}
            </Text>
          )}
          stickySectionHeadersEnabled={false}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
  googleAutoComplete: state.googleAutoComplete,
  userLocation: state.userLocation,
  getPassengerRecentLocation: state.getPassengerRecentLocation,
});

const actions = {
  request,
  changeLocation,
  geoRequest,
  locationSelected,
  nearByRequest,
  requestGetPassengerRecentLocation,
};

export default connect(mapStateToProps, actions)(AutoCompleteListView);
