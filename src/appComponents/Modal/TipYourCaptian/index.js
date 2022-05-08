import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput
} from "react-native";

import { Button, ButtonView, Text, Separator, ValidationText } from "../../../components";
import styles from "./styles";
import { Metrics, Colors, Images } from "../../../theme";

export default class TipYourCaptian extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: null
    };
  }
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isButton: PropTypes.bool,
    buttonTitle: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.bool
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
          onPress={() => onPress(this.state.selected)}
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
    const { isButton, buttonTitle, onChangeText, value, error } = this.props;
    const { selected } = this.state;
    return (
      <View style={styles.modalContainer}>
        <View
          style={{
            // backgroundColor: "#dedede",
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            //   style={{ marginTop: 15, marginBottom: 5 }}
            type="medium"
            color="azure"
            size="medium"
          >
            {title}
          </Text>
        </View>
        <TextInput
          style={styles.textArea}
          keyboardType={"numeric"}
          onChangeText={onChangeText}
          value={value}
        />
        {error && <ValidationText text="Only accept numbers" />}
        <Separator />
        <View />
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
