import React from "react";
import { Text, View } from "react-native";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import { Images, Colors, Fonts, Metrics } from "../../theme";
import Scheduled from "../../appComponents/Scheduled";
import History from "../../appComponents/History";

const TabNavigator = createMaterialTopTabNavigator(
  {
    "Scheduled": Scheduled,
    "History": History
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tabNavigator.active,
      inactiveTintColor: Colors.tabNavigator.inactive,
      indicatorStyle: {
        borderBottomWidth: 3,
        borderBottomColor: Colors.tabNavigator.indicator
      },
      style: { backgroundColor: Colors.primary }
    }
  }
);

export default createAppContainer(TabNavigator);
