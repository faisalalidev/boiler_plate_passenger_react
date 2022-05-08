
// import React from "react";
// import PropTypes from "prop-types";
// import { View, Image } from "react-native";
// import { Text, ButtonView } from "../";
// import styles from "./styles";
// import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
// import Utils from "../../util";
// import { ERROR_NETWORK_NOT_AVAILABLE } from "../../config/WebService";

// export default class NoInternetConnection extends React.PureComponent {
//   static propTypes = {
//     style: PropTypes.oneOfType([
//       PropTypes.array,
//       PropTypes.object,
//       PropTypes.number
//     ]),
//     onPress: PropTypes.func
//   };

//   static defaultProps = {
//     style: {},
//     paragraph: "No internet connection found check your connection"
//   };

//   render() {
//     const { style, onPress, ...rest } = this.props;
//     return (
//       <View style={styles.container}>
//         <Image source={Images.nointernet} />
//         <View style={styles.noConnection}>
//           <Text size="medium" color="#3e3e3e" style={styles.text} type="bold">
//             Ooops!
//           </Text>

//           <Text
//             size="normal"
//             color="#3e3e3e"
//             style={styles.text}
//             type="regular"
//           >
//             {ERROR_NETWORK_NOT_AVAILABLE.message}
//           </Text>
//         </View>
//         <ButtonView style={styles.leftButtonView} onPress={onPress}>
//           <Text
//             size="normal"
//             color="#3e3e3e"
//             style={styles.text}
//             type="regular"
//           >
//             Try Again
//           </Text>
//         </ButtonView>
//       </View>
//     );
//   }
// }




import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

import { ERROR_NETWORK_NOT_AVAILABLE } from "../../config/WebService";

export default class NoInternetConnection extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    onPress: PropTypes.func
  };

  static defaultProps = {
    style: {},
    paragraph: "No internet connection found check your connection"
  };

  render() {
    const { style, onPress, tryAgain, ...rest } = this.props;
    return (
      <View style={styles.container}>
        <Image source={Images.nointernet} />
        <View style={styles.noConnection}>
          <Text size="medium" color="#3e3e3e" style={styles.text} type="medium">
            Ooops!
          </Text>

          <Text
            size="normal"
            color="#3e3e3e"
            style={styles.text}
            type="regular"
          >
            {ERROR_NETWORK_NOT_AVAILABLE.message}
          </Text>
        </View>
        {!_.isUndefined(tryAgain) ? (
          <ButtonView style={styles.leftButtonView} onPress={onPress}>
            <Text
              size="normal"
              color="#3e3e3e"
              style={styles.text}
              type="regular"
            >
              Try Again
            </Text>
          </ButtonView>
        ) : null}
      </View>
    );
  }
}