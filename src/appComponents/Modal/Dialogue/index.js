import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, Image, TouchableOpacity, StatusBar } from "react-native";

import { Button, ButtonView, Text, Separator } from "../../../components";
import styles from "./styles";
import { Metrics, Colors, Images } from "../../../theme";

export default class Dialogue extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isButton: PropTypes.bool,
    buttonTitle: PropTypes.string.isRequired
  };

  static defaultProps = {
    title: "Title",
    description: "description",
    isButton: false,
    buttonTitle: "Title",
    leftButton: "No",
    rightButton: "Yes",
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
  _renderButton(title) {
    const { onPress, leftButton, rightButton } = this.props;
    return (
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <ButtonView
          onPress={() => this.hide()}
          style={[
            styles.buttonContainer,
            { borderRightColor: Colors.modalBoder, borderRightWidth: 0.5 }
          ]}
        >
          <Text type="reqular" color="azure" size="small">
            {leftButton}
          </Text>
        </ButtonView>
        <ButtonView
          onPress={onPress}
          style={[
            styles.buttonContainer,
            { borderLeftColor: Colors.modalBoder, borderLeftWidth: 0.5 }
          ]}
        >
          <Text type="reqular" color="azure" size="small">
            {rightButton}
          </Text>
        </ButtonView>
      </View>
    );
  }

  _renderModalContent(title, desc) {
    const { isButton, buttonTitle } = this.props;
    return (
      <View style={styles.modalContainer}>
        <Text
          style={{ marginTop: 15, marginBottom: 5 }}
          type="medium"
          color="azure"
          size="medium"
        >
          {title}
        </Text>
        <Separator />
        <Text
          style={{ marginBottom: 10, marginHorizontal: 40, textAlign: "center" }}
          type="regular"
          color="azure"
          size="normal"
        >
          {desc}
        </Text>
        {isButton ? this._renderButton(buttonTitle) : null}
      </View>
    );
  }

  render() {
    const { description, title } = this.props;
    const { isVisible } = this.state;

    return (
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        // animationIn="fadeIn"
        // animationOut="fadeOut"
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}
      >
        {this._renderModalContent(title, description)}
      </Modal>
    );
  }
}
