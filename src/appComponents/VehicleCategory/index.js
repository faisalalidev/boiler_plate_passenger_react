import React from "react";
import { Text, View, FlatList } from "react-native";
import { Metrics } from "../../theme";
import { VehicleCategoryCell } from "..";

const RideStatusMap = props => {
  return props.isVisible ? (
    <View
      style={{
        width: Metrics.screenWidth - Metrics.doubleBaseMargin,
        alignSelf: "center",
        position: "absolute",
        bottom: 95
      }}
    >
      <FlatList
        data={props.data}
        renderItem={(item, index) => (
          <VehicleCategoryCell item={item} onPressCell={props.onPressCell} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={props.data}
      />
    </View>
  ) : null;
};

export default RideStatusMap;
