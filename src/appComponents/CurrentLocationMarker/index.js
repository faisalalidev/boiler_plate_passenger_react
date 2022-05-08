import React from "react";
import { Text, View, ImageBackground } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Metrics, Colors, Images, Fonts } from "../../theme";

const CurrentLocationMarker = props => {
  return props.isVisible ? (
    props.callout ? (
      <Marker.Animated
        ref={props.refMarker}
        identifier={"currLocation"}
        coordinate={props.coordinate}
        flat={true}
        anchor={{ x: 0.5, y: 0.5 }}
        image={Images.mapMarker}
      >
        {props.duration && props.callout ? (
          <ImageBackground
            source={Images.pinTime}
            style={{
              width: 65,
              height: 36,
              paddingTop: 10
            }}
          >
            <View
              style={{
                position: "absolute",
                color: "black",
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5
              }}
            >
              <Text size="normal" color="blue" type="regular">
                {props.duration}
              </Text>
              <Text size="small" color="black" type="regular">
                {" "}
                mins
              </Text>
            </View>
          </ImageBackground>
        ) : null}
      </Marker.Animated>
    ) : (
        <Marker.Animated
          ref={props.refMarker}
          identifier={"currLocation"}
          coordinate={props.coordinate}
          flat={true}
          anchor={{ x: 0.5, y: 0.5 }}
          image={Images.mapMarker}
        />
      )
  ) : null;
};

export default CurrentLocationMarker;
