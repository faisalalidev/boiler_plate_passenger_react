import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  NativeModules,
  LayoutAnimation
} from "react-native";
import styles from "./styles";
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right"
];

class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
      w: "100%"
    };

    this.createPanResponder(props);
  }

  setModalVisible(visible) {
    const { height, minClosingHeight, duration, onClose } = this.props;
    const { animatedHeight, pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      Animated.timing(animatedHeight, {
        toValue: height,
        duration
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: minClosingHeight,
        duration
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0)
        });

        if (typeof onClose === "function") onClose();
      });
    }
  }

  createPanResponder(props) {
    const { height, minClosingHeight } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // alert("onPanResponderMove");
        if (
          gestureState.dy > 0 &&
          gestureState.dy < height - minClosingHeight
        ) {
          // console.warn("y gesture state : ", gestureState.dy);
          Animated.event([null, { dy: pan.y }])(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const { height } = props;
        if (height / 2 - gestureState.dy < 0) {
          // this.setModalVisible(false);
          Animated.spring(pan, {
            toValue: { x: 0, y: height - minClosingHeight }
          }).start(() => {
            this.props.onClose(false);
            console.log("Animation DONE");
          });
          this.setState({
            modalVisible: false
          });

          LayoutAnimation.spring();
          this.setState({ w: "95%" });
        } else {
          this.setState({
            modalVisible: true
          });
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start(() => {
            // this.props.onClose(true);
            console.log("Animation DONE");
          });
          this.props.onClose(true);
          LayoutAnimation.spring();
          this.setState({ w: "100%" });
        }
      }
    });
  }
  componentDidMount() {
    this.setModalVisible(true);
  }
  open() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const {
      animationType,
      closeOnPressMask,
      children,
      customStyles
    } = this.props;
    const { animatedHeight, pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform()
    };
    console.log("buttonsheet", this.state);

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          panStyle,
          styles.container,
          customStyles.container,
          {
            height: animatedHeight,
            width: this.state.w,
            alignContent: "center",
            alignSelf: "center"
          }
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}

BottomSheet.propTypes = {
  animationType: PropTypes.oneOf(["none", "slide", "fade"]),
  height: PropTypes.number,
  minClosingHeight: PropTypes.number,
  duration: PropTypes.number,
  closeOnPressMask: PropTypes.bool,
  customStyles: PropTypes.objectOf(PropTypes.object),
  onClose: PropTypes.func,
  children: PropTypes.node
};

BottomSheet.defaultProps = {
  animationType: "none",
  height: 260,
  minClosingHeight: 110,
  duration: 300,
  closeOnPressMask: true,
  customStyles: {},
  onClose: null,
  children: <View />
};

export default BottomSheet;
