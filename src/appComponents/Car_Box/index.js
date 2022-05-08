import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image, FlatList } from "react-native";

import { Text, ButtonView } from "../../components";
import styles from "./styles";
import { Colors, Images, Metrics, Fonts } from "../../theme";

export default class Car_Box extends React.Component {
  constructor(props) {
    super(props);
    // console.log("props Car_Box constructor: ", props);
    // this.state = {
    //   carData: props.carData
    // };
  }
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    rideTitleStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    image: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    onPress: PropTypes.func
  };

  static defaultProps = {
    style: {}
  };

  _renderItem = (item, index) => {
    // console.log(" _renderItem item : ******* ", item);
    return (
      <ButtonView style={styles.carCard} onPress={() => alert("")}>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            marginTop: 10
          }}
        >
          <Image source={Images.icSwift} style={{ tintColor: Colors.blue }} />
        </View>
        <Text
          style={{
            color: Colors.black,
            fontSize: Fonts.size.xxSmall,
            fontFamily: Fonts.type.regular,
            textAlign: "center",
            marginTop: 10
          }}
        >
          Swift
        </Text>
      </ButtonView>
    );
  };

  render() {
    const {
      style,
      image,
      rideTitle,
      rideTitleStyle,
      onPress,
      ...rest
    } = this.props;

    // const { carData } = this.state;
    // console.log("carData  render component : ", carData);
    return (
      <View
        style={{
          width: Metrics.screenWidth - Metrics.doubleBaseMargin,
          alignSelf: "center",
          position: "absolute",
          bottom: 95
        }}
      >
        <FlatList
          data={this.props.carData}
          // data={[{ key: "a" }, { key: "b" }]}
          renderItem={this._renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        // extraData={this.props}
        />
      </View>
    );
  }
}
