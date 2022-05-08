// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text } from "../../components";
import styles from "./styles";

export default class TitleRating extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    rating: PropTypes.string,
    image: PropTypes.object
  };

  static defaultProps = {
    image: {}
  };

  render() {
    const { title, rating, image } = this.props;
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "flex-end" }
        ]}
      >
        <Text
          size="xSmall"
          color="darkestGrey"
          type="regular"
          style={{ textAlign: "center" }}
        >
          {title}
        </Text>
        <Text
          size="xSmall"
          color="darkestGrey"
          type="regular"
          style={{ textAlign: "center" }}
        >
          {rating + " "}
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 18
          }}
        >
          <Image
            source={image}
            resizeMode="contain"
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>
    );
  }
}
