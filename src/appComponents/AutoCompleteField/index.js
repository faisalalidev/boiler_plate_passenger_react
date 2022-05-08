// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image, TextInput } from "react-native";
import { Separator } from "../../components";
import styles from "./styles";
import { Colors, Images, Fonts } from "../../theme";
import {
  PICKUP_LOCATION_CHANGE,
  DROPOFF_LOCATION_CHANGE
} from "../../actions/ActionTypes";
import {
  request,
  changeLocation,
  focusChange
} from "../../actions/GoogleAutoComplete";
import { connect } from "react-redux";

class AutoCompleteField extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ])
  };

  static defaultProps = {};

  componentDidMount() { }
  searchLocation = text => {
    const payload = {
      input: text
      //   location: "24.829315,67.041344",
      //   radius: 50000,
      //   strictbounds: ""
    };
    this.props.request(payload);
  };
  changeLocation = (text, type) => {
    this.searchLocation(text);
    this.props.changeLocation(text, type);
  };
  textInputFocus = (text, type) => {
    console.log(type);
    this.props.focusChange(type);
    // console.log("textInputFocus**********  : ", type);
  };
  render() {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            shadowColor: "#c9c9c9",
            shadowOffset: {
              width: 0,
              height: 8
            },
            backgroundColor: Colors.white,
            shadowRadius: 9,
            shadowOpacity: 0.16
          },
          this.props.style
        ]}
      >
        <View style={{ margin: 18 }}>
          <Image source={Images.icAutocomplete} resizeMode="contain" />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            // scrollEnabled={false}
            ref={this.props.refPickUp}
            style={{
              // flex: 1,
              height: 35,
              color: Colors.black,
              fontFamily: Fonts.type.regular,
              backgroundColor:
                this.props.googleAutoComplete.selectedType ===
                  PICKUP_LOCATION_CHANGE
                  ? "#F4F4F6"
                  : "#fff",
              marginRight: 16,
              marginVertical: 10,
              paddingTop: 0,
              paddingLeft: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#F4F4F6",
              paddingBottom: 0
            }}
            textAlignVertical="center"
            onFocus={() =>
              this.textInputFocus(
                this.props.googleAutoComplete.selectedPickupQueryText,
                PICKUP_LOCATION_CHANGE
              )
            }
            onChangeText={text =>
              this.changeLocation(text, PICKUP_LOCATION_CHANGE)
            }
            value={
              this.props.googleAutoComplete.isFetching &&
                this.props.googleAutoComplete.selectedType ===
                PICKUP_LOCATION_CHANGE
                ? "Loading..."
                : this.props.googleAutoComplete.selectedPickupQueryText
            }
            placeholderTextColor={Colors.black}
            placeholder={"Enter your Pick up location"}
            multiline={false}
          />
          <Separator
            style={{
              marginLeft: "10%",
              marginRight: 15
            }}
          />
          <TextInput
            multiline={false}
            // scrollEnabled={false}
            ref={this.props.refDropOff}
            autoFocus={true}
            onChangeText={text =>
              this.changeLocation(text, DROPOFF_LOCATION_CHANGE)
            }
            onFocus={() =>
              this.textInputFocus(
                this.props.googleAutoComplete.selectedDropoffQueryText,
                DROPOFF_LOCATION_CHANGE
              )
            }
            textAlignVertical="center"
            value={
              this.props.googleAutoComplete.isFetching &&
                this.props.googleAutoComplete.selectedType ===
                DROPOFF_LOCATION_CHANGE
                ? "Loading..."
                : this.props.googleAutoComplete.selectedDropoffQueryText
            }
            style={{
              // flex: 1,
              height: 35,
              marginRight: 16,
              backgroundColor:
                this.props.googleAutoComplete.selectedType ===
                  DROPOFF_LOCATION_CHANGE
                  ? "#F4F4F6"
                  : "#fff",
              marginVertical: 10,
              paddingLeft: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#F4F4F6",
              paddingTop: 0,
              paddingBottom: 0
            }}
            placeholderTextColor={Colors.black}
            placeholder={"Enter your drop off location"}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  networkInfo: state.networkInfo,
  googleAutoComplete: state.googleAutoComplete,
  userLocation: state.userLocation,
  getPassengerRecentLocation: state.getPassengerRecentLocation
});

const actions = {
  request,
  changeLocation,
  focusChange
};

export default connect(
  mapStateToProps,
  actions
)(AutoCompleteField);
