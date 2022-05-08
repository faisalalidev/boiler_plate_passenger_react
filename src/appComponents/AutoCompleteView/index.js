import React from "react";
import { Text, View } from "react-native";
import { AutoCompleteField, AutoCompleteListView, BottomSheet } from "..";
import { Metrics } from "../../theme";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Utils from "../../util";

const listHeight = Utils.isPlatformAndroid() ? 160 : 150;
const AutoCompleteView = props => {
  return props.isVisible ? (
    <View
      pointerEvents={"box-none"}
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        width: "100%",
        height: "100%"
      }}
    >
      <AutoCompleteField
        style={{
          position: "absolute",
          top: 0,
          height: 106,
          width: "100%"
        }}
        refPickUp={props.refPickUp}
        refDropOff={props.refDropOff}
      />
      <BottomSheet
        minClosingHeight={140}
        // height={Metrics.screenHeight - 170}
        height={Metrics.screenHeight - listHeight - getStatusBarHeight()}
        duration={500}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0
          }
        }}
        onClose={props.onClose}
      >
        <AutoCompleteListView scrollEnabled={props.scrollEnabled} />
      </BottomSheet>
    </View>
  ) : null;
};

export default AutoCompleteView;
