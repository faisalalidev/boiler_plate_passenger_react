// import React from "react";
// import { Text, Image, TouchableOpacity } from "react-native";
// import { Metrics, Colors, Images, Fonts } from "../../theme";

// const WhereToGo = props => {
//   return props.isVisible ? (
//     <TouchableOpacity
//       activeOpacity={1}
//       style={{
//         position: "absolute",
//         top: 20,
//         backgroundColor: Colors.white,
//         height: 60,
//         left: 20,
//         right: 20,
//         flexDirection: "row",
//         alignItems: "center",
//         shadowColor: "rgba(201, 201, 201, 0.16)",
//         shadowOffset: {
//           width: 0,
//           height: 8
//         },
//         shadowRadius: 9,
//         shadowOpacity: 1
//       }}
//       onPress={props.onPress}
//     >
//       <Image source={Images.icWhereTo} style={{ margin: 15 }} />
//       <Text
//         style={{
//           color: "#112026",
//           fontSize: Fonts.size.xSmall,
//           fontFamily: Fonts.type.regular
//         }}
//       >
//         Where To
//       </Text>
//     </TouchableOpacity>
//   ) : null;
// };

// export default WhereToGo;

import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {Metrics, Colors, Images, Fonts} from '../../theme';

class WhereToGo extends React.Component {
  render() {
    return this.props.isVisible ? (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          position: 'absolute',
          top: Metrics.statusBarHeight + 20,
          backgroundColor: Colors.white,
          height: 60,
          left: 20,
          right: 20,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: 'rgba(201, 201, 201, 0.16)',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowRadius: 9,
          shadowOpacity: 1,
        }}
        onPress={this.props.onPress}>
        <Image source={Images.icWhereTo} style={{margin: 15}} />
        <Text
          style={{
            color: '#112026',
            fontSize: Fonts.size.xSmall,
            fontFamily: Fonts.type.regular,
          }}>
          Where To
        </Text>
      </TouchableOpacity>
    ) : null;
  }
}

export default WhereToGo;
