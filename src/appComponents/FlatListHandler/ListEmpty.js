import React from "react";
import { View, Image, Text } from "react-native";

const ListEmpty = () => (
  <View style={styles.container}>
    <Image source={require("./icons/list_empty.png")} style={styles.icon} />
    <Text style={styles.description}>No data found</Text>
  </View>
);

const styles = {
  icon: { width: 120, height: 120, resizeMode: "contain" },
  container: {
    padding: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  description: { marginTop: 8, fontSize: 19 }
};

export default ListEmpty;
