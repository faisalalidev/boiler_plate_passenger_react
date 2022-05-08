import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView, AppButton, Separator } from "../../components";
import { ProfileImage, DistanceTimeEstimate } from "../../appComponents";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";
import StarRating from "react-native-star-rating";
import Util from "../../util";

const CarDetailCell = (props: Object) => {
  const {
    userName,
    carNumber,
    carColorName,
    carModal,
    style,
    startPoint,
    destination,
    star,
    numColorStyle,
    numConStyle,
    rating,
    proImage,
    ...rest
  } = props;
  _renderRating = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text color="aztec" size="medium" type="regular">
          {" - " + rating + " "}
        </Text>
        <Image source={Images.ratingStar} />
      </View>
    );
  };
  return (
    <View style={[styles.container, style]}>
      {proImage ? (
        <ProfileImage
          image={{
            uri: Util.imageUrlConverter(proImage)
          }}
          borderRadius={28}
          imageSize={styles.acceptRideImageSize}
          imageValidation
        />
      ) : null}
      <View style={{ flex: 1, alignSelf: "center" }}>
        <View style={{ flexDirection: "row" }}>
          {userName ? (
            <Text color="aztec" size="medium" type="regular">
              {userName}
            </Text>
          ) : null}
          {rating ? this._renderRating() : null}
        </View>
        {carModal ? (
          <Text size="xxSmall" color="aztec" type="regular">
            {carModal}
          </Text>
        ) : null}
        <Text size="xxxSmall" color="grey">
          {carColorName}
        </Text>
        <View style={numConStyle}>
          <Text size="xxxSmall" color="grey" style={{ color: numColorStyle }}>
            {carNumber}
          </Text>
        </View>
        {!_.isUndefined(star) ? (
          <View style={{ width: 80 }}>
            <StarRating
              starSize={15}
              disabled
              emptyStar={"ios-star-outline"}
              fullStar={"ios-star"}
              halfStar={"ios-star-half"}
              iconSet={"Ionicons"}
              maxStars={5}
              rating={star}
              selectedStar={rating => this.onStarRatingPress(rating)}
              fullStarColor={"#ffa800"}
            />
          </View>
        ) : null}
      </View>
      <View
        style={{
          flex: 0.9,
          alignItems: "flex-end"
        }}
      >
        <Image source={Images.carPlaceholder} style={{}} />
      </View>
    </View>
  );
};

CarDetailCell.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  startPoint: PropTypes.string,
  destination: PropTypes.string,
  proImage: PropTypes.object
};

CarDetailCell.defaultProps = {
  style: {},
  startPoint: "30 Newbury St, 3rd Floor, Boston,",
  destination: "867 Boylston Street, 5th Floor, Boston",
  proImage: false
};

export default CarDetailCell;
