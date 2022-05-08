import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import Lightbox from "react-native-lightbox";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
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
    onPress: PropTypes.func
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const { style, image, onPress, ...rest } = this.props;
    return (
      <ButtonView style={{ alignItems: "center" }} onPress={onPress}>
        <Lightbox
          activeProps={{
            style: {
              width: Metrics.screenWidth - Metrics.baseMargin,
              height: Metrics.screenHeight / 1.5
            },
            resizeMode: "contain"
          }}
        >
          <Image
            resizeMethod="resize"
            resizeMode="cover"
            style={[
              {
                width: Metrics.screenWidth - Metrics.baseMargin,
                height: Metrics.screenWidth / 2
              },
              style
            ]}
            source={image}
            // source={{
            //   uri:
            //     "http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg"
            // }}
          />
        </Lightbox>
      </ButtonView>
    );
  }
}
