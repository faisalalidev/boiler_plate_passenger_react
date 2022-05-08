import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, Image, TouchableOpacity, StatusBar } from "react-native";

import { Button, ButtonView, Text, Separator } from "../../../components";
import styles from "./styles";
import { Metrics, Colors, Images } from "../../../theme";

export default class FindRide extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    isButton: PropTypes.bool,
    buttonTitle: PropTypes.string.isRequired
  };

  static defaultProps = {
    isButton: false,
    buttonTitle: "Title",
    onPress: () => null
  };

  state = {
    isVisible: false
  };

  show() {
    this.setState({ isVisible: true });
  }

  hide = () => {
    this.setState({
      isVisible: false
    });
  };

  _renderModalContent(title, desc) {
    const { isButton, buttonTitle, onPress } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <Image
            source={Images.searchAnimation}
            style={{ width: 250, height: 250 }}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.white,
            marginHorizontal: 50,
            padding: 15,
            alignItems: "center",
            borderTopEndRadius: 5,
            borderTopStartRadius: 5
          }}
        >
          <Text type="reqular" color="black" size="small">
            {buttonTitle}
          </Text>
          <ButtonView
            onPress={onPress}
            style={{
              justifyContent: "center",
              position: "absolute",
              paddingHorizontal: 10,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <Image source={Images.leftBlackArrow} />
          </ButtonView>
        </View>
      </View>
    );
  }

  render() {
    const { description, title } = this.props;
    const { isVisible } = this.state;

    return (
      <Modal
        isVisible={isVisible}
        style={{ margin: 0 }}
        // animationIn="fadeIn"
        // animationOut="fadeOut"
        backdropOpacity={0.9}
      >
        {this._renderModalContent(title, description)}
      </Modal>
    );
  }
}
