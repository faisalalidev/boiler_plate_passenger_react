// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image, ViewPropTypes } from "react-native";

import styles from "./styles";
import { ButtonView, Text } from "../";
import { Metrics } from "../../theme";

export default class ImageButton extends React.PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    onPress: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired
  };

  static defaultProps = {
    style: {},
    onPress: () => {}
  };

  render() {
    const { source, onPress, style, imgStyle, ...rest } = this.props;
    if (!Array.isArray(source)) {
      return (
        <ButtonView
          {...rest}
          style={[
            {
              padding: Metrics.smallMargin
            },
            style
          ]}
          onPress={Array.isArray(onPress) ? onPress[0] : onPress}
        >
          <Image source={source} resizeMode="contain" />
        </ButtonView>
      );
    }

    return (
      <View style={styles.container}>
        {source.map((item, index) => (
          <ButtonView
            {...rest}
            style={[
              style,
              {
                // padding: Metrics.smallMargin
                // justifyContent: "flex-start",
                // flex: 1,
                paddingVertical: Metrics.baseMargin
                // backgroundColor: "yellow"
              }
            ]}
            key={`button_${index}`} // eslint-disable-line react/no-array-index-key
            onPress={
              Array.isArray(onPress) ? onPress[index] || (() => {}) : onPress
            }
          >
            <Image source={source[index]} resizeMode="contain" />
          </ButtonView>
        ))}
        {/* <ButtonView
          style={{ marginLeft: Metrics.smallMargin / 2 }}
          onPress={() => alert("Menu Press")}
        >
          <Text
            type="book"
            size="normal"
            color="primary"
            style={{
              opacity: 0.9,
              fontWeight: "normal",
              fontStyle: "normal",
              lineHeight: 25.5,
              letterSpacing: 0
            }}
          >
            Menu
          </Text>
          </ButtonView> */}
      </View>
    );
  }
}

// <Text
// type="bold"
// size="small"
// color="primary"
// style={
//   {
//     // paddingLeft: Metrics.smallMargin
//   }
// }
// >
// Menu
// </Text>
