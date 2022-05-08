import React from "react";
import { View, Image } from "react-native";
import { ButtonView, Text } from "../../components";
import styles from "./styles";
import { Colors, Fonts, Images } from "../../theme";

const VehicleCategoryCell = props => {
    const data = props.item.item;
    const itemIndex = props.item.index;
    const vehicleStatus = data.status;

    const buttonDisable = vehicleStatus === "0" ? true : false;
    console.log("VehicleCategoryCell data", data);
    return (
        <ButtonView
            style={[
                styles.carCard,
                {
                    borderColor: buttonDisable
                        ? Colors.lightGrey
                        : data.isActive === true
                        ? Colors.jelly_bean
                        : Colors.black
                }
            ]}
            disabled={buttonDisable}
            onPress={() => props.onPressCell(itemIndex, buttonDisable, data)}
        >
            <View
                style={{
                    // backgroundColor: "red",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    position: "absolute",
                    top: 5,
                    left: 5,
                    flexDirection: "row",
                    borderRadius: 10,
                    backgroundColor: buttonDisable
                        ? Colors.lightGrey
                        : data.isActive === true
                        ? Colors.background.brownishOrange
                        : Colors.black,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Image source={Images.personCar} />
                <Text style={styles.personText}> x </Text>
                <Text style={styles.personText}>{data.passenger_no} </Text>
            </View>
            <View
                style={{
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    marginTop: 10
                }}
            >
                <Image
                    source={{
                        uri: data.image
                    }}
                    resizeMode="contain"
                    style={{
                        width: 70,
                        height: 30,
                        tintColor: buttonDisable
                            ? Colors.lightGrey
                            : data.isActive === true
                            ? Colors.jelly_bean
                            : Colors.black
                    }}
                />
            </View>
            <Text
                style={[
                    {
                        // color: buttonDisable ? Colors.lightGrey : Colors.jelly_bean,
                        color: buttonDisable
                            ? Colors.lightGrey
                            : data.isActive === true
                            ? Colors.jelly_bean
                            : Colors.black,
                        fontSize: Fonts.size.xxSmall,
                        fontFamily: Fonts.type.regular,
                        textAlign: "center",
                        marginTop: 10
                    }
                ]}
            >
                {data.car_type}
            </Text>
        </ButtonView>
    );
};

export default VehicleCategoryCell;
