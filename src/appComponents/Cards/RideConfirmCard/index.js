// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Text, AppButton, ButtonView, Separator } from "../../../components";
import {
  RideStatusBar,
  Modal,
  Car_Box,
  RideDetailCard,
  ProfileImage,
  TitleRating,
  DriveAddress,
  DistanceTimeEstimate,
  HelpButtons,
  CarDetailCell
} from "../../../appComponents";
import styles from "./styles";
import { Metrics, Colors, Images } from "../../../theme";
import Utils from "../../../util";

class RideConfirmCard extends Component {
  render() {
    const { data, isFetching } = this.props;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          alignSelf: "center"
        }}
      >
        <RideDetailCard style={styles.rideDetailContainer}>
          <View style={styles.rideDetailSubCon}>
            <View style={styles.proMainContainer}>
              <View style={styles.proSubContainer}>
                <ProfileImage
                  image={{
                    uri: Utils.imageUrlConverter(data.driver.image_url)
                  }}
                  borderRadius={41}
                  imageSize={styles.confirmRideImageSize}
                  imageValidation
                />
              </View>
              <View
                style={{
                  flex: 1
                }}
              >
                <TitleRating
                  title={
                    (data !== null || data !== undefined) &&
                    data.driver.username + " - "
                  }
                  rating="4.5"
                  image={Images.ratingStar}
                />
              </View>
            </View>

            <CarDetailCell
              carModal={data.vehicle.car_model_year}
              carColorName={
                (data !== null || data !== undefined) &&
                data.vehicle.car_color + " - " + data.vehicle.car_model_name
              }
              carNumber={data.vehicle.car_registration_number}
              numConStyle={styles.numConStyle}
              numColorStyle={Colors.text.jelly_bean}
              style={{ height: 72, width: "90%" }}
            />

            <View style={{ height: 63 }}>
              <DriveAddress
                textColor={Colors.text.aztec}
                style={styles.driverAddress}
                startPoint={
                  (data !== null || data !== undefined) &&
                  data.address.pickupLocation_main_text
                }
                endPoint={
                  (data !== null || data !== undefined) &&
                  data.address.dropOffLocation_main_text
                }
                navImage={Images.selectDestination}
              />
            </View>

            <Separator style={styles.separator} />
            <View style={{ height: 64 }}>
              <DistanceTimeEstimate
                asTotal={this.props.asTotal}
                style={styles.distanceTime}
                distance={
                  (data !== null || data !== undefined) &&
                  data.estimation.estimate_distance
                }
                time={
                  (data !== null || data !== undefined) &&
                  data.estimation.estimate_time
                }
                estimatedFare={
                  "$ " +
                  ((data !== null || data !== undefined) &&
                    data.estimation.estimate_fare)
                }
              />
            </View>
          </View>
          {this.props.callVissible && (
            <View style={styles.helpBtnCon}>
              <HelpButtons
                leftTitle="Call Captain"
                leftImage={Images.phone}
                rightImage={Images.email}
                leftOnPress={() =>
                  Utils.openCall(`tel:${data.driver.mobile_no}`)
                }
                rightOnPress={() => {
                  Utils.openCall(`sms:${data.driver.mobile_no}`);
                }}
                leftButtonStyle={{ marginRight: 5 }}
                rightTitle="SMS Captain"
                rightButtonStyle={{
                  backgroundColor: Colors.appbutton.black
                }}
                style={{ width: "100%" }}
              />
            </View>
          )}
          {this.props.cancelVissible && (
            <AppButton
              style={styles.appBtn}
              buttonTitle="Cancel Ride"
              onPress={this.props.onPressCancel}
              isFetching={isFetching}
            />
          )}
          {this.props.paynowVissible && (
            <AppButton
              btnColor={"white"}
              style={styles.appBtnPay}
              buttonTitle="Pay Now"
              onPress={this.props.onPressPaynow}
              rightIcon={Images.icBackArrow}
              isFetching={isFetching}
            />
          )}
        </RideDetailCard>
      </View>
    );
  }
}

export default RideConfirmCard;
