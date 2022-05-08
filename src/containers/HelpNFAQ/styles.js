// @flow
import { StyleSheet } from "react-native";
import { Colors } from "../../theme";

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.background.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderRadius: 5
    },
    scroll: {
        flex: 1,
        backgroundColor: Colors.background.grey,
        paddingHorizontal: 21
    },
    normalPadding: {
        paddingVertical: 10
    }
});
