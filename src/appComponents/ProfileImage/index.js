import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { Text, ButtonView, ValidationText } from "../../components";
import styles from "./styles";
import {
  Colors,
  Images,
  Metrics,
  ApplicationStyles,
  Strings
} from "../../theme";
import Utils from "../../util";

export default class ImageBanner extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    icon: PropTypes.object,
    image: PropTypes.object,
    onPress: PropTypes.func,
    imageSize: PropTypes.number,
    emailColor: PropTypes.string,
    borderRadius: PropTypes.number
  };

  static defaultProps = {
    style: {},
    emailColor: "white",
    borderRadius: 50
  };

  render() {
    const {
      style,
      image,
      name,
      email,
      plus,
      onPress,
      imageValidation,
      imageSize,
      emailColor,
      borderRadius,
      ...rest
    } = this.props;
    return (
      <ButtonView
        onPress={onPress}
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View>
          <ImageLoad
            style={[
              {
                marginVertical: Metrics.smallMargin,
                width: 100,
                height: 100,
                borderRadius: 50
              },
              imageSize
            ]}
            placeholderStyle={[
              {
                marginVertical: Metrics.smallMargin,
                width: 100,
                height: 100,
                borderRadius: 50
              },
              imageSize
            ]}
            borderRadius={borderRadius}
            loadingStyle={{ size: "large", color: Colors.text.grey }}
            source={this.props.image}
            placeholderSource={Images.image_holder}
          />
          {!_.isUndefined(plus) ? (
            <Image
              source={Images.plus}
              resizeMode="contain"
              style={{
                position: "absolute",
                bottom: 2,
                right: 0
              }}
            />
          ) : null}
        </View>
        {imageValidation ? null : (
          <ValidationText text={Strings.VALIDATION.driverImage} />
        )}
        {!_.isUndefined(name) ? (
          <Text
            style={{ textAlign: "center" }}
            type="medium"
            size="large"
            color="white"
          >
            {name}
          </Text>
        ) : null}

        {!_.isUndefined(email) ? (
          <Text
            style={{ textAlign: "center" }}
            type="medium"
            size="small"
            color={emailColor}
          >
            {email}
          </Text>
        ) : null}
      </ButtonView>
    );
  }
}

// {_.isEmpty(driverProfileImage) && !driverProfileImageStatus ? (
//     <ValidationText text={Strings.VALIDATION.driverImage} />
//   ) : null}
