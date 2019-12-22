import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 3,
        borderColor: Colors.accent,
        padding: 10,
        marginVertical: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    number: {
        color: Colors.accent,
        fontSize: 22
    }
});

export default NumberContainer;
