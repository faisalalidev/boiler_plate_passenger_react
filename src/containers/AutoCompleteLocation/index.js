import _ from 'lodash';
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './styles';
import {Strings, Metrics, Colors, Images, Fonts} from '../../theme';
import {Separator} from '../../components';
import {
  request,
  success,
  failure,
  changeLocation,
  locationSelected,
} from '../../actions/GoogleAutoComplete';
import {
  PICKUP_LOCATION_CHANGE,
  DROPOFF_LOCATION_CHANGE,
} from '../../actions/ActionTypes';
import {request as geoRequest} from '../../actions/GoogleGeocode';
import {request as nearByRequest} from '../../actions/GoogleNearBy';
import {request as requestGetPassengerRecentLocation} from '../../actions/SocketActions/GetPassengerRecentLocation';
import {push} from '../../services/NavigationService';

// import debounce from "lodash.debounce";

class AutoCompleteLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: '',
    };
  }
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
    this.props.geoRequest(data);
    this.props.nearByRequest(dataNearBy);
    this.props.requestGetPassengerRecentLocation(data);
  }
  componentDidUpdate() {
    if (
      !_.isEmpty(this.props.googleAutoComplete.selectedDropOffLocation) &&
      !_.isEmpty(this.props.googleAutoComplete.selectedPickupLocation)
    ) {
      push('rideStatusMap');
    }
  }
  searchLocation = (text) => {
    const payload = {
      input: text,
      //   location: "24.829315,67.041344",
      //   radius: 50000,
      //   strictbounds: ""
    };
    this.props.request(payload);
  };
  changeLocation = (text, type) => {
    this.searchLocation(text);
    this.props.changeLocation(text, type);
    this.setState({
      selectedType: type,
    });
  };
  itemSelected = (item) => {
    console.log('item', item);
    if (this.state.selectedType === PICKUP_LOCATION_CHANGE) {
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
  };
  textInputFocus = (type) => {
    this.setState({
      selectedType: type,
    });

    console.log('textInputFocus**********  : ', type);
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
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            shadowColor: '#c9c9c9',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            backgroundColor: Colors.white,
            shadowRadius: 9,
            shadowOpacity: 0.16,
          }}>
          <View style={{margin: 18}}>
            <Image source={Images.icAutocomplete} resizeMode="contain" />
          </View>
          <View style={{flex: 1}}>
            <TextInput
              style={{
                flex: 1,
                color: Colors.black,
                fontFamily: Fonts.type.regular,
                marginRight: 16,
              }}
              onFocus={() => this.textInputFocus(PICKUP_LOCATION_CHANGE)}
              onChangeText={(text) =>
                this.changeLocation(text, PICKUP_LOCATION_CHANGE)
              }
              value={this.props.googleAutoComplete.pickupLocation}
              placeholderTextColor={Colors.black}
              placeholder={'Enter your Pick up location'}
            />
            <Separator
              style={{
                marginLeft: '10%',
                marginRight: 15,
              }}
            />
            <TextInput
              onChangeText={(text) =>
                this.changeLocation(text, DROPOFF_LOCATION_CHANGE)
              }
              onFocus={() => this.textInputFocus(DROPOFF_LOCATION_CHANGE)}
              value={this.props.googleAutoComplete.dropoffLocation}
              style={{flex: 1, marginRight: 16}}
              placeholderTextColor={Colors.black}
              placeholder={'Enter your drop off location'}
            />
          </View>
        </View>
        <SectionList
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

export default connect(mapStateToProps, actions)(AutoCompleteLocation);

// {[
//     {
//       title: "Recent Locations",
//       data: ["Gaslight Brasserie du Coin", "Gaslight Brasserie du Coin"]
//     },
//     {
//       title: "Nearby Locations",
//       data: ["Gaslight Brasserie du Coin", "Gaslight Brasserie du Coin"]
//     }
//   ]}
